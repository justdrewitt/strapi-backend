import axios from 'axios';

const STRAPI_API_URL = 'http://localhost:1337/api';

// Add authentication token
const AUTH_TOKEN = '0fbe2015dfc4d168d379e03d0762f82c627217740b52ae8e915623a17afb8399e2583d66ea634aaf2a75dae17f30d9e63d6753254b56239efeeb11de974305cba38f8e72e67182d344da76a9166d5d3d0d4d21f3fa6548752043b78f1323d392f1ee1fb823c1fd1ceed9da34a208101be60441e5f3f7a1c1efbb03782bfbed53'; // Replace with your actual token

const categories = [
  {
    name: 'Web Development',
    slug: 'web-development'
  },
  {
    name: 'React',
    slug: 'react'
  },
  {
    name: 'JavaScript',
    slug: 'javascript'
  },
  {
    name: 'TypeScript',
    slug: 'typescript'
  },
  {
    name: 'Frontend',
    slug: 'frontend'
  },
  {
    name: 'Backend',
    slug: 'backend'
  },
  {
    name: 'DevOps',
    slug: 'devops'
  },
  {
    name: 'UI/UX',
    slug: 'ui-ux'
  }
];

async function populateCategories() {
  try {
    console.log('Starting to populate categories...');

    for (const category of categories) {
      try {
        // Check if category already exists
        const existingResponse = await axios.get(
          `${STRAPI_API_URL}/tags?filters[slug][$eq]=${category.slug}`,
          {
            headers: {
              'Authorization': `Bearer ${AUTH_TOKEN}`
            }
          }
        );

        if (existingResponse.data.data.length > 0) {
          console.log(`Category "${category.name}" already exists, skipping...`);
          continue;
        }

        // Create new category
        const response = await axios.post(
          `${STRAPI_API_URL}/tags`,
          {
            data: {
              name: category.name,
              slug: category.slug
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${AUTH_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(`Created category: ${category.name}`);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(`Error creating category "${category.name}":`, error.response.data);
        } else {
          console.error(`Error creating category "${category.name}":`, error);
        }
      }
    }

    console.log('Finished populating categories!');
  } catch (error) {
    console.error('Error in populateCategories:', error);
  }
}

// Run the populate function
populateCategories(); 