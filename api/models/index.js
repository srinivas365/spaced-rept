const db = {};
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash');
const config = require('../config/config.js');
const logger = require('../config/logger');

const sequelize = new Sequelize(
    config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    port: config.DATABASE.PORT,
    dialect: config.DATABASE.DIALECT,
    dialectOptions: {
        ssl: (config.DATABASE.SSL_CONFIG == false || !fs.existsSync(config.DATABASE.SSL_CONFIG.CA_PATH)) ? false : {
            ca: fs.readFileSync(config.DATABASE.SSL_CONFIG.CA_PATH),
            cert: fs.readFileSync(config.DATABASE.SSL_CONFIG.CERT_PATH),
            key: fs.readFileSync(config.DATABASE.SSL_CONFIG.KEY_PATH)
        },
        multipleStatements: true,
        connectTimeout: 1000 * 60 * 10
    },
    logging: false, 
    logQueryParameters: true,
    define: {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
});

fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {  
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
        
    });
    
let events = [
        {name: 'beforeExit', exitCode: 0 },
        {name: 'uncaughtExecption', exitCode: 1 },
        {name: 'SIGINT', exitCode: 130 },
        {name: 'SIGTERM', exitCode: 143 }
    ]
    
events.forEach((e) => {
    process.on(e.name,  () => {
        sequelize.connectionManager.close()
        .then(() => { 
            logger.info('connection closed');
            process.exit(e.exitCode) 
        })
        .catch((err) => {
            console.error(err)
            process.exit(1)   
        })    
    })
});

module.exports = _.extend({
    sequelize,
    Sequelize,
}, db);