const path = require('path');
const PROJECT_ROOT = `${path.resolve(path.join(__dirname, '../'))}`;
const os = require('os');
const hostname = os.hostname();

module.exports = {
	WEB_SERVER: {
		HOST: '0.0.0.0',
		HTTPS: false,
		PORT: 9095,
	},
  DATABASE: {
		HOST: 'mysql',
		NAME: 'SPACED_REP',
		USER: 'root',
		PASSWORD: 'root',
		DIALECT: 'mysql',
		PORT: '3306',
		SSL_CONFIG: false
	},
  PROJECT_ROOT,
	LOG_PATH: '/var/log/space-rep',
	IS_LOCAL: true,
	NUMBER_OF_FORKS: 5,
	PROCESS_NAME: hostname,
	WORKER_PREFIX: 'worker_',
}
