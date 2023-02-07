import { extractErrorMessage } from 'src/utils/extractErrorMessage';
import { EntityValidationErrors } from 'src/models/appError';
import { Login } from 'src/models/loginValues';

import { LoginDto } from '../dtos/loginDto';
import { ValidationErrorDto } from '../dtos/validationErrorDto';

import { IMapper, ValidationErrorMapper } from './mappers';

/** Login mapper. */
class LoginMapper implements
  IMapper<LoginDto, Login>,
  ValidationErrorMapper<LoginDto, Login> {

  /** @inheritdoc */
  public fromDto(dto: LoginDto): Login {
    return {
      email: dto.email,
      password: dto.password,
    };
  }

  /** @inheritdoc */
  public toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
    };
  }

  /** @inheritdoc */
  public validationErrorFromDto(
    errorDto?: ValidationErrorDto<LoginDto> | null,
  ): EntityValidationErrors<Login> {
    return {
      email: extractErrorMessage(errorDto?.email),
      password:
        extractErrorMessage(errorDto?.password) ??
        extractErrorMessage(errorDto?.non_field_errors),
    };
  }
}

export const loginMapper = new LoginMapper();
