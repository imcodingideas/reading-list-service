import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const logger = appContext.get(Logger);
  const seeder = appContext.get(SeederService);

  seeder
    .seed()
    .then(() => {
      logger.debug('Seeding complete!');
    })
    .catch((error) => {
      logger.error('Seeding failed!');
      throw error;
    })
    .finally(() => appContext.close());
}

bootstrap();
