const UserReducer = (state, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.payload

  case 'LOGOUT_USER':
    return null

  default:
    return state

  }

}

export default UserReducer