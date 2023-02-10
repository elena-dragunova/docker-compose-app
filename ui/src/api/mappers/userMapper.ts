import { User } from 'src/models/user';

import { UserDto } from '../dtos/userDto';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return new User({
      id: dto.id,
      name: dto.name,
      email: dto.email,
    });
  }
}

export const userMapper = new UserMapper();
