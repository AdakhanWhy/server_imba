import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('APP_PORT');
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
