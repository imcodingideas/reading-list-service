import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  Book,
  BOOK_SEARCH_SORT_COLUMN,
  BOOK_SEARCH_SORT_ORDER,
  Status,
} from '../graphql';
import { BooksRepository } from './books.repository';
import { BooksResolver } from './books.resolver';

const books: Book[] = JSON.parse(
  readFileSync(join(process.cwd(), 'src/books/books.json'), 'utf8'),
);

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksResolver, BooksRepository],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all books', async () => {
    const result = await resolver.books(books.length, 0);

    expect(result.node.length).toBe(books.length);
    expect(result.offsetPageInfo.totalResults).toBe(books.length);
    expect(result.offsetPageInfo.limit).toBe(books.length);
    expect(result.offsetPageInfo.offset).toBe(0);
    expect(result.offsetPageInfo.nextOffset).toBe(null);
    expect(result.offsetPageInfo.previousOffset).toBe(null);
    expect(result.node[0]).toStrictEqual(books[0]);
  });

  it('should return book by id', async () => {
    const result = await resolver.getBookById({ id: books[0].id });

    expect(result).toBeDefined();
    expect(result?.id).toBe(books[0].id);
  });

  it('should create book', async () => {
    const result = await resolver.createBook({
      title: 'New Book',
      author: 'New Author',
      status: Status.COMPLETED,
      rating: 5,
      notes: 'New Notes',
    });

    expect(result).toBeDefined();
    expect(result?.title).toBe('New Book');
    expect(result?.author).toBe('New Author');
    expect(result?.status).toBe(Status.COMPLETED);
    expect(result?.rating).toBe(5);
    expect(result?.notes).toBe('New Notes');
  });

  it('should update book', async () => {
    const result = await resolver.updateBook({
      id: books[0].id,
      title: 'Updated Book',
      author: 'Updated Author',
      status: Status.IN_PROGRESS,
      rating: 4,
      notes: 'Updated Notes',
    });
    const bookUpdated = await resolver.getBookById({ id: books[0].id });

    expect(result).toBeDefined();
    expect(bookUpdated).toBe(result);
  });

  it('should delete book', async () => {
    const result = await resolver.deleteBook({ id: books[0].id });
    const bookDeleted = await resolver.getBookById({ id: books[0].id });

    expect(result).toBeTruthy();
    expect(bookDeleted).toBeNull();
  });

  it('should return book search result', async () => {
    const result = await resolver.bookSearch(
      books.length,
      0,
      {
        column: BOOK_SEARCH_SORT_COLUMN.RATING,
        order: BOOK_SEARCH_SORT_ORDER.ASC,
      },
      {
        // There is only 1 book with rating 4 or more in the json file
        rating: 4,
      },
    );

    expect(result.node.length).toBe(1);
  });
});
