// @flow
import React from 'react';
import theme from '../app/themes/initial';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';
import {
  Container,
  // FormattedDate,
  // FormattedRelative,
  // Text,
} from '../app/components';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: theme.fontSizeH5,
    marginBottom: theme.fontSize * 0.5,
  },
  selected: {
    fontWeight: 'bold',
  },
});

const IntlPage = ({ currentLocale, locales, setCurrentLocale }) => {
  const componentRenderedAt = Date.now();
  return (
    <ScrollView>
      <Container style={styles.container}>
        {locales.map(locale =>
          <Text
            style={[styles.text, locale === currentLocale && styles.selected]}
            key={locale}
            onPress={() => setCurrentLocale(locale)}
          >{locale}</Text>,
        )}
      </Container>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    currentLocale: state.intl.currentLocale,
    locales: state.intl.locales,
  }),
  { setCurrentLocale },
)(IntlPage);
