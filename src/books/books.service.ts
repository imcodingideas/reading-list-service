import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BOOK_SEARCH_SORT_COLUMN,
  BooksSearchFilter,
  BooksSearchSort,
} from '../graphql';
import { BookDto } from './book.dto';
import { Book } from './book.entity';

const GRAPHQL_COLUMN_TO_TYPEORM_COLUMN = {
  [BOOK_SEARCH_SORT_COLUMN.TITLE]: BOOK_SEARCH_SORT_COLUMN.TITLE.toLowerCase(),
  [BOOK_SEARCH_SORT_COLUMN.AUTHOR]:
    BOOK_SEARCH_SORT_COLUMN.AUTHOR.toLowerCase(),
  [BOOK_SEARCH_SORT_COLUMN.STATUS]:
    BOOK_SEARCH_SORT_COLUMN.STATUS.toLowerCase(),
  [BOOK_SEARCH_SORT_COLUMN.RATING]:
    BOOK_SEARCH_SORT_COLUMN.RATING.toLowerCase(),
};

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async getBookById(id: string): Promise<Book | null> {
    return this.booksRepository.findOne({
      where: { id },
    });
  }

  async getBooksCount(): Promise<number> {
    return this.booksRepository.count();
  }

  async listBooks(limit: number, offset: number): Promise<Book[]> {
    return this.booksRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async bookSearch(
    limit: number,
    offset: number,
    sort: BooksSearchSort,
    filter: BooksSearchFilter,
  ): Promise<Book[]> {
    const books = await this.booksRepository.find({
      take: limit,
      skip: offset,
      order: {
        [GRAPHQL_COLUMN_TO_TYPEORM_COLUMN[sort.column]]: sort.order,
      },
      where: {
        ...filter,
      },
    });

    return books;
  }

  async bookSearchCount(filter: BooksSearchFilter): Promise<number> {
    const booksCount = await this.booksRepository.count({
      where: {
        ...filter,
      },
    });

    return booksCount;
  }

  async createBook(book: BookDto): Promise<Book | null> {
    return this.booksRepository.save(book);
  }

  async updateBook(id: string, book: Partial<Book>): Promise<Book | null> {
    const result = await this.booksRepository.update(id, book);

    return result.affected === 1
      ? this.booksRepository.findOne({ where: { id } })
      : null;
  }

  async deleteBook(id: string): Promise<boolean> {
    const result = await this.booksRepository.delete({
      id,
    });

    return result.affected === 1;
  }
}
