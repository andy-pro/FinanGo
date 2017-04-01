import React from 'react'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import { View, Text, ListView, TouchableHighlight } from './';
import { suggestionsCSS as styles } from '../__themes'

class PopupMenu extends React.Component {

  static childContextTypes = {
    popup: React.PropTypes.object,
  };

  getChildContext() {
    return {
      popup: {
        triggerAutosuggestMenu: this.triggerAutosuggestMenu,
        onKeyDown: this.onKeyDown,
        onTargetBlur: this.onTargetBlur,
        renderSimple: this.renderSimple,
        renderHighlight: this.renderHighlight,
      }
    }
  }

  constructor(props) {
    super(props)
    this._INPUT_OFFSET_ = props.isNative ? 37 : 31
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      showMenu: false,
      suggestions: [],
      selectedIndex: -1,
      popup: {},
    }
  }

  componentWillUnmount() {
    clearTimeout(this.__timeout)
  }

  onTargetBlur = () => {
    if (this.state.showMenu) {
      this.__timeout = setTimeout(() => {
        if (!this.itemWasSelected) this.setState({ showMenu: false })
      })
    }
  }

  triggerAutosuggestMenu = popup => {

    if (this.itemWasSelected) return

    let { query, element, pos, getSuggestions } = popup,
        suggestions = query ? getSuggestions(query) : [],
        len = suggestions.length,
        showMenu = Boolean(len),
        selectedIndex = -1

    if (showMenu) {
      if (element) {
        pos.top = this._INPUT_OFFSET_ + element.offsetTop
      }
      if (len === 1) {
        suggestions[0].selected = true
        selectedIndex = 0
      }
    }
    this.setState({
      showMenu,
      suggestions,
      selectedIndex,
      popup,
    })
  }

  onKeyDown = e => {
    let { showMenu, suggestions, selectedIndex: si, popup } = this.state
    const changeSelected = nextIndex => {
      e.preventDefault()
      this.setState({
        selectedIndex: nextIndex,
        suggestions: suggestions.map((item, i) => {
          item.selected = i === nextIndex
          return item
        })
      })
    }
    // console.log('key down', e.key );
    this.itemWasSelected = false
    if (showMenu) {
      switch (e.key) {
        case 'Enter':
          let s = suggestions.find(item => item.selected)
          if (s) {
            e.preventDefault()
            this.selectSuggestion(s)
          }
          return
        case 'ArrowDown':
          if (si < suggestions.length - 1) changeSelected(++si)
          return
        case 'ArrowUp':
          if (si > 0) changeSelected(--si)
          return
        case 'Escape':
          this.setState({ showMenu: false })
      }
    }
  }

  selectSuggestion = s => {
    this.state.popup.onSelect(s)
    this.itemWasSelected = true
    this.setState({ showMenu: false })
  }

  renderSuggestion = suggestion => {
    let { popup } = this.state
    return (
      <TouchableHighlight
        onPress={() => this.selectSuggestion(suggestion)}
        underlayColor='#bbb'
        $ref={c => {
          if (suggestion.selected && c)
            c.scrollIntoViewIfNeeded(false)
        }}>
        {popup.renderSuggestion(suggestion, popup)}
      </TouchableHighlight>
    )
  }

  render() {
    let{ showMenu, suggestions, popup } = this.state
    // console.log('popup menu renderer', showMenu);
    return (
      <View style={styles.root}>
        {this.props.children}
        {showMenu &&
          <View style={[styles.list, popup.pos]}>
            <ListView
              dataSource={this.ds.cloneWithRows(suggestions)}
              keyboardShouldPersistTaps='always'
              enableEmptySections={true}
              renderRow={this.renderSuggestion}
            />
          </View>
        }
      </View>
    );
  }

  /*~~~~~~~~~~~~~~~~render helpers~~~~~~~~~~~~~~~~*/
  renderHighlight = ({ title, selected }, { query }) => {
    // { query, title: 'xxx' or ['xxx', {highlight: 'yyy'}, 'zzz', ...], selected }
    // 'xxx' => [{ highlight: 'xxx' }]
    let words = Array.isArray(title) ? title : [{ highlight: title }]
    const item =
      <Text style={styles.text}>
        {words.map((word, i) => {
          if (typeof word === 'object') {
            const matches = [[0, query.length]];
            const parts = AutosuggestHighlightParse(word.highlight, matches);
            return parts.map((part, index) => {
              let props = { key: index }
              if (part.highlight) props.style = styles.highlight
              return <Text {...props}>{part.text}</Text>
            })
          } else return word
        })}
      </Text>
    return this.renderItem(item, selected)
  }

  renderSimple = ({ title, selected }) => {
    const item =
      <Text style={styles.text}>
        {title}
      </Text>
    return this.renderItem(item, selected)
  }

  renderItem = (item, selected) =>
    <View style={selected ? styles.selected : styles.view}>
      {item}
    </View>
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

}

export default PopupMenu
