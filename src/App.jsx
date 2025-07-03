import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import { useAuth } from "./hooks/useAuth";
import SideNav from "./components/common/SideNav";
import ChatScreen from "./components/pages/ChatScreen";
import AllChats from "./components/pages/AllChats";
import Login from "./components/overlays/Login";

// Placeholder components for routing
const CommunityPage = () => <div className="p-5 h-full">Community Page</div>;
const ProfilePage = () => <div className="p-5 h-full">Profile Page</div>;

const MobileHeader = ({ onMenuClick }) => (
  <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-16 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
    <div className="font-bold text-2xl">
      <span>Bloomly</span>
    </div>
    <button
      onClick={onMenuClick}
      className="p-2 text-gray-300 hover:text-white"
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
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  </div>
);

function App() {
  const { isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSideNavCompact, setIsSideNavCompact] = useState(false);
  const [isLoginOverlayVisible, setIsLoginOverlayVisible] = useState(false);

  useEffect(() => {
    setIsSideNavCompact(currentPage === "chat");
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onLoginClick={() => setIsLoginOverlayVisible(true)} />;
      case "chat":
        return <AllChats />;
      case "community":
        return <CommunityPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage onLoginClick={() => setIsLoginOverlayVisible(true)} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 "></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black text-gray-900 dark:text-white flex">
      <MobileHeader onMenuClick={() => setIsMobileNavOpen(true)} />
      <SideNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isCompact={isSideNavCompact}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
      <main
        className={`flex-1 overflow-y-auto bg-gray-900 transition-all duration-300 ease-in-out pt-16 md:pt-0 ${
          isSideNavCompact ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {renderPage()}
      </main>
      {isLoginOverlayVisible && (
        <Login onClose={() => setIsLoginOverlayVisible(false)} />
      )}
    </div>
  );
}

export default App;
