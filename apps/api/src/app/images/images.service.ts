import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnsplashService } from '../unsplash/unsplash.service';
import { Image } from './entities/Image.entity';
import { ImageSearchResult } from './models/ImageSearchResult.model';

const PAGE_SIZE = 20;

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private unsplashService: UnsplashService
  ) {}

  async findAll(page = 1, userId?: string): Promise<ImageSearchResult> {
    const [results, total] = await this.imagesRepository.findAndCount({
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      where: {
        likes: userId ? { user: { id: userId } } : {},
      },
    });

    const total_pages = Math.ceil(total / PAGE_SIZE);

    return {
      total,
      total_pages,
      page,
      hasMore: page < total_pages,
      results,
    };
  }

  async findOrCreate(id: string): Promise<Image> {
    const image = await this.imagesRepository.findOneBy({ id });

    if (image) {
      return image;
    }

    const freshOne = await this.unsplashService.getImage(id);

    return this.imagesRepository.save(freshOne);
  }

  async save(image: Image): Promise<Image> {
    return this.imagesRepository.save(image);
  }
}
