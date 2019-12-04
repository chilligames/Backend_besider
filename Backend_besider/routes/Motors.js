var Raw_DB = require("./DB/DB");


class Motors {

    Feed_to_value() {
        var Feed = setTimeout(() => {
            Raw_DB.Motor_db.Feed_to_value();

            Feed.refresh();

        }, 1000);
    }
    worker_value() {
        var worker = setTimeout(() => {
            Raw_DB.Motor_db.Worker_minuse();
            worker.refresh();

        }, 1000);
    }
}

module.exports = new Motors();
