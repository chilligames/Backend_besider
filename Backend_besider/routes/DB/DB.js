var Mongo_raw = require("mongodb");
var Mongo_string = "mongodb://localhost:27017/admin";
var Raw_model = require("./Models/Models");


module.exports.Register = async function insert_data(model_data) {

    var result = "";

    model_data._id = new Mongo_raw.ObjectId();


    await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

        await connection.db("Besider").collection("Users").insertOne(model_data).then(id => {

            result = id.insertedId.toHexString();
        });

    });

    return result;
}


module.exports.login = async function (Username, password) {

    var result_login = "";

    await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async connection => {

        await connection.db("Besider").collection("Users").findOne({ 'Info.Username': Username, 'Info.Password': password }).then(result_finde => {
            delete result_finde._id;

            result_login = JSON.stringify(result_finde);
        });
    })
    return result_login;
}


module.exports.recive_values = async function (Username, Password) {

    var result = {};

    await new Mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true, useUnifiedTopology: true }).connect().then(async Connection => {

        await Connection.db("Besider").collection("Users").findOne({ "Info.Username": Username, "Info.Password": Password }).then(Data => {
            if (Data != null) {

                Raw_model.Model_User = Data;
                result = Raw_model.Model_User.Resource_Value;

            } else {
                result = 0;
            }

        });

    });

    return JSON.stringify(result);
}

//type 0
module.exports.creat_wood_build = async function (Username, Password, Postion) {


    Raw_model.Model_resource.ID = new Mongo_raw.ObjectId().toHexString();
    Raw_model.Model_resource.Health = 1000;//callibrate
    Raw_model.Model_resource.Level = 1;
    Raw_model.Model_resource.Name = Username + Math.random().toString();
    Raw_model.Model_resource.Postion = JSON.parse(Postion);
    Raw_model.Model_resource.Storage = 10000;//calibrate
    Raw_model.Model_resource.Type_build = 0;

    await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

        //cheack resurce here
        //cheak postion
        console.log("cheack here creat wood build");

        //insert to user build
        await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Wood_Build": Raw_model.Model_resource } });

    });
}

//type=1
module.exports.creat_Food_build = async function (Username, Password, Postion) {


    Raw_model.Model_resource.ID = new Mongo_raw.ObjectId().toHexString();
    Raw_model.Model_resource.Health = 1000;//callibrate
    Raw_model.Model_resource.Level = 1;
    Raw_model.Model_resource.Name = Username + Math.random().toString();
    Raw_model.Model_resource.Postion = JSON.parse(Postion);
    Raw_model.Model_resource.Storage = 10000;//calibrate
    Raw_model.Model_resource.Type_build = 1;

    await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

        //cheack resurce here
        //cheak postion
        console.log("cheack here creat food build");

        //insert to user build
        await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Food_Build": Raw_model.Model_resource } });

    });
}

//type=2
module.exports.creat_Stone_build = async function (Username, Password, Postion) {

    Raw_model.Model_resource.ID = new Mongo_raw.ObjectId().toHexString();
    Raw_model.Model_resource.Health = 1000;//callibrate
    Raw_model.Model_resource.Level = 1;
    Raw_model.Model_resource.Name = Username + Math.random().toString();
    Raw_model.Model_resource.Postion = JSON.parse(Postion);
    Raw_model.Model_resource.Storage = 10000;//calibrate
    Raw_model.Model_resource.Type_build = 2


    await new Mongo_raw.MongoClient(Mongo_string, { useUnifiedTopology: true, useNewUrlParser: true }).connect().then(async connection => {

        //cheack resurce here
        //cheak postion
        console.log("cheack here creat stone build");

        //insert to user build
        await connection.db("Besider").collection("Users").updateOne({ "Info.Username": Username, "Info.Password": Password }, { $push: { "Builds.Resource_Builds.Stone_Build": Raw_model.Model_resource } });

    });
}


module.exports.recive_info_pos = async function (Postions) {

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

                //other build here

            });


        });

    });
   

    return End_result;


}
