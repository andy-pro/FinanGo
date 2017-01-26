// @flow
import React, { Component } from 'react';

// import { View, Text, ListView, StyleSheet } from '@components';
import { View, Text, TextInput, StyleSheet } from '../components';
import { getSuggestions } from './utils'
// import theme from '../app/themes/default'

import AutosuggestForm from '../components/AutosuggestForm'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

// import Icon from 'react-native-vector-icons/Ionicons';

// const styles = StyleSheet.create(theme.transaction);


export default class SingleForm extends Component {

  constructor(props) {
    super(props);
    // this.fields = {}
    // this.state = initialState
    this.amountTypes = [
      {title: 'кг'},
      {title: 'г'},
      {title: 'шт'},
      {title: 'м.п.'}
    ]
    // presets

    this.fields = {

      title: {
        name: 'title',
        getSuggestions: query => getSuggestions(props.categories, query, 1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          console.log('onSelect title', suggestion);
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

  // onChange = data => this.setState(data)
  onChange = (e, name) => {
    const query = e.target.value
    const field = this.fields[name]
    console.log('Change: ', name, ' query:', query);
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
    console.log('blur', this.state.focused);
    if (this.state.showList) {
      // this.setState({ focused: false })
      setTimeout(

        () => this.setState({ showList: false })
      )
    }
  }

  onArrow = state => this.setState(state)

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.showList !== this.state.showList ||
    nextState.query !== this.state.query ||
    nextState.selectedIndex !== this.state.selectedIndex
  }

  propSet1 = {
    onFocus: this.onFocus,
    onBlur: this.onBlur,
    style: styles.input
  }

  propSet2 = {
    ...this.propSet1,
    keyboardType: 'default',
    returnKeyType: 'next',
    autoCapitalize: 'sentences',
    autoCorrect: true
  }

  propSet3 = {
    ...this.propSet1,
    keyboardType: 'numeric',
    autoCapitalize: 'none',
    autoCorrect: false
  }

  render() {
    console.log('%cAutosuggest Form render!!!', 'color:#a00;font-weight:bold;', this.state);
    // const {suggestions, showList, focused, field} = this.state
    return (

      <AutosuggestForm
        state={this.state}
        styles={formStyles}
        onArrow={this.onArrow}
      >

        <View style={styles.formRow}>
          <TextInput
            autoFocus
            placeholder='Type a transaction title'
            value={this.state.title}
            onChangeText={e => this.onChange(e, 'title')}
            $ref={c => this.fields.title.ref = c}
            {...this.propSet2}
          />
        </View>

        <View style={styles.formRow}>
          <TextInput
            placeholder='Type a transaction category'
            value={this.state.category}
            onChangeText={e => this.onChange(e, 'category')}
            {...this.propSet2}
          />
        </View>

        <View style={styles.formRow}>
          <TextInput
            placeholder='Amount'
            value={this.state.amount}
            onChangeText={e => this.onChange(e, 'amount')}
            returnKeyType='next'
            $ref={c => this.fields.amount.ref = c}
            {...this.propSet3}
          />
          <TextInput
            placeholder="Cost"
            value={this.state.cost}
            onChangeText={e => this.onChange(e, 'cost')}
            returnKeyType='done'
            $ref={c => this.fields.cost.ref = c}
            {...this.propSet3}
          />
        </View>

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
    return this.renderItem(item, category.selected, styles.suggestionView)
  }

  renderAmount = amountType => {
    const item =
      <Text style={styles.suggestion}>
        {amountType.title}
      </Text>
    return this.renderItem(item, amountType.selected, amountStyle)
  }

  renderItem = (item, selected, style) =>
    <View style={selected ? {...style, ...styles.selected} : style}>
      {item}
    </View>

}

const styles = StyleSheet.create({

  container: {
    paddingVertical: 20,
    // borderBottomColor: '#18a06a',
    // borderBottomWidth: 2
  },

  suggestions: {
    backgroundColor: '#f6f6f6',
    maxHeight: 148,
    // marginHorizontal: 4,
    borderColor: '#aaf',
    borderWidth: 1,
    borderStyle: 'solid',
    overflow: 'auto',
    padding: 2
  },
  suggestionView: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid'
  },
  selected: {
    backgroundColor: '#cce'
  },
  suggestion: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666'
  },
  highlight: {
    color: 'red'
  },

  formRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 5
  },
  inlineInputs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  input: {
    width: '100%',
    fontSize: 15,
    // marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1
  }
});

const amountStyle = {
  ...styles.suggestionView,
  // alignItems: 'flex-end'
  textAlign: 'end'
}

const formStyles =  {
  container: styles.container,
  // input: styles.input,
  suggestions: styles.suggestions
}
