import { randomUUID } from 'node:crypto';
import { Book, CreateBookInput, Status, UpdateBookInput } from 'src/graphql';

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
