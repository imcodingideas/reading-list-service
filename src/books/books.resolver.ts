import { Query, Resolver } from '@nestjs/graphql';

const booksInMemory = [
  {
    name: 'Book 1',
  },
  {
    name: 'Book 2',
  },
  {
    name: 'Book 3',
  },
];

@Resolver('Books')
export class BooksResolver {
  constructor() {}

  @Query()
  async getBooks() {
    return booksInMemory;
  }
}
