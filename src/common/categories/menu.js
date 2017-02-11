import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js'
import { addCategory, updateCategory, delCategory } from './actions'
import { removeSpecial, getSlug, findDuplicate, testColor } from '../__lib/utils'
import { Form, View, Text, TextInput, StyleSheet, Icon, Checkbox, Alert } from '../__components';
import { defaultTheme as theme } from '../__themes'

const styles = StyleSheet.create(theme.transactionForm);

// import { getElementSize } from '../lib/utils'

// let $newItem, $newTitle, $preserve;

class CategoryMenu extends Component {

  state = {
    add: '',
    title: '',
    color: '',
    preserve: false
  }

  //
  // componentDidMount() {
  //   console.log('menu did mount!');
  //   // this.setupMenu()
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('menu did update!');
  //   // this.setupMenu()
  // }
  //
  // componentWillMount() {
  //   console.log('menu will mount!', this.refs);
  //
  // }
  //
  //

  componentWillUpdate(nextProps, nextState) {
    // console.log('menu will update!', this.refs, this.props, nextProps, this.props === nextProps);
    // this.style = setMenuPos(this.refs.menu, this.props.category)
    const { isChild, title, color } = nextProps.category
    this.state.add = ''
    this.state.title = isChild ? title : ''
    this.state.color = (isChild && color) ? color : ''
    this.state.preserve = false
    // console.log('click', this.state);
  }

  onChange = (query, field) => {
    if (typeof query === 'object')
      query = field === 'preserve' ? query.target.checked : query.target.value
    this.setState({ [field]: query })
  }

  onSubmit = (e, field, required=true) => {
    e.preventDefault()
    let value = this.state[field].trim()
    if (required && (!value || value === this.props.category[field])) {
      return
    }
    const { category } = this.props
    let action, parentPath, path, data = {}

    switch (field) {
      case 'add':
        path = category.path + (category.isChild ? '.sub' : '')
        parentPath = path
        action = this.props.addCategory
        // data.color = ?
        // console.log('add', JSON.stringify(category));
        break
      case 'title':
        path = category.path
        parentPath = category.parentPath
        action = this.props.updateCategory
        break
      case 'color':
        path = category.path
        // if (testColor(value)) {
        //   value = '#' + value
        // }
        try {
          value = chroma(value).name()
        } catch (e) {
          return Alert.alert('Unknown color')
        } finally {

        }
        action = this.props.updateCategory
        data.color = value
    }

    if (field === 'add' || field === 'title') {
      let _value = removeSpecial(value)
      if (value !== _value) {
        return Alert.alert('Unacceptable symbols /\\|?&<>')
      }
      let slug = getSlug(value)
      if (findDuplicate(category.categories, slug, parentPath)) {
        return Alert.alert('The same category already exists!')
      }
      data.title = value
      data.slug = slug
    }

    action({
      path,
      data
    })
  }


  onDelete = () => {
    this.props.delCategory(this.props.category)
  }

  render() {
    const { category, enable } = this.props;
    const { isChild } = category
    console.log('menu render', category, this.state);

    return (
        <View>

          <Form
            style={styles.formRow}
            onSubmit={e => this.onSubmit(e, 'add')}
          >
            <TextInput
              required
              placeholder={isChild ? 'New subcategory' : 'New category'}
              disabled={!enable}
              value={this.state.add}
              onChangeText={e => this.onChange(e, 'add')}
              style={[styles.input, {marginRight: 10}]}
              { ...this.propSet0 }
            />
            <Icon.Button
              name='android-add-circle'
              backgroundColor={enable ? '#18a06a' : '#ddd'}
            />
          </Form>

          <Form
            style={styles.formRow}
            onSubmit={e => this.onSubmit(e, 'title')}
          >
            <TextInput
              required
              placeholder={'Rename'}
              disabled={!isChild}
              value={this.state.title}
              onChangeText={e => this.onChange(e, 'title')}
              style={[styles.input, {marginRight: 10}]}
              { ...this.propSet0 }
            />
            <Icon.Button
              name='android-create'
              backgroundColor={isChild ? '#18a06a' : '#ddd'}
            />
          </Form>

          <View style={styles.formRow}>
            <Checkbox
              label='Preserve references'
              disabled={!isChild}
              checked={this.state.preserve}
              onPress={e => this.onChange(e, 'preserve')}
              style={styles.checkbox}
            />
            <Icon.Button
              name='android-remove-circle'
              backgroundColor={isChild ? '#d66' : '#ddd'}
              onPress={this.onDelete}
            />
          </View>

          <Form
            style={styles.formRow}
            onSubmit={e => this.onSubmit(e, 'color', false)}
          >
            <TextInput
              placeholder={'Color'}
              disabled={!isChild}
              value={this.state.color}
              onChangeText={e => this.onChange(e, 'color')}
              style={[styles.input, {
                marginRight: 10,
                backgroundColor: previewColor(this.state.color)
              }]}
              { ...this.propSet0 }
            />
            <Icon.Button
              name='android-color-palette'
              backgroundColor={isChild ? '#c6c' : '#ddd'}
            />
          </Form>

        </View>

    )
  }

  propSet0 = {
    // onBlur: this.onBlur,
    // required: true,
    // style: [styles.input, {marginRight: 10}],
    keyboardType: 'default',
    returnKeyType: 'next',
    autoCapitalize: 'sentences',
    autoCorrect: true
  }

}

export default connect(
  null,
  { addCategory, updateCategory, delCategory }
)(CategoryMenu);


const previewColor = v =>
  testColor(v) ? '#'+ v : v
