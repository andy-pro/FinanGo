import React from 'react';
import { connect } from 'react-redux';

import { View, Text, Icon } from './'
import { changeCategoryView, changeStatsMode } from '../app/actions'
import { mainCSS, datePickerCSS } from '../__themes'
import Summary from '../transactions/summary'
import DatePicker from './DatePicker'

const view_names = {
  table: { name: 'table', title: 'Table', icon: 'md-list-box' },
  grid:  { name: 'grid', title: 'Grid', icon: 'md-grid' },
  stats: { name: 'stats', title: 'Diagram', icon: 'md-stats' },
  pie:   { name: 'pie', title: 'Pie', icon: 'md-pie' },
}

const HeaderBar = ({ title, pattern, currentBalance, changeCategoryView, changeStatsMode, delHandler, iconStyles, iconColors, statsMode, style }) => {

  let _home = pattern === '/',
      _delete = pattern === '/delete'

  const iconSet = (name, onPress) => ({
    ...iconStyles.set2,
    backgroundColor: statsMode === name ? iconColors.bgActive : iconColors.bgDisabled,
    color: statsMode === name ? iconColors.active : iconColors.disabled,
    name: view_names[name].icon,
    onPress: () => {
      if (name !== statsMode) changeStatsMode(name)
    },
    title: view_names[name].title,
  })

  const DeleteButton = ({ onPress, children, bgColor }) =>
    <Icon.Button
      { ...iconStyles.set1 }
      backgroundColor={bgColor || iconColors.bgDelete}
      color={iconColors.delete}
      name='ios-trash-outline'
      onPress={onPress}
    >
      {children}
    </Icon.Button>

  const deleteMonth = () => delHandler({ deleteMonth: true })

  return (
    <View style={style.bar}>

      <View style={style.lside}>
        <Text style={style.title}>
          {title}
        </Text>
        {(_home || _delete) &&
          <View style={style.summary}>
            <Summary value={currentBalance} />
          </View>
        }
      </View>

      {(_home || pattern === '/backup' || _delete) &&

        <View style={style.rside}>
          <View style={style.picker}>
            <DatePicker
              icon={{ ...iconStyles.set1, backgroundColor: iconColors.datePicker }}
              style={datePickerCSS}
            />
          </View>
          {_home &&
            <View style={style.stats}>
              <Icon.Button { ...iconSet('table') } />
              <Icon.Button { ...iconSet('grid') } />
              <Icon.Button { ...iconSet('stats') } />
              <Icon.Button { ...iconSet('pie') } />
            </View>
          }
          {_delete &&
            <View style={style.stats}>
              <DeleteButton onPress={deleteMonth} bgColor={iconColors.bgDelete}>
                Month
              </DeleteButton>
              <DeleteButton onPress={delHandler} />
            </View>
          }
        </View>

      }
      {pattern === '/categories' &&
        <Icon.Button
          { ...iconStyles.set1 }
          backgroundColor={iconColors.common}
          name="ios-eye-outline"
          onPress={changeCategoryView}
        />
      }
      {delHandler && !_delete &&
        <DeleteButton onPress={delHandler} />
      }


    </View>
  )
}

export default connect(
  ({ app }) => ({
    statsMode: app.statsMode,
    currentBalance: app.currentBalance,
    delHandler: app.delHandler,
  }),
  { changeCategoryView, changeStatsMode },
)(HeaderBar);
