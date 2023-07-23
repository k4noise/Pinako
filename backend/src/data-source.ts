import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import 'dotenv/config'; 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
