export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  responses: {
    privateAttributes: ['_v', 'id', 'created_at'],
  },
  middlewares: {
    cors: {
      enabled: true,
      origin: ['*'],
      expose: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 31536000,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'X-Frame-Options'],
    },
  },
};
