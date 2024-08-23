import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { InventoryModule } from './inventory.module';
import { QUERY_PACKAGE_NAME } from '@app/common/types';




async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "order:50053",
        protoPath: join(__dirname, '../query.proto'),
        package: QUERY_PACKAGE_NAME
      } 

    }
  )
  await app.listen();
}
bootstrap();

