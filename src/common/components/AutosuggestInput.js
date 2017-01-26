import React, { Component } from 'react';
import {
  TextInput,
  View,
  ListView,
  ScrollView,
  TouchableHighlight
} from './';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export default class AutosuggestInput extends Component {


  constructor(props) {
    super(props);
    this.state = {
      query: props.value,
      focus: false
    };
    this.dataSource = ds.cloneWithRows([])
    this.byKeyboard = true
    this.showList = false
    // console.log('constructor', props.value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('sud', this.props.formField, nextState, nextProps);
    const {value} = nextProps,
          newQuery = value !== this.state.query,
          newFocus = nextState.focus !== this.state.focus
    if (newQuery) {
      this.state.query = value
      let suggestions = value.length ?
        this.props.getSuggestions(this.props.inputList, value) : []
      // console.log('ogog', suggestions);
      this.showList = this.byKeyboard && Boolean(suggestions.length)
      this.dataSource = ds.cloneWithRows(suggestions)
    }
    return newQuery || newFocus
  }

  renderSuggestion = (suggestion) =>
    <TouchableHighlight
      onPress={() => {
        const {onSelect, onChange, formField} = this.props
        let query = this.props.getSuggestionValue(suggestion, this.state.query)
        // console.log('query', query);
        onSelect && onSelect(suggestion, query)
        this.byKeyboard = false
        onChange({[formField]: query})
      }}
      underlayColor='#ccc'>
      {this.props.renderSuggestion(suggestion, this.state.query)}
    </TouchableHighlight>

  onFocus = () => this.setState({ focus: true })
  // onFocus = () => {console.log('focus');this.setState({ focus: true })}

  onBlur = () => this.setState({ focus: false })

  render() {
    let {keyboardType, onChange, formField, returnKeyType, placeholder, autoFocus, refInput, styles} = this.props
    // console.log('Render AutoSuggest Input:', formField, this.state.focus);
    let showList = this.showList && this.state.focus
    showList=true
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={keyboardType || 'default'}
          autoCapitalize="sentences"
          autoCorrect={true}
          value={this.state.query}
          onChangeText={q => {
            this.byKeyboard = true
            // console.log('type', typeof q);
            if (typeof q !== 'string') {
              q = q.target.value
            }
            onChange({[formField]: q})
          }}
          placeholder={placeholder}
          style={styles.input}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus={autoFocus}
          ref={refInput}
          refInput={refInput}
          returnKeyType={returnKeyType || 'next'}
        />
        {showList &&
          <View style={styles.suggestions}>
            <ListView
              dataSource={this.dataSource}
              keyboardShouldPersistTaps='always'
              enableEmptySections={true}
              renderRow={this.renderSuggestion} />
          </View>
        }
      </View>
    );
  }
}
