'use strict';

// Initializes the `registrations` service on path `/registrations`
const createService = require('feathers-nedb');
const createModel = require('../../models/registrations.model');
const hooks = require('./registrations.hooks');
const filters = require('./registrations.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'registrations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/registrations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('registrations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
