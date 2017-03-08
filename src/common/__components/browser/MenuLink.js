// @flow
import React from 'react';

import Link from '../../../browser/app/components/Link'

const MenuLink = ({ exactly, to, message, action }) => {

  return (
    <Link
      display='block'
      bold
      color="white"
      exactly={exactly}
      paddingHorizontal={0.7}
      paddingVertical={0.3}
      to={action || to}
    >
      {message}
    </Link>
  )

}

export default MenuLink
