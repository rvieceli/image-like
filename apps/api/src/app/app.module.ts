import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { ApolloModule } from './apollo/apollo.module';
import { AppResolver } from './app.resolver';
import { ImagesModule } from './images/images.module';
import { UnsplashModule } from './unsplash/unsplash.module';
import { LikesModule } from './likes/likes.module';

export interface EnvironmentVariables {
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION: string;
}

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ApolloModule,
    UsersModule,
    AuthModule,
    ImagesModule,
    UnsplashModule,
    LikesModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
