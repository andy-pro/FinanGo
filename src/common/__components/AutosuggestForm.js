import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
// } from './index';
} from './';

import { defaultTheme as theme } from '../__themes'
const styles = StyleSheet.create(theme.suggestionsPanel);

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const AutosuggestForm = ({children, showList, suggestions, field }) => {

  // let { showList, suggestions, field } = state

  // showList = true

  const renderSuggestion = (suggestion) =>
    <TouchableHighlight
      onPress={() => field.onSelect(suggestion)}
      underlayColor='#bbb'
      $ref={c => {
        if (suggestion.selected && c)
          c.scrollIntoViewIfNeeded(false)
      }}>
      {field.renderSuggestion(suggestion)}
    </TouchableHighlight>

  return (
    <View style={styles.root}>
      {children}
      {showList &&
        <View style={[styles.suggestions, field.pos]}>
          <ListView
            dataSource={ds.cloneWithRows(suggestions)}
            keyboardShouldPersistTaps='always'
            enableEmptySections={true}
            renderRow={renderSuggestion}
          />
        </View>
      }
    </View>
  );

}

export default AutosuggestForm
