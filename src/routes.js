const db = require("./db.js");
const sleeptime = require("./sleeptime");

function get_number_from_form(str_form)
{
   return str_form.substring(4, str_form.length);
}


function routes(fastify, options, done) {
    fastify.get('/', {}, (request, reply) => {
        reply.view('./src/template/index.ejs', {});
    })
    fastify.get('/database', {}, (request, reply) => {
        db.get_all_sleep_time(reply);
    })
    fastify.post('/database', {}, (request, reply) => {
        let form_key = Object.keys(request.body)[0];
        if (form_key.substring(0, 3) === "del") {
            db.delete_sleeptime(get_number_from_form(form_key));
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