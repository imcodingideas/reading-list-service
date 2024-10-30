import { base, en, Faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../books/book.entity';
import { Status } from '../../graphql';

@Injectable()
export class BookSeederService {
  faker: Faker;

  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly logger: Logger,
  ) {
    this.faker = new Faker({
      locale: [en, base],
    });
  }
  /**
   * Seed all books.
   *
   * @function
   */
  async create(count: number): Promise<Book[]> {
    const books = [];

    this.logger.log('Seeding books...');

    for (let i = 0; i < count; i++) {
      const book = new Book();
      book.title = this.faker.book.title();
      book.author = this.faker.book.author();
      book.status = this.faker.helpers.enumValue(Status);
      book.rating = this.faker.number.int({ min: 1, max: 5 });
      book.notes = this.faker.lorem.sentence({ min: 3, max: 7 });
      books.push(book);
    }

    try {
      this.logger.log(`Saving ${books.length} books.`);
      await this.booksRepository.save(books);
      this.logger.log(`Seeded ${books.length} books.`);
    } catch (error) {
      this.logger.error(error);
    }

    return books;
  }
}
