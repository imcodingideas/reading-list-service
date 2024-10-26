import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateBookInput,
  DeleteBookInput,
  GetBookByIdInput,
  UpdateBookInput,
  AllBooksConnection,
} from 'src/graphql';
import { BooksRepository } from './books.repository';

@Resolver('Books')
export class BooksResolver {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Query()
  async books(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<AllBooksConnection> {
    const allBooks = this.booksRepository.listBooks();

    const totalResults = allBooks.length;
    const books = allBooks.slice(offset, offset + limit);
    const nextOffset = offset + limit < totalResults ? offset + limit : null;
    const previousOffset = offset - limit < 0 ? null : offset - limit;

    return {
      node: books,
      offsetPageInfo: {
        totalResults,
        limit,
        offset,
        nextOffset,
        previousOffset,
      },
    };
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
