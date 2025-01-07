import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/shared/Container";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import React from "react";

interface Blog {
  _id: string;
  title: string;
  related: string;
  date: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
}

async function getData() {
  const query = `*[_type == "blog"]{
  _id,
  title,
  related,
  date,
  "mainImage": image.asset->url,
  slug
}`;
  const response = await client.fetch(query);
  return response;
}

const Blogs = async () => {
  const data = await getData();
  return (
    <Container className="w-full h-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 gap-5 justify-items-center">
        {data.map((item: Blog) => (
          <div
            key={item._id}
            className=" w-full px-1 xsm:w-[392px] flex items-center border border-[#E8E8EA] justify-center h-[488px] rounded-[12px]"
          >
            <div className="w-[360px] h-[460px] flex flex-col justify-between">
              <div className="h-[240px]">
                <img
                  src={urlFor(item.mainImage).width(360).height(240).url()}
                  alt={item.title}
                  className="rounded-[6px]"
                />
              </div>
              <div className="h-[220px] xs:h-[200px] p-2 flex flex-col justify-between w-full">
                <span
                  className={`font-medium bg-[#e6e6e6] rounded-[6px] h-[28px] text-[#4B6BFB] flex items-center justify-center ${
                    item.related.length > 20
                      ? "w-[260px]"
                      : item.related.length > 12
                        ? "w-[180px]"
                        : "w-[100px]"
                  }`}
                >
                  {item.related}
                </span>
                <h2 className="text-[#181A2A] font-semibold text-[24px] leading-[28px]">
                  {item.title}
                </h2>

                <Link
                  href={`/blog/${item.slug.current}`}
                  className="w-[160px] font-medium bg-[#e6e6e6] rounded-[6px] h-[28px] text-[#4B6BFB] flex items-center justify-between px-3 group"
                >
                  <p className="text-[#97989F] text-[16px] leading-[24px] font-normal">
                    Read More
                  </p>
                  <BsArrowRight className="text-[16px] text-[#97989F] transition-transform duration-500 group-hover:translate-x-2 " />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Blogs;
