import { it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

it('shoud to be able to user create a new transaction'),
  async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4130,
        type: 'credit',
      })
      .expect(201)
  }
