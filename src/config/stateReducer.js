export default function (state, action) {
  switch(action.type) {
      case "setLoggedInUser": {
          return {
              ...state,
          loggedInUser: action.data
          }
      }
      case "setLoginError": {
          return action.data
      }
      case "setRegisterError": {
          return action.data
      }
      default:
          return state
  }
}
