## Treinamento NestJS

 ```
 * NestJs
 * TypeOrm - postgres
 * TestContainer
```

## Requirements
 ```
 * docker
 * node
 * aws cli

aws --endpoint-url=http://localhost:4566 configure 

AWS_ACCESS_KEY_ID => "ACCESS_KEY_ID"
SECRET_ACCESS_KEY => "ACCESS_SECRET"
AWS_DEFAULT_REGION => "us-east-1"

 aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name NEW_ORDER

```

## Run

 ```
1 - npm i
2 - docker-compose up
3 - npm run start

```

## Run Tests

#### Integration

 ```
  npm run test:e2e
```
