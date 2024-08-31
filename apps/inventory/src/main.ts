import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { InventoryModule } from './inventory.module';
import { INVENTORY_PACKAGE_NAME } from '@app/common';




async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "inventory:50052",
        protoPath: join(__dirname, '../inventory.proto'),
        package: INVENTORY_PACKAGE_NAME
      } 

    }
  )
  await app.listen();
}
bootstrap();

