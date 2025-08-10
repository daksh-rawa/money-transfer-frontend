import { Link, NavLink } from "react-router-dom";

// You can pass custom classNames or props for further customization
const Appbar = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-700">PayApp</span>
              {/* Optional: Add a logo image */}
              {/* <img src="/logo.svg" alt="PayApp" className="h-8 ml-2" /> */}
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                "font-medium hover:text-indigo-700 transition " +
                (isActive ? "text-indigo-700 underline" : "text-gray-700")
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/send"
              className={({ isActive }) =>
                "font-medium hover:text-indigo-700 transition " +
                (isActive ? "text-indigo-700 underline" : "text-gray-700")
              }
            >
              Send Money
            </NavLink>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                "font-medium hover:text-indigo-700 transition " +
                (isActive ? "text-indigo-700 underline" : "text-gray-700")
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                "font-medium hover:text-indigo-700 transition " +
                (isActive ? "text-indigo-700 underline" : "text-gray-700")
              }
            >
              Sign Up
            </NavLink>
          </div>
          {/* You can add user profile or menu here */}
          {/* <div>
               <UserAvatarMenu />
              </div>
          */}
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
