import { getWebSocketStats } from '../services/stats.js';

export const getWebSocketStatsController = (req, res) => {
  const stats = getWebSocketStats();

  res.json({
    status: 200,
    message: 'WebSocket statistics retrieved successfully',
    data: stats,
  });
};
