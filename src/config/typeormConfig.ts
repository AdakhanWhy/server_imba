import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  port: +configService.get('DB_PORT'),
  host: configService.get('DB_HOST'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  entities: [__dirname + '/**/*.entity{.js, .ts}'],
  autoLoadEntities: true,
  synchronize: true,
});
