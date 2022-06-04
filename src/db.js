let sql = require("sqlite3");
let db = new sql.Database("./src/sleep.db");
let sleeptime = require("./sleeptime.js");
function insert_into_db(sleep_time) {
    console.log(sleep_time.bed_time);
    db.exec(`
    insert into sleep(wakeup_time, bedtime,quality) values
    (${sleep_time.wake_time.valueOf()},${sleep_time.bed_time.valueOf()},${sleep_time.quality.valueOf()});
    `);
}

function get_all_sleep_time(callback) {
    db.all(`select id,quality,wakeup_time, bedtime from sleep`, [],
        (err, rows) => {
            if (err) {
                callback.send("404 Error");
            }
            let sleeptime_arr = sleeptime.to_sleeptime_array(rows);
            console.log(sleeptime_arr);
            callback.view('./src/template/sleep.ejs',{sleeptime:sleeptime_arr});
        }
    );
}
function call(callback)
{
    callback.send('t');
}
module.exports.insert_into_db = insert_into_db;
module.exports.get_all_sleep_time = get_all_sleep_time;
module.exports.call = call;

