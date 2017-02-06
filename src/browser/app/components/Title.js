// @flow
import Helmet from 'react-helmet';
import React from 'react';

const Title = ({ message }) => (
  <Helmet title={message} />
);

export default Title
