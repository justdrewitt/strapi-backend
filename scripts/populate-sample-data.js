// This script is meant to be run in the Strapi console

const sampleTags = [
  { name: 'Web Development' },
  { name: 'React' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Tutorial' },
  { name: 'Portfolio' },
  { name: 'UI/UX' },
];

const sampleBlogPosts = [
  {
    title: 'Membangun Portfolio Website dengan React',
    content: 'Portfolio website adalah cara efektif memamerkan karya developer.',
    tags: ['Web Development', 'React', 'Portfolio']
  },
  {
    title: 'Panduan TypeScript untuk Pemula',
    content: 'TypeScript adalah superset JavaScript dengan static typing.',
    tags: ['TypeScript', 'Tutorial', 'JavaScript']
  },
  {
    title: 'Aplikasi Web Modern dengan Next.js',
    content: 'Next.js adalah framework React dengan SSR dan SSG.',
    tags: ['Web Development', 'React', 'Tutorial']
  },
  {
    title: 'Tips JavaScript Modern',
    content: 'JavaScript modern memiliki fitur seperti destructuring dan arrow functions.',
    tags: ['JavaScript', 'Tutorial']
  }
];

// Fungsi untuk membuat slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

async function populateSampleData() {
  try {
    console.log('Starting data population...');
    
    // 1. Create tags first without relations
    const tagMap = new Map();
    
    for (const tag of sampleTags) {
      try {
        // Check if tag exists
        const existingTag = await strapi.entityService.findMany('api::tag.tag', {
          filters: { name: tag.name }
        });
        
        if (!existingTag || existingTag.length === 0) {
          // Create new tag
          const newTag = await strapi.entityService.create('api::tag.tag', {
            data: {
              name: tag.name,
              publishedAt: new Date()
            }
          });
          
          tagMap.set(tag.name, newTag.id);
          console.log(`Created tag: ${tag.name} with ID: ${newTag.id}`);
        } else {
          // Use existing tag
          tagMap.set(tag.name, existingTag[0].id);
          console.log(`Using existing tag: ${tag.name}`);
        }
      } catch (err) {
        console.error(`Error with tag ${tag.name}:`, err.message);
      }
    }
    
    // 2. Create blog posts without relations first
    for (const post of sampleBlogPosts) {
      try {
        const slug = createSlug(post.title);
        
        // Check if post exists
        const existingPost = await strapi.entityService.findMany('api::blog-post.blog-post', {
          filters: { slug }
        });
        
        if (!existingPost || existingPost.length === 0) {
          // Create the post without tags first
          const newPost = await strapi.entityService.create('api::blog-post.blog-post', {
            data: {
              title: post.title,
              slug,
              content: post.content,
              publishedAt: new Date()
            }
          });
          
          console.log(`Created post: ${post.title}`);
          
          // 3. Now try to connect tags in a separate step
          try {
            // Find tag IDs for this post
            const tagIds = post.tags
              .map(tagName => tagMap.get(tagName))
              .filter(id => id !== undefined);
            
            if (tagIds.length > 0) {
              // Update the post to connect tags
              await strapi.entityService.update('api::blog-post.blog-post', newPost.id, {
                data: {
                  tags: tagIds
                }
              });
              console.log(`Connected ${tagIds.length} tags to post: ${post.title}`);
            }
          } catch (tagConnectError) {
            console.error(`Error connecting tags to post ${post.title}:`, tagConnectError.message);
          }
        } else {
          console.log(`Post already exists: ${post.title}`);
        }
      } catch (postError) {
        console.error(`Error creating post ${post.title}:`, postError.message);
      }
    }
    
    console.log('Sample data has been populated successfully!');
  } catch (error) {
    console.error('Error in data population:', error.message);
  }
}

// Execute the function
populateSampleData(); 