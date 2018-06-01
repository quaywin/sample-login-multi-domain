import axios from 'axios';
import UrlPattern from 'url-pattern';
import {
    cloneDeep
} from 'lodash';
const API_URL = 'http://localhost:8000';


const instance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
});

const instanceAuth = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
});

export const client = {};

export const clientAuth = {};

const getAuthorizationToken = () => {
    const token = localStorage.getItem('token');
    return token;
};

const resolveUrl = (url, pathParams = {}) => {
    const pattern = new UrlPattern(url);
    return pattern.stringify(pathParams);
};

[
    [instance, client, false],
    [instanceAuth, clientAuth, true],
].forEach(([instanceIter, clientIter, needAuth]) => {
    ['get', 'delete', 'head', 'options'].forEach((methodName) => {
        clientIter[methodName] = (url, pathParams, params) => { // eslint-disable-line no-param-reassign
            const resolvedUrl = resolveUrl(url, pathParams);
            if (needAuth) {
                /* eslint-disable no-param-reassign */
                params = cloneDeep(params) || {};
                params.headers = { ...params.headers,
                    Authorization: getAuthorizationToken()
                };
                /* eslint-enable no-param-reassign */
            }
            return instanceIter[methodName](resolvedUrl, params)
                .then(
                    response => response.data,
                    error => Promise.reject(error));
        };
    });

    ['post', 'put', 'patch'].forEach((methodName) => {
        clientIter[methodName] = (url, data, pathParams, params) => { // eslint-disable-line no-param-reassign
            const resolvedUrl = resolveUrl(url, pathParams);
            if (needAuth) {
                /* eslint-disable no-param-reassign */
                params = cloneDeep(params) || {};
                params.headers = { ...params.headers,
                    Authorization: getAuthorizationToken()
                };
                /* eslint-enable no-param-reassign */
            }
            return instanceIter[methodName](resolvedUrl, data, params)
                .then(
                    response => response.data,
                    error => Promise.reject(error));
        };
    });
});