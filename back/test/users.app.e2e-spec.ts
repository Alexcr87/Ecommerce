import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken:string


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Probando Loguin', async ()=>{
    const req =(await request(app.getHttpServer()).post('/auth/signin').send({
      email: "julia@mail.com",
	    password: "123456yY@"
    }))
    authToken= req.body.token
  })
  it('Get /users/ return an array of users with an Ok status Code', async () => {
    const req = await request(app.getHttpServer()).get('/users').set('authorization', `Bearer ${authToken}`)
    console.log(req.body);
    expect (req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Array)
  });

  it('Get /users/id returns an user with an OK status code', async()=>{
    const req = await request(app.getHttpServer()).get('/users/631c2926-fae5-4613-a9de-8aeb5dd6fc90').set('authorization', `Bearer ${authToken}`)
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
  })
  it('Delete /users/:id delete a user with an OK status code', async()=>{
    const req = await request(app.getHttpServer()).delete('/users/b7bc51f6-ece7-472c-90bc-d206b3767d91').set('authorization', `Bearer ${authToken}`)
    expect(req.status).toBe(200)
  })
  it('Post /auth/signup create a user with an OK status code', async()=>{
   const req = await request(app.getHttpServer()).post('/auth/signup').send({
    id: "b7bc51f6-ece7-472c-90bc-d206b3767d91",
    email:'test@mail.com',
    password: '123456Test@',
    confirmPassword: '123456Test@',
    name: 'test',
    address:'123456Test@',
    phone:12345678,
    country:'Argentina',
    city:'Santos Lugares',
    isAdmin:true
   })
   console.log(req.body);
   
   expect(req.status).toBe(201)
   expect(req.body).toBeInstanceOf(Object)
  })

  
});
