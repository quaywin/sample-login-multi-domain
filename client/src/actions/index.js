import { authService } from '../services/auth';

export const FETCH_LOGIN = 'FETCH_LOGIN';
export const FETCH_LOGOUT = 'FETCH_LOGOUT';
export const FETCH_USER = 'FETCH_USER';
export const SET_CROSS_STORAGE = 'SET_CROSS_STORAGE';
export const HOST_DOMAIN = 'localhost:3000';
export const CLIENT_DOMAIN = 'localhost:4000';

export const loginUser = (username, password) => ({
  type: FETCH_LOGIN,
  payload: authService.login(username, password),
});

export const logout = () => ({
  type: FETCH_LOGOUT,
  payload: {},
});

export const getUser = () => ({
  type: FETCH_USER,
  payload: authService.me(),
});

export const setCrossStorage = (storage) => ({
  type: SET_CROSS_STORAGE,
  payload: { storage },
});
