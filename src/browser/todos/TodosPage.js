// @flow
import Buttons from './Buttons';
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
// import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader, Title } from '../app/components';
// import { FormattedMessage } from 'react-intl';

const TodosPage = () => (
  <Box>
    <Title message='Todos' />
    {/* This ugly wrapping syntax will be unneccessary with React fiber soon */}
    <PageHeader heading='Todos' />
    <NewTodo />
    <Todos />
    <Buttons />
  </Box>
);

export default TodosPage;
