// @flow
import type { Action } from '../types';

// export const addTodo = (title: string) => ({ getUid, now }: Deps): Action => ({
//   type: 'ADD_TODO',
//   payload: {
//     todo: {
//       completed: false,
//       createdAt: now(),
//       id: getUid(),
//       title: title.trim(),
//     },
//   },
// });
//
// export const clearAllCompletedTodos = (): Action => ({
//   type: 'CLEAR_ALL_COMPLETED_TODOS',
// });
//
// export const clearAllTodos = (): Action => ({
//   type: 'CLEAR_ALL_TODOS',
// });
//
// export const deleteTodo = (id: string): Action => ({
//   type: 'DELETE_TODO',
//   payload: { id },
// });
//
// export const toggleTodoCompleted = (todo: Todo): Action => ({
//   type: 'TOGGLE_TODO_COMPLETED',
//   payload: { todo },
// });

export const getTransactions = (id): Action => ({
  type: 'GET_TRANSACTIONS',
  payload: ['one', 'two', 'a', 'asdgahgka asda']
})
