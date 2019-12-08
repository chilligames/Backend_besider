var Mongo_raw = require("mongodb");
var Mongo_string = "mongodb://localhost:27017/admin";
var Raw_model = require("./Models/Models");
var Raw_Time = require("moment");

class Data_base_user {


    async Register(model_data) {

        var result = "";

        //frist inject date
        model_data._id = new Mongo_raw.ObjectId();
        model_data.Monitise.Worker = 2;

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

            await connection.db("Besider").collection("Users").insertOne(model_data).then(id => {

                result = id.insertedId.toHexString();
            });

        });

        return result;
    };


    async Login(Username, password) {

        var result_login = "";

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

            await connection.db("Besider").collection("Users").findOne({ 'Info.Username': Username, 'Info.Password': password }).then(result_finde => {
                delete result_finde._id;

                result_login = JSON.stringify(result_finde);
            });
        })
        return result_login;
    };


    async creat_wood_build(Username, Password, Postion, type_build) {

        let Raw_model_resource = {
            ID: new Mongo_raw.ObjectId().toHexString(),
            Name: Username + Math.random(),
            Level: 1,
            Health: 1000,
            Postion: JSON.parse(Postion),
            Type_build: Number(type_build)
        }



        await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

            //cheack resurce here
            //cheak postion
            console.log("cheack here creat wood build");

            //insert to user build
            await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Wood_Build": Raw_model_resource } });

        });
    }


    async creat_food_build(Username, Password, Postion, type_build) {


        let Raw_model_resource = {
            ID: new Mongo_raw.ObjectId().toHexString(),
            Name: Username + Math.random(),
            Level: 1,
            Health: 1000,
            Postion: JSON.parse(Postion),
            Type_build: Number(type_build)
        }



        await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

            //cheack resurce here

            //cheak postion
            console.log("cheack here creat food build");

            //insert to user build
            await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Food_Build": Raw_model_resource } });

        });
    }


    async creat_stone_build(Username, Password, Postion, type_build) {

        let Raw_model_resource = {
            ID: new Mongo_raw.ObjectId().toHexString(),
            Name: Username + Math.random(),
            Level: 1,
            Health: 1000,
            Postion: JSON.parse(Postion),
            Type_build: Number(type_build)
        }



        await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

            //cheack resurce here
            //cheak postion
            console.log("cheack here creat stone build");

            //insert to user build
            await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Stone_Build": Raw_model_resource } });

        });
    }


    async creat_storage(Username, Password, Postion, type_build) {

        let Storage = {
            ID: new Mongo_raw.ObjectId().toHexString(),
            Name: Username + Math.random(),
            Level: 1,
            Health: 1000,
            Storage: 1000,
            Postion: JSON.parse(Postion),
            Type_build: Number(type_build)
        }



        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

            console.log("cheak storeage money");
            await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Storage_Build": Storage } });


        });


    }



    async recive_postion_info(Postions) {

        var End_result = { Builds: [] };

        //convert and new pos for start
        var C = JSON.parse(Postions);
        var N = { x: 0, z: 0 };

        await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

            await connection.db("Besider").collection("Users").find({}, {}).toArray().then(arry_find => {

                arry_find.forEach(values => {
                    Raw_model.Model_User = values;

                    //to arry builds near player
                    //wood
                    Raw_model.Model_User.Builds.Resource_Builds.Wood_Build.forEach(Build_wood => {

                        //fill values
                        Raw_model.Model_resource = Build_wood;
                        N.x = Raw_model.Model_resource.Postion.x;
                        N.z = Raw_model.Model_resource.Postion.z;

                        //formula for find distance
                        let A = Math.pow(N.x - C.x, 2);
                        let B = Math.pow(N.z - C.z, 2);

                        if (Math.sqrt(A + B) <= 80) {
                            End_result.Builds.push(Build_wood);
                        }

                    });

                    //food
                    Raw_model.Model_User.Builds.Resource_Builds.Food_Build.forEach(Build_food => {

                        //fill values
                        Raw_model.Model_resource = Build_food;
                        N.x = Raw_model.Model_resource.Postion.x;
                        N.z = Raw_model.Model_resource.Postion.z;

                        //formula for find distance
                        let A = Math.pow(N.x - C.x, 2);
                        let B = Math.pow(N.z - C.z, 2);

                        if (Math.sqrt(A + B) <= 80) {

                            End_result.Builds.push(Build_food);
                        }
                    });

                    //stone
                    Raw_model.Model_User.Builds.Resource_Builds.Stone_Build.forEach(Build_stone => {

                        //fill values
                        Raw_model.Model_resource = Build_stone;
                        N.x = Raw_model.Model_resource.Postion.x;
                        N.z = Raw_model.Model_resource.Postion.z;

                        //formula for find distance
                        let A = Math.pow(N.x - C.x, 2);
                        let B = Math.pow(N.z - C.z, 2);

                        if (Math.sqrt(A + B) <= 80) {

                            End_result.Builds.push(Build_stone);
                        }

                    });

                    //storage
                    Raw_model.Model_User.Builds.Resource_Builds.Storage_Build.forEach(Build_storage => {

                        //fill values
                        Raw_model.Model_resource = Build_storage;
                        N.x = Raw_model.Model_resource.Postion.x;
                        N.z = Raw_model.Model_resource.Postion.z;

                        //formula for find distance
                        let A = Math.pow(N.x - C.x, 2);
                        let B = Math.pow(N.z - C.z, 2);

                        if (Math.sqrt(A + B) <= 80) {

                            End_result.Builds.push(Build_storage);
                        }


                    });



                    //other build here

                });


            });

        });


        return End_result;


    }


    async recive_values(Username, Password) {

        var result = {
            Values: {
                Wood: 0,
                Food: 0,
                Stone: 0
            },
            Per_Values: {
                Per_Value_Wood: 0,
                Per_Value_Food: 0,
                Per_Value_Stone: 0
            },
            Storage: 0
        };

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection => {

            await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Data => {
                if (Data != null) {

                    Raw_model.Model_User = Data;
                    result.Values.Food = Raw_model.Model_User.Resource_Value.Food;
                    result.Values.Wood = Raw_model.Model_User.Resource_Value.Wood;
                    result.Values.Stone = Raw_model.Model_User.Resource_Value.Stone;

                }

                if (Data != null) {

                    Raw_model.Model_User = Data;
                    var user = Raw_model.Model_User;

                    //food
                    user.Builds.Resource_Builds.Food_Build.forEach(builds => {
                        switch (builds.Level) {
                            case 1: {
                                result.Per_Values.Per_Value_Food += 55;
                            } break;
                            case 2: {
                                result.Per_Values.Per_Value_Food += 60;
                            } break;
                            case 3: {
                                result.Per_Values.Per_Value_Food += 67;
                            } break;
                            case 4: {
                                result.Per_Values.Per_Value_Food += 72;
                            } break;
                            case 5: {
                                result.Per_Values.Per_Value_Food += 79;
                            } break;
                            case 6: {
                                result.Per_Values.Per_Value_Food += 87;
                            } break;
                            case 7: {
                                result.Per_Values.Per_Value_Food += 96;
                            } break;
                            case 8: {
                                result.Per_Values.Per_Value_Food += 106;
                            } break;
                            case 9: {
                                result.Per_Values.Per_Value_Food += 117;
                            } break;
                            case 10: {
                                result.Per_Values.Per_Value_Food += 131;
                            } break;
                            case 11: {
                                result.Per_Values.Per_Value_Food += 146;
                            } break;
                            case 12: {
                                result.Per_Values.Per_Value_Food += 167;
                            } break;
                            case 13: {
                                result.Per_Values.Per_Value_Food += 186;
                            } break;
                            case 14: {
                                result.Per_Values.Per_Value_Food += 212;
                            } break;
                            case 15: {
                                result.Per_Values.Per_Value_Food += 236;
                            } break;
                            case 16: {
                                result.Per_Values.Per_Value_Food += 268;
                            } break;
                            case 17: {
                                result.Per_Values.Per_Value_Food += 310;
                            } break;
                            case 18: {
                                result.Per_Values.Per_Value_Food += 349;
                            } break;
                            case 19: {
                                result.Per_Values.Per_Value_Food += 397;
                            } break;
                            case 20: {
                                result.Per_Values.Per_Value_Food += 453;
                            } break;
                            case 21: {
                                result.Per_Values.Per_Value_Food += 515;
                            } break;
                            case 22: {
                                result.Per_Values.Per_Value_Food += 590;
                            } break;
                            case 23: {
                                result.Per_Values.Per_Value_Food += 675;
                            } break;
                            case 24: {
                                result.Per_Values.Per_Value_Food += 775;
                            } break;
                            case 25: {
                                result.Per_Values.Per_Value_Food += 885;
                            } break;
                            case 26: {
                                result.Per_Values.Per_Value_Food += 1012;
                            } break;
                            case 27: {
                                result.Per_Values.Per_Value_Food += 1162;
                            } break;
                            case 28: {
                                result.Per_Values.Per_Value_Food += 1333;
                            } break;
                            case 29: {
                                result.Per_Values.Per_Value_Food += 1525;
                            } break;
                            case 30: {
                                result.Per_Values.Per_Value_Food += 1725;
                            } break;
                        }
                    });

                    //wood
                    user.Builds.Resource_Builds.Wood_Build.forEach(builds => {
                        switch (builds.Level) {
                            case 1: {
                                result.Per_Values.Per_Value_Wood += 55;
                            } break;
                            case 2: {
                                result.Per_Values.Per_Value_Wood += 60;
                            } break;
                            case 3: {
                                result.Per_Values.Per_Value_Wood += 67;
                            } break;
                            case 4: {
                                result.Per_Values.Per_Value_Wood += 72;
                            } break;
                            case 5: {
                                result.Per_Values.Per_Value_Wood += 79;
                            } break;
                            case 6: {
                                result.Per_Values.Per_Value_Wood += 87;
                            } break;
                            case 7: {
                                result.Per_Values.Per_Value_Wood += 96;
                            } break;
                            case 8: {
                                result.Per_Values.Per_Value_Wood += 106;
                            } break;
                            case 9: {
                                result.Per_Values.Per_Value_Wood += 117;
                            } break;
                            case 10: {
                                result.Per_Values.Per_Value_Wood += 131;
                            } break;
                            case 11: {
                                result.Per_Values.Per_Value_Wood += 146;
                            } break;
                            case 12: {
                                result.Per_Values.Per_Value_Wood += 167;
                            } break;
                            case 13: {
                                result.Per_Values.Per_Value_Wood += 186;
                            } break;
                            case 14: {
                                result.Per_Values.Per_Value_Wood += 212;
                            } break;
                            case 15: {
                                result.Per_Values.Per_Value_Wood += 236;
                            } break;
                            case 16: {
                                result.Per_Values.Per_Value_Wood += 268;
                            } break;
                            case 17: {
                                result.Per_Values.Per_Value_Wood += 310;
                            } break;
                            case 18: {
                                result.Per_Values.Per_Value_Wood += 349;
                            } break;
                            case 19: {
                                result.Per_Values.Per_Value_Wood += 397;
                            } break;
                            case 20: {
                                result.Per_Values.Per_Value_Wood += 453;
                            } break;
                            case 21: {
                                result.Per_Values.Per_Value_Wood += 515;
                            } break;
                            case 22: {
                                result.Per_Values.Per_Value_Wood += 590;
                            } break;
                            case 23: {
                                result.Per_Values.Per_Value_Wood += 675;
                            } break;
                            case 24: {
                                result.Per_Values.Per_Value_Wood += 775;
                            } break;
                            case 25: {
                                result.Per_Values.Per_Value_Wood += 885;
                            } break;
                            case 26: {
                                result.Per_Values.Per_Value_Wood += 1012;
                            } break;
                            case 27: {
                                result.Per_Values.Per_Value_Wood += 1162;
                            } break;
                            case 28: {
                                result.Per_Values.Per_Value_Wood += 1333;
                            } break;
                            case 29: {
                                result.Per_Values.Per_Value_Wood += 1525;
                            } break;
                            case 30: {
                                result.Per_Values.Per_Value_Wood += 1725;
                            } break;
                        }
                    });

                    //stone
                    user.Builds.Resource_Builds.Stone_Build.forEach(builds => {
                        switch (builds.Level) {
                            case 1: {
                                result.Per_Values.Per_Value_Stone += 55;
                            } break;
                            case 2: {
                                result.Per_Values.Per_Value_Stone += 60;
                            } break;
                            case 3: {
                                result.Per_Values.Per_Value_Stone += 67;
                            } break;
                            case 4: {
                                result.Per_Values.Per_Value_Stone += 72;
                            } break;
                            case 5: {
                                result.Per_Values.Per_Value_Stone += 79;
                            } break;
                            case 6: {
                                result.Per_Values.Per_Value_Stone += 87;
                            } break;
                            case 7: {
                                result.Per_Values.Per_Value_Stone += 96;
                            } break;
                            case 8: {
                                result.Per_Values.Per_Value_Stone += 106;
                            } break;
                            case 9: {
                                result.Per_Values.Per_Value_Stone += 117;
                            } break;
                            case 10: {
                                result.Per_Values.Per_Value_Stone += 131;
                            } break;
                            case 11: {
                                result.Per_Values.Per_Value_Stone += 146;
                            } break;
                            case 12: {
                                result.Per_Values.Per_Value_Stone += 167;
                            } break;
                            case 13: {
                                result.Per_Values.Per_Value_Stone += 186;
                            } break;
                            case 14: {
                                result.Per_Values.Per_Value_Stone += 212;
                            } break;
                            case 15: {
                                result.Per_Values.Per_Value_Stone += 236;
                            } break;
                            case 16: {
                                result.Per_Values.Per_Value_Stone += 268;
                            } break;
                            case 17: {
                                result.Per_Values.Per_Value_Stone += 310;
                            } break;
                            case 18: {
                                result.Per_Values.Per_Value_Stone += 349;
                            } break;
                            case 19: {
                                result.Per_Values.Per_Value_Stone += 397;
                            } break;
                            case 20: {
                                result.Per_Values.Per_Value_Stone += 453;
                            } break;
                            case 21: {
                                result.Per_Values.Per_Value_Stone += 515;
                            } break;
                            case 22: {
                                result.Per_Values.Per_Value_Stone += 590;
                            } break;
                            case 23: {
                                result.Per_Values.Per_Value_Stone += 675;
                            } break;
                            case 24: {
                                result.Per_Values.Per_Value_Stone += 775;
                            } break;
                            case 25: {
                                result.Per_Values.Per_Value_Stone += 885;
                            } break;
                            case 26: {
                                result.Per_Values.Per_Value_Stone += 1012;
                            } break;
                            case 27: {
                                result.Per_Values.Per_Value_Stone += 1162;
                            } break;
                            case 28: {
                                result.Per_Values.Per_Value_Stone += 1333;
                            } break;
                            case 29: {
                                result.Per_Values.Per_Value_Stone += 1525;
                            } break;
                            case 30: {
                                result.Per_Values.Per_Value_Stone += 1725;
                            } break;
                        }
                    });

                    //Store age
                    user.Builds.Resource_Builds.Storage_Build.forEach(builds => {

                        result.Storage += builds.Storage;
                    });
                }
            });

        });

        return result;
    }


    async Update_build(Username, Password, ID_build, Type_build) {

        var worker_update = {
            ID_Build: ID_build,
            To_level: 0,
            Type_build: Number(Type_build),
            Time: 0,
            Deserilze_time: { Y: 0, MO: 0, D: 0, H: 0, M: 0, S: 0 },
        }

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection => {

            switch (Number(Type_build)) {
                //wood
                case 0: {
                    await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Raw_User => {
                        //fill level and time
                        Raw_User.Builds.Resource_Builds.Wood_Build.forEach(async wood_build => {

                            //fill level and time
                            if (wood_build.ID == ID_build && wood_build.Level <= 29) {
                                //fill level time
                                wood_build.Level += 1;
                                worker_update.To_level = wood_build.Level;
                                switch (Number(wood_build.Level)) {

                                    case 2: {
                                        worker_update.Time = Raw_Time().add(4, "m").add(2, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "m").add(2, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "m").add(2, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "m").add(2, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "m").add(2, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "m").add(2, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "m").add(2, "s").second();
                                    } break;
                                    case 3: {
                                        worker_update.Time = Raw_Time().add(5, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "m").add(6, "s").second();
                                    } break;
                                    case 4: {
                                        worker_update.Time = Raw_Time().add(6, "m").add(25, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "m").add(25, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "m").add(25, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "m").add(25, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "m").add(25, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "m").add(25, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "m").add(25, "s").second();
                                    } break;
                                    case 5: {
                                        worker_update.Time = Raw_Time().add(8, "m").add(5, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "m").add(5, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "m").add(5, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "m").add(5, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "m").add(5, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "m").add(5, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "m").add(5, "s").second();
                                    } break;
                                    case 6: {
                                        worker_update.Time = Raw_Time().add(10, "m").add(12, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "m").add(12, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "m").add(12, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "m").add(12, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "m").add(12, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "m").add(12, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "m").add(12, "s").second();
                                    } break;
                                    case 7: {
                                        worker_update.Time = Raw_Time().add(12, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(12, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(12, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(12, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(12, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(12, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(12, "m").add(51, "s").second();
                                    } break;
                                    case 8: {
                                        worker_update.Time = Raw_Time().add(16, "m").add(11, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(16, "m").add(11, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(16, "m").add(11, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(16, "m").add(11, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(16, "m").add(11, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(16, "m").add(11, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(16, "m").add(11, "s").second();
                                    } break;
                                    case 9: {
                                        worker_update.Time = Raw_Time().add(20, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(20, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(20, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(20, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(20, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(20, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(20, "m").add(24, "s").second();
                                    } break;
                                    case 10: {
                                        worker_update.Time = Raw_Time().add(25, "m").add(43, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(25, "m").add(43, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(25, "m").add(43, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(25, "m").add(43, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(25, "m").add(43, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(25, "m").add(43, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(25, "m").add(43, "s").second();
                                    } break;
                                    case 11: {
                                        worker_update.Time = Raw_Time().add(32, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(32, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(32, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(32, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(32, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(32, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(32, "m").add(24, "s").second();
                                    } break;
                                    case 12: {
                                        worker_update.Time = Raw_Time().add(40, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(40, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(40, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(40, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(40, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(40, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(40, "m").add(49, "s").second();
                                    } break;
                                    case 13: {
                                        worker_update.Time = Raw_Time().add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(51, "m").add(26, "s").second();
                                    } break;
                                    case 14: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(51, "m").add(26, "s").second();
                                    } break;
                                    case 15: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(4, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(4, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(4, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(4, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(4, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(4, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(4, "m").add(49, "s").second();
                                    } break;
                                    case 16: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(42, "m").add(54, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(42, "m").add(54, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(42, "m").add(54, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(42, "m").add(54, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(42, "m").add(54, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(42, "m").add(54, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(42, "m").add(54, "s").second();
                                    } break;
                                    case 17: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(9, "m").add(40, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(9, "m").add(40, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(9, "m").add(40, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(9, "m").add(40, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(9, "m").add(40, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(9, "m").add(40, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(9, "m").add(40, "s").second();
                                    } break;
                                    case 18: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(43, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(43, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(43, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(43, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(43, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(43, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(43, "m").add(23, "s").second();
                                    } break;
                                    case 19: {
                                        worker_update.Time = Raw_Time().add(3, "h").add(25, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(3, "h").add(25, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(3, "h").add(25, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(3, "h").add(25, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(3, "h").add(25, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(3, "h").add(25, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(3, "h").add(25, "m").add(51, "s").second();
                                    } break;
                                    case 20: {
                                        worker_update.Time = Raw_Time().add(4, "h").add(19, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "h").add(19, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "h").add(19, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "h").add(19, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "h").add(19, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "h").add(19, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "h").add(19, "m").add(23, "s").second();
                                    } break;
                                    case 21: {
                                        worker_update.Time = Raw_Time().add(5, "h").add(26, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "h").add(26, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "h").add(26, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "h").add(26, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "h").add(26, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "h").add(26, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "h").add(26, "m").add(49, "s").second();
                                    } break;
                                    case 22: {
                                        worker_update.Time = Raw_Time().add(6, "h").add(51, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "h").add(51, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "h").add(51, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "h").add(51, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "h").add(51, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "h").add(51, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "h").add(51, "m").add(48, "s").second();
                                    } break;
                                    case 23: {
                                        worker_update.Time = Raw_Time().add(8, "h").add(38, "m").add(52, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "h").add(38, "m").add(52, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "h").add(38, "m").add(52, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "h").add(38, "m").add(52, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "h").add(38, "m").add(52, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "h").add(38, "m").add(52, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "h").add(38, "m").add(52, "s").second();
                                    } break;
                                    case 24: {
                                        worker_update.Time = Raw_Time().add(10, "h").add(53, "m").add(46, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "h").add(53, "m").add(46, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "h").add(53, "m").add(46, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "h").add(53, "m").add(46, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "h").add(53, "m").add(46, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "h").add(53, "m").add(46, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "h").add(53, "m").add(46, "s").second();
                                    } break;
                                    case 25: {
                                        worker_update.Time = Raw_Time().add(13, "h").add(43, "m").add(45, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(13, "h").add(43, "m").add(45, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(13, "h").add(43, "m").add(45, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(13, "h").add(43, "m").add(45, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(13, "h").add(43, "m").add(45, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(13, "h").add(43, "m").add(45, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(13, "h").add(43, "m").add(45, "s").second();
                                    } break;
                                    case 26: {
                                        worker_update.Time = Raw_Time().add(17, "h").add(17, "m").add(56, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(17, "h").add(17, "m").add(56, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(17, "h").add(17, "m").add(56, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(17, "h").add(17, "m").add(56, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(17, "h").add(17, "m").add(56, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(17, "h").add(17, "m").add(56, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(17, "h").add(17, "m").add(56, "s").second();
                                    } break;
                                    case 27: {
                                        worker_update.Time = Raw_Time().add(21, "h").add(47, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(21, "h").add(47, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(21, "h").add(47, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(21, "h").add(47, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(21, "h").add(47, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(21, "h").add(47, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(21, "h").add(47, "m").add(48, "s").second();
                                    } break;
                                    case 28: {
                                        worker_update.Time = Raw_Time().add(27, "h").add(27, "m").add(50, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(27, "h").add(27, "m").add(50, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(27, "h").add(27, "m").add(50, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(27, "h").add(27, "m").add(50, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(27, "h").add(27, "m").add(50, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(27, "h").add(27, "m").add(50, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(27, "h").add(27, "m").add(50, "s").second();
                                    } break;
                                    case 29: {
                                        worker_update.Time = Raw_Time().add(34, "h").add(36, "m").add(16, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(34, "h").add(36, "m").add(16, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(34, "h").add(36, "m").add(16, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(34, "h").add(36, "m").add(16, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(34, "h").add(36, "m").add(16, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(34, "h").add(36, "m").add(16, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(34, "h").add(36, "m").add(16, "s").second();
                                    } break;
                                    case 30: {
                                        worker_update.Time = Raw_Time().add(43, "h").add(36, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(43, "h").add(36, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(43, "h").add(36, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(43, "h").add(36, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(43, "h").add(36, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(43, "h").add(36, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(43, "h").add(36, "m").add(6, "s").second();
                                    } break;
                                }

                                //equal data with player acc
                                await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });
                            }


                        });

                    });
                } break;
                //food
                case 1: {

                    await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Raw_User => {
                        //fill level and time
                        Raw_User.Builds.Resource_Builds.Food_Build.forEach(async Food_Build => {

                            //fill level
                            if (Food_Build.ID == ID_build && Food_Build.Level <= 29) {
                                Food_Build.Level += 1;
                                worker_update.To_level = Food_Build.Level;
                                switch (Number(Food_Build.Level)) {

                                    case 2: {
                                        worker_update.Time = Raw_Time().add(4, "m").add(2, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "m").add(2, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "m").add(2, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "m").add(2, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "m").add(2, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "m").add(2, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "m").add(2, "s").second();
                                    } break;
                                    case 3: {
                                        worker_update.Time = Raw_Time().add(5, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "m").add(6, "s").second();
                                    } break;
                                    case 4: {
                                        worker_update.Time = Raw_Time().add(6, "m").add(25, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "m").add(25, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "m").add(25, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "m").add(25, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "m").add(25, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "m").add(25, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "m").add(25, "s").second();
                                    } break;
                                    case 5: {
                                        worker_update.Time = Raw_Time().add(8, "m").add(5, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "m").add(5, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "m").add(5, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "m").add(5, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "m").add(5, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "m").add(5, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "m").add(5, "s").second();
                                    } break;
                                    case 6: {
                                        worker_update.Time = Raw_Time().add(10, "m").add(12, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "m").add(12, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "m").add(12, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "m").add(12, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "m").add(12, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "m").add(12, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "m").add(12, "s").second();
                                    } break;
                                    case 7: {
                                        worker_update.Time = Raw_Time().add(12, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(12, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(12, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(12, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(12, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(12, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(12, "m").add(51, "s").second();
                                    } break;
                                    case 8: {
                                        worker_update.Time = Raw_Time().add(16, "m").add(11, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(16, "m").add(11, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(16, "m").add(11, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(16, "m").add(11, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(16, "m").add(11, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(16, "m").add(11, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(16, "m").add(11, "s").second();
                                    } break;
                                    case 9: {
                                        worker_update.Time = Raw_Time().add(20, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(20, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(20, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(20, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(20, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(20, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(20, "m").add(24, "s").second();
                                    } break;
                                    case 10: {
                                        worker_update.Time = Raw_Time().add(25, "m").add(43, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(25, "m").add(43, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(25, "m").add(43, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(25, "m").add(43, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(25, "m").add(43, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(25, "m").add(43, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(25, "m").add(43, "s").second();
                                    } break;
                                    case 11: {
                                        worker_update.Time = Raw_Time().add(32, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(32, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(32, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(32, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(32, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(32, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(32, "m").add(24, "s").second();
                                    } break;
                                    case 12: {
                                        worker_update.Time = Raw_Time().add(40, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(40, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(40, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(40, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(40, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(40, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(40, "m").add(49, "s").second();
                                    } break;
                                    case 13: {
                                        worker_update.Time = Raw_Time().add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(51, "m").add(26, "s").second();
                                    } break;
                                    case 14: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(51, "m").add(26, "s").second();
                                    } break;
                                    case 15: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(4, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(4, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(4, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(4, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(4, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(4, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(4, "m").add(49, "s").second();
                                    } break;
                                    case 16: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(42, "m").add(54, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(42, "m").add(54, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(42, "m").add(54, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(42, "m").add(54, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(42, "m").add(54, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(42, "m").add(54, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(42, "m").add(54, "s").second();
                                    } break;
                                    case 17: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(9, "m").add(40, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(9, "m").add(40, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(9, "m").add(40, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(9, "m").add(40, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(9, "m").add(40, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(9, "m").add(40, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(9, "m").add(40, "s").second();
                                    } break;
                                    case 18: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(43, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(43, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(43, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(43, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(43, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(43, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(43, "m").add(23, "s").second();
                                    } break;
                                    case 19: {
                                        worker_update.Time = Raw_Time().add(3, "h").add(25, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(3, "h").add(25, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(3, "h").add(25, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(3, "h").add(25, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(3, "h").add(25, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(3, "h").add(25, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(3, "h").add(25, "m").add(51, "s").second();
                                    } break;
                                    case 20: {
                                        worker_update.Time = Raw_Time().add(4, "h").add(19, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "h").add(19, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "h").add(19, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "h").add(19, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "h").add(19, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "h").add(19, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "h").add(19, "m").add(23, "s").second();
                                    } break;
                                    case 21: {
                                        worker_update.Time = Raw_Time().add(5, "h").add(26, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "h").add(26, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "h").add(26, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "h").add(26, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "h").add(26, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "h").add(26, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "h").add(26, "m").add(49, "s").second();
                                    } break;
                                    case 22: {
                                        worker_update.Time = Raw_Time().add(6, "h").add(51, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "h").add(51, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "h").add(51, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "h").add(51, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "h").add(51, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "h").add(51, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "h").add(51, "m").add(48, "s").second();
                                    } break;
                                    case 23: {
                                        worker_update.Time = Raw_Time().add(8, "h").add(38, "m").add(52, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "h").add(38, "m").add(52, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "h").add(38, "m").add(52, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "h").add(38, "m").add(52, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "h").add(38, "m").add(52, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "h").add(38, "m").add(52, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "h").add(38, "m").add(52, "s").second();
                                    } break;
                                    case 24: {
                                        worker_update.Time = Raw_Time().add(10, "h").add(53, "m").add(46, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "h").add(53, "m").add(46, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "h").add(53, "m").add(46, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "h").add(53, "m").add(46, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "h").add(53, "m").add(46, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "h").add(53, "m").add(46, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "h").add(53, "m").add(46, "s").second();
                                    } break;
                                    case 25: {
                                        worker_update.Time = Raw_Time().add(13, "h").add(43, "m").add(45, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(13, "h").add(43, "m").add(45, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(13, "h").add(43, "m").add(45, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(13, "h").add(43, "m").add(45, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(13, "h").add(43, "m").add(45, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(13, "h").add(43, "m").add(45, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(13, "h").add(43, "m").add(45, "s").second();
                                    } break;
                                    case 26: {
                                        worker_update.Time = Raw_Time().add(17, "h").add(17, "m").add(56, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(17, "h").add(17, "m").add(56, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(17, "h").add(17, "m").add(56, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(17, "h").add(17, "m").add(56, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(17, "h").add(17, "m").add(56, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(17, "h").add(17, "m").add(56, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(17, "h").add(17, "m").add(56, "s").second();
                                    } break;
                                    case 27: {
                                        worker_update.Time = Raw_Time().add(21, "h").add(47, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(21, "h").add(47, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(21, "h").add(47, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(21, "h").add(47, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(21, "h").add(47, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(21, "h").add(47, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(21, "h").add(47, "m").add(48, "s").second();
                                    } break;
                                    case 28: {
                                        worker_update.Time = Raw_Time().add(27, "h").add(27, "m").add(50, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(27, "h").add(27, "m").add(50, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(27, "h").add(27, "m").add(50, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(27, "h").add(27, "m").add(50, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(27, "h").add(27, "m").add(50, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(27, "h").add(27, "m").add(50, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(27, "h").add(27, "m").add(50, "s").second();
                                    } break;
                                    case 29: {
                                        worker_update.Time = Raw_Time().add(34, "h").add(36, "m").add(16, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(34, "h").add(36, "m").add(16, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(34, "h").add(36, "m").add(16, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(34, "h").add(36, "m").add(16, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(34, "h").add(36, "m").add(16, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(34, "h").add(36, "m").add(16, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(34, "h").add(36, "m").add(16, "s").second();
                                    } break;
                                    case 30: {
                                        worker_update.Time = Raw_Time().add(43, "h").add(36, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(43, "h").add(36, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(43, "h").add(36, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(43, "h").add(36, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(43, "h").add(36, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(43, "h").add(36, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(43, "h").add(36, "m").add(6, "s").second();
                                    } break;
                                }

                                //equal data with player acc

                                await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });
                            }

                        });

                    });

                } break;
                //stone
                case 2: {
                    await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Raw_User => {
                        //fill level and time
                        Raw_User.Builds.Resource_Builds.Stone_Build.forEach(async Stone_Build => {

                            //fill level
                            if (Stone_Build.ID == ID_build && Stone_Build.Level <= 29) {
                                Stone_Build.Level += 1;
                                worker_update.To_level = Stone_Build.Level;
                                switch (Number(Stone_Build.Level)) {

                                    case 2: {
                                        worker_update.Time = Raw_Time().add(4, "m").add(2, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "m").add(2, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "m").add(2, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "m").add(2, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "m").add(2, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "m").add(2, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "m").add(2, "s").second();
                                    } break;
                                    case 3: {
                                        worker_update.Time = Raw_Time().add(5, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "m").add(6, "s").second();
                                    } break;
                                    case 4: {
                                        worker_update.Time = Raw_Time().add(6, "m").add(25, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "m").add(25, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "m").add(25, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "m").add(25, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "m").add(25, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "m").add(25, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "m").add(25, "s").second();
                                    } break;
                                    case 5: {
                                        worker_update.Time = Raw_Time().add(8, "m").add(5, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "m").add(5, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "m").add(5, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "m").add(5, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "m").add(5, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "m").add(5, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "m").add(5, "s").second();
                                    } break;
                                    case 6: {
                                        worker_update.Time = Raw_Time().add(10, "m").add(12, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "m").add(12, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "m").add(12, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "m").add(12, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "m").add(12, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "m").add(12, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "m").add(12, "s").second();
                                    } break;
                                    case 7: {
                                        worker_update.Time = Raw_Time().add(12, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(12, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(12, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(12, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(12, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(12, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(12, "m").add(51, "s").second();
                                    } break;
                                    case 8: {
                                        worker_update.Time = Raw_Time().add(16, "m").add(11, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(16, "m").add(11, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(16, "m").add(11, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(16, "m").add(11, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(16, "m").add(11, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(16, "m").add(11, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(16, "m").add(11, "s").second();
                                    } break;
                                    case 9: {
                                        worker_update.Time = Raw_Time().add(20, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(20, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(20, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(20, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(20, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(20, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(20, "m").add(24, "s").second();
                                    } break;
                                    case 10: {
                                        worker_update.Time = Raw_Time().add(25, "m").add(43, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(25, "m").add(43, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(25, "m").add(43, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(25, "m").add(43, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(25, "m").add(43, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(25, "m").add(43, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(25, "m").add(43, "s").second();
                                    } break;
                                    case 11: {
                                        worker_update.Time = Raw_Time().add(32, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(32, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(32, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(32, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(32, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(32, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(32, "m").add(24, "s").second();
                                    } break;
                                    case 12: {
                                        worker_update.Time = Raw_Time().add(40, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(40, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(40, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(40, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(40, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(40, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(40, "m").add(49, "s").second();
                                    } break;
                                    case 13: {
                                        worker_update.Time = Raw_Time().add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(51, "m").add(26, "s").second();
                                    } break;
                                    case 14: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(51, "m").add(26, "s").second();
                                    } break;
                                    case 15: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(4, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(4, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(4, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(4, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(4, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(4, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(4, "m").add(49, "s").second();
                                    } break;
                                    case 16: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(42, "m").add(54, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(42, "m").add(54, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(42, "m").add(54, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(42, "m").add(54, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(42, "m").add(54, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(42, "m").add(54, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(42, "m").add(54, "s").second();
                                    } break;
                                    case 17: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(9, "m").add(40, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(9, "m").add(40, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(9, "m").add(40, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(9, "m").add(40, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(9, "m").add(40, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(9, "m").add(40, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(9, "m").add(40, "s").second();
                                    } break;
                                    case 18: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(43, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(43, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(43, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(43, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(43, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(43, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(43, "m").add(23, "s").second();
                                    } break;
                                    case 19: {
                                        worker_update.Time = Raw_Time().add(3, "h").add(25, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(3, "h").add(25, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(3, "h").add(25, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(3, "h").add(25, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(3, "h").add(25, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(3, "h").add(25, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(3, "h").add(25, "m").add(51, "s").second();
                                    } break;
                                    case 20: {
                                        worker_update.Time = Raw_Time().add(4, "h").add(19, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "h").add(19, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "h").add(19, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "h").add(19, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "h").add(19, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "h").add(19, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "h").add(19, "m").add(23, "s").second();
                                    } break;
                                    case 21: {
                                        worker_update.Time = Raw_Time().add(5, "h").add(26, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "h").add(26, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "h").add(26, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "h").add(26, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "h").add(26, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "h").add(26, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "h").add(26, "m").add(49, "s").second();
                                    } break;
                                    case 22: {
                                        worker_update.Time = Raw_Time().add(6, "h").add(51, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "h").add(51, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "h").add(51, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "h").add(51, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "h").add(51, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "h").add(51, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "h").add(51, "m").add(48, "s").second();
                                    } break;
                                    case 23: {
                                        worker_update.Time = Raw_Time().add(8, "h").add(38, "m").add(52, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "h").add(38, "m").add(52, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "h").add(38, "m").add(52, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "h").add(38, "m").add(52, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "h").add(38, "m").add(52, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "h").add(38, "m").add(52, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "h").add(38, "m").add(52, "s").second();
                                    } break;
                                    case 24: {
                                        worker_update.Time = Raw_Time().add(10, "h").add(53, "m").add(46, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "h").add(53, "m").add(46, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "h").add(53, "m").add(46, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "h").add(53, "m").add(46, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "h").add(53, "m").add(46, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "h").add(53, "m").add(46, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "h").add(53, "m").add(46, "s").second();
                                    } break;
                                    case 25: {
                                        worker_update.Time = Raw_Time().add(13, "h").add(43, "m").add(45, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(13, "h").add(43, "m").add(45, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(13, "h").add(43, "m").add(45, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(13, "h").add(43, "m").add(45, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(13, "h").add(43, "m").add(45, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(13, "h").add(43, "m").add(45, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(13, "h").add(43, "m").add(45, "s").second();
                                    } break;
                                    case 26: {
                                        worker_update.Time = Raw_Time().add(17, "h").add(17, "m").add(56, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(17, "h").add(17, "m").add(56, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(17, "h").add(17, "m").add(56, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(17, "h").add(17, "m").add(56, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(17, "h").add(17, "m").add(56, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(17, "h").add(17, "m").add(56, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(17, "h").add(17, "m").add(56, "s").second();
                                    } break;
                                    case 27: {
                                        worker_update.Time = Raw_Time().add(21, "h").add(47, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(21, "h").add(47, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(21, "h").add(47, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(21, "h").add(47, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(21, "h").add(47, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(21, "h").add(47, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(21, "h").add(47, "m").add(48, "s").second();
                                    } break;
                                    case 28: {
                                        worker_update.Time = Raw_Time().add(27, "h").add(27, "m").add(50, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(27, "h").add(27, "m").add(50, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(27, "h").add(27, "m").add(50, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(27, "h").add(27, "m").add(50, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(27, "h").add(27, "m").add(50, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(27, "h").add(27, "m").add(50, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(27, "h").add(27, "m").add(50, "s").second();
                                    } break;
                                    case 29: {
                                        worker_update.Time = Raw_Time().add(34, "h").add(36, "m").add(16, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(34, "h").add(36, "m").add(16, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(34, "h").add(36, "m").add(16, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(34, "h").add(36, "m").add(16, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(34, "h").add(36, "m").add(16, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(34, "h").add(36, "m").add(16, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(34, "h").add(36, "m").add(16, "s").second();
                                    } break;
                                    case 30: {
                                        worker_update.Time = Raw_Time().add(43, "h").add(36, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(43, "h").add(36, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(43, "h").add(36, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(43, "h").add(36, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(43, "h").add(36, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(43, "h").add(36, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(43, "h").add(36, "m").add(6, "s").second();
                                    } break;
                                }

                                //equal data with player acc

                                await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });
                            }

                        });

                    });
                } break;
                //storage
                case 3: {
                    await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Raw_User => {
                        //fill level and time
                        Raw_User.Builds.Resource_Builds.Storage_Build.forEach(async Storage_Build => {

                            //fill level
                            if (Storage_Build.ID == ID_build && Storage_Build.Level <= 29) {
                                Storage_Build.Level += 1;
                                worker_update.To_level = Storage_Build.Level;
                                switch (Number(Storage_Build.Level)) {

                                    case 2: {
                                        worker_update.Time = Raw_Time().add(4, "m").add(2, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "m").add(2, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "m").add(2, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "m").add(2, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "m").add(2, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "m").add(2, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "m").add(2, "s").second();
                                    } break;
                                    case 3: {
                                        worker_update.Time = Raw_Time().add(5, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "m").add(6, "s").second();
                                    } break;
                                    case 4: {
                                        worker_update.Time = Raw_Time().add(6, "m").add(25, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "m").add(25, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "m").add(25, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "m").add(25, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "m").add(25, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "m").add(25, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "m").add(25, "s").second();
                                    } break;
                                    case 5: {
                                        worker_update.Time = Raw_Time().add(8, "m").add(5, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "m").add(5, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "m").add(5, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "m").add(5, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "m").add(5, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "m").add(5, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "m").add(5, "s").second();
                                    } break;
                                    case 6: {
                                        worker_update.Time = Raw_Time().add(10, "m").add(12, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "m").add(12, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "m").add(12, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "m").add(12, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "m").add(12, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "m").add(12, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "m").add(12, "s").second();
                                    } break;
                                    case 7: {
                                        worker_update.Time = Raw_Time().add(12, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(12, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(12, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(12, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(12, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(12, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(12, "m").add(51, "s").second();
                                    } break;
                                    case 8: {
                                        worker_update.Time = Raw_Time().add(16, "m").add(11, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(16, "m").add(11, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(16, "m").add(11, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(16, "m").add(11, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(16, "m").add(11, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(16, "m").add(11, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(16, "m").add(11, "s").second();
                                    } break;
                                    case 9: {
                                        worker_update.Time = Raw_Time().add(20, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(20, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(20, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(20, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(20, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(20, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(20, "m").add(24, "s").second();
                                    } break;
                                    case 10: {
                                        worker_update.Time = Raw_Time().add(25, "m").add(43, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(25, "m").add(43, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(25, "m").add(43, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(25, "m").add(43, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(25, "m").add(43, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(25, "m").add(43, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(25, "m").add(43, "s").second();
                                    } break;
                                    case 11: {
                                        worker_update.Time = Raw_Time().add(32, "m").add(24, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(32, "m").add(24, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(32, "m").add(24, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(32, "m").add(24, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(32, "m").add(24, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(32, "m").add(24, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(32, "m").add(24, "s").second();
                                    } break;
                                    case 12: {
                                        worker_update.Time = Raw_Time().add(40, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(40, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(40, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(40, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(40, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(40, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(40, "m").add(49, "s").second();
                                    } break;
                                    case 13: {
                                        worker_update.Time = Raw_Time().add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(51, "m").add(26, "s").second();
                                    } break;
                                    case 14: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(51, "m").add(26, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(51, "m").add(26, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(51, "m").add(26, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(51, "m").add(26, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(51, "m").add(26, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(51, "m").add(26, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(51, "m").add(26, "s").second();
                                    } break;
                                    case 15: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(4, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(4, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(4, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(4, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(4, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(4, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(4, "m").add(49, "s").second();
                                    } break;
                                    case 16: {
                                        worker_update.Time = Raw_Time().add(1, "h").add(42, "m").add(54, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(1, "h").add(42, "m").add(54, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(1, "h").add(42, "m").add(54, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(1, "h").add(42, "m").add(54, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(1, "h").add(42, "m").add(54, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(1, "h").add(42, "m").add(54, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(1, "h").add(42, "m").add(54, "s").second();
                                    } break;
                                    case 17: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(9, "m").add(40, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(9, "m").add(40, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(9, "m").add(40, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(9, "m").add(40, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(9, "m").add(40, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(9, "m").add(40, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(9, "m").add(40, "s").second();
                                    } break;
                                    case 18: {
                                        worker_update.Time = Raw_Time().add(2, "h").add(43, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(2, "h").add(43, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(2, "h").add(43, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(2, "h").add(43, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(2, "h").add(43, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(2, "h").add(43, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(2, "h").add(43, "m").add(23, "s").second();
                                    } break;
                                    case 19: {
                                        worker_update.Time = Raw_Time().add(3, "h").add(25, "m").add(51, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(3, "h").add(25, "m").add(51, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(3, "h").add(25, "m").add(51, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(3, "h").add(25, "m").add(51, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(3, "h").add(25, "m").add(51, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(3, "h").add(25, "m").add(51, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(3, "h").add(25, "m").add(51, "s").second();
                                    } break;
                                    case 20: {
                                        worker_update.Time = Raw_Time().add(4, "h").add(19, "m").add(23, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(4, "h").add(19, "m").add(23, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(4, "h").add(19, "m").add(23, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(4, "h").add(19, "m").add(23, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(4, "h").add(19, "m").add(23, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(4, "h").add(19, "m").add(23, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(4, "h").add(19, "m").add(23, "s").second();
                                    } break;
                                    case 21: {
                                        worker_update.Time = Raw_Time().add(5, "h").add(26, "m").add(49, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(5, "h").add(26, "m").add(49, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(5, "h").add(26, "m").add(49, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(5, "h").add(26, "m").add(49, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(5, "h").add(26, "m").add(49, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(5, "h").add(26, "m").add(49, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(5, "h").add(26, "m").add(49, "s").second();
                                    } break;
                                    case 22: {
                                        worker_update.Time = Raw_Time().add(6, "h").add(51, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(6, "h").add(51, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(6, "h").add(51, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(6, "h").add(51, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(6, "h").add(51, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(6, "h").add(51, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(6, "h").add(51, "m").add(48, "s").second();
                                    } break;
                                    case 23: {
                                        worker_update.Time = Raw_Time().add(8, "h").add(38, "m").add(52, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(8, "h").add(38, "m").add(52, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(8, "h").add(38, "m").add(52, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(8, "h").add(38, "m").add(52, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(8, "h").add(38, "m").add(52, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(8, "h").add(38, "m").add(52, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(8, "h").add(38, "m").add(52, "s").second();
                                    } break;
                                    case 24: {
                                        worker_update.Time = Raw_Time().add(10, "h").add(53, "m").add(46, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(10, "h").add(53, "m").add(46, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(10, "h").add(53, "m").add(46, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(10, "h").add(53, "m").add(46, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(10, "h").add(53, "m").add(46, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(10, "h").add(53, "m").add(46, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(10, "h").add(53, "m").add(46, "s").second();
                                    } break;
                                    case 25: {
                                        worker_update.Time = Raw_Time().add(13, "h").add(43, "m").add(45, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(13, "h").add(43, "m").add(45, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(13, "h").add(43, "m").add(45, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(13, "h").add(43, "m").add(45, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(13, "h").add(43, "m").add(45, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(13, "h").add(43, "m").add(45, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(13, "h").add(43, "m").add(45, "s").second();
                                    } break;
                                    case 26: {
                                        worker_update.Time = Raw_Time().add(17, "h").add(17, "m").add(56, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(17, "h").add(17, "m").add(56, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(17, "h").add(17, "m").add(56, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(17, "h").add(17, "m").add(56, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(17, "h").add(17, "m").add(56, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(17, "h").add(17, "m").add(56, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(17, "h").add(17, "m").add(56, "s").second();
                                    } break;
                                    case 27: {
                                        worker_update.Time = Raw_Time().add(21, "h").add(47, "m").add(48, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(21, "h").add(47, "m").add(48, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(21, "h").add(47, "m").add(48, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(21, "h").add(47, "m").add(48, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(21, "h").add(47, "m").add(48, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(21, "h").add(47, "m").add(48, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(21, "h").add(47, "m").add(48, "s").second();
                                    } break;
                                    case 28: {
                                        worker_update.Time = Raw_Time().add(27, "h").add(27, "m").add(50, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(27, "h").add(27, "m").add(50, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(27, "h").add(27, "m").add(50, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(27, "h").add(27, "m").add(50, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(27, "h").add(27, "m").add(50, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(27, "h").add(27, "m").add(50, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(27, "h").add(27, "m").add(50, "s").second();
                                    } break;
                                    case 29: {
                                        worker_update.Time = Raw_Time().add(34, "h").add(36, "m").add(16, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(34, "h").add(36, "m").add(16, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(34, "h").add(36, "m").add(16, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(34, "h").add(36, "m").add(16, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(34, "h").add(36, "m").add(16, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(34, "h").add(36, "m").add(16, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(34, "h").add(36, "m").add(16, "s").second();
                                    } break;
                                    case 30: {
                                        worker_update.Time = Raw_Time().add(43, "h").add(36, "m").add(6, "s").unix();
                                        //date
                                        worker_update.Deserilze_time.Y = Raw_Time().add(43, "h").add(36, "m").add(6, "s").year();
                                        worker_update.Deserilze_time.MO = Raw_Time().add(43, "h").add(36, "m").add(6, "s").month() + 1;
                                        worker_update.Deserilze_time.D = Raw_Time().add(43, "h").add(36, "m").add(6, "s").days() + 1;
                                        //time
                                        worker_update.Deserilze_time.H = Raw_Time().add(43, "h").add(36, "m").add(6, "s").hour();
                                        worker_update.Deserilze_time.M = Raw_Time().add(43, "h").add(36, "m").add(6, "s").minute();
                                        worker_update.Deserilze_time.S = Raw_Time().add(43, "h").add(36, "m").add(6, "s").second();
                                    } break;
                                }

                                //equal data with player acc

                                await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });

                            }
                        });

                    });
                } break;
            }

        });

    }


    async recive_worker_detail(Username, Password) {

        var Worker_detail = {
            Count_worker: 0,
            Count_work: 0,
            Updates: []
        }

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection => {

            await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(User => {

                Worker_detail.Count_work = User.Monitise.Worker;
                Worker_detail.Count_worker = User.Worker.length;
                Worker_detail.Updates = User.Worker;
            });


        });

        return Worker_detail;
    }


    Motor_db = {
        Feed_to_value: async () => {
            await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async Connection => {

                await Connection.db("Besider").collection("Users").find({}).toArray().then(Arry_Users => {


                    Arry_Users.forEach(async Raw_User => {

                        //aut user
                        let password = Raw_User.Info.Password;
                        let username = Raw_User.Info.Username;

                        //end value
                        let end_value_food = 0;
                        let end_value_wood = 0;
                        let end_value_stone = 0;

                        //serilise model
                        Raw_model.Model_User = Raw_User;
                        var user = Raw_model.Model_User;

                        //fill values wood
                        for (var i = 0; i < user.Builds.Resource_Builds.Wood_Build.length; i++) {
                            switch (user.Builds.Resource_Builds.Wood_Build[i].Level) {

                                case 1: {
                                    end_value_wood += 55;
                                } break;
                                case 2: {
                                    end_value_wood += 60;
                                } break;
                                case 3: {
                                    end_value_wood += 67;
                                } break;
                                case 4: {
                                    end_value_wood += 72;
                                } break;
                                case 5: {
                                    end_value_wood += 79;
                                } break;
                                case 6: {
                                    end_value_wood += 87;
                                } break;
                                case 7: {
                                    end_value_wood += 96;
                                } break;
                                case 8: {
                                    end_value_wood += 106;
                                } break;
                                case 9: {
                                    end_value_wood += 117;
                                } break;
                                case 10: {
                                    end_value_wood += 131;
                                } break;
                                case 11: {
                                    end_value_wood += 146;
                                } break;
                                case 12: {
                                    end_value_wood += 167;
                                } break;
                                case 13: {
                                    end_value_wood += 186;
                                } break;
                                case 14: {
                                    end_value_wood += 212;
                                } break;
                                case 15: {
                                    end_value_wood += 236;
                                } break;
                                case 16: {
                                    end_value_wood += 268;
                                } break;
                                case 17: {
                                    end_value_wood += 310;
                                } break;
                                case 18: {
                                    end_value_wood += 349;
                                } break;
                                case 19: {
                                    end_value_wood += 397;
                                } break;
                                case 20: {
                                    end_value_wood += 453;
                                } break;
                                case 21: {
                                    end_value_wood += 515;
                                } break;
                                case 22: {
                                    end_value_wood += 590;
                                } break;
                                case 23: {
                                    end_value_wood += 675;
                                } break;
                                case 24: {
                                    end_value_wood += 775;
                                } break;
                                case 25: {
                                    end_value_wood += 885;
                                } break;
                                case 26: {
                                    end_value_wood += 1012;
                                } break;
                                case 27: {
                                    end_value_wood += 1162;
                                } break;
                                case 28: {
                                    end_value_wood += 1333;
                                } break;
                                case 29: {
                                    end_value_wood += 1525;
                                } break;
                                case 30: {
                                    end_value_wood += 1725;
                                } break;


                            }

                        }


                        //fill values food
                        for (var i = 0; i < user.Builds.Resource_Builds.Food_Build.length; i++) {
                            switch (user.Builds.Resource_Builds.Food_Build[i].Level) {

                                case 1: {
                                    end_value_food += 55;

                                } break;
                                case 2: {
                                    end_value_food += 60;
                                } break;
                                case 3: {
                                    end_value_food += 67;
                                } break;
                                case 4: {
                                    end_value_food += 72;
                                } break;
                                case 5: {
                                    end_value_food += 79;
                                } break;
                                case 6: {
                                    end_value_food += 87;
                                } break;
                                case 7: {
                                    end_value_food += 96;
                                } break;
                                case 8: {
                                    end_value_food += 106;
                                } break;
                                case 9: {
                                    end_value_food += 117;
                                } break;
                                case 10: {
                                    end_value_food += 131;
                                } break;
                                case 11: {
                                    end_value_food += 146;
                                } break;
                                case 12: {
                                    end_value_food += 167;
                                } break;
                                case 13: {
                                    end_value_food += 186;
                                } break;
                                case 14: {
                                    end_value_food += 212;
                                } break;
                                case 15: {
                                    end_value_food += 236;
                                } break;
                                case 16: {
                                    end_value_food += 268;
                                } break;
                                case 17: {
                                    end_value_food += 310;
                                } break;
                                case 18: {
                                    end_value_food += 349;
                                } break;
                                case 19: {
                                    end_value_food += 397;
                                } break;
                                case 20: {
                                    end_value_food += 453;
                                } break;
                                case 21: {
                                    end_value_food += 515;
                                } break;
                                case 22: {
                                    end_value_food += 590;
                                } break;
                                case 23: {
                                    end_value_food += 675;
                                } break;
                                case 24: {
                                    end_value_food += 775;
                                } break;
                                case 25: {
                                    end_value_food += 885;
                                } break;
                                case 26: {
                                    end_value_food += 1012;
                                } break;
                                case 27: {
                                    end_value_food += 1162;
                                } break;
                                case 28: {
                                    end_value_food += 1333;
                                } break;
                                case 29: {
                                    end_value_food += 1525;
                                } break;
                                case 30: {
                                    end_value_food += 1725;
                                } break;


                            }
                        }


                        //fill values stone
                        for (var i = 0; i < user.Builds.Resource_Builds.Stone_Build.length; i++) {
                            switch (user.Builds.Resource_Builds.Stone_Build[i].Level) {

                                case 1: {
                                    end_value_stone += 55;

                                } break;
                                case 2: {
                                    end_value_stone += 60;
                                } break;
                                case 3: {
                                    end_value_stone += 67;
                                } break;
                                case 4: {
                                    end_value_stone += 72;
                                } break;
                                case 5: {
                                    end_value_stone += 79;
                                } break;
                                case 6: {
                                    end_value_stone += 87;
                                } break;
                                case 7: {
                                    end_value_stone += 96;
                                } break;
                                case 8: {
                                    end_value_stone += 106;
                                } break;
                                case 9: {
                                    end_value_stone += 117;
                                } break;
                                case 10: {
                                    end_value_stone += 131;
                                } break;
                                case 11: {
                                    end_value_stone += 146;
                                } break;
                                case 12: {
                                    end_value_stone += 167;
                                } break;
                                case 13: {
                                    end_value_stone += 186;
                                } break;
                                case 14: {
                                    end_value_stone += 212;
                                } break;
                                case 15: {
                                    end_value_stone += 236;
                                } break;
                                case 16: {
                                    end_value_stone += 268;
                                } break;
                                case 17: {
                                    end_value_stone += 310;
                                } break;
                                case 18: {
                                    end_value_stone += 349;
                                } break;
                                case 19: {
                                    end_value_stone += 397;
                                } break;
                                case 20: {
                                    end_value_stone += 453;
                                } break;
                                case 21: {
                                    end_value_stone += 515;
                                } break;
                                case 22: {
                                    end_value_stone += 590;
                                } break;
                                case 23: {
                                    end_value_stone += 675;
                                } break;
                                case 24: {
                                    end_value_stone += 775;
                                } break;
                                case 25: {
                                    end_value_stone += 885;
                                } break;
                                case 26: {
                                    end_value_stone += 1012;
                                } break;
                                case 27: {
                                    end_value_stone += 1162;
                                } break;
                                case 28: {
                                    end_value_stone += 1333;
                                } break;
                                case 29: {
                                    end_value_stone += 1525;
                                } break;
                                case 30: {
                                    end_value_stone += 1725;
                                } break;


                            }

                        }

                        //cheack storage and depos to acc
                        await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": username, "Info.Password": password }, { $inc: { "Resource_Value.Food": end_value_food, "Resource_Value.Wood": end_value_wood, "Resource_Value.Stone": end_value_stone } });


                    });



                });

            });
        },

        Worker_minuse: async () => {

            await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

                await connection.db("Besider").collection("Users").find({}).forEach(async users => {

                    //finde userpass
                    let Username = users.Info.Username;
                    let Password = users.Info.Password;

                    //fill for minuse
                    for (var i = 0; i < users.Worker.length; i++) {

                        var Timer = Raw_Time.unix(users.Worker[i].Time);
                        Timer.add(-1, "s");
                        users.Worker[i].Time = Timer.unix();
                        users.Worker[i].Deserilze_time.Y = Timer.year();
                        users.Worker[i].Deserilze_time.MO = Timer.month() + 1;
                        users.Worker[i].Deserilze_time.D = Timer.day() + 1;

                        users.Worker[i].Deserilze_time.H = Timer.hours();
                        users.Worker[i].Deserilze_time.M = Timer.minute();
                        users.Worker[i].Deserilze_time.S = Timer.second();

                        if (Timer.unix() > Raw_Time().unix()) {

                            await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection_Internal => {

                                await Connection_Internal.db("Besider").collection("Users").findOneAndUpdate({ "Info.Username": Username, "Info.Password": Password }, { $set: { "Worker": users.Worker } });

                            })

                        } else {

                            switch (users.Worker[i].Type_build) {
                                //wood
                                case 0: {

                                    for (var a = 0; a < users.Builds.Resource_Builds.Wood_Build.length; a++) {

                                        //delete worker and inject new level
                                        if (users.Builds.Resource_Builds.Wood_Build[a].ID == users.Worker[i].ID_Build) {

                                            //inject level and health build
                                            users.Builds.Resource_Builds.Wood_Build[a].Level = users.Worker[i].To_level;
                                            users.Builds.Resource_Builds.Wood_Build[a].Health += Math.round(users.Builds.Resource_Builds.Wood_Build[a].Health * 1.2);
                                            //remove work
                                            delete users.Worker[i];
                                            let new_worker = [];
                                            for (var i = 0; i < users.Worker.length; i++) {
                                                if (users.Worker[i] != undefined) {
                                                    new_worker.push(users.Worker[i]);
                                                }
                                            }
                                            users.Worker = new_worker;
                                        }
                                    }

                                    //data to user
                                    await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async Connection_Internal => {

                                        await Connection_Internal.db("Besider").collection("Users").findOneAndUpdate({ "Info.Username": Username, "Info.Password": Password }, { $set: { Worker: users.Worker, "Builds": users.Builds } });

                                    });


                                } break;
                                //food
                                case 1: {
                                    for (var a = 0; a < users.Builds.Resource_Builds.Food_Build.length; a++) {

                                        //delete worker and inject new level
                                        if (users.Builds.Resource_Builds.Food_Build[a].ID == users.Worker[i].ID_Build) {

                                            //inject level and health build

                                            users.Builds.Resource_Builds.Food_Build[a].Level = users.Worker[i].To_level;
                                            users.Builds.Resource_Builds.Food_Build[a].Health += Math.round(users.Builds.Resource_Builds.Food_Build[a].Health * 1.2);
                                        }
                                        //remove work
                                        delete users.Worker[i];
                                        let new_worker = [];
                                        for (var i = 0; i < users.Worker.length; i++) {
                                            if (users.Worker[i] != undefined) {
                                                new_worker.push(users.Worker[i]);
                                            }
                                        }
                                        users.Worker = new_worker;

                                    }
                                    await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async Connection_Internal => {
                                        await Connection_Internal.db("Besider").collection("Users").findOneAndUpdate({ "Info.Username": Username, "Info.Password": Password }, { $set: { Worker: users.Worker, "Builds": users.Builds } });
                                    });


                                } break;
                                //stone
                                case 2: {
                                    for (var a = 0; a < users.Builds.Resource_Builds.Stone_Build.length; a++) {

                                        //delete worker and inject new level
                                        if (users.Builds.Resource_Builds.Stone_Build[a].ID == users.Worker[i].ID_Build) {

                                            //inject level and health build
                                            users.Builds.Resource_Builds.Stone_Build[a].Level = users.Worker[i].To_level;
                                            users.Builds.Resource_Builds.Stone_Build[a].Health += Math.round(users.Builds.Resource_Builds.Stone_Build[a].Health * 1.2);
                                            //remove work
                                            delete users.Worker[i];
                                            let new_worker = [];
                                            for (var i = 0; i < users.Worker.length; i++) {
                                                if (users.Worker[i] != undefined) {
                                                    new_worker.push(users.Worker[i]);
                                                }
                                            }
                                            users.Worker = new_worker;
                                        }
                                    }
                                    await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async  Connection_Internal => {

                                        await Connection_Internal.db("Besider").collection("Users").findOneAndUpdate({ "Info.Username": Username, "Info.Password": Password }, { $set: { Worker: users.Worker, "Builds": users.Builds } });

                                    });

                                } break;
                                //storage
                                case 3: {
                                    for (var a = 0; a < users.Builds.Resource_Builds.Storage_Build.length; a++) {

                                        //delete worker and inject new level
                                        if (users.Builds.Resource_Builds.Storage_Build[a].ID == users.Worker[i].ID_Build) {

                                            //inject level and health build
                                            users.Builds.Resource_Builds.Storage_Build[a].Level = users.Worker[i].To_level;
                                            users.Builds.Resource_Builds.Storage_Build[a].Health += Math.round(users.Builds.Resource_Builds.Storage_Build[a].Health * 1.2);
                                            //remove work
                                            delete users.Worker[i];
                                            let new_worker = [];
                                            for (var i = 0; i < users.Worker.length; i++) {
                                                if (users.Worker[i] != undefined) {
                                                    new_worker.push(users.Worker[i]);
                                                }
                                            }
                                            users.Worker = new_worker;
                                        }
                                    }
                                    await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection_Internal => {

                                        await Connection_Internal.db("Besider").collection("Users").findOneAndUpdate({ "Info.Username": Username, "Info.Password": Password }, { $set: { Worker: users.Worker, "Builds": users.Builds } });

                                    });

                                } break;

                            }
                        }

                    }
                });


            });
        }
    }

}

module.exports = new Data_base_user();

