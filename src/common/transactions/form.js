// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import shortid from 'shortid'
import shortid from 'js-shortid'

import { addTransactions } from './actions'

import { Form, View, Text, TextInput, Icon } from '../__components';
import formWrapper from '../__lib/formWrapper';
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
    // console.log('new trans page constructor', props.fields);
    const { isNative } = props
    // const isNative = navigator && navigator.product === 'ReactNative'

    this.fields = {
      title: {
        name: 'title',
        pos: {top: isNative ? 42 : 36, maxHeight: isNative ? 202 : 286},
        getSuggestions: query => getSuggestions(this.props.categories, query, 1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          // console.log('onSelect title', suggestion);
          this.props.fields.$setMany({
            title: suggestion.title,
            category: suggestion.path_str.trim().replace(/\s*\/$/, '')
          })
          this.props.fields.__refs.amount.focus()
        }
      },
      category: {
        name: 'category',
        pos: {top: isNative ? 80 : 72, maxHeight: 174},
        getSuggestions: query => getSuggestions(this.props.categories, query, -1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          this.props.fields.category.onChangeText(suggestion.path_str + suggestion.title)
          // this.setState({
          //   category: suggestion.path_str + suggestion.title,
          //   // showList: false,
          // })
          this.props.fields.__refs.amount.focus()
        }
      },
      amount: {
        name: 'amount',
        pos: isNative ? {top: 118, maxHeight: 146} : {top: 108},
        getSuggestions: getAmountTypes,
        renderSuggestion: this.renderAmount,
        onSelect: suggestion => {
          // this.state.suggestions.forEach(item => item.selected = item === suggestion)
          this.props.fields.amount.onChangeText(this.props.fields.__query.split(' ')[0] + ' ' + suggestion.title)
          // this.setState({
          //   // amount: this.state.query + suggestion.title,
          //   amount: this.state.query.split(' ')[0] + ' ' + suggestion.title,
          //   // showList: false,
          // })
          this.props.fields.__refs.cost.focus()
        }
      },
      cost: {
        name: 'cost'
      },
      groupTitle: {
        name: 'groupTitle'
      }
    }

    // this.state = this.init()
    this.state = {
      // fields: props.fields,
      // ...props.fields,
      field: this.fields.title,
      suggestions: [],
      showList: false,
    }

    if (props.groupMode) {
      this.initGroup()
    }

  }

  initGroup = () => {
    // this.groupId = getTimeId().pid
    // this.groupId = shortid.generate()
    this.groupId = shortid.gen()
  }

  init = () => ({
    // query: '',
    // title: '',
    // category: '',
    // amount: '',
    // cost: '',
    // groupTitle: '',
    field: this.fields.title,
    suggestions: [],
    showList: false,
  })

  onBlur = () => {
    if (this.state.showList) {
      setTimeout( () => this.setState({ showList: false }) )
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('transactions form: componentWillReceiveProps', nextProps);
    let { fields } = nextProps
    if (fields !== this.props.fields) {
      this.fieldChanged(fields)
    }
  }

  fieldChanged = fields => {
    let { __query, __name } = fields
    // query = getValue(query)
    const field = this.fields[__name]
    // console.log('Change field:', field, 'name', __name, ' query:', __query);
    let suggestions = (__query.length && field && field.getSuggestions) ? field.getSuggestions(__query) : []
    let len = suggestions.length
    // console.log('val', __name, __query, 'sugg. len', len);
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
      field,
      suggestions,
      selectedIndex: si,
      showList,
    })
  }

  onTransactionSubmit = e => {
    let transaction = this.props.fields.__submits.onTransactionSubmit(e)
    if (transaction) {
      if (this.groupId) transaction.groupId = this.groupId
      this.addTransaction(transaction)
    }
  }

  onGroupSubmit = e => {
    let group = this.props.fields.__submits.onGroupSubmit(e)
    if (group) {
      this.addTransaction({
        title: group.groupTitle,
        groupId: this.groupId,
        groupMaster: 1
      })
      this.initGroup()
    }
  }

  addTransaction = (transaction) => {
    transaction.date = new Date().toISOString()
    if (!locally) transaction.userId = this.props.user.id
    this.props.addTransactions(transaction)
    this.props.fields.$reset('all')
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
    console.log('!!! Form for new transactions !!!');
    let { suggestions, showList, field } = this.state
    // let { refhack, fields } = this.props
    let { fields } = this.props
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
          onSubmit={this.onTransactionSubmit}
        >

          <View style={mainCSS.row}>
            <TextInput
              placeholder='Type a transaction title'
              {...fields.title}
              {...this.propSet1}
            />
          </View>

          <View style={mainCSS.row}>
            <TextInput
              placeholder='Type a transaction category'
              {...fields.category}
              {...this.propSet1}
            />
          </View>

          <View style={mainCSS.row}>
            <TextInput
              placeholder='Amount'
              {...fields.amount}
              {...this.propSet2}
              returnKeyType='next'
            />
            <TextInput
              placeholder="Cost"
              {...fields.cost}
              {...this.propSet2}
              returnKeyType='done'
            />

            <Icon.Button
              name="ios-paper-plane-outline"
              backgroundColor={colors.header}
              onPress={this.onTransactionSubmit}
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
                {...fields.groupTitle}
                {...this.propSet2}
                returnKeyType='done'
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
    // const matches = [[0, this.state.query.length]];
    const matches = [[0, this.props.fields.__query.length]];
    const parts = AutosuggestHighlightParse(category.title, matches);
    const item =
      <Text style={suggestionsCSS.text}>
        {category.path_str}
        {
          parts.map((part, index) => {
            let props = { key: index }
            if (part.highlight) props.style = suggestionsCSS.highlight
            return <Text {...props}>{part.text}</Text>
          })
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

  propSet1 = {
    onBlur: this.onBlur,
    style: mainCSS.input,
    keyboardType: 'default',
    returnKeyType: 'next',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

  propSet2 = {
    onBlur: this.onBlur,
    style: [mainCSS.input, {marginRight: 10}],
    keyboardType: 'numeric',
    autoCapitalize: 'none',
    autoCorrect: false
  }

}

export default formWrapper([
  {
    submit: 'onTransactionSubmit',
    fields: [
      // { fn: fieldName, vd: validator, init: initialValue, af: autoFocus, pp: postProcessing }
      { fn: 'title', vd: 'required', af: true, pp: removeSpecial },
      { fn: 'category', vd: 'required', pp: slugifyCategory },
      { fn: 'amount', vd: 'required' },
      { fn: 'cost', vd: 'isDecimal' }
    ]
  }, {
    submit: 'onGroupSubmit',
    fields: [
      { fn: 'groupTitle', vd: 'required', pp: removeSpecial }
    ]
  }
])(connect(
  null,
  { addTransactions }
)(NewTransactionForm))

//
// export default connect(
//   null,
//   { addTransactions, fake }
// )(
//   popup({
//     fields: [
//       // [ field name, initialState ]
//       [ 'title', 'ququ' ],
//       [ 'category', '' ],
//       [ 'amount', '' ],
//       [ 'cost', '' ],
//     ]
//   })(NewTransactionForm)
// );
