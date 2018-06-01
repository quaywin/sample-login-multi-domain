
import { client, clientAuth } from './client';

export const authService = {
  login: (username, password) => client.post('login', { username, password }),
  logout: () => clientAuth.get('logout'),
  me: () => clientAuth.get('me'),
};
