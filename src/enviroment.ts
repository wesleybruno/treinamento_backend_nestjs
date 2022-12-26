

export interface IEnvironment {
  production: boolean;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  logging: boolean;
}

export const environment: IEnvironment = {
    production: false,
    dbHost: 'localhost',
    dbPort: 5432,
    dbName: 'db',
    dbUsername: 'admin',
    dbPassword: '123456',
    logging: true,
  };