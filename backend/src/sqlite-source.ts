export const sqliteDataSource = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: false,
};
