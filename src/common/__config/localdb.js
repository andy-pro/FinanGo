import reducer from '../__api/localdb/reducer'
import middleware from '../__api/localdb/middleware'
import constants from '../__api/localdb/constants'

export default {
  filename: constants.filename,
  reducer,
  middleware,
}
