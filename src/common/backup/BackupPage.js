import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTransactions, addTransactions } from '../transactions/actions'
import { getCategories, categoryAction } from '../categories/actions'
import { appError, importData } from '../app/actions'
import { Form, View, Text, TextInput, Alert, Icon, Picker } from '../__components';
import { removeSpecial, getValue } from '../__lib/utils'

import { colors, mainCSS } from '../__themes'

import config from '../config'



// temporary
import {getTimeId} from '../__lib/dateUtils.js'
import shortid from 'shortid'
import uuid from 'uuid';

class BackupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: 'trns',
      period: 'month',
      mode: 'replace',
    }
    Object.assign(this.state, this.init())
  }

  init = date => {
    if (this.importField) this.importField.value = ''
    return {
      exportName: this.exportName({ source: this.state.source, date }),
      importName: '',
    }
  }

  exportName = ({ source=this.state.source, date=this.props.date, period=this.state.period }) => {
    const dt = source === 'trns' ? this.transformDate(date, period) : {}
    dt.month = dt.month === undefined ? '' : `-${+dt.month + 1}`
    dt.year = dt.year === undefined ? '' : `-${dt.year}`
    return `finango-${source}${dt.month}${dt.year}.json`
  }

  transformDate = (date, period) => {
    let dt = { ...date }
    switch (period) {
      case 'year':
        delete dt.month
        break;
      case 'whole':
        dt = {$all: true}
    }
    return dt
  }

  componentWillReceiveProps(nextProps) {
    let { date } = nextProps
    if (date !== this.props.date) {
      this.setState(this.init(date))
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  onChange = (query, field) => {
    query = getValue(query)
    let state = { [field]: query }
    if (field === 'source' || field ==='period')
      state.exportName = this.exportName(state)
      // console.log('onChange', state);
    this.setState(state)
  }

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  onExportSubmit = e => {
    e.preventDefault()
    let { exportName, source } = this.state
    exportName = removeSpecial(exportName)
    if (this.props.disabled || !exportName) return
    let opts = { exportName }
    if (source === 'trns') {
      let date = this.transformDate(this.props.date, this.state.period)
      opts.period = date
      opts.source = 'transactions'
      this.props.getTransactions({ date }, opts)
    } else {
      opts.source = 'categories'
      this.props.getCategories(opts)
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  importChange = e => {
    let { target } = e,
        { files } = target,
        importName = (files && files[0]) ? files[0] : ''
    this.importField = target
    this.setState({ importName })
  }

  onImportSubmit = e => {
    e.preventDefault()
    let { importField } = this
    let { importName } = this.state
    if (importField && importName) {
      // в 'onLoadImport' должны вернуться данные из файла 'importName'
      this.props.importData(importName, this.onLoadImport)
      importField.value = ''
      this.setState({ importName: '' })
    }
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // appError, addTransactions, categoryAction вызываются без dispatch,
  // т.к. onLoadImport вызывается из redux-observable
  /* is acceptor of data from file */
  onLoadImport = data => {
    // console.log('import data', data, config);
    // data check
    if (data) {
      let { appName, type, payload } = data
      if (appName === config.appName) {

        let notify = { header: 'import.' + type, message: 'success' },
            opts = { notify }

        if (type === 'transactions') {
          if (!config.locally) {
            let { userId } = config
            payload.forEach(item => item.userId = userId)
          }
          // TODO : replace mode
          return addTransactions(payload, opts)
        }

        if (type === 'categories') {

          // TODO : merge mode
          return categoryAction(payload, 'replace', opts)
        }

      }
    }
    return appError('Invalid file')
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  render() {
    let { messages: T, disabled } = this.props
    let color = disabled ? colors.disabled : colors.header
    let { source, period, mode, exportName, importName } = this.state

    return (
      <View>

        <Form
          style={mainCSS.form}
          onSubmit={this.onExportSubmit}
        >
          <View style={mainCSS.row}>
            <Picker
              selectedValue={source}
              onValueChange={e => this.onChange(e, 'source')}
              style={[mainCSS.input, {marginRight: 10}]}
            >
              <Picker.Item label={T["transactions"]} value="trns" />
              <Picker.Item label={T["categories"]} value="ctgs" />
            </Picker>
            <Picker
              selectedValue={period}
              onValueChange={e => this.onChange(e, 'period')}
              style={mainCSS.input}
              enabled={source === 'trns'}
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
              value={exportName}
              onChangeText={e => this.onChange(e, 'exportName')}
              keyboardType='default'
            />
            <Icon.Button
              name='md-cloud-upload'
              backgroundColor={color}
              onPress={this.onExportSubmit}
            >
              {' '}Export
            </Icon.Button>
          </View>
        </Form>

        <View style={[mainCSS.divider, {marginBottom: 10}]} />

        <Form
          style={mainCSS.form}
          onSubmit={this.onImportSubmit}
        >
          <View style={mainCSS.row}>
            <TextInput
              type='file'
              style={mainCSS.input}
              onChangeText={this.importChange}
            />
          </View>

          <View style={mainCSS.row}>
            <Picker
              selectedValue={mode}
              onValueChange={e => this.onChange(e, 'mode')}
              style={[mainCSS.input, {marginRight: 10}]}
              enabled={Boolean(importName)}
            >
              <Picker.Item label={T["replace.mode"]} value="replace" />
              <Picker.Item label={T["merge.mode"]} value="merge" />
            </Picker>
            <Icon.Button
              name='md-cloud-download'
              backgroundColor={importName ? color : colors.disabled}
              onPress={this.onImportSubmit}
            >
              {' '}Import
            </Icon.Button>
          </View>
        </Form>



        <Icon.Button
          name='md-cloud-download'
          backgroundColor={color}
          onPress={

() => {

  let id

  let start = performance.now()

  for (var i = 0; i < 100; i++) {
    // id = getTimeId().pid
    // id = shortid.generate()
    id = uuid.v4()

    // console.log(id);
  }

  console.log('duration:', performance.now() - start);


}






          }
        >
          {' '}Test UUID
        </Icon.Button>



      </View>

    )
  }

}

export default connect(
  ({ app }) => ({
    messages: app.messages,
    date: app.date,
    disabled: app.fetching,
  }),
  { getTransactions, getCategories, importData }
)(BackupPage)
