import { bool } from "aws-sdk/clients/signer";


export interface IEnvironment {
  production: boolean;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  logging: boolean;
  authSecret: string;
  runningTest: bool;
}

export var environment: IEnvironment = {
  production: false,
  dbHost: process.env.POSTGRES_HOST,
  dbPort: parseInt(process.env.POSTGRES_PORT),
  dbName: process.env.POSTGRES_DB,
  dbUsername: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  authSecret: process.env.AUTH_SECRET_KEY,
  runningTest: parseInt(process.env.RUNNING_TESTS) == 1,
  logging: true,
};

export function updateEnv(newEnviroment: IEnvironment) {
  environment = newEnviroment;
};

export function updateAwsEnv(newEnviroment: IAwsEnvironment) {
  aws_environment = newEnviroment;
};
export interface IAwsEnvironment {
  queueName: string;
  hostQueueName: string;
  accessKeyId: string;
  secretKeyId: string;
  region: string;
}

export var aws_environment: IAwsEnvironment = {
  queueName: process.env.AWS_SQS_ORDER_QUEUE,
  hostQueueName: process.env.AWS_HOST_QUEUE,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretKeyId: process.env.ACCESS_SECRET,
  region: process.env.AWS_DEFAULT_REGION,
};