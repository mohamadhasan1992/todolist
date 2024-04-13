import * as bcrypt from "bcryptjs";




export const hashData = async (data: string) => {
    return await bcrypt.hash(data, 10);
}


export const compareHash = async(data: string, hashedData: string) => {
    return await bcrypt.compare(data, hashedData)
}