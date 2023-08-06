import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const typeormSettings = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  subscribers: [],
};

export const AppDataSource = new DataSource(
  typeormSettings as DataSourceOptions,
);
