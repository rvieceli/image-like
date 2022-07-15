import { Field, ObjectType } from '@nestjs/graphql';
import { Image } from '../entities/Image.entity';

@ObjectType()
export class ImageSearchResult {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  total_pages: number;

  @Field(() => Number)
  page: number;

  @Field(() => Boolean)
  hasMore: boolean;

  @Field(() => [Image])
  results: Image[];
}
