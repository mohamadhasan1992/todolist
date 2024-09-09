import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrderModule } from './order.module';
import { ORDER_PACKAGE_NAME } from '@app/common';




async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "order:50053",
        protoPath: join(__dirname, '../../proto/order.proto'),
        package: ORDER_PACKAGE_NAME
      } 

    }
  )
  await app.listen();
}
bootstrap();

