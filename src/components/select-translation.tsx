import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";


const Translate = () => {
  const router = useRouter();
  const { locale } = router;

  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);


  // Allow for outside click
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!container?.current?.contains(event.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, container]);

  // Allow to use the `esc` key
  useEffect(() => {
    function handleEscape(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [isOpen]);

  return (
    <div ref={container} className="relative inline-block text-left" 
      onMouseOver={() => setIsOpen((v) => true)}
      onMouseLeave={() => setIsOpen((v) => false)}
    >
      <div>
        <button
          type="button"
          className="p-3 mr-4 inline-flex items-center justify-center rounded hover:text-gray-700 focus:outline-none focus:text-gray-700 hover:bg-white transition ease-in-out duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {locale?.toUpperCase()} 
          <svg width="20" height="20" className="fill-current inline-box ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.25 1.6155C10.245 1.9215 9.2475 2.8455 8.4195 4.398C8.205 4.8 8.0055 5.238 7.827 5.706C8.8845 5.9415 10.035 6.0915 11.25 6.1365V1.6155ZM6.3735 5.3085C5.75643 5.11024 5.15564 4.86451 4.5765 4.5735C5.55364 3.59657 6.71375 2.82181 7.9905 2.2935C7.65395 2.734 7.35443 3.2016 7.095 3.6915C6.81925 4.21438 6.57871 4.75508 6.375 5.31L6.3735 5.3085ZM5.2635 11.25H1.5255C1.66517 9.25465 2.37478 7.34136 3.57 5.7375C4.275 6.1245 5.0625 6.4605 5.9175 6.738C5.52858 8.21227 5.30866 9.72601 5.262 11.25H5.2635ZM7.3635 7.1385C8.5755 7.419 9.885 7.59 11.25 7.6365V11.25H6.765C6.8175 9.7695 7.029 8.379 7.3635 7.1385ZM12.75 7.635V11.25H17.235C17.1904 9.86138 16.9896 8.4822 16.6365 7.1385C15.4245 7.419 14.115 7.59 12.75 7.6365V7.635ZM6.765 12.75H11.25V16.3635C9.885 16.4085 8.5755 16.581 7.3635 16.8615C7.00986 15.5179 6.80859 14.1387 6.7635 12.75H6.765ZM12.75 12.75V16.3635C14.115 16.4085 15.4245 16.581 16.6365 16.8615C16.971 15.621 17.1825 14.2305 17.2365 12.75H12.75ZM7.827 18.294C8.95258 18.0472 10.0983 17.9036 11.25 17.865V22.386C10.245 22.08 9.2475 21.156 8.4195 19.6035C8.19532 19.1801 7.99745 18.7433 7.827 18.2955V18.294ZM7.992 21.708C7.65484 21.2671 7.35482 20.799 7.095 20.3085C6.81873 19.7857 6.5777 19.245 6.3735 18.69C5.75645 18.8883 5.15566 19.134 4.5765 19.425C5.55338 20.403 6.7135 21.1788 7.9905 21.708H7.992ZM5.9175 17.262C5.10542 17.5213 4.31948 17.8563 3.57 18.2625C2.37524 16.6585 1.66615 14.7452 1.527 12.75H5.262C5.30814 14.274 5.52806 15.7878 5.9175 17.262ZM16.0095 21.708C17.2859 21.1791 18.4455 20.4038 19.422 19.4265C18.8433 19.1356 18.243 18.8899 17.6265 18.6915C17.4222 19.246 17.1812 19.7862 16.905 20.3085C16.6457 20.799 16.3462 21.2671 16.0095 21.708ZM12.75 17.8635C13.965 17.9085 15.1155 18.0585 16.173 18.294C15.993 18.762 15.795 19.2 15.5805 19.602C14.7525 21.1545 13.7535 22.077 12.75 22.3845V17.865V17.8635ZM18.0825 17.262C18.9375 17.5395 19.725 17.8755 20.43 18.2625C21.6248 16.6585 22.3339 14.7452 22.473 12.75H18.738C18.6919 14.274 18.4719 15.7878 18.0825 17.262ZM22.473 11.25H18.738C18.6918 9.72596 18.4719 8.21217 18.0825 6.738C18.8945 6.47835 19.6804 6.14339 20.43 5.7375C21.6248 7.34149 22.3339 9.25479 22.473 11.25ZM16.905 3.6915C17.1705 4.1925 17.4135 4.7325 17.628 5.3085C18.2441 5.11012 18.8438 4.86439 19.422 4.5735C18.4453 3.59673 17.2857 2.82198 16.0095 2.2935C16.3365 2.718 16.6365 3.189 16.905 3.6915ZM16.173 5.706C15.1155 5.9415 13.9635 6.0915 12.75 6.1365V1.6155C13.755 1.9215 14.7525 2.8455 15.5805 4.398C15.795 4.8 15.9945 5.238 16.173 5.706Z"/>
          </svg>

        </button>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="absolute w-56 mt-0 right-0 mr-4 origin-top-right rounded-md shadow-lg z-10"
      >
        <div className="bg-white rounded-md shadow-xs">
          <div
            className="py-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="./"
              onClick={() => setCookie('NEXT_LOCALE', 'en')}
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
            >
              English
            </a>
            <a
              href="./pt-BR"
              onClick={() => setCookie('NEXT_LOCALE', 'pt-BR')}
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
            >
              Português (Brasil)
            </a>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default Translate