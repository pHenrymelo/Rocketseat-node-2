import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
    return 'Hello fastify'
})

app.listen({
    port: 3333,
}).then(() => {
    console.log("server is running")
})