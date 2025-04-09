import { it, describe, beforeAll, afterAll, expect, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    await execSync('pnpm knex migrate:rollback --all')
    await execSync('pnpm knex migrate:latest')
  })

  it('shoud to be able to user create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4130,
        type: 'credit',
      })
      .expect(201)
  })

  it('shoud to be able to user list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4130,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if (cookies) {
      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)

      expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: 'Test Transaction',
          amount: 4130,
        }),
      ])
    }
  })

  it('shoud to be able to user get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4130,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if (cookies) {
      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)

      const id = listTransactionsResponse.body.transactions[0].id

      const getSpecificTransactionResponse = await request(app.server)
        .get(`/transactions/${id}`)
        .set('Cookie', cookies)
        .expect(200)

      expect(getSpecificTransactionResponse.body.transaction).toEqual(
        expect.objectContaining({
          title: 'Test Transaction',
          amount: 4130,
        }),
      )
    }
  })

  it('shoud to be able to user get the summary', async () => {
    const createCreditTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4130,
        type: 'credit',
      })

    const cookies = createCreditTransactionResponse.get('Set-Cookie')

    if (cookies) {
      const createDebitTransactionResponse = await request(app.server)
        .post('/transactions')
        .send({
          title: 'Test Transaction',
          amount: 2130,
          type: 'debit',
        })
        .set('Cookie', cookies)

      const transactionsSummaryResponse = await request(app.server)
        .get('/transactions/summary')
        .set('Cookie', cookies)
        .expect(200)

      expect(transactionsSummaryResponse.body.summary).toEqual(
        expect.objectContaining({
          amount: 2000,
        }),
      )
    }
  })
})
