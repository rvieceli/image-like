import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ImageSearchResult } from './models/ImageSearchResult.model';
import { UnsplashService } from '../unsplash/unsplash.service';
import { ImagesService } from './images.service';
import { Image } from './entities/Image.entity';
import { LikesService } from '../likes/likes.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(
    private unsplashService: UnsplashService,
    private imagesService: ImagesService,
    private likesService: LikesService
  ) {}

  @Query(() => ImageSearchResult)
  async getImages(
    @Args('page', { type: () => Int, nullable: true }) page?: number
  ): Promise<ImageSearchResult> {
    return this.imagesService.findAll(page);
  }

  @Query(() => ImageSearchResult)
  async search(
    @Args('query', { type: () => String }) query: string,
    @Args('page', { type: () => Int, nullable: true }) page?: number
  ): Promise<ImageSearchResult> {
    return this.unsplashService.search(query, page);
  }

  @ResolveField(() => [User])
  @UseGuards(JwtAuthGuard)
  async likedBy(@Parent() image: Image): Promise<User[]> {
    return this.likesService.likedBy(image.id);
  }
}
