import { WebSocketServer } from 'ws';
import { wsAuthenticate } from '../middlewares/wsAuthenticate.js';

const clients = new Map();

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({
    server,
    verifyClient: async (info, callback) => {
      try {
        const { user, session } = await wsAuthenticate(info.req);
        info.req.user = user;
        info.req.session = session;
        callback(true);
      } catch (error) {
        console.error('WS Auth failed:', error.message);
        callback(false, 401, error.message);
      }
    },
  });

  wss.on('connection', (ws, request) => {
    const { user } = request;

    ws.userId = user._id.toString();
    ws.userEmail = user.email;
    ws.connectedAt = new Date();

    clients.set(ws, { userId: ws.userId, email: ws.userEmail });

    ws.send(
      JSON.stringify({
        type: 'connected',
        user: { id: user._id, email: user.email, name: user.name },
      }),
    );

    ws.on('close', () => {
      clients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error(`Error: ${user.email}:`, error.message);
    });
  });

  return wss;
};

export const getConnectedClients = () => clients;
