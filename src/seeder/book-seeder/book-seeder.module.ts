import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../books/book.entity';
import { BookSeederService } from './book-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookSeederService, Logger],
  exports: [BookSeederService],
})
export class BookSeederModule {}
