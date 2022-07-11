import { forwardRef, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { UnsplashModule } from '../unsplash/unsplash.module';
import { UnsplashService } from '../unsplash/unsplash.service';
import { Image } from './entities/Image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    UnsplashModule,
    forwardRef(() => LikesModule),
    TypeOrmModule.forFeature([Image]),
  ],
  providers: [ImagesResolver, ImagesService, UnsplashService],
  exports: [ImagesService],
})
export class ImagesModule {}
