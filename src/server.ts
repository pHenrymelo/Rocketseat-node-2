import fastify from 'fastify'
import { env } from './env/index'
import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionRoutes, {
    prefix: '/transactions'
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("server is running")
})