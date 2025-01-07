// schemas/comments.js
export const Comments = {
  name: "comments",
  title: "User Comments",
  type: "document",
  fields: [
   
    {
      name: "username",
      title: "User Name",
      type: "string",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "slug",
      title: "Slug",
      type: "string",
    
    },
  ],
};
