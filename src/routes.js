const db = require("./db.js");
const sleeptime = require("./sleeptime");

function routes(fastify, options, done) {
    fastify.get('/database', {}, (request, reply) => {
        db.get_all_sleep_time(reply);
    })
    fastify.post('/database', {}, (request, reply) => {
        let form_key = Object.keys(request.body)[0];
        if (form_key.substring(0, 3) === "del") {
            db.delete_sleeptime(form_key.substring(4, form_key.length));
        }

        reply.send("Thanks!");
    })
    fastify.get('/input', {}, (request, reply) => {
        reply.view('./src/template/sleeptime.ejs', {});
    })
    fastify.post('/input', (request, reply) => {
        db.insert_into_db(sleeptime.parse_sleep_time_form(request.body));
        reply.send("Thanks!");
    })
    done();
}

module.exports = routes;