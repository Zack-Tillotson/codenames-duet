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

function putData(path, data) {
  return {type: actionTypes.putData, payload: {path, data}};
}

function setData(path, data) {
  return {type: actionTypes.setData, payload: {path, data}};
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
  putData,
  setData,
  requestAuth,
  requestUnauth,
}