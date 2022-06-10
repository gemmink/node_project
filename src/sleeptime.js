/**let sql = require("sqlite3");
 let db = new sql.Database("sleep.db");
 */
const sql_column_map = {
    id_col: "id", quality_col: "quality", wakeup_col: "wakeup_time", bedtime_col: "bedtime"
};

function parse_sleep_time_form(json_sleeptime){
    let bed_time = new Date(json_sleeptime["bed_time"]);
    let wake_time = new Date(json_sleeptime["wake_time"]);
    let quality =  json_sleeptime["quality"];
    return new Sleep_Time(bed_time,wake_time,quality);
}


class Sleep_Time {
    constructor(bed_time, wake_time, quality) {
        this.bed_time = bed_time;
        this.wake_time = wake_time;
        this.quality = quality;
        this.id = 0;
    }

    wake_time_greater() {
        if (this.wake_time > this.bed_time) {
            return true;
        } else {
            return false;
        }
    };

    get_sleep_hours() {
        const seconds_to_hours_num = 3600000;
        return (this.wake_time - this.bed_time) / seconds_to_hours_num;
    }

    is_valid() {
        if (this.get_sleep_hours() < 24 && this.get_sleep_hours() > 0 && this.wake_time_greater()) {
            return true;
        } else {
            return false;
        }
    };

    get str_sleeptime() {
        return this.bed_time.toLocaleString() + " to " + this.wake_time.toLocaleString();
    };

}

function to_sleeptime_array(db_query) {
    let sleep_time_arr = [];
    for (let sql_json of db_query) {
        let sleep_obj = new Sleep_Time(
            new Date(sql_json[sql_column_map.bedtime_col]),
            new Date(sql_json[sql_column_map.wakeup_col]),
            sql_json[sql_column_map.quality_col]);
        sleep_obj.id =  sql_json[sql_column_map.id_col];
        sleep_time_arr.push(sleep_obj);
    }
    return sleep_time_arr;
}

module.exports.parse_sleep_time_form = parse_sleep_time_form;
module.exports.Sleep_Time = Sleep_Time;
module.exports.to_sleeptime_array = to_sleeptime_array;
