import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AllBooksConnection,
  Book,
  BookSearchResultConnection,
  BooksSearchFilter,
  BooksSearchSort,
  CreateBookInput,
  DeleteBookInput,
  GetBookByIdInput,
  UpdateBookInput,
} from '../graphql';
import { BooksService } from './books.service';

@Resolver('Books')
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly logger: Logger,
  ) {}

  @Query()
  async bookSearch(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('sort') sort: BooksSearchSort,
    @Args('filter') filter: BooksSearchFilter,
  ): Promise<BookSearchResultConnection> {
    const books = await this.booksService.bookSearch(
      limit,
      offset,
      sort,
      filter,
    );
    const totalResults = await this.booksService.bookSearchCount(filter);
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
  async books(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<AllBooksConnection> {
    this.logger.log('books');
    const books = await this.booksService.listBooks(limit, offset);
    const totalResults = await this.booksService.getBooksCount();
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
  async getBookById(
    @Args('input') input: GetBookByIdInput,
  ): Promise<Book | null> {
    return this.booksService.getBookById(input.id);
  }

  @Mutation()
  async createBook(
    @Args('input') input: CreateBookInput,
  ): Promise<Book | null> {
    return this.booksService.createBook(input);
  }

  @Mutation()
  async updateBook(
    @Args('input') input: UpdateBookInput,
  ): Promise<Book | null> {
    return this.booksService.updateBook(input.id, input);
  }

  @Mutation()
  async deleteBook(@Args('input') input: DeleteBookInput): Promise<boolean> {
    return this.booksService.deleteBook(input.id);
  }
}
