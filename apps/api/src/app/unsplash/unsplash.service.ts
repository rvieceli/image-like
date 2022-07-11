import { Inject, Injectable } from '@nestjs/common';
import { ImageSearchResult } from '../images/models/ImageSearchResult.model';
import { Image } from './image.interface';
import { UnsplashApi } from './unsplash.factory';

@Injectable()
export class UnsplashService {
  constructor(@Inject('UNSPLASH') private unsplash: UnsplashApi) {}

  async search(query: string, page?: number): Promise<ImageSearchResult> {
    const data = await this.unsplash.search.getPhotos({
      query,
      page,
      perPage: 20,
    });

    const { total, total_pages, results } = data.response;

    return {
      total,
      total_pages,
      results: results.map(this.mutate),
    };
  }

  async getImage(photoId: string): Promise<Image> {
    const data = await this.unsplash.photos.get({ photoId });

    return this.mutate(data.response);
  }

  mutate(image): Image {
    return {
      id: image.id,
      width: image.width,
      height: image.height,
      description: image.description,
      author: image.user.name,
      url: image.urls.regular,
      link: image.links.html,
      likesCount: image.likesCount || 0,
    };
  }
}
