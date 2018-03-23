import actionTypes from './actionTypes';
import { call, put } from 'redux-saga/effects';
import firebase from './';

function dataReceived(data) {
  return {type: actionTypes.dataReceived, payload: {data}};
}

function syncConnection() {
  return {type: actionTypes.syncConnection};
}

function syncData(path) {
  return {type: actionTypes.syncData, payload: {path}};
}

function requestAuth(service) {
  return {type: actionTypes.requestAuth, payload: {service}};
}

function requestUnauth(service) {
  return {type: actionTypes.requestUnauth, payload: {service}};
}

export default {
  dataReceived,
  syncConnection,
  syncData,
  requestAuth,
  requestUnauth,
}