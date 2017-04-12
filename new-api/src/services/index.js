'use strict';

const users = require('./users/users.service.js');

const registrations = require('./registrations/registrations.service.js');

const events = require('./events/events.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(registrations);
  app.configure(events);
};
