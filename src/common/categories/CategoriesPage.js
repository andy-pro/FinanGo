import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js';

import { View, Text, ScrollView, Alert, Icon } from '../__components';

import { splitOnce, getCategoryByPath } from '../__lib/utils'

import CategoryMenu from './menu'

import { mainCSS, categoriesCSS as styles } from '../__themes'
import __config from '../config'

// const ROOT_PATH = 'categories'

class Categories extends Component {

  state = {
    // records: null,
    path: '',
    // category: {},
    entry: {},
    showMenu: false,
  }

  componentWillMount() {
    if (!this.state.records) {
      this.state.records = this.composeAndScan(this.props)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let u = nextProps.user != this.props.user
    // if (u && !this.state.records) {
    if (u) {
      nextState.records = this.composeAndScan(nextProps)      
    }
  }

  composeAndScan = ({ user }) => {
    console.log('lets scan', Boolean(user));
    if (!user) return false

    let exist

    let scan = (flags, list) => {
      list.forEach((item, i) => {
        if (item.sub) {
          // let len = Object.keys(item.sub).length
          let len = item.sub.length
          if (len) {
            let sub = {}
            // console.log('flags', flags);
            if (flags[i]) {
              let flag = flags[i]
              
              sub = flag.sub
              if (len > flag.len) {
                flag.len = len
                flag.shown = true
              }
            } else {
              flags[i] = { shown: exist, title: item.title, sub, len }
            }
            
            /*
            console.log(i);
            console.log('flag = ', JSON.stringify(flags[i]));
            console.log('item = ', JSON.stringify(item));
            console.log('flag.len', flags[i].len);
            console.log('item.sub.len', len);
            console.log('------------------');
            */

            // _scan(sub, list.sub)
            scan(sub, item.sub)
          }
        }
      })
    }

    let getBlob = rootPath => {
      let r = this.state.records
      r = r && r[rootPath]
      exist = Boolean(r && r.shown)
      let shown = exist ? r.shown : {},
          list = [user[rootPath]]
      scan(shown, list)
      
      console.log('list', list);
      console.log('shown', shown);
      
      // sub = scan(sub)
      return {
        rootPath,
        shown,
        list,
      }
    }

    let q = {
      // shops: getBlob('shops'),
      // amountTypes: getBlob('amountTypes'),
      categories: getBlob('categories'),
    }
    // console.log('flags = ', JSON.stringify(q.shops.shown));
    // console.log('list = ', JSON.stringify(q.shops.list));
    return q
  }

  shouldComponentUpdate(nextProps, nextState) {

    // let hideMenu =  nextProps.categories !== this.props.categories ||
    let hideMenu =  nextProps.mapView !== this.props.mapView ||
                    nextProps.user !== this.props.user
    // console.log('scu6', categoriesChanged);
    if (hideMenu) {
      // nextState = this.init()
      // this.state = this.init()
      nextState.showMenu = false
      nextState.entry = {}
      nextState.path = ''
      return true
    }
    return  nextState.showMenu !== this.state.showMenu ||
            nextState.entry !== this.state.entry ||
            nextState.records !== this.state.records
            // categoriesChanged
  }

  onClickList = ({list, path, rootPath}) => {

    let showMenu = Boolean(path);


    // if (showMenu !== this.state.showMenu || path != this.state.category.path) {
    if (showMenu !== this.state.showMenu || path != this.state.path) {
      let r = path ? getCategoryByPath(list, path).entry : {}
      
      // console.log('onClickList', path, r);
      
      let [ parentPath, index ] = splitOnce(path, '.', true)
      let entry = {
        list,
        title: r.title || '',
        color: r.color || '',
        rootPath,
        path,
        parentPath,
        index,
        isChild: Boolean(path && path !== rootPath)
      }
      // console.log('click list:', JSON.stringify(category));
      this.setState({
        path,
        entry,
        showMenu,
      })
    }
  }

  onSectionPress = (e, {list, path, root}) => {
    e.stopPropagation()
    let { entry, index, parent } = getCategoryByPath(list, path)
    // let { entry, index, parent } = getCategoryByPath(this.props.user, path)
    // console.log('section press', entry, 'parent:', parent);
    entry.shown = !entry.shown
    parent[index] = { ...entry }
    this.setState({
      records: { ...this.state.records }
    })
  }

  render() {
    if (!this.props.user) return null

    const createList = ({ rootPath, shown, list }) => {
      
      // let { rootPath } = list

      // console.log('rootPath', list, rootPath);

      const createItem = (data, _shown, _path, clr) => {
        // console.log('data', data, _shown);
        return (
          <View style={styles.sub}>

            {data.map((item, i) => {
              try {
                if (clr) {
                  clr = chroma(clr).brighten(0.2).hex()
                }
              } catch (e) {
                clr = null
              }
              let backgroundColor =  item.color ? item.color : clr ? clr : null
              let _style = { backgroundColor },
                  icolor = '#555'
              if (!backgroundColor) {
                icolor = 'white'
                _style = {
                  backgroundColor: '#999',
                  color: icolor
                }
              }

              let path = _path ? (_path + '.' + i) : rootPath,
                  sub = Boolean(item.sub && item.sub.length),
                  __shown, displ, iname
              if (sub) {
                __shown = _shown[i]
                displ = __shown.shown
                iname = displ ? 'remove' : 'add'
              }
              return (
                <View
                  key={i}
                  style={mapView ? styles.row : styles.list}
                >
                  <View style={styles.row}>
                    <Text style={[ styles.item, _style ]}
                      onPress={this.onClickList.bind(this, {list, path, rootPath})}
                    >
                      {sub &&
                        <Icon.Button name={`ios-${iname}-circle-outline`}
                          size={16}
                          backgroundColor='transparent'
                          color={icolor}
                          onPress={(e) => this.onSectionPress(e, {list: shown, path, rootPath})}
                        />
                      }
                      {item.title}
                    </Text>
                  </View>

                  { (sub && displ ) ? createItem(item.sub, __shown.sub, path + '.sub', item.color || clr) : null }

                </View>
              )
            })}
          </View>
        )
      }
      // let listName = listTitle, //.toLowerCase(),
          // list = this.props[listName]
      // console.log('list', list);
      return createItem(list, shown)
      // return createItem(list, rootPath)
    }
    

    // console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);
    let { user, mapView } = this.props
    let showMenu = __config.isNative ? this.state.showMenu : true
    console.log('categories page render', this.state.records);

    return (
      <View style={mainCSS.root}>
        {showMenu &&
          <View style={mainCSS.divider}>
            <CategoryMenu
              entry={this.state.entry}
              enable={this.state.showMenu}
            />
          </View>
        }
        <ScrollView style={styles.container}>
          <ScrollView horizontal={mapView}>
            {/*{createList(this.state.records.shops)}*/}
            {/*{createList(this.state.records.amountTypes)}*/}
            {createList(this.state.records.categories)}
          </ScrollView>
        </ScrollView>
      </View>
    )
  }


}
export default connect(
  ({app, user}) => ({
    // amountTypes: user.amountTypes,
    // shops: user.shops,
    user,
    // categories,
    mapView: app.categoryMapView,
  })
)(Categories)
