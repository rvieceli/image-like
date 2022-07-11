import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), forwardRef(() => ImagesModule)],
  providers: [LikesResolver, LikesService],
  exports: [LikesService],
})
export class LikesModule {}
