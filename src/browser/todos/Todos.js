// @flow
// import type { State, Todo } from '../../common/types';
import React from 'react';
// import todosMessages from '../../common/todos/todosMessages';
import { Box, Button, Text } from '../app/components';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';
// import { injectIntl } from 'react-intl';

const itemStyle = {
  inline: true,
  paddingVertical: 0.5,
};

const TodosItem = ({
  deleteTodo,
  todo,
  toggleTodoCompleted,
}) => (
  <Box display="flex">
    <Button
      {...itemStyle}
      bold={false}
      decoration={todo.completed ? 'line-through' : 'none'}
      onClick={() => toggleTodoCompleted(todo)}
      paddingHorizontal={0}
      transform="none"
    >{todo.title}</Button>
    <Button
      {...itemStyle}
      marginHorizontal={0.5}
      onClick={() => deleteTodo(todo.id)}
      paddingHorizontal={0.25}
    >×</Button>
  </Box>
);

const Todos = ({
  deleteTodo,
  intl,
  todos,
  toggleTodoCompleted,
}) => {
  if (isEmpty(todos)) {
    return (
      <Box>
        <Text>
          Empty
        </Text>
      </Box>
    );
  }

  // It's ok and recommended to sort things in view, but for the bigger data
  // leverage reactjs/reselect or bvaughn/react-virtualized.
  const sortedTodos = compose(
    reverse,
    sortBy(prop('createdAt')),
    values,
  )(todos);

  return (
    <Box>
      {sortedTodos.map(todo => (
        <TodosItem
          key={todo.id}
          deleteTodo={deleteTodo}
          todo={todo}
          toggleTodoCompleted={toggleTodoCompleted}
        />
      ))}
    </Box>
  );
};

export default compose(
  connect(
    (state) => ({
      todos: state.todos.all,
    }),
    { deleteTodo, toggleTodoCompleted },
  ),
)(Todos);
