module.exports = {
  register({ strapi }) {
    // Add health check route
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/health',
        handler: (ctx) => {
          ctx.body = { status: 'ok' };
        },
        config: {
          auth: false,
        },
      },
    ]);
  },
}; 