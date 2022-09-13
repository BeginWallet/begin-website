import cn from 'classnames'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  baseURL: string
  slug?: string
}

const CoverImage = ({ title, src, baseURL, slug }: Props) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small dark:shadow-smallDark rounded-2xl', {
        'hover:shadow-medium dark:hover:shadow-mediumDark transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className={ slug ? "-mx-5 sm:mx-0" : "mx-0"}>
      {slug ? (
        <Link as={baseURL.concat(slug)} href={baseURL.concat("[slug]")}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
