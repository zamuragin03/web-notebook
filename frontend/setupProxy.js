const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: '192.168.31.102:57759',
      changeOrigin: true,
    })
  );
};