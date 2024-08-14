import {Test} from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { AuthRepository } from './auth.repository'
import { UsersRepository } from '../Users/users.repository'
import { CreateUserDto } from '../Users/createUser.dto'
import { User } from '../Users/users.entity'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

describe('authRepository', ()=>{
 let authRepository: AuthRepository
 let mockUserRepository: Partial<UsersRepository>

 const mockUser: CreateUserDto={
  name:"christian",
  password:"33018Car@",
  confirmPassword:"33018Car@",
  address:"calle",
  city: "ciudad",
  phone: 12345678,
  country:"Argentina",
  email:"martin@mail.com",
  isAdmin:false,
 }
  
  beforeEach(async ()=>{
    mockUserRepository ={
      findUserByEmail: () => Promise.resolve(undefined),
      createUser:  (createUserDto: CreateUserDto) : Promise<User> => Promise.resolve({
        ...createUserDto,
        id:'05f43fd2-d7bf-492a-ae1f-b8ba3feb24b1',
        orders:[]
      })
    }
    const mockJwtService = {
      sign:(payload)=> jwt.sign(payload, 'testSecret')
    }
    const module = await Test.createTestingModule({
      providers:[AuthRepository,
        {
          provide: JwtService, 
          useValue: mockJwtService
        }, 
        {
        provide: UsersRepository,
        useValue: mockUserRepository
      }]
    }).compile()
    authRepository = module.get<AuthRepository>(AuthRepository)
   
  })
  
    it('Create an instace of AuthRepository', async ()=>{
      expect (authRepository).toBeDefined()
    })

    it('SignUp() creates a new user with a unique ID', async()=>{
    const user = await authRepository.signUp(mockUser)
    expect(user).toBeDefined
    expect(user.id).toMatch(/[a-zA-Z0-9-]{36}/)
    expect(user.email).toBe(mockUser.email);
     })

     it ('SignUp() throws an error if the email is already in use', async () =>{
        mockUserRepository.findUserByEmail = (email:string) =>
          Promise.resolve(mockUser as unknown as User);
        try{
          await authRepository.signUp(mockUser)
        }catch(error){
          expect(error.message).toEqual("El email ya se encuentra registrado")
        }
     })


    it('SignIn() return an error if the password is invalid', async ()=>{
      mockUserRepository.findUserByEmail=(email:string) => Promise.resolve(mockUser as unknown as User)
      try {
        await authRepository.signin(mockUser)
      } catch (error) {
        expect(error.message).toEqual('Email o password incorrectos')
      }
    })

    it('SignIn() return an error if user is not found', async ()=>{
      try {
        await authRepository.signin(mockUser)
      } catch (error) {
        expect(error.message).toEqual('Email o password incorrectos')
      }
    })

    it('SigIn() return an object with a message and a token if the user is found and the password is valid', async ()=>{
      const mockUserHashed={
        ...mockUser,
        password: await bcrypt.hash(mockUser.password, 10)
      }
      mockUserRepository.findUserByEmail = (email:string) => Promise.resolve(mockUserHashed as unknown as User)
      const response = await authRepository.signin(mockUser)
      expect(response).toBeDefined()
      expect(response.token).toBeDefined()
      expect(response.succes).toEqual('Login Exitoso, Tu sesion caducara en 1 hora')
    })

  })