import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'

@Entity({name: 'files'})
export class File{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column()
  fieldname:string

  @Column()
  originalname:string

  @Column()
  mimetype: string

  @Column()
  size: number
  
}