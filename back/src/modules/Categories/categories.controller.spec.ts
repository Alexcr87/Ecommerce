import { Test } from "@nestjs/testing"
import { CategoriesControllers } from "./categories.controllers"
import { CategoriesService } from "./categories.service"


describe('UsersController', ()=>{
  let categoriesControllers: CategoriesControllers
  let mockCategoriesService: Partial<CategoriesService>
  beforeEach(async ()=>{
    const module = await Test.createTestingModule({
      controllers:[CategoriesControllers],
      providers:[{provide:CategoriesService, useValue: mockCategoriesService}]
    }). compile()
    categoriesControllers = module.get<CategoriesControllers>(CategoriesControllers)
  })

  it('should be defined',()=>{
    expect(categoriesControllers).toBeDefined()
  })
})