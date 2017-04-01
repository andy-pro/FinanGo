// @flow
import React from 'react';
import { connect } from 'react-redux';
// import shortid from 'shortid'
import shortid from 'js-shortid'

import { addTransactions } from './actions'
import { Form, View, TextInput, Icon } from '../__components';
import formWrapper from '../__components/formWrapper';
import { getSuggestions, getAmountTypes, getShops } from './utils'
import { removeSpecial, slugifyCategory } from '../__lib/utils'

import config from '../config'
import { colors, mainCSS } from '../__themes'

class NewTransactionForm extends React.Component {

  // props.pattern: /single, /group, /income

  componentWillMount() {

    const { isNative } = this.props
    // const isNative = navigator && navigator.product === 'ReactNative'
    // console.log('new trans page constructor', props.fields);

    this.popups = {
      title: {
        // pos: {top: isNative ? 42 : 36, maxHeight: isNative ? 202 : 286},
        pos: {maxHeight: isNative ? 202 : 286},
        getSuggestions: query => getSuggestions(this.props.categories, query, 1),
        renderSuggestion: this.renderCategory,
        onSelect: suggestion => {
          this.props.fields.$setMany({
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
        renderSuggestion: this.context.popup.renderSimple,
        onSelect: suggestion => {
          this.props.fields.amount.onChangeText(this.props.fields.__query.split(' ')[0] + ' ' + suggestion.title)
          this.props.fields.__refs.cost.focus()
        }
      },
      groupTitle: {
        pos: isNative ? {maxHeight: 146} : {},
        getSuggestions: getShops,
        renderSuggestion: this.context.popup.renderHighlight,
        onSelect: suggestion => {
          this.props.fields.groupTitle.onChangeText(suggestion.title)
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

  componentWillReceiveProps(nextProps) {
    let { fields } = nextProps
    if (fields !== this.props.fields) {
      this.fieldChanged(fields)
    }
  }

  fieldChanged = fields => {
    let { __query, __name } = fields,
        popup = this.popups[__name]
    if (popup) {
      popup.element = fields.__element
      popup.query = __query
      this.context.popup.triggerAutosuggestMenu(popup)
    }
  }

  onTransactionSubmit = e => {
    let transaction = this.props.fields.__submits.onTransactionSubmit(e)
    if (transaction) {
      if (this.groupId) transaction.groupId = this.groupId
      this.addTransaction(transaction)
      this.props.fields.$reset(0)
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
      this.props.fields.$reset(1)
      this.initGroup()
    }
  }

  addTransaction = (transaction) => {
    transaction.date = new Date().toISOString()
    if (!config.locally) transaction.userId = this.props.user.id
    this.props.addTransactions(transaction)
  }

  render() {
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;');
    // console.log('%cNew transaction page render!!!', 'color:#a00;font-weight:bold;', this.props.transactions.length);
    // console.log('!!! Form for new transactions !!!');
    let { fields } = this.props
    return (
      <View>
        <Form
          style={mainCSS.form}
          onKeyDown={this.context.popup.onKeyDown}
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
            onKeyDown={this.context.popup.onKeyDown}
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

      </View>
    )
  }

  renderCategory = (item, popup) => this.context.popup.renderHighlight({
    title: [item.path_str, {highlight: item.title}],
    selected: item.selected
  }, popup)

  onBlur = e => this.context.popup.onTargetBlur(e)

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

NewTransactionForm.contextTypes = {
  popup: React.PropTypes.object
};


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
