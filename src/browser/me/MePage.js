// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';
import getUserPhotoUrl from '../../common/user/getUserPhotoUrl';
import {
  Box,
  Image,
  Link,
  Text,
  Title,
} from '../app/components';

// Pages
import Profile from './ProfilePage';
import Settings from './SettingsPage';

const Header = ({ pathname }) => (
  <Box
    marginBottom={1}
    marginHorizontal={-0.5}
  >
    <Link exactly to={pathname} paddingHorizontal={0.5}>
      Me
    </Link>
    <Link to={`${pathname}/profile`} paddingHorizontal={0.5}>
      Profile
    </Link>
    <Link to={`${pathname}/settings`} paddingHorizontal={0.5}>
      Settings
    </Link>
  </Box>
);

const MePage = ({ pathname, user }) => (
  !user ?
    <Redirect to="/" />
  :
    <Box>
      <Title message='Me' />
      <Header pathname={pathname} />
      <Match
        exactly
        pattern={pathname}
        render={() => (
          <Box>
            <Text>{user.displayName}</Text>
            <Box marginVertical={1}>
              <Image
                src={getUserPhotoUrl(user)}
                height={100}
                width={100}
                title={user.displayName}
              />
            </Box>
            <Text>{user.firstName}</Text>{' '}<Text>{user.lastName}</Text>
            <Box><Text>User ID: {user.id}</Text></Box>
          </Box>
        )}
      />
      <Match pattern={`${pathname}/profile`} component={Profile} />
      <Match pattern={`${pathname}/settings`} component={Settings} />
    </Box>
);

export default connect(
  (state) => ({
    user: state.user,
  }),
)(MePage);
