import request from 'supertest'
import {app} from '../../app'

it('returns a 200 on successful signin', async () => {
    process.env.JWT_KEY='asdfgh'
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(200)
})

it('returns a 400 with missing email', async () => {
    

    return request(app)
    .post('/api/users/signin')
    .send({
      
        password: 'password'
    })
    .expect(400)
})
it("fails when email doesn't exist is supplied", async () => {
    

    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)
})

it('fails when an incorrect password is provided', async () => {
 
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'hfkjh45sdf'
    })
    .expect(400)
})

it('response with a cookie when valid cridentials are provided', async () => {

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined();
})



