const logger = require('./config/logger');
process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});

const cluster = require('cluster');
const SETTINGS = require('./config/config.js');
const { initializeWebServer } = require('./server');
const db = require('./models/');
const workerEnv = {};

class SpaceRepAPI {
  static async initialise() {
    if (cluster.isMaster) {
      // db.sequelize.sync();
      for (let i = 0; i < SETTINGS.NUMBER_OF_FORKS; i += 1) {
        const workerId = SETTINGS.WORKER_PREFIX+ i;
        workerEnv['WORKER_NAME'] = workerId;
        const worker = cluster.fork(workerEnv);
        worker.workerId = workerId;
      }
    } else {
      initializeWebServer()
        .then(() => logger.info('Webserver Initialized Successfully'))
        .catch(error => logger.error(`Error Initializing webserver: ${error.message}, ${error.stack}`))
    }
  }
}

cluster.on('exit', (worker) => {
  logger.warn(`Worker ${worker.id} died :(`);
  workerEnv['WORKER_NAME'] = worker.workerId;
  const wrker = cluster.fork(workerEnv);
  wrker.workerId = worker.workerId;
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(`Possibly Unhandled Rejection at: Promise,${String(p)} reason ${reason}`);
});

SpaceRepAPI.initialise();

module.exports = SpaceRepAPI;