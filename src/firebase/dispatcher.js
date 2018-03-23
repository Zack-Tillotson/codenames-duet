import actions from './actions';

const dispatcher = (dispatch) => {
  return {

    monitorConnection() {
      return dispatch(actions.syncConnection());
    },

    syncData(path) {
      return dispatch(actions.syncData(path));
    },

    requestLogin(service) {
      return dispatch(actions.requestAuth(service));
    },

    requestLogout() {
      return dispatch(actions.requestUnauth());
    }
  }
}

export default dispatcher;