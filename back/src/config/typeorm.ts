import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv'
import { registerAs } from "@nestjs/config";
import { User } from "src/modules/Users/users.entity";
import { Product } from "src/modules/Products/products.entity";
import { Categories } from "src/modules/Categories/categories.entity";
import { Order } from "src/modules/Orders/order.entity";
import { OrderDetails } from "src/modules/Orders/orderDetails.entity";

dotenvConfig({path: '.env.development'})

const config ={
  type:'postgres',
  database: process.env.DB_NAME,
  host:process.env.DB_HOST,
  port:process.env.DB_PORT as unknown as number,
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,  
  autoLoadEntities: true,
  //dropSchema:true,     
  synchronize:true,
  logging:false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations:['dist/migrations/*{.ts,.js}']
}

export default registerAs('typeorm', ()=>config)

export const connectionSource = new DataSource(config as DataSourceOptions)
export const UserModel = connectionSource.getRepository(User)
export const ProductModel= connectionSource.getRepository(Product)
export const CategoriesModel= connectionSource.getRepository(Categories)
export const OrderModel= connectionSource.getRepository(Order)
export const OrderDetailsModel = connectionSource.getRepository(OrderDetails)