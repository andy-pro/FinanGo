// @flow
import React from 'react';
import { connect } from 'react-redux';

import { changeCategoryView, changeStatsMode } from '../../common/app/actions';
import { Box, Title } from './components';
// import { DatePicker, Icon } from '../../common/__components'
import { View, Text, Icon } from '../../common/__components'
import DatePicker from '../../common/__components/DatePicker'
import Summary from '../../common/transactions/summary'

import messages from '../messages'

import { colors, mainCSS, datePickerCSS } from '../../common/__themes'

const view_names = {
  table: { name: 'table', title: 'Table', icon: 'ic' },
  grid:  { name: 'grid', title: 'Grid', icon: 'i5' },
  stats: { name: 'stats', title: 'Diagram', icon: 'ib' },
  pie:   { name: 'pie', title: 'Pie', icon: 'i9' },
}

const Header = ({ pattern, currentBalance, changeCategoryView, changeStatsMode, delHandler }) => {
  const title = messages[`links.${pattern.slice(1) || 'home'}.title`]

  let viewMode = {name: 'table'}

  const iconSet = name => ({
    backgroundColor: viewMode.name === name ? colors.active : colors.disabled,
    name: view_names[name].icon,
    onPress: changeStatsMode,
    title: view_names[name].title,
  })

  let home = pattern === '/'

  return (
    <Box>
      <Title message={title} />
      <Box
        border="bottom"
        borderWidth={2}
        marginBottom={0.5}
        marginTop={0}
        paddingBottom={0.5}
      >
        <View style={mainCSS.container}>
          <View style={mainCSS.between}>

            <View style={{
                // display: 'flex',
                // flexDirection: 'column',
                // justifyContent: 'center'
                textAlign: 'center'
              }}>
              <Text style={{
                fontSize: 24,
              }}>
                {title}
              </Text>
              {home &&
                <View style={{
                    paddingTop: 15
                  }}>
                  <Summary value={currentBalance} />
                </View>
              }
            </View>

            {home &&
              <View style={{
                  width: 130
                }}>
              <View>
                <DatePicker
                  icon={{backgroundColor: '#bbb'}}
                  style={datePickerCSS}
                />
              </View>
              <View style={{
                  display: 'flex',
                  paddingTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Icon.Button { ...iconSet('table') } />
                <Icon.Button { ...iconSet('grid') } />
                <Icon.Button { ...iconSet('stats') } />
                <Icon.Button { ...iconSet('pie') } />

              </View>
              </View>
            }
            {pattern === '/categories' &&
              <Icon.Button
                backgroundColor={colors.header}
                name="ios-eye-outline"
                onPress={changeCategoryView}
              />
            }
            {delHandler &&
              <Icon.Button
                backgroundColor='#d66'
                name='ios-trash-outline'
                onPress={delHandler}
              />
            }


          </View>

        </View>


      </Box>
    </Box>
  );
}

export default connect(
  ({ app }) => ({
    currentBalance: app.currentBalance,
    delHandler: app.delHandler,
  }),
  { changeCategoryView, changeStatsMode },
)(Header);
