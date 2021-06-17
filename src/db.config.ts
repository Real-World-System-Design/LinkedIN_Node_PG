import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: 'linkedin',
    password: 'linkedin',
    database: 'linkedin',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    dropSchema: true,
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
  };
}

export function createTypeOrmTestConfig(): TypeOrmModuleOptions {
  return{
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: ['src/entities/*.entity.ts'],
    dropSchema: true,
    logging: true,
    logger: 'advanced-console'
  }
}