import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { QUERY_PACKAGE_NAME } from '@app/common/types';
import { OrderModule } from './order.module';




async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "order:50053",
        protoPath: join(__dirname, '../../../proto/query.proto'),
        package: QUERY_PACKAGE_NAME
      } 

    }
  )
  await app.listen();
}
bootstrap();

