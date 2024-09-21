const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://x21-be.onrender.com",
      changeOrigin: true,
    })
  );
};
