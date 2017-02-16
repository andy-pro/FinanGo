import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js';

import { View, Text, ScrollView, Alert } from '../__components';

import { splitOnce, getCategoryByPath } from '../__lib/utils'

import CategoryMenu from './menu'

import { mainStyles, categories as styles } from '../__themes'
// import { mainStyles } from '../__themes'

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

  onClickList = (path) => {

    let show = Boolean(path);

    // console.log('cat path:', path);

    if (show !== this.state.showMenu || path != this.category.path) {
      let category = path ? getCategoryByPath(this.props.categories, path) : {}
      let [ parentPath, index ] = splitOnce(path, '.', true)
      this.category = {
        categories: this.props.categories,
        title: category.title,
        color: category.color,
        path,
        parentPath,
        index,
        isChild: Boolean(path && path !== ROOT_PATH)
      }
      // console.log('click list:', this.category);
      this.setState({showMenu: show})
    }
  }


  render() {
    // console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);

    let {categories, mapv} = this.props

    createList = (data, _path, clr) => {
      return (
        <View style={styles.sub}>
          {data.map((item, i) => {
            let path = _path + '.' + i

            try {
              if (clr) {
                clr = chroma(clr).brighten(0.2).hex()
              }
            } catch (e) {
              clr = null
            }
            let backgroundColor =  item.color ? item.color : clr ? clr : null
            let _style = { backgroundColor }
            if (!backgroundColor) {
              _style = {
                backgroundColor: '#777',
                color: 'white'
              }
            }
            return (
              <View
                key={item.slug}
                style={mapv ? styles.row : styles.list}
              >

              <View style={styles.row}>
                <Text
                  style={[ styles.item, _style ]}
                  onPress={this.onClickList.bind(this, path)}
                >
                  {item.title}
                </Text>
              </View>

              { item.sub && item.sub.length && createList(item.sub, path + '.sub', item.color || clr) }

              </View>
            )
          })}
        </View>
      )
    }

    return (
      <View style={mainStyles.root}>

        <CategoryMenu
          category={this.category}
          enable={this.state.showMenu}
        />
        <View style={mainStyles.divider}></View>
        <ScrollView style={styles.container}>
          <ScrollView horizontal={mapv}>
            <View>
              <Text
                onPress={this.onClickList.bind(this, ROOT_PATH)}
                style={styles.header}
              >
                Categories
              </Text>
              {categories && createList(categories, ROOT_PATH)}
            </View>
          </ScrollView>
        </ScrollView>

      </View>
    )
  }


}
export default connect(
  ({app, categories}) => ({
    categories,
    mapv: app.categoryMapView,
  })
)(Categories)
