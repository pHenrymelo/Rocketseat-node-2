import fastify from 'fastify'
import { env } from './env/index'
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(transactionRoutes, {
    prefix: '/transactions'
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("server is running")
})