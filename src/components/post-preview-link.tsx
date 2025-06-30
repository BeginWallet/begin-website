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

const PostPreviewLink = ({
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
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{excerpt}</p>
        </div>
      </motion.div>
     
    </>
  );
};

export default PostPreviewLink;
