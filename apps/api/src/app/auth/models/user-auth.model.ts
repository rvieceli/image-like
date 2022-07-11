import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class UserAuth {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
