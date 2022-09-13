import Avatar from './avatar'
import DateFormater from './date-formater'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  baseURL: string
}

const PostHeader = ({ title, coverImage, date, author, baseURL }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {/* <div className="hidden md:block md:mb-4">
        <Avatar name={author.name} picture={author.picture} />
      </div> */}
      <br/>
      <div className="mb-4 md:mb-8 -mx-5 sm:mx-0">
        <CoverImage title={title} src={coverImage} baseURL={baseURL}/>
      </div>
      <div className="max-w-2xl mx-auto">
        {/* <div className="block md:hidden mb-2">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
        <div className="mb-6 text-lg">
          <DateFormater dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
