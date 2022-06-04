const db = require("./db.js");
const sleeptime = require("./sleeptime");
function routes(fastify, options,done) {
    fastify.get('/database', {}, (request, reply) => {
        db.get_all_sleep_time(reply);
    })
    fastify.get('/', {}, (request, reply) => {
        reply.view('./src/template/sleeptime.ejs',{});
    })
    fastify.post('/', (request, reply) => {
       db.insert_into_db(sleeptime.parse_sleep_time_form(request.body));
        reply.send("Thanks!");
    })
    done();
}

module.exports = routes;