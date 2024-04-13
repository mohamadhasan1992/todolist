import { RpcException } from "@nestjs/microservices";
import * as bcrypt from "bcryptjs";
import { catchError, throwError } from "rxjs";




export const hashData = async (data: string) => {
    return await bcrypt.hash(data, 10);
}


export const compareHash = async(data: string, hashedData: string) => {
    return await bcrypt.compare(data, hashedData)
}


export const handleError = (observable) => {
    return observable.pipe(
      catchError(error => throwError(() => {
        throw new RpcException(error.message);
      }))
    );
  }
  