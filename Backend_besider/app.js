'use strict';
var express = require('express');
var app = express();
var rout = require("./routes/User_data");


app.use("/", (req, res) => {

    rout(req, res, () => {

        res.send("ERR Users");
    });

}).listen(3333, "127.0.0.1");



