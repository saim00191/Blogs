"use client";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import customComponents from "@/shared/customComponents";
import { urlFor } from "@/sanity/lib/image";
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { BlogPost , Comment  } from './types'


const Blog = ({ blogPost, slug }: { blogPost: BlogPost; slug: string }) => {
  const content = blogPost?.content || [];
  const subimage = blogPost?.subimage;
  const halfwayPoint = Math.floor(content.length / 2);
  const firstHalf = content.slice(0, halfwayPoint);
  const secondHalf = content.slice(halfwayPoint);

  const userInfo = useSelector((state: RootState) => state.commentsSlice?.userInfo);
  const userName = userInfo?.displayName || "";
  const isUserLoggedIn = Boolean(userInfo);
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComments, setUserComments] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [unsavedComment, setUnsavedComment] = useState<Comment | null>(null);

  const newDate = new Date();
  const localDate = newDate.toLocaleString();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await client.fetch(`*[_type == 'comments']`);
      const filteredComments = response.filter(
        (comment: Comment) => comment.slug === slug
      );
      setComments(filteredComments);
    };

    fetchComments();

    window.scrollTo(0, scrollPosition);

    const savedComment = localStorage.getItem(`comment-${slug}`);
    if (savedComment) {
      setUserComments(savedComment);
    }
  }, [slug, scrollPosition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userComments.trim() || !slug) {
      return;
    }

    const newComment: Comment = {
      _id: `temp-${Date.now()}`,
      username: userName,
      comment: userComments,
      date: localDate,
      slug,
    };

    setUnsavedComment(newComment);
    setComments([newComment, ...comments]);

    const currentScrollPosition = window.scrollY;
    setScrollPosition(currentScrollPosition);

    try {
      setLoading(true);
      await client.create({
        _type: "comments",
        username: userName,
        comment: userComments,
        date: localDate,
        slug: slug,
      });

      setTimeout(async () => {
        const response = await client.fetch(`*[_type == 'comments']`);
        const filteredComments = response.filter(
          (comment: Comment) => comment.slug === slug
        );
        setComments(filteredComments);
        setUnsavedComment(null);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 60000);

      localStorage.removeItem(`comment-${slug}`);
      setUserComments("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const comment = e.target.value;
    setUserComments(comment);

    if (!isUserLoggedIn) {
      localStorage.setItem(`comment-${slug}`, comment);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-2">
      <Link
        href="/"
        className="w-[160px] font-medium hover:underline rounded-[6px] h-[28px] text-[#97989F]  flex items-center justify-between px-3 group"
      >
        <BsArrowLeft className="text-[16px] text-[#97989F] transition-transform duration-500 group-hover:-translate-x-2" />
        <p className="text-[#97989F] text-[16px] leading-[24px] font-normal">
          Back to Home
        </p>
      </Link>

      <div
        className={`rounded-[6px] h-[32px] flex items-center mt-6 justify-center bg-[#4B6BFB] ${
          blogPost?.related.length > 20
            ? "w-[250px]"
            : blogPost?.related.length > 12
            ? "w-[180px]"
            : "w-[160px]"
        }`}
      >
        <p className="text-white text-[14px]">{blogPost?.related}</p>
      </div>

      <h2 className="text-[36px] text-[#181A2A] font-semibold py-4">
        {blogPost?.title}
      </h2>

      <p className="text-[#696A75] text-[16px]">
        {blogPost?.date ? new Date(blogPost?.date).toLocaleDateString() : ""}
      </p>

      <div className="h-[460px] w-full mt-6">
        <img
          src={blogPost?.image ? urlFor(blogPost?.image).url() : ""}
          alt={blogPost?.title || "Blog Image"}
          className="w-full h-full rounded-[12px]"
        />
      </div>

      <div className="py-6">
        <PortableText value={firstHalf} components={customComponents} />

        {subimage && (
          <div className="h-[460px] w-full py-6">
            <img
              src={urlFor(subimage).url()}
              alt="Sub Image"
              className="w-full h-full rounded-[12px] object-cover"
            />
          </div>
        )}

        <PortableText value={secondHalf} components={customComponents} />
      </div>

      <div className="py-6 mt-8 ">
        <h3 className="text-[24px] text-[#181A2A] font-semibold mb-4">
          Leave a Comment
        </h3>

        {!isUserLoggedIn && (
          <p className="text-red-500 text-sm mb-4">
            You need to be logged in to leave a comment.
          </p>
        )}

        {isUserLoggedIn && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={userName || ""}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-[6px] border-[#ccc] text-[#181A2A] focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                value={userComments}
                onChange={handleCommentChange}
                className="w-full px-4 py-2 border rounded-[6px] resize-none border-[#ccc] text-[#181A2A] focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isUserLoggedIn}
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-[#4B6BFB] text-white px-6 py-2 rounded-[6px] mt-2 w-full hover:bg-[#3a59d8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isUserLoggedIn || !userComments.trim() || loading}
              >
                Submit Comment
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="py-6 mt-8 ">
        <h3 className="text-[24px] text-[#181A2A] font-semibold mb-4">
          Comments
        </h3>

        {comments.length === 0 && !unsavedComment && (
          <p className="text-[#696A75] text-sm">No comments yet.</p>
        )}

        {unsavedComment && (
          <div key={unsavedComment._id} className="border-t py-4">
            <div className="flex items-center justify-between">
              <p className="text-[#4B6BFB] font-semibold">
                {unsavedComment.username}
              </p>
              <p className="text-[#696A75] text-sm ">{unsavedComment.date}</p>
            </div>
            <p className="text-[#181A2A] mt-2 text-[18px]">
              {unsavedComment.comment}
            </p>
          </div>
        )}

        {comments.map((comment) => (
          <div key={comment._id} className="border-t py-4">
            <div className="flex items-center justify-between">
              <p className="text-[#4B6BFB] font-semibold text-[17px]">
                {comment.username}
              </p>
              <p className="text-[#696A75] text-sm">{comment.date}</p>
            </div>
            <p className="text-[#181A2A] mt-2 text-[18px]">
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
