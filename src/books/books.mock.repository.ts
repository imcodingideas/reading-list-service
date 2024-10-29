import { randomUUID } from 'node:crypto';
import { Book, CreateBookInput, Status, UpdateBookInput } from '../graphql';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

let books: Book[] = JSON.parse(
  readFileSync(join(process.cwd(), 'src/books/books.json'), 'utf8'),
);

export class BooksMockRepository {
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    books = [...books, newBook];

    return newBook;
  }

  updateBook(book: UpdateBookInput): Book | null {
    books = books.map((b) =>
      b.id === book.id ? { ...b, ...book, updatedAt: new Date() } : b,
    );

    return books.find((b) => b.id === book.id) ?? null;
  }

  deleteBook(id: string): boolean {
    books = books.filter((book) => book.id !== id);

    return !books.find((b) => b.id === id);
  }
}
