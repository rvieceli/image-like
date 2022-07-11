import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    private imagesService: ImagesService // private usersService: UsersService,
  ) {}

  async create(imageId: string, userId: string) {
    const like = await this.likesRepository.findOneBy({
      image: { id: imageId },
      user: { id: userId },
    });

    const image = await this.imagesService.findOrCreate(imageId);

    if (like) {
      return image;
    }

    if (!image) {
      throw new HttpException('Image does not exist', HttpStatus.NOT_FOUND);
    }

    const newLike = this.likesRepository.create({
      image,
      user: { id: userId },
    });

    this.likesRepository.save(newLike);

    image.likesCount += 1;

    return this.imagesService.save(image);
  }

  async remove(imageId: string, userId: string) {
    const like = await this.likesRepository.findOneBy({
      image: { id: imageId },
      user: { id: userId },
    });

    if (!like) {
      throw new HttpException('Like does not exist', HttpStatus.NOT_FOUND);
    }

    await this.likesRepository.remove(like);

    const image = await this.imagesService.findOrCreate(imageId);

    image.likesCount -= 1;

    return this.imagesService.save(image);
  }

  async likedBy(imageId: string) {
    const likes = await this.likesRepository.find({
      where: { image: { id: imageId } },
      relations: ['user'],
    });

    return likes.map((like) => like.user);
  }
}
