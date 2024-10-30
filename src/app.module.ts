import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { BooksModule } from './books/books.module';
import { DbModule } from './db/db.module';
import { HealthModule } from './health/health.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    DbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    HealthModule,
    BooksModule,
  ],
})
export class AppModule {}
export { HealthModule };
