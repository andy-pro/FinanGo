// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid'

import { addTransactions } from './actions'

import { Form, View, Text, TextInput, Icon } from '../__components';
import AutosuggestForm from '../__components/AutosuggestForm';

import { getSuggestions, getAmountTypes } from './utils'
// import { getTimeId } from '../__lib/dateUtils'
import { removeSpecial, getSlug, slugifyCategory, getValue } from '../__lib/utils'

import RenderTransactions from './render'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import config from '../config'

import { colors, mainCSS, suggestionsCSS } from '../__themes'

const { locally } = config

class NewTransactionForm extends Component {

  // props.pattern: /single, /group, /income

  constructor(props) {
    super(props);
    // console.log('new trans page constructor');

    const { isNative } = props
    let refName = isNative ? 'ref' : '$ref'
    this.refhack = {
      title: {[refName]: c => this.fields.title.ref = c},
      category: {[refName]: c => this.fields.category.ref = c},
      amount: {[refName]: c => this.fields.amount.ref = c},
      cost: {[refName]: c => this.fields.cost.ref = c}
    }

    this.fields = {
      title: {
        name: 'title',
        pos: {top: isNative ? 42 : 36, maxHeight: isNative ? 202 : 286},
        getSuggestions: query => getSuggestions(this.props.categories, query, 1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          // console.log('onSelect title', suggestion);
          this.setState({
            title: suggestion.title,
            category: suggestion.path_str.trim().replace(/\s*\/$/, ''),
            showList: false,
          })
          this.fields.amount.ref.focus()
        }
      },
      category: {
        name: 'category',
        pos: {top: isNative ? 80 : 72, maxHeight: 174},
        getSuggestions: query => getSuggestions(this.props.categories, query, -1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          this.setState({
            category: suggestion.path_str + suggestion.title,
            showList: false,
          })
          this.fields.amount.ref.focus()
        }
      },
      amount: {
        name: 'amount',
        pos: isNative ? {top: 118, maxHeight: 146} : {top: 108},
        getSuggestions: getAmountTypes,
        renderSuggestion: this.renderAmount,
        onSelect: suggestion => {
          // this.state.suggestions.forEach(item => item.selected = item === suggestion)
          this.setState({
            // amount: this.state.query + suggestion.title,
            amount: this.state.query.split(' ')[0] + ' ' + suggestion.title,
            showList: false,
          })
          this.fields.cost.ref.focus()
        }
      },
      cost: {
        name: 'cost'
      }
    }

    this.state = this.init()

    if (props.groupMode) {
      this.initGroup()
    }

  }

  initGroup = () => {
    // this.groupId = getTimeId().pid
    this.groupId = shortid.generate()
  }

  init = () => ({
    query: '',
    title: '',
    category: '',
    amount: '',
    cost: '',
    groupTitle: '',
    field: this.fields.title,
    suggestions: [],
    showList: false,
  })

  // componentWillMount() {
  //   if (this.groupId && this.props.user && this.props.transactions.length) {
  //     // clear array of transactions in edit group mode
  //     this.props.clearTransactions()
  //   }
  // }

  // componentWillUnmount(props) {
  //   console.log('unmount', props);
  //   // this.props.setMonthToNow()
  // }

  // onFocus = (e) => {
  //   // console.log('focus', this.state.field.name, e, this.refs);
  //   if (this.state.showList) {
  //     // this.setState({ showList: false })
  //   }
  // }

  onBlur = () => {
    if (this.state.showList) {
      setTimeout( () => this.setState({ showList: false }) )
    }
  }

  // change 01.03.2017 nextState.field, при переходе по полям клавишей ТАБ:
  // если содержимое полей одинаковое, то не перерисовывалось меню.
  // попытка упростить: nextState !== state
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.showList !== this.state.showList ||
  //   nextState.query !== this.state.query ||
  //   nextState.field !== this.state.field ||
  //   // nextState.groupTitle !== this.state.groupTitle ||
  //   nextState.selectedIndex !== this.state.selectedIndex ||
  //   nextProps.transactions !== this.props.transactions ||
  //   nextProps.user !== this.props.user
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState !== this.state ||
  //   // nextProps.transactions !== this.props.transactions ||
  //   nextProps.user !== this.props.user
  // }

  onChange = (query, name) => {
    query = getValue(query)
    // console.log('val', query);
    const field = this.fields[name]
    // console.log('Change: ', name, ' query:', query);
    let suggestions = (query.length && field.getSuggestions) ? field.getSuggestions(query) : []
    let len = suggestions.length
    let showList = Boolean(len)
    let si = -1
    if (showList) {
      if (len === 1) {
        suggestions[0].selected = true
        si = 0
      } else {
        // -1 if not found
        si = suggestions.findIndex(item => item.selected)
      }
    }
    this.setState({
      query,
      [name]: query,
      field,
      suggestions,
      selectedIndex: si,
      // focused: name,
      showList
    })
  }

  onGroupTitleChange = (query) =>
    this.setState({
      query,
      groupTitle: getValue(query)
    })

  onSubmit = e => {
    e.preventDefault()
    let keys = Object.keys(this.fields)
    let fields = {}
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      let field = this.state[key].trim()

      let error = !field || (key === 'cost' && !/^\d*\.?\d+$/.test(field))
      if (error) return this.fields[key].ref.focus()

      // if (!field) return this.fields[key].ref.focus()
      // if (key === 'cost') {
      //   if (!/^\d*[\.]?\d+$/.test(field)) {
      //     return this.fields[key].ref.focus()
      //   }
      // }

      fields[key] = field
    }
    let transaction = {
      title: removeSpecial(fields.title),
      category: slugifyCategory(fields.category),
      cost: fields.cost,
      amount: fields.amount,
    }
    if (this.groupId) {
      transaction.groupId = this.groupId
    }
    this.addTransaction(transaction)
  }

  onGroupSubmit = e => {
    e.preventDefault()
    let { groupTitle } = this.state
    if (!groupTitle) return
    this.addTransaction({
      title: removeSpecial(groupTitle),
      groupId: this.groupId,
      groupMaster: 1
    })
    this.initGroup()
  }

  addTransaction = (transaction) => {
    // let dt = getTimeId()
    // transaction.date = dt.iso
    transaction.date = new Date().toISOString()
    if (!locally)
      transaction.userId = this.props.user.id
    // if (locally) transaction.id = dt.pid
    // else transaction.userId = this.props.user.id

    this.props.addTransactions(transaction)
    this.setState(this.init())
    this.fields.title.ref.focus()
  }

  onKeyDown = e => {
    let { showList, suggestions, field, selectedIndex: si } = this.state
    const changeSelected = selectedIndex => {
      e.preventDefault()
      this.setState({
        selectedIndex,
        suggestions: suggestions.map((item, i) => {
          item.selected = i === selectedIndex
          return item
        })
      })
    }
    if (showList) {
      switch (e.key) {
        case 'Enter':
          let s = suggestions.find(item => item.selected)
          if (s) {
            e.preventDefault()
            field.onSelect(s)
          }
          break
        case 'ArrowDown':
          if (si < suggestions.length - 1) changeSelected(++si)
          return
        case 'ArrowUp':
          if (si > 0) changeSelected(--si)
          return
        case 'Escape':
          this.setState({ showList: false })
      }
    }
  }

  render() {
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;', this.state);
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;', this.props.transactions.length);
    // console.log('!!! Form for new transactions !!!');
    const { suggestions, showList, field } = this.state
    return (

      <AutosuggestForm
        showList={showList}
        suggestions={suggestions}
        field={field}
        style={suggestionsCSS}
      >

        <Form
          style={mainCSS.form}
          onKeyDown={this.onKeyDown}
          onSubmit={this.onSubmit}
        >

          <View style={mainCSS.row}>
            <TextInput
              autoFocus
              placeholder='Type a transaction title'
              value={this.state.title}
              onChangeText={e => this.onChange(e, 'title')}
              {...this.refhack.title}
              {...this.propSet1}
            />
          </View>

          <View style={mainCSS.row}>
            <TextInput
              placeholder='Type a transaction category'
              value={this.state.category}
              onChangeText={e => this.onChange(e, 'category')}
              {...this.refhack.category}
              {...this.propSet1}
            />
          </View>

          <View style={mainCSS.row}>
            <TextInput
              placeholder='Amount'
              value={this.state.amount}
              onChangeText={e => this.onChange(e, 'amount')}
              returnKeyType='next'
              {...this.refhack.amount}
              {...this.propSet2}
            />
            <TextInput
              placeholder="Cost"
              value={this.state.cost}
              onChangeText={e => this.onChange(e, 'cost')}
              returnKeyType='done'
              {...this.refhack.cost}
              {...this.propSet2}
            />

            <Icon.Button
              name="ios-paper-plane-outline"
              backgroundColor={colors.header}
              onPress={this.onSubmit}
            >
              OK
            </Icon.Button>
          </View>

        </Form>

        {this.groupId &&
          <Form
            style={mainCSS.form}
            onSubmit={this.onGroupSubmit}
          >
            <View style={mainCSS.row}>
              <TextInput
                placeholder='Group title'
                value={this.state.groupTitle}
                onChangeText={this.onGroupTitleChange}
                returnKeyType='done'
                {...this.refhack.groupTitle}
                {...this.propSet2}
              />
              <Icon.Button
                name="ios-list-box-outline"
                backgroundColor="#a6d"
                onPress={this.onGroupSubmit}
              >
                OK
              </Icon.Button>
            </View>
          </Form>
        }

        <View style={mainCSS.divider} />

        {this.props.children}

      </AutosuggestForm>

    )
  }

  renderCategory = category => {
    const matches = [[0, this.state.query.length]];
    const parts = AutosuggestHighlightParse(category.title, matches);
    const item =
      <Text style={suggestionsCSS.text}>
        {category.path_str}
        {
          parts.map((part, index) =>
            <Text
              style={part.highlight ? suggestionsCSS.highlight : null}
              key={index}>
              {part.text}
            </Text>
          )
        }
      </Text>
    return this.renderItem(item, category.selected)
  }

  renderAmount = amountType => {
    const item =
      <Text style={suggestionsCSS.text}>
        {amountType.title}
      </Text>
    return this.renderItem(item, amountType.selected)
  }

  renderItem = (item, selected) =>
    <View style={selected ? suggestionsCSS.selected : suggestionsCSS.view}>
      {item}
    </View>

  propSet0 = {
    onBlur: this.onBlur,
    // required: true
  }

  propSet1 = {
    ...this.propSet0,
    style: mainCSS.input,
    keyboardType: 'default',
    returnKeyType: 'next',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

  propSet2 = {
    ...this.propSet0,
    style: [mainCSS.input, {marginRight: 10}],
    keyboardType: 'numeric',
    autoCapitalize: 'none',
    autoCorrect: false
  }

}

export default connect(
  null,
  { addTransactions }
)(NewTransactionForm);
