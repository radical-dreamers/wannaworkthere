'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'registrations\' service', () => {
  it('registered the service', () => {
    const service = app.service('registrations');

    assert.ok(service, 'Registered the service');
  });
});
