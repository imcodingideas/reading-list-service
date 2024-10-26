import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AllBooksConnection,
  Book,
  BOOK_SEARCH_SORT_COLUMN,
  BOOK_SEARCH_SORT_ORDER,
  BookSearchResultConnection,
  BooksSearchFilter,
  BooksSearchSort,
  CreateBookInput,
  DeleteBookInput,
  GetBookByIdInput,
  UpdateBookInput,
} from 'src/graphql';
import { BooksRepository } from './books.repository';

const filterBooks = (books: Book[], filter: BooksSearchFilter): Book[] => {
  if (!filter) {
    return books;
  }

  return books.filter((book) => {
    if (
      filter.title &&
      !book.title.toLowerCase().includes(filter.title.toLowerCase())
    ) {
      return false;
    }

    if (
      filter.author &&
      !book.author.toLowerCase().includes(filter.author.toLowerCase())
    ) {
      return false;
    }

    if (filter.status && book.status !== filter.status) {
      return false;
    }

    return true;
  });
};

const sortBooks = (books: Book[], sort: BooksSearchSort): Book[] => {
  if (!sort) {
    return books;
  }

  return books.sort((a, b) => {
    if (sort.column === BOOK_SEARCH_SORT_COLUMN.RATING) {
      if (sort.order === BOOK_SEARCH_SORT_ORDER.ASC) {
        return a.rating - b.rating;
      }
      return b.rating - a.rating;
    }

    if (sort.column === BOOK_SEARCH_SORT_COLUMN.TITLE) {
      if (sort.order === BOOK_SEARCH_SORT_ORDER.ASC) {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    }

    if (sort.column === BOOK_SEARCH_SORT_COLUMN.AUTHOR) {
      if (sort.order === BOOK_SEARCH_SORT_ORDER.ASC) {
        return a.author.localeCompare(b.author);
      }
      return b.author.localeCompare(a.author);
    }

    if (sort.column === BOOK_SEARCH_SORT_COLUMN.STATUS) {
      if (sort.order === BOOK_SEARCH_SORT_ORDER.ASC) {
        return a.status.localeCompare(b.status);
      }
      return b.status.localeCompare(a.status);
    }
  });
};

@Resolver('Books')
export class BooksResolver {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Query()
  async bookSearch(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('sort') sort: BooksSearchSort,
    @Args('filter') filter: BooksSearchFilter,
  ): Promise<BookSearchResultConnection> {
    const allBooks = this.booksRepository.listBooks();
    const filteredBooks = filterBooks(allBooks, filter);
    const sortedBooks = sortBooks(filteredBooks, sort);

    const totalResults = sortedBooks.length;
    const node = sortedBooks.slice(offset, offset + limit);
    const nextOffset = offset + limit < totalResults ? offset + limit : null;
    const previousOffset = offset - limit < 0 ? null : offset - limit;

    return {
      node,
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
