import { Injectable, Logger } from '@nestjs/common';
import { BookSeederService } from './book-seeder/book-seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly bookSeederService: BookSeederService,
  ) {}
  async seed() {
    const completed = await this.books();

    if (completed) {
      this.logger.log('Seeding completed');
    } else {
      this.logger.error('Seeding failed');
    }
  }
  async books() {
    try {
      const createdBooks = await this.bookSeederService.create(50);

      this.logger.debug('No. of books created : ' + createdBooks.length);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
