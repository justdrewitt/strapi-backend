export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      rest: {
        defaultLimit: 100,
        maxLimit: 250,
      },
    },
  },
  seo: {
    enabled: true,
    config: {
      contentTypes: {
        'api::blog-post.blog-post': {
          field: 'seo',
          references: {
            title: 'title',
            description: 'content',
            image: 'image',
            keywords: 'tags',
          },
        },
      },
    },
  },
});
