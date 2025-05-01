'use strict';

const populateSampleData = require('./populate-sample-data');

module.exports = async ({ strapi }) => {
  await populateSampleData({ strapi });
}; 