import {
  FETCH_LOGIN,
  FETCH_LOGOUT,
  FETCH_USER,
  HOST_DOMAIN,
  CLIENT_DOMAIN
} from '../actions/index'

const CrossStorageHub = require('cross-storage').CrossStorageHub;
const CrossStorageClient = require('cross-storage').CrossStorageClient;

const host_domain = new RegExp(`${HOST_DOMAIN}$`);
const client_domain = new RegExp(`${CLIENT_DOMAIN}$`);

CrossStorageHub.init([{
    origin: host_domain,
    allow: ['get', 'set', 'del', 'getKeys', 'clear']
  },
  {
    origin: client_domain,
    allow: ['get', 'set', 'del', 'getKeys', 'clear']
  }
]);
var storage = new CrossStorageClient(`http://${HOST_DOMAIN}`);

export default function (state = {
  data: null,
  status: false,
  storage
}, action) {
  switch (action.type) {
    case FETCH_LOGIN:
      {
        const {
          data,
          status
        } = action.payload;
        if (status) {
          localStorage.setItem('token', data.token);
          storage.set('token', data.token);
        }
        return { ...state,
          data,
          status
        };
      }
    case FETCH_USER:
      {
        const {
          data
        } = action.payload;
        if (data) {
          return { ...state,
            data,
            status: true
          };
        } else {
          return { ...state,
            status: false,
            data: null,
            check: true
          };
        }
      }
    case FETCH_LOGOUT:
      {
        localStorage.clear('token');
        storage.del('token');
        return { ...state,
          status: false,
          data: null,
          check: true
        };
      }
    default:
      break;
  }
  return state;
}