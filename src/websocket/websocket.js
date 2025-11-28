import { Server } from 'socket.io';
import { getEnvVar } from '../utils/getEnvVar.js';
import { wsAuthenticate } from '../middlewares/wsAuthenticate.js';

const clients = new Map();

const broadcastActiveUsersCount = (io) => {
  const count = clients.size;
  io.emit('activeUsers', { count });
};

export const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: getEnvVar('APP_DOMAIN'),
      methods: ['GET', 'POST'],
      credentials: true,
    },
    allowEIO3: true,
    transports: ['websocket', 'polling'],
  });

  io.use(async (socket, next) => {
    try {
      const { user, session } = await wsAuthenticate(socket.request);
      socket.user = user;
      socket.session = session;
      next();
    } catch (error) {
      next(new Error(error.message));
    }
  });

  io.on('connection', (socket) => {
    const { user } = socket;

    socket.userId = user._id.toString();
    socket.userEmail = user.email;
    socket.connectedAt = new Date();

    clients.set(socket.id, {
      userId: socket.userId,
      email: socket.userEmail,
      socket,
    });

    socket.emit('connected', {
      type: 'connected',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

    broadcastActiveUsersCount(io);

    socket.on('broadcast', (data) => {
      io.emit('broadcast', {
        userId: socket.userId,
        userEmail: socket.userEmail,
        userName: user.name,
        message: data.message,
        timestamp: new Date(),
        ...data,
      });
    });

    socket.on('disconnect', (reason) => {
      clients.delete(socket.id);
      broadcastActiveUsersCount(io);
    });

    socket.on('error', (error) => {
      console.error(`Error for ${user.email}:`, error.message);
    });
  });

  return io;
};
