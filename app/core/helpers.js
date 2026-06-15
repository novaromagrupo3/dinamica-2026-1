const path = require('path');

module.exports = function (app) {

  app.locals.old = (key, defaultValue = '') => {
    return defaultValue;
  };

}