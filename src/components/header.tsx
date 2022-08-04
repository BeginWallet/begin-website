import Link from 'next/link'

const Header = () => {
  return (
    <div className="fixed lg:relative bg-black w-screen ">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-2 mt-8">
        <Link href="/">
          <a className="hover:underline">
            <img src="/images/left-arrow-back-dark.svg" alt="logo" className="w-6 my-1 md:my-2 float-left block lg:hidden light:hidden" />
            <img src="/images/left-arrow-back.svg" alt="logo" className="w-6 my-3 pr-1 md:my-2 float-left block lg:hidden dark:hidden" />
            <img src="/images/logo.svg" alt="B58 Finance" className="w-8 md:w-10 float-left" />
          </a>
        </Link>
      </h2>
    </div>
  )
}

export default Header
