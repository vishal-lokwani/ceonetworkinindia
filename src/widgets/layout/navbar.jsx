// import React from "react";
// import PropTypes from "prop-types";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Navbar as MTNavbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// export function Navbar({ brandName, routes, action }) {
//   const { pathname } = useLocation();
//   const [openNav, setOpenNav] = React.useState(false);

//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//   const navList = (
//     <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
//       {routes.map(({ name, path, icon, href, target }) => (
//         <Typography
//           key={name}
//           as="li"
//           variant="small"
//           color="inherit"
//           className="capitalize"
//         >
//           {href ? (
//             <a
//               href={href}
//               target={target}
//               className="flex items-center gap-1 p-1 font-bold"
//             >
//               {icon &&
//                 React.createElement(icon, {
//                   className: "w-[18px] h-[18px] opacity-75 mr-1",
//                 })}
//               {name}
//             </a>
//           ) : (
//             <Link
//               to={path}
//               target={target}
//               className="flex items-center gap-1 p-1 font-bold"
//             >
//               {icon &&
//                 React.createElement(icon, {
//                   className: "w-[18px] h-[18px] opacity-75 mr-1",
//                 })}
//               {name}
//             </Link>
//           )}
//         </Typography>
//       ))}
//     </ul>
//   );

//   return (
//     <MTNavbar color="transparent" className="p-3">
//       {/* Check if on sign-in or sign-up page */}
//       {pathname === '/sign-in' || pathname === '/sign-up' ? (
//         <div className="container mx-auto flex items-center justify-between text-black">
//           <Link to="/">
//             <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
//               CEO MEETUP
//             </Typography>
//           </Link>
//           <div className="hidden lg:block">{navList}</div>
//           <div className="hidden gap-2 lg:flex">
//             {React.cloneElement(action, {
//               className: "hidden lg:inline-block",
//             })}
//           </div>
//           <IconButton
//             variant="text"
//             size="sm"
//             color="white"
//             className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//             onClick={() => setOpenNav(!openNav)}
//           >
//             {openNav ? (
//               <XMarkIcon strokeWidth={2} className="h-6 w-6" />
//             ) : (
//               <Bars3Icon strokeWidth={2} className="h-6 w-6" />
//             )}
//           </IconButton>
//         </div>
//       ) : (
//         <div className="container mx-auto flex items-center justify-between text-white">
//           <Link to="/">
//             <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
//               CEO MEETUP
//             </Typography>
//           </Link>
//           <div className="hidden lg:block">{navList}</div>
//           <div className="hidden gap-2 lg:flex">
//             {/* Search bar shown only if not on sign-in or sign-up */}
//             <div className="flex justify-between items-center mb-6">
//         <div className="relative">
//           <button className="absolute left-0 top-1/2 -translate-y-1/2">
//             <svg
//               className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
//               width="20"
//               height="20"
//               viewBox="0 0 20 20"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
//               />
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
//               />
//             </svg>
//           </button>
//           <input
//             type="text"
//             placeholder="Type to search..."
//             // value={searchText}
//             // onChange={onSearchChange}
//             className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
//           />
//         </div>

//         {/* Status Filter Dropdown */}
      
//       </div>
//             {React.cloneElement(action, {
//               className: "hidden lg:inline-block",
//             })}
//           </div>
//           <IconButton
//             variant="text"
//             size="sm"
//             color="white"
//             className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//             onClick={() => setOpenNav(!openNav)}
//           >
//             {openNav ? (
//               <XMarkIcon strokeWidth={2} className="h-6 w-6" />
//             ) : (
//               <Bars3Icon strokeWidth={2} className="h-6 w-6" />
//             )}
//           </IconButton>
//         </div>
//       )}

//       <MobileNav
//         className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
//         open={openNav}
//       >
//         <div className="container mx-auto">
//           {navList}
//           {React.cloneElement(action, {
//             className: "w-full block",
//           })}
//         </div>
//       </MobileNav>
//     </MTNavbar>
//   );
// }


// Navbar.defaultProps = {
//   brandName: "",
//   action: (
//     <a
//       href="https://www.creative-tim.com/product/material-tailwind-kit-react"
//       target="_blank"
//     >
//       {/* <Button variant="gradient" size="sm" fullWidth>
//         free download
//       </Button> */}
//     </a>
//   ),
// };

// Navbar.propTypes = {
//   brandName: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object).isRequired,
//   action: PropTypes.node,
// };

// Navbar.displayName = "/src/widgets/layout/navbar.jsx";

// export default Navbar;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName = "MyApp", routes = [], action }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [ceoList, setCeoList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5021/ceo`)
      .then((response) => response.json())
      .then((data) => setCeoList(data.data))
      .catch((error) => console.error("Error fetching CEOs:", error));
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setIsDropdownOpen(value !== "");
  };

  const handleDropdownClick = (ceo) => {
    closeDropdown();
    setSearchText("");
    navigate(`/description/${ceo._id}`);
  };

  const handleSearchFocus = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const filteredRoutes = routes.filter((route) => {
    const routeName = route?.name?.toLowerCase();
    if (isLoggedIn && (routeName === "sign in" || routeName === "sign up")) {
      return false;
    }
    if (!isLoggedIn && routeName === "account") {
      return false;
    }
    return true;
  });

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {filteredRoutes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <MTNavbar color="transparent" className="p-3">
      <div
        className={`container mx-auto flex items-center justify-between ${
          isAuthPage ? "text-black" : "text-white"
        }`}
      >
        <Link to="/">
          <img
            src="/img/logo.png"
            className="h-10 w-auto mr-4 ml-2 cursor-pointer"
            alt="logo"
          />
        </Link>

        <div className="hidden lg:block">{navList}</div>

        <div className="hidden gap-2 lg:flex">
          {!isAuthPage && (
            <div className="flex justify-between items-center mb-6 relative dropdown">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body dark:fill-bodydark"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search for CEOs..."
                value={searchText}
                onFocus={handleSearchFocus}
                onChange={handleSearchChange}
                className="w-full bg-transparent pl-9 pr-4 text-white focus:outline-none xl:w-125"
              />
              {isDropdownOpen && searchText.trim() !== "" && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10 border border-black-300">
                  <ul>
                    {ceoList
                      .filter((ceo) =>
                        ceo?.name
                          ?.toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((ceo) => (
                        <li
                          key={ceo._id}
                          className="px-4 py-2 text-black cursor-pointer"
                          onClick={() => handleDropdownClick(ceo)}
                        >
                          {ceo.name}
                        </li>
                      ))}
                    {ceoList.filter((ceo) =>
                      ceo?.name
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase())
                    ).length === 0 && (
                      <li className="px-4 py-2 text-black">No results found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {action &&
            React.cloneElement(action, {
              className: "hidden lg:inline-block",
            })}
        </div>

        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      icon: PropTypes.elementType,
      href: PropTypes.string,
      target: PropTypes.string,
    })
  ),
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
