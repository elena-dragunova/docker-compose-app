import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { CONFIG } from './config';
import { addSecretBeforeRequest, refreshSecret } from './interceptors';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

/**
 * Axios interceptors work like a stack (LIFO queue).
 * So you can add multiple interceptors like this:
 * ```js
 * http.interceptors.request.use(addTokenBeforeRequest);
 * http.interceptors.request.use(requestLogger);
 * ```
 * In this example request will be intercepted in the following order:
 * requestLogger -> addTokenBeforeRequest.
 *
 * Learn more in Axios docs: https://axios-http.com/docs/interceptors.
 */

// TODO (template preparation): Add necessary HTTP request interceptors.
// http.interceptors.request.use(addSecretBeforeRequest);

http.interceptors.response.use((config: AxiosResponse) => config, refreshSecret);
