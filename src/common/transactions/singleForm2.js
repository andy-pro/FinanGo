// @flow
import React, { Component } from 'react';

// import { View, Text, ListView, StyleSheet } from '@components';
import { View, Text, TextInput, StyleSheet } from '../components';
// import { getCategoryBySlug } from './utils'
// import theme from '../app/themes/default'

import AutosuggestInput from '../components/AutosuggestInput'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

// import Icon from 'react-native-vector-icons/Ionicons';

// const styles = StyleSheet.create(theme.transaction);

const initialState = {
  title: '',
  category: '',
  amount: '',
  cost: ''
}

export default class SingleForm extends Component {

  constructor(props) {
    super(props);
    this.fields = {}
    this.state = initialState
    this.amountTypes = ['кг', 'г', 'шт', 'м.п.']
  }


  onChange = data => this.setState(data)

  render() {
    console.log('sugg render!!!', this.state.title);
    return (
      <View style={styles.container}>

        <AutosuggestInput
          placeholder='Type a transaction title'
          formField='title'
          value={this.state.title}
          onChange={this.onChange}
          inputList={this.props.categories}
          getSuggestionValue={suggestion => suggestion.title}
          getSuggestions={(list, query) => getSuggestions(list, query, 1)}
          renderSuggestion={renderCategory}
          onSelect={suggestion => {console.log('its my click', suggestion);
            this.setState({
              category: suggestion.path_str.trim().replace(/\s*\/$/, '')
            })
            this.fields.amount.focus()
          }}
          focusOnSelect={false}
          autoFocus={true}
          styles={autoSuggestStyles}
        />

        <AutosuggestInput
          placeholder='Type a transaction category'
          formField='category'
          value={this.state.category}
          onChange={this.onChange}
          inputList={this.props.categories}
          getSuggestionValue={suggestion => suggestion.path_str + suggestion.title}
          getSuggestions={(list, query) => getSuggestions(list, query, -1)}
          renderSuggestion={renderCategory}
          styles={autoSuggestStyles}
        />

        <View style={styles.inlineInputs}>

          <AutosuggestInput
            placeholder='Amount'
            formField='amount'
            value={this.state.amount}
            onChange={this.onChange}
            inputList={this.amountTypes}
            getSuggestionValue={(suggestion, query) => query + suggestion}
            getSuggestions={(list, query) =>
              query.charCodeAt(query.length - 1) === 32 ? list : []
            }
            renderSuggestion={renderAmount}
            onSelect={() => this.fields.cost.focus()}
            styles={autoSuggestStyles}
            refInput={c => {
if (c) {
  console.log('ref callback', c);

  this.fields.amount = c
}
            }}
            keyboardType='numeric'
          />
          <View style={styles.flex}>
            <TextInput
              placeholder="Cost"
              value={this.state.cost}
              onChangeText={q => this.onChange({cost: q})}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={c => this.fields.cost = c}
              keyboardType='numeric'
              returnKeyType='done'
            />
          </View>

        </View>

      </View>
    )
  }
}

const getSuggestions = (inputList, query, order) => {
  // order: 1 - ascendant, -1 - descendant
  const inputValue = query.trim().toLowerCase(),
        inputLength = inputValue.length,
        suggestions = [];
  const createList = (data, path=[]) => {
    data.forEach((item, index) => {
      let title = item.title;
      if (title.toLowerCase().slice(0, inputLength) === inputValue) {
        suggestions.push({
          title,
          path,
          path_str: path.reduce((p, c) => p + c + ' / ', '')
        });
      }
      if (item.sub && item.sub.length) {
        createList(item.sub, path.concat([title]));
      }
    });
  }
  createList(inputList);
  return suggestions.sort((a, b) => (b.path.length - a.path.length)*order);
};

const renderCategory = (category, query) => {
  // const matches = AutosuggestHighlightMatch(suggestionText, query);
  const matches = [[0, query.length]];
  const parts = AutosuggestHighlightParse(category.title, matches);
  return (
    <View style={styles.suggestionView}>
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
    </View>
  );
}

const renderAmount = amountType =>
  <View style={amountStyle}>
    <Text style={styles.suggestion}>
      {amountType}
    </Text>
  </View>

const styles = StyleSheet.create({

  container: {
    // padding: 5,
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

  inputView: {
    paddingVertical: 5,
  },
  inlineInputs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  input: {
    width: '100%',
    fontSize: 15,
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

const autoSuggestStyles =  {
  container: styles.inputView,
  input: styles.input,
  suggestions: styles.suggestions
}
