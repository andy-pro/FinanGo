import operations from './operations'
import constants from './constants'

export default middleware = ({ dispatch, getState }) => next => action => {

  // console.log('hello from middleware local DB!', action.type);

  if (action.type !== constants.QUERY) return next(action)

  const file = getState()[constants.filename]

  // inplace-трансформация объекта action и
  // внесение именений в store.localdb, если необходимо
  const middle = operations(file, action)

  if (middle.type === constants.STATE) {

    dispatch(middle)

  }

  dispatch(action.payload)

}
