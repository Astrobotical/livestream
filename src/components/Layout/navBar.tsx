import { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { setToken, clearToken } from "../../redux/authSlice";
import { logIn, logOut } from "../../redux/userSlice";

interface AccountMenuProps {
  isAdmin: boolean;
  userLoggedIn: boolean;
  handleLinkClick: (link: string) => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
}

const AccountMenu = memo(({ isAdmin, userLoggedIn, handleLinkClick, toggleDropdown, isDropdownOpen }: AccountMenuProps) => {
  if (!userLoggedIn) {
    return (
      <button
        onClick={() => handleLinkClick("/login")}
        className="text-white btn btn-ghost"
      >
        Login
      </button>
    );
  }

  return (
    <details
      open={isDropdownOpen}
      onClick={(e) => e.preventDefault()} // Prevent native toggle behavior
      className="relative"
    >
      <summary
        onClick={toggleDropdown}
        className="btn btn-ghost py-4 text-white cursor-pointer"
      >
        Account
      </summary>
      <ul className="absolute right-0 bg-gray-800 rounded shadow-lg p-2 z-50">
        {isAdmin ? (
          <>
            <li>
              <button
                onClick={() => handleLinkClick("/dashboard")}
                className="text-white btn btn-ghost"
              >
                Admin Panel
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => handleLinkClick("/profile")}
              className="text-white btn btn-ghost"
            >
              Profile
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => handleLinkClick("/logout")}
            className="text-white btn btn-ghost"
          >
            Logout
          </button>
        </li>
      </ul>
    </details>
  );
});

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const userLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const navigate = useNavigate();

  const checkingToken = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSaved}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (tokenSaved) {
          dispatch(setToken(tokenSaved));
          dispatch(logIn({ token: tokenSaved, user: data.user, userID: data.userID }));
          
        }
      } else {
        dispatch(clearToken());
        dispatch(logOut());
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      dispatch(clearToken());
      dispatch(logOut());
    }
  }, [tokenSaved, dispatch]);

  useEffect(() => {
    if (tokenSaved) checkingToken();
  }, [tokenSaved, checkingToken]);

  const handleLinkClick = (link: string) => {
    if (link === "/logout") {
      dispatch(logOut());
      dispatch(clearToken());
      setAccountDropdownOpen(false);
      navigate("/login");
    } else {
      setActiveLink(link);
      navigate(link);
    }
    setMenuOpen(false);
    setAccountDropdownOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setAccountDropdownOpen((prev) => !prev);

  return (
    <nav>
      <div className="navbar bg-gray-800 relative">
        <div className="navbar-start">
          <button
            onClick={() => handleLinkClick("/")}
            className="btn btn-ghost text-xl text-white"
          >
            Yardie UI
          </button>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="navbar-end md:hidden">

          <span className="text-white btn btn-ghost cursor-not-allowed" >
            V-1.0
          </span>

          <button
            className="btn text-white btn-square btn-ghost"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <span className="text-white btn btn-ghost cursor-not-allowed" >
                V-1.0
              </span>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/gallery")}
                className={clsx("text-white btn btn-ghost", {
                  active: activeLink === "/gallery",
                })}
              >
                Gallery
              </button>
            </li>
            <li>
              <AccountMenu
                isAdmin={isAdmin}
                userLoggedIn={userLoggedIn}
                handleLinkClick={handleLinkClick}
                toggleDropdown={toggleDropdown}
                isDropdownOpen={accountDropdownOpen}
              />
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "absolute top-16 left-0 w-full bg-gray-800 md:hidden transition-all duration-300 ease-in-out origin-top",
            {
              "scale-y-100 opacity-100 z-50": menuOpen,
              "scale-y-0 opacity-0": !menuOpen,
            }
          )}
        >
          {menuOpen && (
            <ul className="menu menu-vertical p-2 z-50">
              <li>
                <button
                  onClick={() => handleLinkClick("/gallery")}
                  className={clsx("text-white btn btn-ghost", {
                    active: activeLink === "/gallery",
                  })}
                >
                  Gallery
                </button>
              </li>
              <li>
                <AccountMenu
                  isAdmin={isAdmin}
                  userLoggedIn={userLoggedIn}
                  handleLinkClick={handleLinkClick}
                  toggleDropdown={toggleDropdown}
                  isDropdownOpen={accountDropdownOpen}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;