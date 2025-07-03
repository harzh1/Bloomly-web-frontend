import React, { useEffect } from "react";
import {
  HomeIcon,
  ChatIcon,
  CommunityIcon,
  ProfileIcon,
  PlusIcon,
} from "./Icons";

const SideNav = ({
  currentPage,
  setCurrentPage,
  isMobileNavOpen,
  setIsMobileNavOpen,
  isCompact,
}) => {
  // This effect now correctly closes the mobile nav panel ONLY when a navigation item is clicked (i.e., currentPage changes).
  useEffect(() => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const NavItem = ({ icon, text, pageName, isMobile }) => {
    const commonClasses = `flex items-center p-3 my-1 cursor-pointer rounded-lg transition-colors group`;
    const activeClasses =
      currentPage === pageName
        ? "bg-blue-500/80 text-white"
        : "text-gray-300 hover:bg-gray-700/80";

    const handleClick = () => {
      setCurrentPage(pageName);
      if (isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    };

    if (isMobile) {
      return (
        <li
          className={`${commonClasses} ${activeClasses}`}
          onClick={handleClick}
        >
          {icon}
          <span className="ml-4">{text}</span>
        </li>
      );
    }

    return (
      <li
        className={`${commonClasses} ${activeClasses} ${
          isCompact ? "justify-center" : ""
        }`}
        onClick={handleClick}
      >
        {icon}
        {!isCompact && <span className="ml-4 whitespace-nowrap">{text}</span>}
      </li>
    );
  };

  const navItems = [
    { icon: <HomeIcon />, text: "Home", pageName: "home" },
    { icon: <ChatIcon />, text: "Chat", pageName: "chat" },
    { icon: <CommunityIcon />, text: "Community", pageName: "community" },
  ];

  return (
    <>
      {isMobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}

      <aside
        className={`
            fixed top-0 left-0 h-full bg-gray-900 text-white shadow-2xl flex flex-col z-40
            transition-all duration-300 ease-in-out
            ${isCompact ? "md:w-20" : "md:w-64"}
            ${isMobileNavOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
            md:translate-x-0
        `}
      >
        <div className="flex items-center justify-center p-4 h-20 border-b border-white/10">
          <div className="relative h-full flex items-center">
            <span
              className="font-bold text-3xl whitespace-nowrap"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              {isCompact ? "B" : "Bloomly"}
            </span>
          </div>
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex flex-1 flex-col p-4">
          <ul className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem {...item} key={item.pageName} isMobile={false} />
            ))}
          </ul>
          <div className="mt-auto">
            <button
              onClick={() => {
                setCurrentPage("chat");
              }}
              className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-4 rounded-lg text-base transition-all hover:scale-105"
            >
              {isCompact ? <PlusIcon /> : <span>Talk to a Peer</span>}
            </button>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <NavItem
              icon={<ProfileIcon />}
              text="Profile"
              pageName="profile"
              isMobile={false}
            />
          </div>
        </nav>

        {/* Mobile Nav Panel */}
        <div className={`md:hidden ${isMobileNavOpen ? "block" : "hidden"}`}>
          <div className="p-4 h-20 flex items-center justify-between border-b border-white/10">
            <span className="font-bold text-2d">Bloomly</span>
          </div>
          <nav className="flex-1 p-3">
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.pageName}
                  onClick={() => setCurrentPage(item.pageName)}
                >
                  <NavItem {...item} isMobile={true} />
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={() => {
                  setCurrentPage("chat");
                  setIsMobileNavOpen(false);
                }}
                className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-4 rounded-lg text-base transition-all hover:scale-105"
              >
                Talk to a Peer
              </button>
            </div>
          </nav>
          <div className="p-3 border-t border-white/10">
            <ul>
              <li onClick={() => setCurrentPage("profile")}>
                <NavItem
                  icon={<ProfileIcon />}
                  text="Profile"
                  pageName="profile"
                  isMobile={true}
                />
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
