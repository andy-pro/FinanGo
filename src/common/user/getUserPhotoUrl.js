// @flow
import gravatar from 'gravatar';

const getUserPhotoUrl = (user) =>
  user.photoURL ||
  // Users signed in via email has displayName set to email.
  gravatar.url(user.displayName, {
    d: 'retro',
    protocol: 'https',
    r: 'x',
    s: '100',
  });

export default getUserPhotoUrl;
