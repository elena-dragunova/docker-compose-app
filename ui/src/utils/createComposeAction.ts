import { createAction } from '@reduxjs/toolkit';

/**
 * Create compose action function.
 * @param actionGroupPrefix Action group prefix.
 * @example
 * ```js
 * const composeAction = createComposeActionFn('user');
 * const get = composeAction('get');
 * ```
 */
export function createComposeActionFn(actionGroupPrefix: string) {
  return <T = void>(name: string) => createAction<T>(`${actionGroupPrefix}/${name}`);
}
