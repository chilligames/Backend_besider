var Mongo_raw = require("mongodb");
var Mongo_string = "mongodb://localhost:27017/admin";
var Raw_model = require("./Models/Models");
var Raw_Time = require("moment");


class Data_base_user {


    async  Register(model_data) {

        var result = "";

        model_data._id = new Mongo_raw.ObjectId();


        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

            await connection.db("Besider").collection("Users").insertOne(model_data).then(id => {

                result = id.insertedId.toHexString();
            });

        });

        return result;
    };


    async  Login(Username, password) {

        var result_login = "";

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

            await connection.db("Besider").collection("Users").findOne({ 'Info.Username': Username, 'Info.Password': password }).then(result_finde => {
                delete result_finde._id;

                result_login = JSON.stringify(result_finde);
            });
        })
        return result_login;
    };


    async  recive_values(Username, Password) {

        var result = {
            "Values": {
                "Wood": 0,
                "Food": 0,
                "Stone": 0
            },
            "Per_Values": {
                "Per_Value_Wood": 0,
                "Per_Value_Food": 0,
                "Per_Value_Stone": 0
            },
            "Storage": 0
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
                                result.Per_Values.Per_Value_Food += 30;
                            } break;
                            case 2: {

                            } break;
                            case 3: {

                            } break;
                            case 4: {

                            } break;
                            case 5: {

                            } break;
                            case 6: {

                            } break;
                            case 7: {

                            } break;
                            case 8: {

                            } break;
                            case 9: {

                            } break;
                            case 10: {

                            } break;
                            case 11: {

                            } break;
                            case 12: {

                            } break;
                            case 13: {

                            } break;
                            case 14: {

                            } break;
                            case 15: {

                            } break;
                            case 16: {

                            } break;
                            case 17: {

                            } break;
                            case 18: {

                            } break;
                            case 19: {

                            } break;
                            case 20: {

                            } break;
                            case 21: {

                            } break;
                            case 22: {

                            } break;
                            case 23: {

                            } break;
                            case 24: {

                            } break;
                            case 25: {

                            } break;
                            case 26: {

                            } break;
                            case 27: {

                            } break;
                            case 28: {

                            } break;
                            case 29: {

                            } break;
                            case 30: {

                            } break;
                        }
                    });

                    //wood
                    user.Builds.Resource_Builds.Wood_Build.forEach(builds => {
                        switch (builds.Level) {
                            case 1: {
                                result.Per_Values.Per_Value_Wood += 30;
                            } break;
                            case 2: {

                            } break;
                            case 3: {

                            } break;
                            case 4: {

                            } break;
                            case 5: {

                            } break;
                            case 6: {

                            } break;
                            case 7: {

                            } break;
                            case 8: {

                            } break;
                            case 9: {

                            } break;
                            case 10: {

                            } break;
                            case 11: {

                            } break;
                            case 12: {

                            } break;
                            case 13: {

                            } break;
                            case 14: {

                            } break;
                            case 15: {

                            } break;
                            case 16: {

                            } break;
                            case 17: {

                            } break;
                            case 18: {

                            } break;
                            case 19: {

                            } break;
                            case 20: {

                            } break;
                            case 21: {

                            } break;
                            case 22: {

                            } break;
                            case 23: {

                            } break;
                            case 24: {

                            } break;
                            case 25: {

                            } break;
                            case 26: {

                            } break;
                            case 27: {

                            } break;
                            case 28: {

                            } break;
                            case 29: {

                            } break;
                            case 30: {

                            } break;
                        }
                    });

                    //stone
                    user.Builds.Resource_Builds.Stone_Build.forEach(builds => {
                        switch (builds.Level) {
                            case 1: {
                                result.Per_Values.Per_Value_Stone += 30;
                            } break;
                            case 2: {

                            } break;
                            case 3: {

                            } break;
                            case 4: {

                            } break;
                            case 5: {

                            } break;
                            case 6: {

                            } break;
                            case 7: {

                            } break;
                            case 8: {

                            } break;
                            case 9: {

                            } break;
                            case 10: {

                            } break;
                            case 11: {

                            } break;
                            case 12: {

                            } break;
                            case 13: {

                            } break;
                            case 14: {

                            } break;
                            case 15: {

                            } break;
                            case 16: {

                            } break;
                            case 17: {

                            } break;
                            case 18: {

                            } break;
                            case 19: {

                            } break;
                            case 20: {

                            } break;
                            case 21: {

                            } break;
                            case 22: {

                            } break;
                            case 23: {

                            } break;
                            case 24: {

                            } break;
                            case 25: {

                            } break;
                            case 26: {

                            } break;
                            case 27: {

                            } break;
                            case 28: {

                            } break;
                            case 29: {

                            } break;
                            case 30: {

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


    async   creat_wood_build(Username, Password, Postion, type_build) {

        let Raw_model_resource = {
            "ID": new Mongo_raw.ObjectId().toHexString(),
            "Name": Username + Math.random(),
            "Level": 1,
            "Health": 1000,
            "Postion": JSON.parse(Postion),
            "Type_build": Number(type_build)
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
            "ID": new Mongo_raw.ObjectId().toHexString(),
            "Name": Username + Math.random(),
            "Level": 1,
            "Health": 1000,
            "Postion": JSON.parse(Postion),
            "Type_build": Number(type_build)
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
            "ID": new Mongo_raw.ObjectId().toHexString(),
            "Name": Username + Math.random(),
            "Level": 1,
            "Health": 1000,
            "Postion": JSON.parse(Postion),
            "Type_build": Number(type_build)
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
            "ID": new Mongo_raw.ObjectId().toHexString(),
            "Name": Username + Math.random(),
            "Level": 1,
            "Health": 1000,
            "Storage": 1000,
            "Postion": JSON.parse(Postion),
            "Type_build": Number(type_build)
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


    async Update_build(Username, Password, ID_build, Type_build) {

        var worker_update = {
            "ID_Build ": ID_build,
            "To_level": 0,
            "Type_build": Type_build,
            "Time": 0
        }

        await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection => {

            switch (Number(Type_build)) {
                //wood
                case 0: {

                    await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Raw_User => {
                        //fill level and time
                        Raw_User.Builds.Resource_Builds.Wood_Build.forEach(async wood_build => {

                            //fill level
                            if (wood_build.ID == ID_build && wood_build.Level <= 29) {
                                wood_build.Level += 1;
                                worker_update.To_level = wood_build.Level;
                            }
                            switch (wood_build.Level) {

                                case 2: {
                                    worker_update.Time = Raw_Time().add(1, "m").add(18, "s").unix();
                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }

                            await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });

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
                            }
                            switch (Food_Build.Level) {

                                case 2: {
                                    worker_update.Time = Raw_Time().add(1, "m").add(18, "s").unix();
                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }

                            await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });

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
                            }
                            switch (Stone_Build.Level) {

                                case 2: {
                                    worker_update.Time = Raw_Time().add(1, "m").add(18, "s").unix();
                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }

                            await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });

                        });

                    });

                } break;
                case 3: {

                    await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Raw_User => {
                        //fill level and time
                        Raw_User.Builds.Resource_Builds.Storage_Build.forEach(async Storage_Build => {

                            //fill level
                            if (Storage_Build.ID == ID_build && Storage_Build.Level <= 29) {
                                Storage_Build.Level += 1;
                                worker_update.To_level = Storage_Build.Level;
                            }
                            switch (Storage_Build.Level) {

                                case 2: {
                                    worker_update.Time = Raw_Time().add(1, "m").add(18, "s").unix();
                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }

                            await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Worker": worker_update } });

                        });

                    });

                } break;
            }

        });

    }


    Motor_db = {
        "Feed_to_value": async () => {
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
                                    end_value_wood += 30;

                                } break;
                                case 2: {

                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }

                        }


                        //fill values food
                        for (var i = 0; i < user.Builds.Resource_Builds.Food_Build.length; i++) {
                            switch (user.Builds.Resource_Builds.Food_Build[i].Level) {

                                case 1: {
                                    end_value_food += 30;

                                } break;
                                case 2: {

                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }
                        }


                        //fill values food
                        for (var i = 0; i < user.Builds.Resource_Builds.Stone_Build.length; i++) {
                            switch (user.Builds.Resource_Builds.Stone_Build[i].Level) {

                                case 1: {
                                    end_value_stone += 30;

                                } break;
                                case 2: {

                                } break;
                                case 3: {

                                } break;
                                case 4: {

                                } break;
                                case 5: {

                                } break;
                                case 6: {

                                } break;
                                case 7: {

                                } break;
                                case 8: {

                                } break;
                                case 9: {

                                } break;
                                case 10: {

                                } break;
                                case 11: {

                                } break;
                                case 12: {

                                } break;
                                case 13: {

                                } break;
                                case 14: {

                                } break;
                                case 15: {

                                } break;
                                case 16: {

                                } break;
                                case 17: {

                                } break;
                                case 18: {

                                } break;
                                case 19: {

                                } break;
                                case 20: {

                                } break;
                                case 21: {

                                } break;
                                case 22: {

                                } break;
                                case 23: {

                                } break;
                                case 24: {

                                } break;
                                case 25: {

                                } break;
                                case 26: {

                                } break;
                                case 27: {

                                } break;
                                case 28: {

                                } break;
                                case 29: {

                                } break;
                                case 30: {

                                } break;


                            }

                        }

                        //cheack storage and depos to acc
                        await Connection.db("Besider").collection("Users").updateOne({ "Info.Username": username, "Info.Password": password }, { $inc: { "Resource_Value.Food": end_value_food, "Resource_Value.Wood": end_value_wood, "Resource_Value.Stone": end_value_stone } });


                    });



                });

            });


        },
    }

}



module.exports = new Data_base_user();

