import utils from './utils';

function requestAuth(service, onError) {
  const ref = utils.auth();
  if(['google', 'twitter', 'facebook'].indexOf(service) >= 0) {
    ref.authWithOAuthRedirect(service, onError);
  } else if(service == 'anonymous') {
    ref.signInAnonymously().catch(onError);
  }
}

function requestUnauth(service, onError) {
  return utils.auth().signOut();
}

function syncConnection(onData) {
  utils.auth().onAuthStateChanged(auth => {
    onData({path: '.info/auth', error: false, data: auth});
  });

  let ref = utils.connect('.info/connected');
  ref.on(
    'value',
    snapshot => {
      if(snapshot.exists()) {
        onData({path: '.info/connected', error: false, data: snapshot.val()});
      } else {
        onData({path: '.info/connected', error: false, data: false});
      }
    }
  );

  ref = utils.connect('.info/serverTimeOffset');
  ref.on(
    'value',
    snapshot => {
      if(snapshot.exists()) {
        onData({path: '.info/serverTimeOffset', error: false, data: snapshot.val()});
      }
    }
  );
}

function syncData(onData, path = '/') {
  const ref = utils.connect(path);
  ref.on(
    'value',
    snapshot => {
      if(snapshot.exists()) {
        onData({path, error: false, data: snapshot.val()});
      } else {
        onData({path, error: true, data: {}});
      }
    },
    error => {
      console.log("Firebase error", error);
      onData({path, error: true, data: null, errorData: error});
    }
  );

  return ref;
}

function putData(path = '/', data) {
  const ref = utils.connect(path);
  const key = ref.push().key;
  ref.child(key).set(data);
  return key;
}

function setData(path = '/', data) {
  const ref = utils.connect(path);
  return ref.set(data);
}

export default {
  requestAuth,
  requestUnauth,
  syncConnection,
  syncData,
  putData,
  setData,
}