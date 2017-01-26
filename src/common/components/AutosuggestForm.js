import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableHighlight
} from './';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const AutosuggestForm = ({children, styles, state, onArrow}) => {

  let { suggestions, showList, field, selectedIndex } = state

  const renderSuggestion = (suggestion) =>
    <TouchableHighlight
      onPress={() => field.onSelect(suggestion)}
      underlayColor='#ddd'
      $ref={c => {
        if (suggestion.selected && c)
          c.scrollIntoViewIfNeeded(false)
      }}>
      {field.renderSuggestion(suggestion)}
    </TouchableHighlight>

  const onKeyDown = e => {
    const changeSelected = (selectedIndex) => {
      e.preventDefault()
      onArrow({
        selectedIndex,
        suggestions: suggestions.map((item, index) => {
          item.selected = index === selectedIndex
          return item
        })
      })
    }
    if (showList) {
      switch (e.key) {
        case 'Enter':
          if (selectedIndex >= 0) {
            e.preventDefault()
            field.onSelect(suggestions[selectedIndex])
          }
          break
        case 'ArrowDown':
          if (selectedIndex < suggestions.length - 1) {
            changeSelected(++selectedIndex)
          }
          return
        case 'ArrowUp':
          if (selectedIndex > 0) {
            changeSelected(--selectedIndex)
          }
      }
    }
  }

  return (
    <View onKeyDown={onKeyDown}
      style={styles.container}>
      {children}
      {showList &&
        <View style={styles.suggestions}>
          <ListView
            dataSource={ds.cloneWithRows(suggestions)}
            keyboardShouldPersistTaps='always'
            enableEmptySections={true}
            renderRow={renderSuggestion} />
        </View>
      }
    </View>
  );

}

export default AutosuggestForm
