import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateBookInput,
  DeleteBookInput,
  GetBookByIdInput,
  UpdateBookInput,
} from 'src/graphql';
import { BooksRepository } from './books.repository';

@Resolver('Books')
export class BooksResolver {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Query()
  async listBooks() {
    return this.booksRepository.listBooks();
  }

  @Query()
  async getBookById(@Args('input') input: GetBookByIdInput) {
    return this.booksRepository.getBookById(input.id);
  }

  @Mutation()
  async createBook(@Args('input') input: CreateBookInput) {
    return this.booksRepository.createBook(input);
  }

  @Mutation()
  async updateBook(@Args('input') input: UpdateBookInput) {
    return this.booksRepository.updateBook(input);
  }

  @Mutation()
  async deleteBook(@Args('input') input: DeleteBookInput) {
    return this.booksRepository.deleteBook(input.id);
  }
}
