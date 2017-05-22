import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js'

import { categoryAction } from './actions'
import { removeSpecial, getSlug, findDuplicate, testColor } from '../__lib/utils'
import { Form, View, TextInput, Icon, Checkbox, Alert, FormWrapper } from '../__components';

import { mainCSS, iconBtnCSS, checkboxCSS } from '../__themes'
// import { iconBtn as iconBtnCSS } from '../__themes'

class CategoryMenu extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.entry !== this.props.entry) {
      const { isChild, title, color } = nextProps.entry
      this.props.fields.__setState({
        add: '',
        title: isChild ? title : '',
        color: (isChild && color) ? color : '',
        preserve: false
      })
      setTimeout(this.setFocus)
      return false
    }
    return true
  }

  componentDidMount() { this.setFocus() }

  setFocus = () => {
    if (this.props.enable) this.props.fields.__refs.add.focus()
  }

  onAddSubmit = e => {
    let data = this.props.fields.__submits.onAddSubmit(e)
    if (data) this.onSubmit(data)
  }

  onTitleSubmit = e => {
    let data = this.props.fields.__submits.onTitleSubmit(e)
    if (data) this.onSubmit(data)
  }

  onColorSubmit = e => {
    let data = this.props.fields.__submits.onColorSubmit(e)
    this.onSubmit(data)
  }

  onSubmit = data => {
    let field = Object.keys(data)[0],
        value = data[field]
    const { entry, enable } = this.props;
    let { path, parentPath, isChild } = entry
    if (!enable) return
    if (value === entry[field]) return
    let cmd
    data = {}

    switch (field) {
      case 'add':
        path = path + (isChild ? '.sub' : '')
        parentPath = path
        cmd = 'add'
        // data.color = ?
        // console.log('add', JSON.stringify(entry));
        break
      case 'title':
        if (!isChild) return
        cmd = 'update'
        break
      case 'color':
        if (!isChild) return
        // console.log('colors:', value, entry[field]);
        if (value) {
          value = checkColor(value)
          if (!value) return
        }
        cmd = 'update'
        data.color = value
    }

    if (field === 'add' || field === 'title') {
      let slug = getSlug(value)
      if (findDuplicate(entry.list, slug, parentPath, value)) {
        return Alert.alert('The same entry already exists!')
      }
      data.title = value
      if (entry.rootPath === 'categories') {
        data.slug = slug        
      }
      // console.log('entry', entry);
    }

    this.props.categoryAction({ path, data }, cmd)
  }

  onDelete = e => {
    let data = this.props.fields.__submits.onDelete(e)
    // console.log(JSON.stringify(data));
    let {entry} = this.props
    Alert.alert(
      `Delete entry "${entry.title}"`,
      'Are you shure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.categoryAction(entry, 'del')},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { fields, entry, enable } = this.props;
    const isChild = Boolean(entry.isChild)
    // console.log('category menu render', fields.add);

    return (
        <View style={mainCSS.form}>

          <Form
            style={mainCSS.row}
            onSubmit={this.onAddSubmit}
          >
            <TextInput
              placeholder={isChild ? 'New subentry' : 'New entry'}
              editable={enable}
              { ...fields.add }
              { ...this.propSet0 }
            />
            <Icon.Button
              name='ios-add-circle-outline'
              backgroundColor={enable ? '#18a06a' : '#ddd'}
              onPress={this.onAddSubmit}
              style={iconBtnCSS}
            />
          </Form>

          <Form
            style={mainCSS.row}
            onSubmit={this.onTitleSubmit}
          >
            <TextInput
              placeholder={'Rename'}
              editable={isChild}
              { ...fields.title }
              { ...this.propSet0 }
            />
            <Icon.Button
              name='ios-create-outline'
              backgroundColor={isChild ? '#18a06a' : '#ddd'}
              onPress={this.onTitleSubmit}
              style={iconBtnCSS}
            />
          </Form>

          <Form
            style={mainCSS.row}
            onSubmit={this.onColorSubmit}
          >
            <TextInput
              placeholder={'Color'}
              editable={isChild}
              { ...fields.color }
              { ...this.propSet0 }
            />
            <Icon.Button
              name='ios-color-palette-outline'
              backgroundColor={isChild ? checkColor(fields.color.value, '#ddd') : '#ddd'}
              onPress={this.onColorSubmit}
              style={iconBtnCSS}
            />
          </Form>

          <View style={mainCSS.between}>
            <Checkbox
              label='Preserve references'
              disabled={!isChild}
              { ...fields.preserve }
            />
            <Icon.Button
              name='ios-remove-circle-outline'
              backgroundColor={isChild ? '#d66' : '#ddd'}
              onPress={isChild ? this.onDelete : null}
              style={iconBtnCSS}
            />
          </View>

        </View>

    )
  }

  propSet0 = {
    // onBlur: this.onBlur,
    // required: true,
    style: [mainCSS.input, {marginRight: 10}],
    keyboardType: 'default',
    returnKeyType: 'done',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

}

export default FormWrapper([
  { submit: 'onAddSubmit', fields: { fn: 'add', vd: 'required', pp: removeSpecial } },
  { submit: 'onTitleSubmit', fields: { fn: 'title', vd: 'required', pp: removeSpecial } },
  { submit: 'onColorSubmit', fields: { fn: 'color' } },
  { submit: 'onDelete', fields: { fn: 'preserve', type: 'checkbox', init: false } },
])(connect(null, { categoryAction })(CategoryMenu))

// const previewColor = (v, defv) =>
//   testColor(v) ? '#'+ v : defv

const checkColor = (v, defv) => {
  try {
    v = chroma(v).name()
    return v
  } catch (e) {
    if (defv) {
      return defv
    } else {
      Alert.alert('Unknown color')
      return false
    }
  }
}
