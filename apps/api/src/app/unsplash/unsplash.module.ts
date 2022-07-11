import { Module } from '@nestjs/common';

import { UnsplashService } from './unsplash.service';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { unsplashFactory } from './unsplash.factory';

@Module({
  imports: [ConfigurationModule],
  providers: [ConfigurationService, UnsplashService, unsplashFactory],
  exports: [UnsplashService, 'UNSPLASH'],
})
export class UnsplashModule {}
