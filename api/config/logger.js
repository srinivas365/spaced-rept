let winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
const Path = require('path');
const SETTINGS = require('./config');
const {format} = require('winston');

let processName = SETTINGS.PROCESS_NAME;
let fileName = Path.join(SETTINGS.LOG_PATH,`${processName}-%DATE%.log`);

winston.remove(winston.transports.Console);
winston.addColors(winston.transports.Console, {'timestamp': true});

let transports = [
    new(winston.transports.DailyRotateFile)({
        filename: fileName,
        datePattern: 'YYYY-MM-DD-HH',
        json: true,
        zippedArchive: true,
        handleExceptions: true,
        timestamp: function() {
            return moment();
        },
        formatter: function(options) {
            return options.timestamp() + ' ' +
                config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                (options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        },
        stringify: (obj) => JSON.stringify(obj),
    }),
    new(winston.transports.DailyRotateFile)({
        level: 'error',
        filename: Path.join(SETTINGS.LOG_PATH,`${processName}-error-%DATE%.log`),
        datePattern: 'YYYY-MM-DD-HH',
        json: true,
        zippedArchive: true,
        handleExceptions: true,
        timestamp: function() {
            return moment();
        },
        formatter: function(options) {
            return options.timestamp() + ' ' +
                config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                (options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        },
        stringify: (obj) => JSON.stringify(obj),
    })
]

transports.push(new (winston.transports.Console)())

const customFormat = format(info => {
    info.process = process.pid;
    return info;
});

winston.exitOnError = false;
const logger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat(),
        format.json(),
    ),
    levels: { trace: 0, input: 1, verbose: 2, prompt: 9, debug: 4, info: 5, data: 6, help: 7, warn: 8, error: 3 },
    exitOnError: false,
    transports: transports,
    exceptionHandlers: [
        new winston.transports.File({ filename: Path.join(SETTINGS.LOG_PATH, 'exceptions.log') }),
    ]
});

module.exports = logger;