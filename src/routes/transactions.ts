import type { FastifyInstance } from "fastify";
import { knex } from "../database/database";
import { z } from "zod";
import { randomUUID } from 'node:crypto'

export async function transactionRoutes(app:FastifyInstance) {

  app.get('/', async (request, reply) => {

    const transactions = await knex('transactions').select('*')

    reply.status(200).send(transactions)
  })

  app.post('/', async (request, reply) => {
    
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = createTransactionBodySchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(), 
      title,
      amount: type === 'credit' ? amount : amount * -1
    })

    reply.status(201).send()
})
}