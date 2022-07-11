import { Field, ObjectType } from '@nestjs/graphql';
import { Image } from '../entities/Image.entity';

@ObjectType()
export class ImageSearchResult {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  total_pages: number;

  @Field(() => [Image])
  results: Image[];
}
