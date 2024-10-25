import { Query, Resolver } from '@nestjs/graphql';
import { Book, Status } from 'src/graphql';

const booksInMemory: Book[] = [
  {
    id: '1',
    title: 'Book 1',
    author: 'Author 1',
    status: Status.COMPLETED,
    rating: 4,
    notes: 'Notes for Book 1',
  },
  {
    id: '2',
    title: 'Book 2',
    author: 'Author 2',
    status: Status.IN_PROGRESS,
    rating: 3,
    notes: 'Notes for Book 2',
  },
  {
    id: '3',
    title: 'Book 3',
    author: 'Author 3',
    status: Status.NOT_STARTED,
    rating: 2,
    notes: 'Notes for Book 3',
  },
];

@Resolver('Books')
export class BooksResolver {
  constructor() {}

  @Query()
  async listBooks() {
    return booksInMemory;
  }
}
