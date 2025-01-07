import { client } from "@/sanity/lib/client"; // Ensure you have this client set up correctly
import Blog from "./Blog"; // Client component that receives fetched data

// Update to use async for correct dynamic parameter handling
const BlogPage = async ({ params }: { params: { slug: string } }) => {
  // Destructure slug from params, no need to await params directly
  const { slug } = await params;  // No need to use await

  // Sanity query to fetch the blog post using the slug
  const query = `*[_type == "blog" && slug.current == $slug]{ 
    title,
    related,
    date,
    image,
    subimage,
    content
  }`;

  // Fetch the blog data based on the slug
  const blogPost = await client.fetch(query, { slug });

  // If no blog post is found, show a fallback message
  if (!blogPost || blogPost.length === 0) {
    return <div>Blog post not found.</div>;
  }

  // Pass the fetched blog data to the client-side Blog component
  return <Blog blogPost={blogPost[0]} slug={slug} />;
};

export default BlogPage;
