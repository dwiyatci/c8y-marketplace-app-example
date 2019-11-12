const proxy = require('http-proxy-middleware');

const apiServer = 'https://innovation.staging-latest.c8y.io';

module.exports = function(app) {
  /**
   * @return {Boolean}
   */
  const filter = (pathname, req) => {
    // Add API entry points here.
    const apis = ['inventory'];

    return apis.some(api => pathname.match(`^/${api}`));
  };

  const devProxy = proxy('/apps/reactapp', {
    target: 'http://localhost:3000',
    pathRewrite: { '^/apps/reactapp': '' }
  });

  const apiProxy = proxy(filter, {
    target: apiServer,
    secure: false,
    changeOrigin: true
  });

  app.use(devProxy);
  app.use(apiProxy);
};
