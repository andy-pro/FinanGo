import React from 'react';
import Text from './Text';
import styled from './styled';
import { Link as ReactRouterLink } from 'react-router';

const createLink = (tag, passProps) => styled((theme, {
  color = 'primary',
}) => ({
  $extends: [Text, ({ color })],
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
  cursor: 'pointer'
}), tag, passProps);

const AnchorLink = createLink('a', [
  'download', 'href', 'target',
]);

const ButtonLink = createLink('div', [
  'onClick',
]);

const RouterLink = createLink(ReactRouterLink, [
  'activeOnlyWhenExact', 'activeStyle', 'to',
]);

const isExternalLink = to => to.includes('://');
const routerLinkActiveStyle = { textDecoration: 'underline' };

const Link = props => (
  typeof props.to === 'function' ?
    <ButtonLink
      {...props}
      onClick={props.to}
    />
  :
  isExternalLink(props.to) ?
    <AnchorLink
      {...props}
      href={props.to}
      target="_blank"
    />
  :
    <RouterLink
      {...props}
      activeOnlyWhenExact={props.exactly}
      activeStyle={routerLinkActiveStyle}
    />
);

export default Link;
