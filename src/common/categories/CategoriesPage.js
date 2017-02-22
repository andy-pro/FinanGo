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

  constructor(props) {
    super(props);
    this.state = this.init()
  }

  init = () => ({
    category: {},
    showMenu: false,
  })

  // componentWillReceiveProps(nextProps) {
    // this.setState(this.init())
  // }

  shouldComponentUpdate(nextProps, nextState) {
    let hideMenu =  nextProps.categories !== this.props.categories ||
                    nextProps.mapView !== this.props.mapView
    // console.log('scu6', categoriesChanged);
    if (hideMenu) {
      // nextState = this.init()
      // this.state = this.init()
      nextState.showMenu = false
      nextState.category = {}
      return true
    }
    return  nextState.showMenu !== this.state.showMenu ||
            nextState.category !== this.state.category
            // categoriesChanged
  }

  // state = this.init()

  onClickList = (path) => {

    let showMenu = Boolean(path);

    // console.log('cat path:', path);

    if (showMenu !== this.state.showMenu || path != this.state.category.path) {
      let _category = path ? getCategoryByPath(this.props.categories, path) : {}
      let [ parentPath, index ] = splitOnce(path, '.', true)
      let category = {
        categories: this.props.categories,
        title: _category.title || '',
        color: _category.color || '',
        path,
        parentPath,
        index,
        isChild: Boolean(path && path !== ROOT_PATH)
      }
      // console.log('click list:', this.category);
      this.setState({
        category,
        showMenu,
      })
    }
  }


  render() {
    // console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);
    let {categories, mapView, isNative} = this.props
    let showMenu = isNative ? this.state.showMenu : true
    // console.log('categories page render', categories);

    const createList = (data, _path, clr) => {
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
            // console.log('cate', item.slug);
            let sub = item.sub && item.sub.length
            return (
              <View
                key={item.slug}
                style={mapView ? styles.row : styles.list}
              >

                <View style={styles.row}>
                  <Text
                    style={[ styles.item, _style ]}
                    onPress={this.onClickList.bind(this, path)}
                  >
                    {item.title}
                  </Text>
                </View>

                { sub ? createList(item.sub, path + '.sub', item.color || clr) : null }

              </View>
            )
          })}
        </View>
      )
    }

    return (
      <View style={mainStyles.root}>

        {showMenu &&
          <View style={mainStyles.divider}>
            <CategoryMenu
              category={this.state.category}
              enable={this.state.showMenu}
              isNative={isNative}
            />
          </View>
        }
        <ScrollView style={styles.container}>
          <ScrollView horizontal={mapView}>
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
  ({app, device, categories}) => ({
    categories,
    mapView: app.categoryMapView,
    isNative: device.isReactNative,
  })
)(Categories)
