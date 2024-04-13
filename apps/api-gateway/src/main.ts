import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new RpcExceptionFilter(),
  );
  const port = app.get(ConfigService).get("HTTP_PORT") 
  await app.listen(port);
}
bootstrap();
