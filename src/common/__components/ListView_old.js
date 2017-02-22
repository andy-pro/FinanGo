import React, { Component } from 'react'

import { View } from './fela'

class ListView extends Component {

  static DataSource = function(props) {

    this.rowHasChanged = props.rowHasChanged
    this.sectionHeaderHasChanged = props.sectionHeaderHasChanged
    this.getSectionData = props.getSectionData
    this.getRowData = props.getRowData

    // rowHasChanged: (r1, r2) => r1 !== r2,
    // sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
    // getSectionData: (dataBlob, sectionId) => dataBlob[sectionId],
    // getRowData: (dataBlob, sectionId, rowId) => dataBlob[rowId]

    // console.log(rowHasChanged);
    // this.rows = []
    // this.cloneWithRows = (data) => data.map(item => item)

    this.cloneWithRows = data => data

    // return {dataBlob, sectionIds, rowIds}
    this.cloneWithRowsAndSections = (dataBlob, sectionIds, rowIds) => ({
      data: dataBlob,
      ids: sectionIds.map(sid => [sid, dataBlob[sid].rows])
    })

  }

  render() {
    const {style, dataSource, renderSectionHeader, renderRow} = this.props

    let { data, ids } = dataSource
    // console.log(dataSource);

    if (data) {

      return (
        <View style={style}>
          {ids.map(blob => {
            let [ sid, rows ] = blob
            // console.log(sid, rows);
            return (
              <div key={sid}>
                {renderSectionHeader(data[sid], sid)}
                {rows.map(rid => {
                  return (
                    <div key={rid}>
                      {renderRow(data[rid], sid, rid)}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </View>
      )

    } else {

      return (
        <View style={style}>
          {dataSource.map((item, index) => {
            return (
              <div key={item.id || index}>
                {renderRow(item, index, index)}
              </div>
            )
          })}
        </View>
      )

    }
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
