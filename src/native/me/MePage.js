// @flow
import type { State } from '../../common/types';
import React from 'react';
// import SignOut from '../auth/SignOut';
import getUserPhotoUrl from '../../common/user/getUserPhotoUrl';
import { Container } from '../app/components';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  image: {
    height: 100,
    margin: 20,
    width: 100,
  },
});

const MePage = ({ user }) => (
  !user ?
    <Redirect to="/" />
  :
    <Container>
      <View>
        <Text>{user.displayName}</Text>
      </View>
      <Image
        source={{ uri: getUserPhotoUrl(user) }}
        style={styles.image}
      />
    </Container>
);

MePage.propTypes = {
  user: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    user: state.user,
  }),
)(MePage);
