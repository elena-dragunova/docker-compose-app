import { AxiosError, AxiosRequestHeaders } from 'axios';
import { UserSecret } from 'src/models/userSecret';
import { User } from 'src/models/user';
import { Login } from 'src/models/loginValues';

import { LoginDto } from '../dtos/loginDto';
import { UserDto } from '../dtos/userDto';
import { ApiErrorDto } from '../dtos/validationErrorDto';
import { userMapper } from '../mappers/userMapper';
import { http } from '../http';
import { UserSecretDto } from '../dtos/userSecretDto';
import { userSecretMapper } from '../mappers/userSecretMapper';

import { UserSecretStorageService } from './userSecretStorage';

/** Auth API. */
export namespace AuthApi {

  const loginUrl = 'auth/login/';
  const refreshSecretUrl = 'auth/token/refresh/';

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login({ email, password }: Login): Promise<User> {
    const userDto = await mockLogin(email, password);
    const user = userMapper.fromDto(userDto);

    return user;
  }

  /** Logs the current user out. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }

  /**
   * Refresh secret.
   * @param secret User secret.
   */
  export async function refreshSecret(secret: UserSecret): Promise<UserSecret> {
    const { data: newSecretDto } = await http.post<UserSecretDto>(
      refreshSecretUrl,
      userSecretMapper.toDto(secret),
    );

    return userSecretMapper.fromDto(newSecretDto);
  }

  // TODO (template preparation): This function was made for template. Remove it from your project.
  /**
   * Mocks user login.
   * @param email Email.
   * @param password Password.
   */
  async function mockLogin(email: string, password: string): Promise<UserDto> {
    try {
      return await http.post(loginUrl, {
        email, password,
      });
    } catch (error: unknown) {
      const axiosMockError = error as AxiosError<ApiErrorDto<LoginDto>>;
      if (!email) {
        axiosMockError.message = 'No login provided';
        throw axiosMockError;
      }

      if (!password || password.length < 5) {
        axiosMockError.message = 'Incorrect password';

        axiosMockError.response = {
          config: {
            headers: {} as AxiosRequestHeaders,
          },
          data: {
            data: {
              password: ['Minimum password length 5 characters'],
            },
            detail: 'Incorrect password',
          },
          headers: {},
          status: 400,
          statusText: 'Validation error.',
        };

        throw axiosMockError;
      }

      return {
        id: 1,
        name: 'Test User',
        email,
      };
    }
  }
}
