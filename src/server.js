const fastify = require('fastify')({
    logger: true
})
fastify.register(require("point-of-view"), {
    engine: {
        ejs: require("ejs"),
    },
});
fastify.register(require('@fastify/formbody'))
fastify.register(require('./routes'))

const start = async () => {
    try {
        await fastify.listen(3000,'0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()