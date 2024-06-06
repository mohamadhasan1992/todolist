import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TODO_PACKAGE_NAME } from '@app/common/types/todo';
import { TodoModule } from './todo.module';





async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "todo:50052",
        protoPath: join(__dirname, "../todo.proto"),
        package: TODO_PACKAGE_NAME
      } 

    }
  )

  await app.listen();
}
bootstrap();
