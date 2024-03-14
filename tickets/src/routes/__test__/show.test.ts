import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('return 404 if the ticket is not exist', async () => {
  const id  = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send({}).expect(404);
});

it('return ticket if the ticket is  exist', async () => {
  const title = 'consert';
  const price = 100;

  const cookie = global.signin();
  const ticketRes = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    })
    .expect(201);

  const response = await request(app)
    .get(`/api/tickets/${ticketRes.body.id}`)
    .send({})
    .expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
