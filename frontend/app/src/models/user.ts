import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {
  /** User id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Name. */
  public readonly email: string;

  public constructor(data: UserInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }
}

type UserInitArgs = OmitImmerable<User>;
