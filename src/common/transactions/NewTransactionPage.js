// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTransaction, delTransaction, undoDelTransaction } from './actions'

import { Form, View, Text, TextInput, StyleSheet, Icon } from '../components';
import { getSuggestions } from './utils'
import { removeSpecial, getSlug, slugifyCategory } from '../lib/utils'

import AutosuggestForm from '../components/AutosuggestForm'
import RenderTransactions from './render'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import initialState from '../initialState'

// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const myIcon = (<Icon name="rocket" size={30} color="#900" />)

import { defaultTheme as theme } from '../app/themes'
const styles = StyleSheet.create(theme.transactionForm);

const { locally } = initialState.config

class NewTransactionPage extends Component {

  // props.pattern: /single, /group, /income

  constructor(props) {
    super(props);

    this.amountTypes = [
      {title: 'кг'},
      {title: 'г'},
      {title: 'л'},
      {title: 'мл'},
      {title: 'шт'},
      {title: 'м.п.'}
    ]

    const isNative = props.isReactNative
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
        pos: {top: isNative ? 42 : 36, maxHeight: 202},
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
        pos: {top: isNative ? 118 : 108, maxHeight: 146},
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

  }

  init = () => ({
    query: '',
    title: '',
    category: '',
    amount: '',
    cost: '',
    focused: 'title',
    field: this.fields.title,
    suggestions: [],
    showList: false,
  })

  onChange = (query, name) => {
    if (typeof query === 'object') {
      query = query.target.value
    }
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
      focused: name,
      showList
    })
  }

  onFocus = (e) => {
    // console.log('focus', this.state.field.name, e, this.refs);
    if (this.state.showList) {
      // this.setState({ showList: false })
    }
  }

  onBlur = () => {
    // console.log('blur', this.state.focused);
    if (this.state.showList) {
      // this.setState({ focused: false })
      setTimeout( () => this.setState({ showList: false }) )
    }
  }

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
    let dt = new Date()
    let transaction = {
      title: removeSpecial(fields.title),
      category: slugifyCategory(fields.category),
      cost: fields.cost,
      amount: fields.amount,
      date: dt.toISOString()
    }
    if (locally) transaction.id = dt.valueOf()
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
          // if (si >= 0) {
          //   e.preventDefault()
          //   field.onSelect(suggestions[si])
          // }
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

  onDelTransaction = (e, item) => {
    if (item.willDel) {
      console.log('%cundelete transaction', 'color:green;font-size:15px', item.id)
      this.props.undoDelTransaction(item.id)
    } else {
      console.log('%cdelete transaction', 'color:red;font-size:15px', item.id)
      this.props.delTransaction(item.id)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.showList !== this.state.showList ||
    nextState.query !== this.state.query ||
    nextState.selectedIndex !== this.state.selectedIndex ||
    nextProps.transactions !== this.props.transactions ||
    nextProps.user !== this.props.user
  }

  render() {
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;', this.state);
    // const {suggestions, showList, focused, field} = this.state
    return (

      <AutosuggestForm state={this.state}>

        <Form
          style={styles.controls}
          onKeyDown={this.onKeyDown}
          onSubmit={this.onSubmit}
        >

          <View style={styles.formRow}>
            <TextInput
              autoFocus
              placeholder='Type a transaction title'
              value={this.state.title}
              onChangeText={e => this.onChange(e, 'title')}
              {...this.refhack.title}
              {...this.propSet1}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              placeholder='Type a transaction category'
              value={this.state.category}
              onChangeText={e => this.onChange(e, 'category')}
              {...this.refhack.category}
              {...this.propSet1}
            />
          </View>

          <View style={styles.formRow}>
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
              backgroundColor="#18a06a"
              onPress={this.onSubmit}
            >
              OK
            </Icon.Button>
          </View>

        </Form>

        <RenderTransactions
          user={this.props.user}
          categories={this.props.categories}
          transactions={this.props.transactions}
          editable={true}
          onClick={this.onDelTransaction}
        />

      </AutosuggestForm>

    )
  }

  renderCategory = category => {
    const matches = [[0, this.state.query.length]];
    const parts = AutosuggestHighlightParse(category.title, matches);
    const item =
      <Text style={styles.suggestion}>
        {category.path_str}
        {
          parts.map((part, index) =>
            <Text
              style={part.highlight ? styles.highlight : null}
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
      <Text style={styles.suggestion}>
        {amountType.title}
      </Text>
    return this.renderItem(item, amountType.selected)
  }

  renderItem = (item, selected) =>
    <View style={selected ? styles.selected : styles.suggestionView}>
      {item}
    </View>

  propSet0 = {
    onBlur: this.onBlur,
    // required: true
  }

  propSet1 = {
    ...this.propSet0,
    style: styles.input,
    keyboardType: 'default',
    returnKeyType: 'next',
    autoCapitalize: 'sentences',
    autoCorrect: true
  }

  propSet2 = {
    ...this.propSet0,
    style: [styles.input, {marginRight: 10}],
    keyboardType: 'numeric',
    autoCapitalize: 'none',
    autoCorrect: false
  }

}

export default connect(
  (state) => ({
    user: state.user,
    categories: state.categories,
    transactions: state.transactions,
    isReactNative: state.device.isReactNative,
  }),
  { addTransaction, delTransaction, undoDelTransaction }
)(NewTransactionPage);
