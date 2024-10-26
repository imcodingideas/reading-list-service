import { randomUUID } from 'node:crypto';
import { Book, CreateBookInput, Status, UpdateBookInput } from '../graphql';

let books: Book[] = [
  {
    id: randomUUID(),
    title: 'Book 1',
    author: 'Author 1',
    status: Status.COMPLETED,
    rating: 4,
    notes: 'Notes for Book 1',
  },
  {
    id: randomUUID(),
    title: 'Book 2',
    author: 'Author 2',
    status: Status.IN_PROGRESS,
    rating: 3,
    notes: 'Notes for Book 2',
  },
  {
    id: randomUUID(),
    title: 'Book 3',
    author: 'Author 3',
    status: Status.NOT_STARTED,
    rating: 2,
    notes: 'Notes for Book 3',
  },
  {
    id: randomUUID(),
    title: 'Book 4',
    author: 'Author 4',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 4',
  },
  {
    id: randomUUID(),
    title: 'Book 5',
    author: 'Author 5',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 5',
  },
  {
    id: randomUUID(),
    title: 'Book 6',
    author: 'Author 6',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 6',
  },
  {
    id: randomUUID(),
    title: 'Book 7',
    author: 'Author 7',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 7',
  },
  {
    id: randomUUID(),
    title: 'Book 8',
    author: 'Author 8',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 8',
  },
  {
    id: randomUUID(),
    title: 'Book 9',
    author: 'Author 9',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 9',
  },
  {
    id: randomUUID(),
    title: 'Book 10',
    author: 'Author 10',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 10',
  },
  {
    id: randomUUID(),
    title: 'Book 11',
    author: 'Author 11',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 11',
  },
  {
    id: randomUUID(),
    title: 'Book 12',
    author: 'Author 12',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 12',
  },
  {
    id: randomUUID(),
    title: 'Book 13',
    author: 'Author 13',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 13',
  },
  {
    id: randomUUID(),
    title: 'Book 14',
    author: 'Author 14',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 14',
  },
  {
    id: randomUUID(),
    title: 'Book 15',
    author: 'Author 15',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 15',
  },
  {
    id: randomUUID(),
    title: 'Book 16',
    author: 'Author 16',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 16',
  },
  {
    id: randomUUID(),
    title: 'Book 17',
    author: 'Author 17',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 17',
  },
  {
    id: randomUUID(),
    title: 'Book 18',
    author: 'Author 18',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 18',
  },
  {
    id: randomUUID(),
    title: 'Book 19',
    author: 'Author 19',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 19',
  },
  {
    id: randomUUID(),
    title: 'Book 20',
    author: 'Author 20',
    status: Status.NOT_STARTED,
    rating: 3,
    notes: 'Notes for Book 20',
  },
];

export class BooksRepository {
  getBookById(id: string): Book | null {
    return books.find((book) => book.id === id) ?? null;
  }

  listBooks(): Book[] {
    return books;
  }

  createBook(book: CreateBookInput): Book | null {
    const newBook: Book = {
      ...book,
      status: book.status ?? Status.NOT_STARTED,
      id: randomUUID(),
    };

    books = [...books, newBook];

    return newBook;
  }

  updateBook(book: UpdateBookInput): Book | null {
    books = books.map((b) => (b.id === book.id ? { ...b, ...book } : b));

    return books.find((b) => b.id === book.id) ?? null;
  }

  deleteBook(id: string): boolean {
    books = books.filter((book) => book.id !== id);

    return !books.find((b) => b.id === id);
  }
}
