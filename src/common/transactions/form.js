// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTransaction } from './actions'
// import { setMonthToNow } from '../app/actions'

import { Form, View, Text, TextInput, Icon } from '../__components';
import AutosuggestForm from '../__components/AutosuggestForm';

import { getSuggestions } from './utils'
import { getTimeId } from '../__lib/dateUtils'
import { removeSpecial, getSlug, slugifyCategory, getValue } from '../__lib/utils'

import RenderTransactions from './render'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import config from '../config'

import { colors, mainStyles, transactions as styles, suggestions as suggStyles } from '../__themes'

const { locally } = config

class NewTransactionForm extends Component {

  // props.pattern: /single, /group, /income

  constructor(props) {
    super(props);
    // console.log('new trans page constructor');
    this.amountTypes = [
      {title: 'кг'},
      {title: 'г'},
      {title: 'л'},
      {title: 'мл'},
      {title: 'шт'},
      {title: 'м.п.'}
    ]

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
        getSuggestions: query => /\d+\s/.test(query) ? this.amountTypes : [],
        renderSuggestion: this.renderAmount,
        onSelect: suggestion => {
          this.state.suggestions.forEach(item => item.selected = item === suggestion)
          this.setState({
            amount: this.state.query + suggestion.title,
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
    this.groupId = getTimeId().pid
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

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.showList !== this.state.showList ||
    nextState.query !== this.state.query ||
    // nextState.groupTitle !== this.state.groupTitle ||
    nextState.selectedIndex !== this.state.selectedIndex ||
    nextProps.transactions !== this.props.transactions ||
    nextProps.user !== this.props.user
  }

  onChange = (query, name) => {
    query = getValue(query)
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
      [name]:query,
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
      if (!field) return this.fields[key].ref.focus()
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
    let dt = getTimeId()
    transaction.date = dt.iso
    if (locally) transaction.id = dt.pid
    else transaction.userId = this.props.user.id

    this.props.addTransaction(transaction)
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
        style={suggStyles}
      >

        <Form
          style={mainStyles.form}
          onKeyDown={this.onKeyDown}
          onSubmit={this.onSubmit}
        >

          <View style={mainStyles.row}>
            <TextInput
              autoFocus
              placeholder='Type a transaction title'
              value={this.state.title}
              onChangeText={e => this.onChange(e, 'title')}
              {...this.refhack.title}
              {...this.propSet1}
            />
          </View>

          <View style={mainStyles.row}>
            <TextInput
              placeholder='Type a transaction category'
              value={this.state.category}
              onChangeText={e => this.onChange(e, 'category')}
              {...this.refhack.category}
              {...this.propSet1}
            />
          </View>

          <View style={mainStyles.row}>
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
              type='number'
              step='0.01'
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
            style={mainStyles.form}
            onSubmit={this.onGroupSubmit}
          >
            <View style={mainStyles.row}>
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

        <View style={mainStyles.divider} />

        {this.props.children}

      </AutosuggestForm>

    )
  }

  renderCategory = category => {
    const matches = [[0, this.state.query.length]];
    const parts = AutosuggestHighlightParse(category.title, matches);
    const item =
      <Text style={suggStyles.text}>
        {category.path_str}
        {
          parts.map((part, index) =>
            <Text
              style={part.highlight ? suggStyles.highlight : null}
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
      <Text style={suggStyles.text}>
        {amountType.title}
      </Text>
    return this.renderItem(item, amountType.selected)
  }

  renderItem = (item, selected) =>
    <View style={selected ? suggStyles.selected : suggStyles.view}>
      {item}
    </View>

  propSet0 = {
    onBlur: this.onBlur,
    // required: true
  }

  propSet1 = {
    ...this.propSet0,
    style: mainStyles.input,
    keyboardType: 'default',
    returnKeyType: 'next',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

  propSet2 = {
    ...this.propSet0,
    style: [mainStyles.input, {marginRight: 10}],
    keyboardType: 'numeric',
    autoCapitalize: 'none',
    autoCorrect: false
  }

}

export default connect(
  null,
  { addTransaction }
)(NewTransactionForm);
