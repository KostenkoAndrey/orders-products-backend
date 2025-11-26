import { getConnectedClients } from '../utils/websocket.js';

export const getWebSocketStats = () => {
  const clients = getConnectedClients();

  const stats = {
    totalConnections: clients.size,
    authenticatedUsers: 0,
    usersList: [],
  };

  clients.forEach((clientData, ws) => {
    stats.authenticatedUsers++;
    stats.usersList.push({
      userId: clientData.userId,
      email: clientData.email,
      connectedAt: ws.connectedAt,
      isActive: ws.readyState === 1,
    });
  });

  return stats;
};
