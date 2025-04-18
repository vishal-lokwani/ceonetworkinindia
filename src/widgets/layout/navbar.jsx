import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
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

  const API_URL = import.meta.env.VITE_API_URL;
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
    fetch(`${API_URL}ceo`)
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
    setSearchText("");
    setIsDropdownOpen(false);
    navigate(`/description/${ceo._id}`);
  };

  const handleSearchFocus = () => setIsDropdownOpen(true);

  const filteredRoutes = routes.filter((route) => {
    const routeName = route?.name?.toLowerCase();
    if (isLoggedIn && (routeName === "sign in" || routeName === "sign up")) return false;
    if (!isLoggedIn && routeName === "account") return false;
    return true;
  });

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-4 mt-4 lg:mt-0">
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
              className="flex items-center gap-1 p-1 font-bold hover:text-blue-400 transition"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-90 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold hover:text-blue-400 transition"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-90 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="py-3 px-4 z-50 fixed top-0 left-0 right-0">

      <div className="container mx-auto flex flex-wrap items-center justify-between text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/img/logo.png" className="h-12 w-auto" alt="logo" />
        </Link>

        {/* Mobile Menu Button */}
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

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">{navList}</div>

        {/* Search & Action */}
        <div className="hidden lg:flex items-center gap-4 h-full">
          {/* Search Bar */}
          <div className="relative dropdown w-72">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2"
              style={{ borderRadius: "73px" }}
            >
              <svg className="fill-white" width="20" height="20" viewBox="0 0 20 20">
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
             className="w-full pl-9 pr-4 py-2 h-10 text-white bg-transparent border border-white focus:outline-none focus:border-rgb(0, 72, 130) focus:ring-2 focus:ring-rgb(0, 72, 130) focus:shadow-lg placeholder:text-gray-300 hover:bg-white/10 text-sm"

              style={{ borderRadius: "73px" }}
            />
            {isDropdownOpen && searchText.trim() !== "" && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10 border border-gray-300">
                <ul>
                  {ceoList.filter((ceo) =>
                    ceo?.name?.toLowerCase().includes(searchText.toLowerCase())
                  ).map((ceo) => (
                    <li
                      key={ceo._id}
                      className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                      onClick={() => handleDropdownClick(ceo)}
                    >
                      {ceo.name}
                    </li>
                  ))}
                  {ceoList.filter((ceo) =>
                    ceo?.name?.toLowerCase().includes(searchText.toLowerCase())
                  ).length === 0 && (
                    <li className="px-4 py-2 text-black">No results found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Optional Action */}
          {action &&
            React.cloneElement(action, {
              className: "hidden lg:inline-block",
            })}
        </div>
      </div>

      {/* Mobile Nav with Backdrop & Animation */}
      {openNav && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
            onClick={() => setOpenNav(false)}
          />
          <div className="absolute top-0 left-0 w-full bg-black text-white p-4 z-40 animate-slideDown shadow-xl rounded-b-2xl">
            {navList}
            <div className="relative dropdown mt-4 w-full">
              <input
                type="text"
                placeholder="Search for CEOs..."
                value={searchText}
                onFocus={handleSearchFocus}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2 h-10 text-white bg-transparent border border-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:shadow-lg placeholder:text-gray-300 hover:bg-white/10 text-sm"
                style={{ borderRadius: "73px" }}
              />
              {isDropdownOpen && searchText.trim() !== "" && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10 border border-gray-300">
                  <ul>
                    {ceoList.filter((ceo) =>
                      ceo?.name?.toLowerCase().includes(searchText.toLowerCase())
                    ).map((ceo) => (
                      <li
                        key={ceo._id}
                        className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                        onClick={() => handleDropdownClick(ceo)}
                      >
                        {ceo.name}
                      </li>
                    ))}
                    {ceoList.filter((ceo) =>
                      ceo?.name?.toLowerCase().includes(searchText.toLowerCase())
                    ).length === 0 && (
                      <li className="px-4 py-2 text-black">No results found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
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
