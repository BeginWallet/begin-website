import Avatar from "./avatar";
import DateFormater from "./date-formater";
import CoverImage from "./cover-image";
import Link from "next/link";
import Author from "../types/author";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  baseURL: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  baseURL,
}: Props) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-100 dark:bg-[#18181b] rounded-xl shadow hover:shadow-md"
      >
        {/* Image Header */}
        <div className="relative w-full h-[14rem]">
          <Link href={baseURL.concat(slug)}>
            <Image
              fill
              src={coverImage} // Replace with your actual image path
              alt={slug}
              className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
            />
          </Link>
        </div>
        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mt-4 mb-4">
            <Link
              href={baseURL.concat(slug)}
              // as={baseURL.concat(slug)}
              // href={baseURL.concat("[slug]")}
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <p className="text-gray-500 mb-4">
            <DateFormater dateString={date} />
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{excerpt}</p>
        </div>
      </motion.div>
      {/* <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} baseURL={baseURL}/>
      </div>
      <h3 className="text-2xl mb-3 leading-snug">
        <Link
          href={baseURL.concat(slug)}
          // as={baseURL.concat(slug)}
          // href={baseURL.concat("[slug]")}
          className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormater dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} />
    </div> */}
    </>
  );
};

export default PostPreview;
