// @flow
import React from 'react';
import { connect } from 'react-redux';
// import shortid from 'shortid'
import shortid from 'js-shortid'

import { addTransactions } from './actions'

import { Form, View, TextInput, Icon, FormWrapper } from '../__components';
import { PopupMenu, RenderSimple, RenderHighlight } from '../__components/PopupMenu';

import { getSuggestions, getAmountTypes, getShops } from './utils'
import { removeSpecial, slugifyCategory } from '../__lib/utils'

import __config from '../config'
import { colors, mainCSS } from '../__themes'

class NewTransactionForm extends React.Component {

  // props.pattern: /single, /group, /income

  componentDidMount() {
  }

  componentWillMount() {
    // console.log('context popup', this.context.popup.color);

    const { isNative } = __config
    // const isNative = navigator && navigator.product === 'ReactNative'
    // console.log('form trans page mount', this.context.popup);
    // this.popupContext = PopupMenu.getContext()

    this.popups = {
      /* методы __onKeyDown и __onBlur назначаются конструктором PopupMenu компонента */
      __onKeyDown2: this.context.popup.onKeyDown,
      __onKeyDown: null,
      __onBlur: null,
      title: {
        // pos: {top: isNative ? 42 : 36, maxHeight: isNative ? 202 : 286},
        pos: {maxHeight: isNative ? 202 : 286},
        getSuggestions: query => getSuggestions(this.props.categories, query, 1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          this.props.fields.__setState({
            title: suggestion.title,
            category: suggestion.path_str.trim().replace(/\s*\/$/, '')
          })
          this.props.fields.__refs.amount.focus()
        }
      },
      category: {
        // pos: {top: isNative ? 80 : 72, maxHeight: 174},
        pos: {maxHeight: 174},
        getSuggestions: query => getSuggestions(this.props.categories, query, -1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          this.props.fields.category.onChangeText(suggestion.path_str + suggestion.title)
          this.props.fields.__refs.amount.focus()
        }
      },
      amount: {
        // pos: isNative ? {top: 118, maxHeight: 146} : {top: 108},
        pos: isNative ? {maxHeight: 146} : {},
        getSuggestions: getAmountTypes,
        // renderSuggestion: PopupMenu.renderSimple,
        renderSuggestion: RenderSimple,
        onSelect: suggestion => {
          this.props.fields.amount.onChangeText(this.props.fields.__query.split(' ')[0] + ' ' + suggestion.title)
          this.props.fields.__refs.cost.focus()
        }
      },
      groupTitle: {
        pos: isNative ? {maxHeight: 146} : {},
        getSuggestions: getShops,
        // renderSuggestion: PopupMenu.renderHighlight,
        renderSuggestion: RenderHighlight,
        onSelect: suggestion => {
          this.props.fields.groupTitle.onChangeText(suggestion.title)
          this.props.fields.__refs.groupTitle.focus()
        }
      }
    }

    if (this.props.groupMode) {
      this.initGroup()
    }
  }

  initGroup = () => {
    this.groupId = shortid.gen()
  }

  onTransactionSubmit = e => {
    let transaction = this.props.fields.__submits.onTransactionSubmit(e)
    if (transaction) {
      if (this.groupId) transaction.groupId = this.groupId
      this.addTransaction(transaction)
      this.props.fields.__resetState(0)
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
      this.props.fields.__resetState(1)
      this.initGroup()
    }
  }

  addTransaction = (transaction) => {
    transaction.date = new Date().toISOString()
    if (!__config.locally) transaction.userId = this.props.user.id
    this.props.addTransactions(transaction)
  }

  render() {
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;');
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;', this.props.transactions.length);
    // console.log('!!! Form for new transactions !!!', this.context.popup);
    let { fields, children } = this.props
    return (
      <PopupMenu
        popups={this.popups}
        fields={fields}
      >
        <Form
          style={mainCSS.form}
          onKeyDown={this.popups.__onKeyDown2}
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
            onKeyDown={this.popups.__onKeyDown}
            onSubmit={this.onGroupSubmit}
          >
            <View style={mainCSS.row}>
              <TextInput
                placeholder='Group title'
                {...fields.groupTitle}
                {...this.propSet2}
                returnKeyType='done'
                keyboardType='default'
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

        {children}

      </PopupMenu>
    )
  }

  // renderCategory = (item, popup) => PopupMenu.renderHighlight({
  renderCategory = (item, popup) => RenderHighlight({
    title: [item.path_str, {highlight: item.title}],
    selected: item.selected
  }, popup)

  onBlur = e => this.popups.__onBlur(e)

  propSet1 = {
    onBlur: this.onBlur,
    style: mainCSS.input,
    keyboardType: 'default',
    returnKeyType: 'done', // next
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

NewTransactionForm.contextTypes = {
  popup: React.PropTypes.object
};


export default FormWrapper([
  {
    submit: 'onTransactionSubmit',
    fields: [
      // { fn: fieldName, type: [text(default), checkbox, picker], vd: validator, init: initialValue, af: autoFocus, pp: postProcessing }
      { fn: 'title', vd: 'required', af: true, pp: removeSpecial },
      { fn: 'category', vd: 'required', pp: slugifyCategory },
      { fn: 'amount', vd: 'required' },
      { fn: 'cost', vd: 'isDecimal' }
    ]
  }, {
    submit: 'onGroupSubmit',
    fields: { fn: 'groupTitle', vd: 'required', pp: removeSpecial }
  }
])(connect(null, { addTransactions })(NewTransactionForm))

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
