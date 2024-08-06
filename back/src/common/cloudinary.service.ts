import { Injectable } from "@nestjs/common";
import { UploadApiOptions, UploadApiResponse, v2 as cloudinary } from "cloudinary";
 

@Injectable()
export class CloudinaryService{
  async uploadFile(buffer: Buffer, originalName?:string): Promise<string>{
    const options: UploadApiOptions={
      folder:'upload', // esto es donde se sube, si no existe la carpeta, la crea
      public_id: originalName, // estaa es la referencia lo ideal es un uuid
      resource_type: 'auto' // que tipo de archivos es, Auto para que lo dedusca
    }
    return new Promise((resolve,reject)=>{
      const stream=cloudinary.uploader.upload_stream(
        options,
        (error,result)=>{
          error ? reject(error) : resolve(result.secure_url)
        }
      )
      stream.write(buffer)
      stream.end()
    })
  }   
}