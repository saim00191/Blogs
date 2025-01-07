import { client } from "@/sanity/lib/client"; 
import Blog from "./Blog";

const BlogPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params;  

  const query = `*[_type == "blog" && slug.current == $slug]{ 
    title,
    related,
    date,
    image,
    subimage,
    content
  }`;


  const blogPost = await client.fetch(query, { slug });

  if (!blogPost || blogPost.length === 0) {
    return <div>Blog post not found.</div>;
  }

 
  return <Blog blogPost={blogPost[0]} slug={slug} />;
};

export default BlogPage;
