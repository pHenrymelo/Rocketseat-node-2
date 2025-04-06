import fastify from 'fastify'
import { knex } from './database/database'
import { env } from './env/index'

const app = fastify()

app.get('/hello', async () => {
    const test = await knex('sqlite_schema').select('*')

    return test
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("server is running")
})