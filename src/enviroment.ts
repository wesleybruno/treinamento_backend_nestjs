

export interface IEnvironment {
  production: boolean;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  logging: boolean;
  authSecret: string;
}

export var environment: IEnvironment = {
  production: false,
  dbHost: process.env.POSTGRES_HOST,
  dbPort: parseInt(process.env.POSTGRES_PORT),
  dbName: process.env.POSTGRES_DB,
  dbUsername: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  authSecret: process.env.AUTH_SECRET_KEY,
  logging: true,
};

export function updateEnv(newEnviroment: IEnvironment) {
  environment = newEnviroment;
};