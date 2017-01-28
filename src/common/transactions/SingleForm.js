// @flow
import React, { Component } from 'react';

import { Form, View, Text, TextInput, StyleSheet, Icon } from '../components';
import { getSuggestions } from './utils'

import AutosuggestForm from '../components/AutosuggestForm'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const myIcon = (<Icon name="rocket" size={30} color="#900" />)

import { defaultTheme as theme } from '../app/themes'
const styles = StyleSheet.create(theme.transactionForm);

export default class SingleForm extends Component {

  constructor(props) {
    super(props);
    // this.fields = {}
    // this.state = initialState
    this.amountTypes = [
      {title: 'кг'},
      {title: 'г'},
      {title: 'л'},
      {title: 'мл'},
      {title: 'шт'},
      {title: 'м.п.'}
    ]
    // presets
    let refName = props.isReactNative ? 'ref' : '$ref'
    this.refhack = {
      amount: {[refName]: c => this.fields.amount.ref = c},
      cost: {[refName]: c => this.fields.cost.ref = c}
    }

    this.fields = {

      title: {
        name: 'title',
        pos: {top: 42, maxHeight: 202},
        getSuggestions: query => getSuggestions(props.categories, query, 1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          // console.log('onSelect title', suggestion);
          this.setState({
            title: suggestion.title,
            category: suggestion.path_str.trim().replace(/\s*\/$/, ''),
            showList: false
          })
          this.fields.amount.ref.focus()
        }
      },
      category: {
        name: 'category',
        pos: {top: 80, maxHeight: 174},
        getSuggestions: query => getSuggestions(props.categories, query, -1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          // console.log('its my click', suggestion, this.fields.title.ref);
          this.setState({
            category: suggestion.path_str + suggestion.title,
            showList: false
          })
          this.fields.amount.ref.focus()
        }
      },
      amount: {
        name: 'amount',
        pos: {top: 118, maxHeight: 146},
        getSuggestions: query => /\d+\s/.test(query) ? this.amountTypes : [],
        renderSuggestion: this.renderAmount,
        onSelect: suggestion => {
          // console.log('its my click', suggestion, this.fields.title.ref);
          this.setState({
            amount: this.state.query + suggestion.title,
            showList: false
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
    showList: false
  })

  onChange = (query, name) => {
    if (typeof query === 'object') {
      query = query.target.value
    }
    const field = this.fields[name]
    // console.log('Change: ', name, ' query:', query);
    let suggestions = (query.length && field.getSuggestions) ? field.getSuggestions(query) : []
    let showList = Boolean(suggestions.length)
    this.setState({
      query,
      [name]:query,
      field,
      suggestions,
      selectedIndex: -1,
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
    console.log('formData',
      this.state.title +
      this.state.category +
      this.state.amount +
      this.state.cost
    )
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
          if (si >= 0) {
            e.preventDefault()
            field.onSelect(suggestions[si])
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

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.showList !== this.state.showList ||
    nextState.query !== this.state.query ||
    nextState.selectedIndex !== this.state.selectedIndex
  }

  render() {
    // console.log('%cAutosuggest Form render!!!', 'color:#a00;font-weight:bold;', this.state);
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
              {...this.propSet1}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              placeholder='Type a transaction category'
              value={this.state.category}
              onChangeText={e => this.onChange(e, 'category')}
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
              type='submit'
            >
              OK
            </Icon.Button>
          </View>

        </Form>

        {this.props.children}

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
    <View style={selected ? {...styles.suggestionView, ...styles.selected} : styles.suggestionView}>
      {item}
    </View>

  propSet0 = {
    onBlur: this.onBlur,
    required: true
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
