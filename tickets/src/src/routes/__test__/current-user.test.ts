import request from 'supertest'
import {app} from '../../app'

it('response with the details about the current user', async () => {
    process.env.JWT_KEY='asdfgh'
    
    const cookie =await  global.signin()

    const response =await request(app)
    .get('/api/users/currentuser')
    .set('Cookie',cookie)
    .send({})
    .expect(200)
    expect(response.body.currentUser.email).toEqual('test@test.com')
    
})

it('response with null if user is not authenticated', async () => {

    const response =await request(app)
    .get('/api/users/currentuser')
    .send({})
    .expect(200)
    expect(response.body.currentUser).toEqual(null)
    
})