import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { BooksRepository } from './books.repository';

@Module({
  providers: [BooksRepository, BooksResolver],
})
export class BooksModule {}
