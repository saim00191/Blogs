

export const Blogs = {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',

      },
      {
        name: 'related',
        title: 'Related To',
        type: 'string',

      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',

      },
      {
        name: 'image',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true, 
        },
      },
      {
        name: 'subimage',
        title: 'Sub Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'content',
        title: 'Content',
          type: 'array',
          of: [
            {type:'block'}
        ]
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title', 
          maxLength: 96, 
        },
      },
    ],
  };
  