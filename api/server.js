const express = require('express');
const app = express();
const http = require('http');
const SETTINGS = require('./config/config');
const logger = require('./config/logger');
const cors = require('cors');
const api = require('./controllers/index');
const helmet = require('helmet');
const { CORS_ORIGINS, IS_LOCAL } = require('./config/config');

async function initialize() {


  const httpPort = SETTINGS.WEB_SERVER.PORT;
  let httpServer = null;
  logger.info('starting http server on port', httpPort);
  httpServer = http.createServer(app);
  httpServer.listen(SETTINGS.WEB_SERVER.PORT, () => {
    logger.info(`listening at http://${SETTINGS.WEB_SERVER.HOST}:${SETTINGS.WEB_SERVER.PORT}`);
  });

  // Use helmet middleware
  app.use(helmet());

  // Configure HSTS header
  app.use(
    helmet.hsts({
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true
    })
  );

  app.use((req, res, next) => {
    const origin = req.header('Origin');
    if (!IS_LOCAL && origin != undefined ) {
      logger.info(`cors enabled req.path::::::::::::::${req.path}`);
      if (CORS_ORIGINS.includes(origin)) {
        logger.info(`allowed origin:${origin}`);
        return next(); // Move next() here to continue processing the middleware chain
      } else {
        logger.info(`blocked origin:${origin}`);
        return res.status(500).json({
          msg: "blocked by cors"
        })
      }
    }{
      return next();
    }
  });
  
  app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }));

  app.use(express.json({
    type: "*/*",
	}));

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).json({ error: 'Bad Request' });
    } else {
      next();
    }
  });
  
  app.use((req,res,next)=>{
    const start = Date.now();
    res.on('finish',() => {
      let time = Date.now() - start;
      logger.info(`[Execution time] - ${req.originalUrl} took ${time}ms`);
    });
    next();
  });

  app.get('/ping',(req,res)=>res.send('pong'));
  app.use('/api', api); 
}

module.exports = {
  initializeWebServer: initialize,
};
