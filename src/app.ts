import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { transactionRoutes } from './routes/transactions'
import { execSync } from 'node:child_process'

export const app = fastify()

app.addHook('onReady', async () => {
  await execSync('pnpm knex migrate:latest')
})

app.register(cookie)
app.register(transactionRoutes, {
  prefix: '/transactions',
})
