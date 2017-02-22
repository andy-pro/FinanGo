import React, { Component } from 'react'

import { View } from './fela'

class ListView extends Component {

  static DataSource = function(methods) {

    // methods example:
      // rowHasChanged: (r1, r2) => r1 !== r2,
      // sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      // getSectionData: (dataBlob, sectionId) => dataBlob[sectionId],
      // getRowData: (dataBlob, sectionId, rowId) => dataBlob[rowId]

    this.cloneWithRows = dataBlob => ({
      dataBlob,
      methods
    })

    this.cloneWithRowsAndSections = (dataBlob, sectionIds, rowIds) => ({
      dataBlob,
      sectionIds,
      rowIds,
      methods,
    })

  }

  render() {
    const {style, dataSource, renderSectionHeader, renderRow} = this.props

    let { dataBlob, sectionIds, rowIds, methods } = dataSource

    return sectionIds ?
      <View style={style}>
        {sectionIds.map((sid, index) => {
          let sectionData = methods.getSectionData(dataBlob, sid)
          let rows = rowIds[index]
          return (
            <div key={sid}>
              {renderSectionHeader(sectionData, sid)}
              {rows.map(rid => {
                let rowData = methods.getRowData(dataBlob, sid, rid)
                return (
                  <div key={rid}>
                    {renderRow(rowData, sid, rid)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </View>
    :
      <View style={style}>
        {dataBlob.map((item, index) => {
          return (
            <div key={item.id || index}>
              {renderRow(item, index, index)}
            </div>
          )
        })}
      </View>
  }

}

export default ListView

/*

  <ListView
    style={mainStyles.container}
    dataSource={ds.cloneWithRows(data)}
    renderRow={renderRow}
    renderSectionHeader={renderSectionHeader}
    enableEmptySections
    initialListSize={Infinity}
  />

*/
