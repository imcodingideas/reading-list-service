import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema, MixedList } from 'typeorm';

export const TypeOrmTestingModule = (
  entities: MixedList<Function | string | EntitySchema>,
) =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
  });
