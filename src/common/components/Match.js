// @flow
import React from 'react';
import { Match as ReactRouterMatch, Redirect } from 'react-router';
import { connect } from 'react-redux';

const haveAccess = (user, authorized) => authorized ? user : true;

const Match = ({
  authorized,
  component: Component,
  render,
  user,
  ...props
}) => (
  <ReactRouterMatch
    {...props}
    render={renderProps => (
      haveAccess(user, authorized) ?
        render ? render(renderProps) : <Component {...renderProps} />
      :
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: renderProps.location },
          }}
        />
    )}
  />
);

export default connect(
  (state) => ({
    user: state.user,
  }),
)(Match);
