let sleeptime = require("../sleeptime.js");
let assert = require('assert');
let db = require('../db.js');

function test_sleeptime() {
    const time_1 = Date.parse('01 Jan 2020 10:00:00 GMT');
    const time_2 = Date.parse('01 Jan 2020 21:00:00 GMT');
    console.log(time_2);
    let sleep_time = new sleeptime.Sleep_Time(time_1, time_2, 4);
    assert(sleep_time.wake_time_greater());
    assert(sleep_time.get_sleep_hours() === 11);
    assert(sleep_time.is_valid() === true)
    const time_3 = Date.parse('01 Jan 2020 00:00:00 GMT');
    const time_4 = Date.parse('02 Jan 2020 01:00:00 GMT');
    let sleep_time_2 = new sleeptime.Sleep_Time(time_3, time_4, 4);
    console.log(time_3);
    assert(sleep_time_2.wake_time_greater());
    assert(sleep_time_2.get_sleep_hours() === 25);
    assert(sleep_time_2.is_valid() === false);
    try {
        db.insert_into_db(sleep_time_2);
    } catch (err) {
        console.log("did not work not");
    }

    try {
        db.get_all_sleep_time(()=>{});
    } catch (err) {
        console.log("did not work not");
    }
}
test_sleeptime();
module.exports.test = test_sleeptime;


/**
 * assert()
 *
 *
 */

