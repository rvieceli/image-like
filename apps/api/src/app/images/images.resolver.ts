import {
  Args,
  Context,
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
import { Request } from 'express';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(
    private unsplashService: UnsplashService,
    private imagesService: ImagesService,
    private likesService: LikesService
  ) {}

  @Query(() => ImageSearchResult)
  @UseGuards(JwtAuthGuard)
  async myImages(
    @Context('req') request: Request,
    @Args('page', { type: () => Int, nullable: true }) page?: number
  ): Promise<ImageSearchResult> {
    return this.imagesService.findAll(page, request.user.id);
  }

  @Query(() => ImageSearchResult)
  async getImages(
    @Args('q', { type: () => String, nullable: true }) query: string,
    @Args('page', { type: () => Int, nullable: true }) page?: number
  ): Promise<ImageSearchResult> {
    if (query) {
      return this.unsplashService.search(query, page);
    }

    return this.imagesService.findAll(page);
  }

  @ResolveField(() => [User])
  async likedBy(@Parent() image: Image): Promise<User[]> {
    return this.likesService.likedBy(image.id);
  }
}
