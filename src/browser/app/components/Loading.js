// @flow
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import Title from './Title';

type LoadingProps = TextProps & {
  intl: $IntlShape,
};

type LoadingState = {|
  currentText: ?Object,
|};

class Loading extends React.Component {
  state: LoadingState = {
    currentText: null,
  };

  componentDidMount() {
    // www.nngroup.com/articles/response-times-3-important-limits
    this.timer = setTimeout(() => {
      this.setState({ currentText: 'Loading' });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: 'Still loading, please check your connection' });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  timer: number;
  longTimer: number;
  props: LoadingProps;

  render() {
    const { currentText } = this.state;
    if (!currentText) return null;
    const {
      display = 'block',
      ...props
    } = this.props;

    return (
      <Text display={display} {...props}>
        <Title message={currentText} />
        {currentText}...
      </Text>
    );
  }
}

export default Loading
