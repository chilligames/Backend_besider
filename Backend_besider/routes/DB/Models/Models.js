module.exports.Model_User = {
    '_id': '',
    'Info': {
        'Username': '',
        'Password': '',
        'Email': ''
    },

    'Resource_Value': {
        "Wood": 0,
        "Food": 0,
        "Stone": 0,
    },

    "Builds": {
        "Base": {



        },
        "Resource_Builds": {
            "Wood_Build": [],
            "Food_Build": [],
            "Stone_Build": []
        },
        "War_build": {


        },
        "Assistant_Builds": {

        },
        "Envormernt": {}

    },
}

exports.Model_resource = {
    "ID": "",
    "Name": "",
    "Level": 0,
    "Health": 0,
    "Storage": 0,
    "Postion": { x: 0, y: 0, z: 0 },
    "Type_build":0
}
