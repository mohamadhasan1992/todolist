import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PaymentModule } from './payment.module';
import { PAYMENT_PACKAGE_NAME } from '@app/common';




async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "payment:50054",
        protoPath: join(__dirname, '../../proto/payment.proto'),
        package: PAYMENT_PACKAGE_NAME
      } 

    }
  )
  await app.listen();
}
bootstrap();

