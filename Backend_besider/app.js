'use strict';
var express = require('express');
var app = express();
var rout = require("./routes/User_data");
var Motors = require("./routes/Motors");
var ss = require("./routes/T2");


app.use("/", (req, res) => {

    rout(req, res, () => {

        res.send("ERR Users");
    });

}).listen(3333, "127.0.0.1");


//start motors
console.log(ss);