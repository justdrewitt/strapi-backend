import populateSampleData from './populate-sample-data';

export default async ({ strapi }) => {
  await populateSampleData({ strapi });
}; 