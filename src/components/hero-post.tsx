import Avatar from './avatar'
import DateFormater from './date-formater'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  baseURL: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  baseURL,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} baseURL={baseURL}/>
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-2xl lg:text-3xl leading-tight">
            <Link
              href={baseURL.concat(slug)}
              // href={baseURL.concat("[slug]")}
              className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormater dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {/* <Avatar name={author.name} picture={author.picture} /> */}
        </div>
      </div>
    </section>
  );
}

export default HeroPost
