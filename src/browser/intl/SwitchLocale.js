// @flow

import React from 'react';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/app/actions';
import {
  Box,
  Button,
} from '../app/components';

type SwitchLocaleProps = {
  currentLocale: string,
  locales: Array<string>,
  setCurrentLocale: typeof setCurrentLocale,
};

const SwitchLocale = ({
  currentLocale,
  locales,
  setCurrentLocale,
}: SwitchLocaleProps) => (
  <Box
    marginBottom={1}
    marginHorizontal={-0.25}
  >
    {locales.map(locale =>
      <Button
        active={locale === currentLocale}
        display="inline-block"
        key={locale}
        marginHorizontal={0.25}
        onClick={() => setCurrentLocale(locale)}
        primary
      >
        {locale}
      </Button>,
    )}
  </Box>
);

export default connect(
  ({ app }) => ({
    currentLocale: app.currentLocale,
    locales: app.locales,
  }),
  { setCurrentLocale },
)(SwitchLocale);
