var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize( process.env.DATABASE,
process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,                         //mysql의 아이디와 비밀번호를 치지 않고 env파일에 저장하였고
    dialect: 'mysql',                                  //그런뒤 env파일 자체를 ec2에 보냄 이것이 보안상 괜찮을지는 아직 모름
    timezone: '+09:00',                                //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

let db = [];

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.js')&& file !== 'index.js'
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 