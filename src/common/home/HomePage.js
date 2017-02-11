// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderTransactions from '../transactions/render'
// import { getTransactions } from '../transactions/actions'
import { setMonthToNow } from '../app/actions'

class HomePage extends Component {

  componentDidMount() {
    // this.props.getTransactions()
    if (this.props.user) {
      this.props.setMonthToNow()
    }
  }

  render () {
    return (
      <RenderTransactions />
    );
  }

}

export default connect(
  (state) => ({
    user: state.user,
  }),
  // { getTransactions }
  { setMonthToNow }
)(HomePage);
