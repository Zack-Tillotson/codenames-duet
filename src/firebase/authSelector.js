import selector from './selector';

export default (state) => {
  const firebase = selector(state);

  return firebase.authInfo;
}