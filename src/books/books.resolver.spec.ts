import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book as BookType, Status } from '../graphql';
import { Book } from './book.entity';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';

const books: BookType[] = [
  {
    id: '0560efd4-6fcd-46af-8317-9ea1282e7412',
    title: 'Book 1',
    author: 'Author 1',
    status: Status.NOT_STARTED,
    rating: 4,
    notes: 'Notes for Book 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        Logger,
        BooksResolver,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: jest.fn(() => books),
            findOne: jest.fn(({ where: { id } }: { where: { id: string } }) =>
              books.find((book) => book.id === id),
            ),
            count: jest.fn(() => books.length),
          },
        },
      ],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined the resolver', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all books', async () => {
    const expectedTotalBooks = 1;
    const result = await resolver.books(10, 0);

    expect(result.node.length).toBe(expectedTotalBooks);
    expect(result.offsetPageInfo.totalResults).toBe(expectedTotalBooks);
    expect(result.offsetPageInfo.limit).toBe(10);
    expect(result.offsetPageInfo.offset).toBe(0);
    expect(result.offsetPageInfo.nextOffset).toBe(null);
    expect(result.offsetPageInfo.previousOffset).toBe(null);
  });

  it('should return book by id', async () => {
    const result = await resolver.getBookById({ id: books[0].id });

    expect(result).toBeDefined();
    expect(result?.id).toBe(books[0].id);
  });
});
