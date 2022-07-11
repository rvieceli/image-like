import { createApi } from 'unsplash-js';
import { ConfigurationService } from '../configuration/configuration.service';
import fetch from 'node-fetch';

export const unsplashFactory = {
  provide: 'UNSPLASH',
  inject: [ConfigurationService],
  useFactory: (config: ConfigurationService) =>
    createApi({
      accessKey: config.get('UNSPLASH_ACCESS_KEY'),
      fetch,
    }),
};

export type UnsplashApi = ReturnType<typeof createApi>;
