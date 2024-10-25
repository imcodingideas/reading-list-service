import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBookInput } from 'src/graphql';
import { BooksRepository } from './books.repository';

@Resolver('Books')
export class BooksResolver {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Query()
  async listBooks() {
    return this.booksRepository.listBooks();
  }

  @Mutation()
  async createBook(@Args('input') input: CreateBookInput) {
    return this.booksRepository.createBook(input);
  }
}
