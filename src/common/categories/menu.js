import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js'
import { addCategory, updateCategory, delCategory } from './actions'
import { removeSpecial, getSlug, findDuplicate, testColor } from '../__lib/utils'
import { Form, View, TextInput, Icon, Checkbox, Alert } from '../__components';

import { mainStyles, iconBtn as iconBtnStyle } from '../__themes'
// import { iconBtn as iconBtnStyle } from '../__themes'

class CategoryMenu extends Component {

  constructor(props) {
    super(props);
    let { category } = props
    this.state = {
      add: '',
      title: category.title || '',
      color: category.color || '',
      preserve: false
    }
    this.fields = { add: {} }
    let refName = props.isNative ? 'ref' : '$ref'
    this.refhack = {
      add: {[refName]: c => this.fields.add.ref = c},
    }
  }

  componentWillReceiveProps(nextProps) {
  // componentWillUpdate(nextProps, nextState) {
    // console.log('menu will update!', this.fields);
    // if (!nextProps.enable) nextProps.category = {}
    const { isChild, title, color } = nextProps.category
    this.state.add = ''
    this.state.title = isChild ? title : ''
    this.state.color = (isChild && color) ? color : ''
    this.state.preserve = false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) this.setFocus()
  }

  componentDidMount() {
    this.setFocus()
  }

  setFocus = () => {
    if (this.props.enable) this.fields.add.ref.focus()
  }

  onChange = (query, field) => {
    if (typeof query === 'object')
      query = query.target.value
    this.setState({ [field]: query })
  }

  onAddSubmit   = e => this.onSubmit(e, 'add')
  onTitleSubmit = e => this.onSubmit(e, 'title')
  onColorSubmit = e => this.onSubmit(e, 'color', false)

  onSubmit = (e, field, required=true) => {
    e.preventDefault()
    let value = this.state[field].trim()
    const { category, enable } = this.props;
    let { path, parentPath, isChild } = category
    if (!enable) return
    if (value === category[field]) return
    if (required && !value) return
    let action, data = {}

    switch (field) {
      case 'add':
        path = path + (isChild ? '.sub' : '')
        parentPath = path
        action = this.props.addCategory
        // data.color = ?
        // console.log('add', JSON.stringify(category));
        break
      case 'title':
        if (!isChild) return
        action = this.props.updateCategory
        break
      case 'color':
        if (!isChild) return
        // console.log('colors:', value, category[field]);
        if (value) {
          value = checkColor(value)
          if (!value) return
        }
        action = this.props.updateCategory
        data.color = value
    }

    if (field === 'add' || field === 'title') {
      let _value = removeSpecial(value)
      if (value !== _value) {
        return Alert.alert('Error!', 'Unacceptable symbols /|?&<>')
      }
      let slug = getSlug(value)
      if (findDuplicate(category.categories, slug, parentPath)) {
        return Alert.alert('The same category already exists!')
      }
      data.title = value
      data.slug = slug
      /*
      let color = this.state.color
      if (color) {
        color = checkColor(color)
        if (!color) return
        data.color = color
      }
      */
    }

    action({
      path,
      data
    })
  }

  onDelete = () => {
    let {category} = this.props
    Alert.alert(
      `Delete category "${category.title}"`,
      'Are you shure?',
      [
        {text: 'Cancel', null, style: 'cancel'},
        {text: 'OK', onPress: () => this.props.delCategory(category)},
      ],
      { cancelable: false }
    )
  }

  onPreserveChange = () => this.setState({ preserve: !this.state.preserve })

  render() {
    const { category, enable } = this.props;
    const isChild = Boolean(category.isChild)
    // console.log('category menu render', category, this.state);

    return (
        <View style={mainStyles.form}>

          <Form
            style={mainStyles.row}
            onSubmit={this.onAddSubmit}
          >
            <TextInput
              required
              placeholder={isChild ? 'New subcategory' : 'New category'}
              editable={enable}
              value={this.state.add}
              onChangeText={e => this.onChange(e, 'add')}
              {...this.refhack.add}
              { ...this.propSet0 }
            />
            <Icon.Button
              name='ios-add-circle-outline'
              backgroundColor={enable ? '#18a06a' : '#ddd'}
              onPress={this.onAddSubmit}
              style={iconBtnStyle}
            />
          </Form>

          <Form
            style={mainStyles.row}
            onSubmit={this.onTitleSubmit}
          >
            <TextInput
              required
              placeholder={'Rename'}
              editable={isChild}
              value={this.state.title}
              onChangeText={e => this.onChange(e, 'title')}
              { ...this.propSet0 }
            />
            <Icon.Button
              name='ios-create-outline'
              backgroundColor={isChild ? '#18a06a' : '#ddd'}
              onPress={this.onTitleSubmit}
              style={iconBtnStyle}
            />
          </Form>

          <Form
            style={mainStyles.row}
            onSubmit={this.onColorSubmit}
          >
            <TextInput
              placeholder={'Color'}
              editable={isChild}
              value={this.state.color}
              onChangeText={e => this.onChange(e, 'color')}
              { ...this.propSet0 }
            />
            <Icon.Button
              name='ios-color-palette-outline'
              backgroundColor={isChild ? checkColor(this.state.color, '#ddd') : '#ddd'}
              onPress={this.onColorSubmit}
              style={iconBtnStyle}
            />
          </Form>

          <View style={mainStyles.between}>
            <Checkbox
              label='Preserve references'
              disabled={!isChild}
              checked={this.state.preserve}
              onPress={this.onPreserveChange}
              style={mainStyles.checkbox}
            />

            <Icon.Button
              name='ios-remove-circle-outline'
              backgroundColor={isChild ? '#d66' : '#ddd'}
              onPress={isChild ? this.onDelete : null}
              style={iconBtnStyle}
            />
          </View>

        </View>

    )
  }

  propSet0 = {
    // onBlur: this.onBlur,
    // required: true,
    style: [mainStyles.input, {marginRight: 10}],
    keyboardType: 'default',
    returnKeyType: 'done',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

}

export default connect(
  // ({app}) => ({categoryMapView: app.categoryMapView}),
  null,
  { addCategory, updateCategory, delCategory }
)(CategoryMenu);

//
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
