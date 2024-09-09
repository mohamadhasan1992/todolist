import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      transport: Transport.GRPC,
      options:{
        url: "authentication:50051",
        protoPath: join(__dirname, '../../proto/auth.proto'),
        package: AUTH_PACKAGE_NAME
      } 

    }
  )

  await app.listen()
}
bootstrap();
