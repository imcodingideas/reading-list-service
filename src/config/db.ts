import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
  synchronize: true,
};
