import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { QUERY_PACKAGE_NAME } from '@app/common/types';
import { PaymentModule } from './payment.module';




async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "payment:50054",
        protoPath: join(__dirname, '../../../proto/query.proto'),
        package: QUERY_PACKAGE_NAME
      } 

    }
  )
  await app.listen();
}
bootstrap();

