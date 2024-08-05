import { Injectable } from "@nestjs/common";
import { FilesRepository } from "./files.repository";

@Injectable()
export class FilesServices{
  constructor(private readonly FilesRepository:FilesRepository){}
  
}