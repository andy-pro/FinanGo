export default function user(state=null, action) {

  switch (action.type) {
    case 'user/LOADED':
      return action.payload.user
    default:
      return state;
  }

}
