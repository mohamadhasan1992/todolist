import { status } from '@grpc/grpc-js';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const code =
      typeof exception.getError() === 'object'
        ? (exception.getError() as any).code
        : -1;

    let statusError;

    switch (code) {
      case status.FAILED_PRECONDITION:
        statusError = 422;
        break;
      default:
        statusError = 400;
    }

    return response.status(400).json({
      StatusCode: statusError,
      message: exception.message,
    });
  }
}