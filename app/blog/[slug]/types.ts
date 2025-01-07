import { StaticImageData } from "next/image";

interface PortableTextBlock {
  _key: string;
  _type: string;
  children: Array<{
    _key: string;
    _type: string;
    text: string;
  }>;
}


export interface BlogPost {
  title: string;
  date: string;
  image: StaticImageData; 
  content: PortableTextBlock[]; 
  subimage?: StaticImageData; 
  related: string;
  slug: string;
}

export interface Comment {
  _id: string;
  username: string;
  comment: string;
  date: string;
  slug: string;
}
