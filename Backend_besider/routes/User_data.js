'use strict';
var express = require('express');
var router = express.Router();
var Raw_DB = require("./DB/DB");
var Models = require("./DB/Models/Models");


//creat user url
router.get('/Register', function (req, res) {

    //headers controls
    var User_name = req.headers.username;
    var Password = req.headers.password;
    var email = req.headers.email;

    //control headers
    if (User_name.length < 4) {
        res.sendStatus(401);
    } else if (Password.length < 4) {
        res.sendStatus(401);
    } else if (email.length < 4) {
        res.sendStatus(401);
    } else if (User_name.length >= 5 && Password.length >= 5 && email.length >= 5) {

        //fill entitys
        Models.Model_User.Info.Email = email.toLowerCase();
        Models.Model_User.Info.Password = Password;
        Models.Model_User.Info.Username = User_name;

        //creat users
        Raw_DB.Register(Models.Model_User).then(result => {

            res.send(result);

        }, err => {

            res.sendStatus(401);
            console.log("ERR Creat User");

        });

    }

});

router.get("/login", (req, res) => {

    //fill entitys
    var Username = req.headers.username;
    var Password = req.headers.password;

    //recive data
    if (Username.length < 4) {
        res.sendStatus(401);
    } else if (Password.length < 4) {
        res.sendStatus(401);
    } else if (Username.length >= 5 && Password.length >= 5) {

        Raw_DB.login(Username, Password).then((result) => {

            res.end(result);
        })
    }
});


router.get("/resource_value", (req, res) => {

    var Username = req.headers.username;
    var Password = req.headers.password;

    Raw_DB.recive_values(Username, Password).then((result) => {

        res.send(result).end();


    });
});


router.get("/creat_wood_build", (req, res) => {

    var Username = req.headers.username;
    var Password = req.headers.password;
    var postion = req.headers.postion;
    var Type_build = req.headers.type_build;

    Raw_DB.creat_wood_build(Username, Password, postion, Type_build).then(() => {

        res.sendStatus(200).end();

    });

});


router.get("/creat_food_build", (req, res) => {

    var Username = req.headers.username;
    var Password = req.headers.password;
    var postion = req.headers.postion;
    var Type_build = req.headers.type_build;

    Raw_DB.creat_food_build(Username, Password, postion, Type_build).then(() => {
        res.sendStatus(200).end();
    });

});


router.get("/creat_stone_build", (req, res) => {
    var Username = req.headers.username;
    var Password = req.headers.password;
    var postion = req.headers.postion;
    var Type_build = req.headers.type_build;

    Raw_DB.creat_stone_build(Username, Password, postion, Type_build).then(() => {
        res.sendStatus(200).end();
    });

});


router.get("/recive_data_pos", (req, res) => {
    var Postions = req.headers.postions;

    Raw_DB.recive_postion_info(Postions).then((result) => {
        res.send(result).end();


    });

});


router.get("/creat_storage", (req, res) => {

    var Username = req.headers.username;
    var Password = req.headers.password;
    var Postion = req.headers.postion;

    Raw_DB.creat_storage(Username, Password, Postion).then(() => {

        res.sendStatus(200).end();

    });

});


router.get("/update_build", (req, res) => {

    var Username = req.headers.username;
    var Password = req.headers.password;
    var Type_build = req.headers.type_build;
    var ID_build = req.headers.id_build;

    Raw_DB.Update_build(Username, Password, ID_build, Type_build).then(() => {
        res.sendStatus(200).end();
    });

});


module.exports = router;



