import operations from './operations'
import constants from './constants'

export default middleware = ({ dispatch, getState }) => next => action => {

  // console.log('hello from middleware local DB!', action.type);

  if (action.type !== constants.QUERY) return next(action)

  const file = getState()[constants.filename]

  dispatch(operations(file, action))

  dispatch(action.payload)

}
