let sql = require("sqlite3");
let db = new sql.Database("./src/sleep.db");
let sleeptime = require("./sleeptime.js");

function insert_into_db(sleep_time) {
    db.exec(`
    insert into sleep(wakeup_time, bedtime,quality) values
    (${sleep_time.wake_time.valueOf()},${sleep_time.bed_time.valueOf()},${sleep_time.quality.valueOf()});
    `);
}
function delete_sleeptime(sleeptime_id)
{
    db.exec(`
    DELETE FROM sleep WHERE id=${sleeptime_id};
    `);

}



function get_all_sleep_time(callback) {
    db.all(`select id,quality,wakeup_time, bedtime from sleep`, [],
        (err, rows) => {
            if (err) {
                callback.send("404 Error");
            }
            let sleeptime_array = sleeptime.to_sleeptime_array(rows);
            callback.view('./src/template/sleep.ejs',{sleeptime:sleeptime_array});
        }
    );
}
module.exports.insert_into_db = insert_into_db;
module.exports.get_all_sleep_time = get_all_sleep_time;
module.exports.delete_sleeptime = delete_sleeptime;
