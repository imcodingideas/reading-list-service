import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { dbConfig } from '../config/db';
import { BookSeederModule } from './book-seeder/book-seeder.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [join(process.cwd(), 'src/**/*.entity{.ts,.js}')],
    }),
    BookSeederModule,
  ],
  providers: [SeederService, Logger],
})
export class SeederModule {}
