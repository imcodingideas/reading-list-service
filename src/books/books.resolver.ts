import { Query, Resolver } from '@nestjs/graphql';
import { BooksRepository } from './books.repository';

@Resolver('Books')
export class BooksResolver {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Query()
  async listBooks() {
    return this.booksRepository.listBooks();
  }
}
