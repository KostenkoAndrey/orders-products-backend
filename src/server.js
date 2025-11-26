import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';

import indexRouter from './routers/index.js';
import { UPLOAD_DIR } from './constants/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { setupWebSocket } from './utils/websocket.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(indexRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  setupWebSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`WebSocket Server running on ws://localhost:${PORT}`);
  });
};
