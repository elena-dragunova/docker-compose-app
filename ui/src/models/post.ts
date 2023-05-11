// TODO (template preparation): This entity was made for template. Remove it from your project.
import { Immerable, OmitImmerable } from './immerable';

/** Post. */
export class Post extends Immerable {
  /** Post id. */
  public readonly id: number;

  /** User id. */
  public readonly userId: number;

  /** Title. */
  public readonly title: string;

  /** Body. */
  public readonly body: string;

  public constructor(data: PostInitArgs) {
    super();
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.body = data.body;
  }
}

type PostInitArgs = OmitImmerable<Post>;
