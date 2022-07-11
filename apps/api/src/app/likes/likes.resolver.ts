import { Resolver, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Image } from '../images/entities/Image.entity';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Mutation(() => Image)
  @UseGuards(JwtAuthGuard)
  like(
    @Args('imageId', { type: () => ID }) imageId: string,
    @Context('req') request: Request
  ) {
    return this.likesService.create(imageId, request.user.id);
  }
  @Mutation(() => Image)
  @UseGuards(JwtAuthGuard)
  unlike(
    @Args('imageId', { type: () => ID }) imageId: string,
    @Context('req') request: Request
  ) {
    return this.likesService.remove(imageId, request.user.id);
  }

  // @Query(() => [Like], { name: 'likes' })
  // findAll() {
  //   return this.likesService.findAll();
  // }
}
