import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTransactions } from '../transactions/actions'
import { getCategories } from '../categories/actions'
import { importData } from './actions'
import { Form, View, Text, TextInput, FileInput, Icon, Picker, FormWrapper } from '../__components';
import { removeSpecial, getValue } from '../__lib/utils'

import { colors, mainCSS } from '../__themes'

class BackupPage extends Component {

  componentDidMount() {
    this.props.fields.__setState(this.init())
  }

  init = date => ({
    exportName: this.getExportName({ date })
  })

  getExportName = ({ state=this.props.fields.__state, date=this.props.date }) => {
    let { source, period } = state
    const dt = source === 'transactions' ? this.transformDate(period, date) : {}
    dt.month = dt.month === undefined ? '' : `-${+dt.month + 1}`
    dt.year = dt.year === undefined ? '' : `-${dt.year}`
    // return `finango-${source}${dt.month}${dt.year}.json`
    return `${source}${dt.month}${dt.year}`
  }

  transformDate = (period, date) => {
    let dt = { ...date } // copy of date
    switch (period) {
      case 'year':
        delete dt.month
        break;
      case 'whole':
        dt = {$all: true}
    }
    return dt
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { date, fields } = nextProps
    // console.log('backup page update', fields.__name, JSON.stringify(fields.__state));
    // console.log('backup page update', fields.importName, fields.__refs);
    if (fields !== this.props.fields) {
      let { __name, __state } = fields
      if (__name === 'source' || __name ==='period') {
        this.props.fields.__setState({
          exportName: this.getExportName({ state: __state })
        })
        return false
      }
    }
    if (date !== this.props.date) {
      this.props.fields.__setState(this.init(date))
      return false
    }
    return true
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  onExportSubmit = e => {
    let opts = this.props.fields.__submits.onExportSubmit(e)
    if (this.props.disabled || !opts) return
    if (opts.source === 'transactions') {
      let date = this.transformDate(opts.period, this.props.date)
      opts.period = date
      // opts.source = 'transactions'
      this.props.getTransactions({ date }, opts)
    } else {
      // opts.source = 'categories'
      this.props.getCategories(opts)
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  onImportSubmit = e => {
    let importForm = this.props.fields.__submits.onImportSubmit(e)
    if (this.props.disabled || !importForm) return
    this.props.importData(importForm)
    this.props.fields.__setState({ importName: '' })
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  render() {
    let { fields, messages: T, disabled } = this.props
    let color = disabled ? colors.disabled : colors.header
    let { importName, mode, source, period, exportName } = fields
    // console.log('render backup form');
    return (
      <View>

          <Form
            style={mainCSS.form}
            onSubmit={this.onImportSubmit}
          >
            <View style={mainCSS.row}>
              <FileInput
                placeholder='Select file'
                {...importName}
                style={mainCSS.input}
                fields={fields}
              />
            </View>

            <View style={mainCSS.row}>
              <Picker
                { ...mode }
                style={[mainCSS.picker, {marginRight: 10}]}
                enabled={Boolean(importName.value)}
              >
                <Picker.Item label={T["replace.mode"]} value="replace" />
                <Picker.Item label={T["merge.mode"]} value="merge" />
              </Picker>
              <Icon.Button
                name='md-cloud-download'
                backgroundColor={importName.value ? color : colors.disabled}
                onPress={this.onImportSubmit}
              >
                {T['import']}
              </Icon.Button>
            </View>
          </Form>

        <View style={mainCSS.divider} />

          <Form
            style={mainCSS.form}
            onSubmit={this.onExportSubmit}
          >
            <View style={mainCSS.row}>
              <Picker
                { ...source }
                style={[mainCSS.picker, {marginRight: 10}]}
              >
                <Picker.Item label={T["transactions"]} value="transactions" />
                <Picker.Item label={T["categories"]} value="categories" />
              </Picker>
              <Picker
                { ...period }
                style={mainCSS.picker}
                enabled={source.selectedValue === 'transactions'}
              >
                <Picker.Item label={T["cur.month"]} value="month" />
                <Picker.Item label={T["cur.year"]} value="year" />
                <Picker.Item label={T["whole.db"]} value="whole" />
              </Picker>
            </View>

            <View style={mainCSS.row}>
              <TextInput
                style={[mainCSS.input, {marginRight: 10}]}
                placeholder='Type a filename'
                { ...exportName }
                keyboardType='default'
              />
              <Icon.Button
                name='md-cloud-upload'
                backgroundColor={exportName.value ? color : colors.disabled}
                onPress={this.onExportSubmit}
              >
                {T['export']}
              </Icon.Button>
            </View>
          </Form>

        <View style={mainCSS.divider} />

      </View>

    )
  }

}

export default FormWrapper([
  {
    submit: 'onImportSubmit',
    fields: [
      { fn: 'importName', type: 'file', vd: 'required' },
      { fn: 'mode', type: 'picker', init: 'replace' },
    ]
  }, {
    submit: 'onExportSubmit',
    fields: [
      { fn: 'source', type: 'picker', init: 'transactions' },
      { fn: 'period', type: 'picker', init: 'month' },
      { fn: 'exportName', vd: 'required', pp: removeSpecial },
    ]
  }
])(connect(
  ({ app }) => ({
    messages: app.messages,
    date: app.date,
    disabled: app.fetching,
  }),
  { getTransactions, getCategories, importData }
)(BackupPage))
