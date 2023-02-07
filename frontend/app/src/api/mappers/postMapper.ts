import { Post } from 'src/models/post';

import { PostDto } from '../dtos/postDto';

import { IMapperFromDto } from './mappers';

// TODO (template preparation): This mapper was made for template. Remove it from your project.
/** Post mapper. */
class PostMapper implements IMapperFromDto<PostDto, Post> {
  /** @inheritdoc */
  public fromDto(dto: PostDto): Post {
    return new Post({
      id: dto.id,
      userId: dto.userId,
      title: dto.title,
      body: dto.body,
    });
  }
}

export const postMapper = new PostMapper();
