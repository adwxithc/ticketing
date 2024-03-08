import request from 'supertest'
import {app} from '../../app'

it('returns a 201 on successful signup', async () => {
    process.env.JWT_KEY='asdfgh'
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)
})
it('returns a 400 with a invalid email', async () => {
    
    return request(app)
    .post('/api/users/signup')
    .send({
        email: '454djer653rf4ref45',
        password: 'password'
    })
    .expect(400)
})

it('returns a 400 with a invalid password', async () => {
    
    return request(app)
    .post('/api/users/signup')
    .send({
        email: '454djer653rf4ref45',
        password: 'pa'
    })
    .expect(400)
})

it('returns a 400 with misssing email and password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email:"test@test.com"
    })
    .expect(400)
    
    await request(app)
    .post('/api/users/signup')
    .send({
        email:"test@test.com"
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
    
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)
})
it('sets a cookie after a successful signup', async() =>{
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})