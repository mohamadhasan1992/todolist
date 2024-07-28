import { RpcException } from "@nestjs/microservices";
import * as bcrypt from "bcryptjs";
import { catchError, throwError } from "rxjs";




export const hashData = async (data: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(data, salt);
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
  