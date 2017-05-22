import React from 'react'

import { View } from './'

class TwistedView extends React.Component {

  render() {
    const { style, sections, keyExtractor, renderItem, renderSectionHeader, renderSectionFooter, renderSectionSeparator } = this.props

    const _render = (_data) => {
      return (
        <View style={style.sub}>
          {_data.map(item => {
            let sub = item.sub && item.sub.length
            if (sub) {
              console.log('style.section', style.section);
              return (
                <View style={style.section}>
                  {renderSectionHeader(item)}
                  {_render(item.sub)}
                </View>
              )
            } else {
              return renderItem(item)
            }
          })}
        </View>
      )
    }

    return _render(sections)
  }

}

export default TwistedView

/*

  <TwistedView
    style={mainStyles.container}
    sections={ds.cloneWithRows(data)}
    keyExtractor
    renderItem={renderRow}
    renderSectionHeader={renderSectionHeader}
    renderSectionFooter={renderSectionFooter}
    renderSectionSeparator={renderSectionSeparator}
  />

*/
