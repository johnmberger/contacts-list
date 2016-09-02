(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const createdb = require('../routes/createdb');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/createdb', createdb);

  };

})(module.exports);
