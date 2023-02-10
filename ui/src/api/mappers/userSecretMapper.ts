import { UserSecret } from 'src/models/userSecret';

import { UserSecretDto } from '../dtos/userSecretDto';

import { IMapper } from './mappers';

/** User secret mapper. */
class UserSecretMapper implements IMapper<UserSecretDto, UserSecret> {

  /** @inheritdoc */
  public toDto(data: UserSecret): UserSecretDto {
    return {
      token: data.token,
    };
  }

  /** @inheritdoc */
  public fromDto(dto: UserSecretDto): UserSecret {
    return {
      token: dto.token,
    };
  }
}

export const userSecretMapper = new UserSecretMapper();
