export default function user(state=null, action) {

  switch (action.type) {
    case 'USER_LOADED':
      return action.payload.user
    default:
      return state;
  }

}
