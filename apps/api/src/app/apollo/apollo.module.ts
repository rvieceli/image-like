import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: () => ({
        autoSchemaFile: join(
          process.cwd(),
          'apps',
          'api',
          'src',
          'app',
          'apollo',
          'schema.gql'
        ),
        buildSchemaOptions: {
          numberScalarMode: 'integer',
          dateScalarMode: 'isoDate',
        },
      }),
    }),
  ],
})
export class ApolloModule {}
