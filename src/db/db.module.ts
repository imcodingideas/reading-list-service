import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config/db';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig)],
})
export class DbModule {}
