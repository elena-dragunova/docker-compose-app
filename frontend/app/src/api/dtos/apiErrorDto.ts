import { AxiosError } from 'axios';

// TODO (Danil K): Add type for general API error.
export type GeneralApiError<T> = AxiosError<T>;
