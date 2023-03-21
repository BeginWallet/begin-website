import { useState, useEffect } from "react"
import Menu from "./menu";
import SelectTranslation from "./select-translation";

const Navigation = () => {
  const [navbar, setNavbar]  = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isDarkMode, setDarkMode]  = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
  
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      document.getElementById("home")?.classList.toggle("dark-theme")
      const imgLight = document.querySelectorAll("img.img-light")
      imgLight.forEach((i) => i.classList.toggle("dark-theme"))
      const imgDark = document.querySelectorAll("img.img-dark")
      imgDark.forEach((i) => i.classList.toggle("dark-theme"))

      var theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      document.getElementById("home")?.classList.toggle("dark-theme")
      const imgLight = document.querySelectorAll("img.img-light")
      imgLight.forEach((i) => i.classList.toggle("dark-theme"))
      const imgDark = document.querySelectorAll("img.img-dark")
      imgDark.forEach((i) => i.classList.toggle("dark-theme"))

      var theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
    }
    setDarkMode(!isDarkMode);
    console.log(theme)

    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    
    const changeNavbar = () => {
      if(window.scrollY >= 20) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    }  

    changeNavbar();

    window.addEventListener("scroll", changeNavbar);

    //Dark Mode Auto/Manual Toggle
    // const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    // const currentTheme = localStorage.getItem("theme");
    // console.log(currentTheme)
    // if (currentTheme == "dark" || prefersDarkScheme.matches) {
    //   document.body.classList.toggle("dark-theme");
    //   document.getElementById("home")?.classList.toggle("dark-theme")
    //   document.querySelectorAll("img.img-light")?.forEach((i) => i.classList.toggle("dark-theme"))
    //   document.querySelectorAll("img.img-dark")?.forEach((i) => i.classList.toggle("dark-theme"))

    //   setDarkMode(true);
    // } else if (currentTheme == "light") {
    //   document.body.classList.toggle("light-theme");
    //   document.getElementById("home")?.classList.toggle("dark-theme")
    //   document.querySelectorAll("img.img-light")?.forEach((i) => i.classList.toggle("dark-theme"))
    //   document.querySelectorAll("img.img-dark")?.forEach((i) => i.classList.toggle("dark-theme"))
    //   setDarkMode(false);
    // }

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, []);

  return (
    <nav className={ navbar 
      ? "bg-blue-light bg-opacity-75 dark:bg-opacity-75 fixed top-0 z-50 backdrop-filter firefox:bg-opacity-95 transition easy-in-out duration-200 w-full "
      : "bg-blue-light lg:bg-transparent fixed top-0 z-50 transition easy-in-out duration-200 w-full"
      }>
      <div className="flex flex-wrap container px-5 p-2 lg:p-6 mx-auto flex items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white lg:w-40">
          <a href="/#home" title="Home" onClick={() => navbarOpen ? setNavbarOpen(false) : false}>
            <img src="/images/logo.svg" alt="Begin Wallet Logo" className={ (navbar ? "h-4 md:h-6 float-left" : "pt-1 h-8 md:h-10 float-left") + " transition-all transform duration-300 easy-in-out"} />
          </a>
        </div>
        <div className={"flex-grow" + (navbarOpen ? " block" : " hidden")}>
          <div className="text-right text-white">
            <SelectTranslation/>
          </div>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center py-2"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className={ "w-full block flex-grow lg:flex items-left lg:items-center lg:w-auto" +
              (navbarOpen ? " flex" : " hidden") }>
          <div className="lg:flex-grow pl-6 lg:pl-0 lg:text-center text-white">
            <Menu hover="text-gray-500" onClick={() => navbarOpen ? setNavbarOpen(false) : false} />
          </div>          
        </div>
        <div className="text-white hidden lg:block lg:w-40">
          <SelectTranslation/>
        </div>
        {/* <div>
          <a href="#" role="button" className="flex items-center py-2" onClick={handleClick}>
            <svg className={ isDarkMode ? "hidden" : "fill-current h-8 w-8 rounded-full hover:bg-black hover:text-white p-1"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.7948 15.7949C19.8964 16.5314 17.8247 16.7001 15.8322 16.2803C13.8396 15.8605 12.0121 14.8703 10.5722 13.4305C9.13235 11.9906 8.14221 10.1631 7.72241 8.17051C7.30261 6.17795 7.47125 4.10631 8.2078 2.20789C5.92746 3.09656 4.02898 4.75356 2.84016 6.89281C1.65133 9.03206 1.24678 11.5193 1.69634 13.925C2.14591 16.3307 3.42137 18.504 5.30252 20.0696C7.18367 21.6351 9.55242 22.4947 11.9998 22.4999C14.1182 22.5004 16.1873 21.8604 17.9353 20.6638C19.6834 19.4672 21.0288 17.7699 21.7948 15.7949Z" />
            </svg>
            <svg className={ !isDarkMode ? "hidden" : "fill-current h-8 w-8 rounded-full hover:bg-white hover:text-black p-1"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 16.5C13.1935 16.5 14.3381 16.0259 15.182 15.182C16.0259 14.3381 16.5 13.1935 16.5 12C16.5 10.8065 16.0259 9.66193 15.182 8.81802C14.3381 7.97411 13.1935 7.5 12 7.5C10.8065 7.5 9.66193 7.97411 8.81802 8.81802C7.97411 9.66193 7.5 10.8065 7.5 12C7.5 13.1935 7.97411 14.3381 8.81802 15.182C9.66193 16.0259 10.8065 16.5 12 16.5ZM12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18ZM12 0C12.1989 0 12.3897 0.0790176 12.5303 0.21967C12.671 0.360322 12.75 0.551088 12.75 0.75V3.75C12.75 3.94891 12.671 4.13968 12.5303 4.28033C12.3897 4.42098 12.1989 4.5 12 4.5C11.8011 4.5 11.6103 4.42098 11.4697 4.28033C11.329 4.13968 11.25 3.94891 11.25 3.75V0.75C11.25 0.551088 11.329 0.360322 11.4697 0.21967C11.6103 0.0790176 11.8011 0 12 0V0ZM12 19.5C12.1989 19.5 12.3897 19.579 12.5303 19.7197C12.671 19.8603 12.75 20.0511 12.75 20.25V23.25C12.75 23.4489 12.671 23.6397 12.5303 23.7803C12.3897 23.921 12.1989 24 12 24C11.8011 24 11.6103 23.921 11.4697 23.7803C11.329 23.6397 11.25 23.4489 11.25 23.25V20.25C11.25 20.0511 11.329 19.8603 11.4697 19.7197C11.6103 19.579 11.8011 19.5 12 19.5ZM24 12C24 12.1989 23.921 12.3897 23.7803 12.5303C23.6397 12.671 23.4489 12.75 23.25 12.75H20.25C20.0511 12.75 19.8603 12.671 19.7197 12.5303C19.579 12.3897 19.5 12.1989 19.5 12C19.5 11.8011 19.579 11.6103 19.7197 11.4697C19.8603 11.329 20.0511 11.25 20.25 11.25H23.25C23.4489 11.25 23.6397 11.329 23.7803 11.4697C23.921 11.6103 24 11.8011 24 12ZM4.5 12C4.5 12.1989 4.42098 12.3897 4.28033 12.5303C4.13968 12.671 3.94891 12.75 3.75 12.75H0.75C0.551088 12.75 0.360322 12.671 0.21967 12.5303C0.0790176 12.3897 0 12.1989 0 12C0 11.8011 0.0790176 11.6103 0.21967 11.4697C0.360322 11.329 0.551088 11.25 0.75 11.25H3.75C3.94891 11.25 4.13968 11.329 4.28033 11.4697C4.42098 11.6103 4.5 11.8011 4.5 12ZM20.4855 3.5145C20.6261 3.65515 20.7051 3.84588 20.7051 4.04475C20.7051 4.24362 20.6261 4.43435 20.4855 4.575L18.3645 6.6975C18.2948 6.76713 18.212 6.82235 18.1209 6.86C18.0299 6.89765 17.9323 6.91699 17.8337 6.91692C17.6347 6.91678 17.4439 6.83758 17.3032 6.69675C17.2336 6.62702 17.1784 6.54425 17.1408 6.45318C17.1031 6.36211 17.0838 6.26452 17.0838 6.16597C17.084 5.96695 17.1632 5.77613 17.304 5.6355L19.425 3.5145C19.5656 3.3739 19.7564 3.29491 19.9552 3.29491C20.1541 3.29491 20.3449 3.3739 20.4855 3.5145ZM6.696 17.304C6.8366 17.4446 6.91559 17.6354 6.91559 17.8342C6.91559 18.0331 6.8366 18.2239 6.696 18.3645L4.575 20.4855C4.43355 20.6221 4.2441 20.6977 4.04745 20.696C3.8508 20.6943 3.66269 20.6154 3.52364 20.4764C3.38458 20.3373 3.3057 20.1492 3.30399 19.9526C3.30229 19.7559 3.37788 19.5665 3.5145 19.425L5.6355 17.304C5.77615 17.1634 5.96688 17.0844 6.16575 17.0844C6.36462 17.0844 6.55535 17.1634 6.696 17.304ZM20.4855 20.4855C20.3449 20.6261 20.1541 20.7051 19.9552 20.7051C19.7564 20.7051 19.5656 20.6261 19.425 20.4855L17.304 18.3645C17.1674 18.223 17.0918 18.0336 17.0935 17.8369C17.0952 17.6403 17.1741 17.4522 17.3131 17.3131C17.4522 17.1741 17.6403 17.0952 17.8369 17.0935C18.0336 17.0918 18.223 17.1674 18.3645 17.304L20.4855 19.425C20.6261 19.5656 20.7051 19.7564 20.7051 19.9552C20.7051 20.1541 20.6261 20.3449 20.4855 20.4855ZM6.696 6.6975C6.55535 6.8381 6.36462 6.91709 6.16575 6.91709C5.96688 6.91709 5.77615 6.8381 5.6355 6.6975L3.5145 4.575C3.44287 4.50582 3.38573 4.42306 3.34642 4.33155C3.30712 4.24005 3.28643 4.14164 3.28556 4.04205C3.2847 3.94247 3.30367 3.84371 3.34138 3.75153C3.37909 3.65936 3.43478 3.57562 3.5052 3.5052C3.57562 3.43478 3.65936 3.37909 3.75153 3.34138C3.84371 3.30367 3.94247 3.2847 4.04205 3.28556C4.14164 3.28643 4.24005 3.30712 4.33155 3.34642C4.42306 3.38573 4.50582 3.44287 4.575 3.5145L6.696 5.6355C6.76585 5.70517 6.82126 5.78793 6.85907 5.87905C6.89688 5.97017 6.91634 6.06785 6.91634 6.1665C6.91634 6.26515 6.89688 6.36283 6.85907 6.45395C6.82126 6.54507 6.76585 6.62783 6.696 6.6975Z" />
            </svg>
          </a>
        </div> */}
      </div>
    </nav>
  )
}

export default Navigation
