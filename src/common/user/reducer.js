export default function user(state=null, action) {
  switch (action.type) {
    case 'USER_LOADED':
      // return get_user_data(action.payload[0]);
      return action.payload
    default:
      return state;
  }
}

// function get_user_data(data) {
//   return {
//     _id: data._id,
//     firstName: data.firstName,
//     lastName: data.lastName
//   }
// }
