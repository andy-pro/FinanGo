import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js';

import { View, Text, StyleSheet } from '../__components';
import { defaultTheme as theme } from '../__themes'

import { splitOnce, getCategoryByPath } from '../__lib/utils'

import CategoryMenu from './menu'

const styles = StyleSheet.create(theme.categories);

const ROOT_PATH = 'categories'

class Categories extends Component {

  init = () => {
    this.category = {}
    return { showMenu: false }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.init())
  }

  state = this.init()

  onClickList = (event) => {
    let titleEl = event.target,
        path = titleEl.dataset.path || '',
        show = Boolean(path);

    // console.log('colors', chroma.colors);

    if (show !== this.state.showMenu || path != this.category.path) {
      let category = path ? getCategoryByPath(this.props.categories, path) : {}
      let [ parentPath, index ] = splitOnce(path, '.', true)
      this.category = {
        categories: this.props.categories,
        // rootEl: this.refs.rootEl,
        // titleEl,
        // title: titleEl.textContent,
        title: category.title,
        color: category.color,
        path,
        // parentPath: path.replace(/\.\d+$/, ''),
        parentPath,
        index,
        isChild: Boolean(path && path !== ROOT_PATH)
      }
      console.log('click list:', this.category);
      this.setState({showMenu: show})
    }
  }


  render() {
    console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);

    let categories = this.props.categories

    return (
      <View style={styles.container}>

        <CategoryMenu
          category={this.category}
          enable={this.state.showMenu}
        />

        <View
          style={styles.list}
          onPress={this.onClickList}
        >
          <View
            data-path={ROOT_PATH}
            style={styles.header}
          >
            Categories
          </View>
          {categories && createList(categories, ROOT_PATH)}
        </View>

      </View>
    )
  }

}

export default connect(
  ({ categories }) => ({ categories })
)(Categories)


const createList = (data, _path, clr) => {
  return (
    <View style={{marginLeft: 20}}>
      {data.map((item, i) => {
        let path = _path + '.' + i

        try {
          if (clr) {
            clr = chroma(clr).brighten(0.1).hex()
          }
        } catch (e) {

        } finally {

        }

        return (
          <View key={item.slug}>
            <Text data-path={path}
              style={[
                styles.item,
                {backgroundColor: item.color ? item.color : clr ? clr : null}
              ]}
            >
              {item.title}
            </Text>
            {(item.sub && item.sub.length) ? createList(item.sub, path + '.sub', item.color || clr) : ''}
          </View>
        )
      })}
    </View>
  )
}
