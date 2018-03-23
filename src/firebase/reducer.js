import actionTypes from './actionTypes';

function getInitialState() {
  return {
    isLoggedIn: false,
    data: '',
    connected: false,
    serverTimeOffset: 0
  }
}

export default (state = getInitialState(), action) => {
  switch(action.type) {
    case actionTypes.dataReceived:
      if(action.payload.path == '.info/auth') {
        return {...state, isLoggedIn: !!action.payload.data, authInfo: action.payload.data};
      } else if(action.payload.path == '.info/connected') {
        return {...state, connected: action.payload.data};
      } else if(action.payload.path == '.info/serverTimeOffset') {
        return {...state, serverTimeOffset: action.payload.data};
      } else {
        return {...state, data: action.payload.data};
      }
      break;
  }
  return state;
}