import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { setToken, clearToken } from "../../redux/authSlice";
import { logIn, logOut } from "../../redux/userSlice";
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMiniActive, setMiniStatus] = useState(false);
  const userLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch();
  const tokenSaved = useSelector((state: RootState) => state.auth.token);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const checkingToken = async () => {
      const savedToken = tokenSaved || "";
      try {
        const response = await fetch("http://localhost:8000/api/auth/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${savedToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(
            logIn({ token: savedToken, user: data.user, userID: data.userID })
          );
          dispatch(setToken(savedToken));
        } else {
          dispatch(clearToken());
          dispatch(logOut());
        }
      } catch (error) {
        dispatch(clearToken());
        dispatch(logOut());
      }
    };

    if (tokenSaved != null) {
      checkingToken();
    }
  }, [tokenSaved, dispatch]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setMiniStatus(previousState => !previousState);
    setMenuOpen(false); // Close the mobile menu after clicking
  };

  const handleLogout = () => {
    dispatch(logOut());
  };
  const toggleMiniBtn = () => {
    console.log(`userLoggedIn ${userLoggedIn}`);

    setMiniStatus(previousState=> !previousState);
    console.log(isMiniActive);
    // setMenuOpen(!menuOpen)
  }
  return (
    <nav>
      <div className="navbar bg-gray-800 relative">
        <div className="navbar-start">
          <Link
            to="/"
            onClick={() => handleLinkClick("/")}
            className="btn btn-ghost text-xl text-white"
          >
            Yardie UI
          </Link>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="navbar-end md:hidden">
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
            <li className="text-white">
              <Link
                to="/about"
                onClick={() => handleLinkClick("/about")}
                className={clsx("text-white btn btn-ghost", {
                  active: activeLink === "/about",
                })}
              >
                About
              </Link>
            </li>
            <li className="text-white">
              <Link
                to="/gallery"
                onClick={() => handleLinkClick("/gallery")}
                className={clsx("text-white btn btn-ghost", {
                  active: activeLink === "/gallery",
                })}
              >
                Gallery
              </Link>
            </li>

            <li className="text-white" onClick={() => toggleMiniBtn()}>
              {userLoggedIn ? (
                <details className="justify-items-center" >
                  <summary className="text-white btn btn-ghost py-4">
                    Account
                  </summary>
                  {isMiniActive && ( // Conditionally render the menu
                    <ul
                      className={clsx("bg-gray-800 rounded-t-none p-2 z-50", {
                        hidden: !isMiniActive,
                      })}

                    >

                      {isAdmin ? (
                        <>
                          <li>
                            <Link
                              to="/dashboard"
                              onClick={() => handleLinkClick("/dashboard")}
                              className={clsx("text-white", {
                                active: activeLink === "/dashboard",
                              })}
                            >
                              Admin Panel
                            </Link>
                          </li>
                          <li>
                            <Link
                              to=""
                              className="text-white btn btn-ghost"
                              onClick={() => handleLinkClick("/settings")}
                            >
                              Settings
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link
                            to=""
                            className="text-white btn btn-ghost"
                            onClick={() => handleLinkClick("/profile")}
                          >
                            Profile
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to=""
                          className="text-white btn btn-ghost"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  )}
                </details>
              ) : (
                <Link
                  to="/login"
                  onClick={() => handleLinkClick("/login")}
                  className={clsx("text-white btn btn-ghost", {
                    active: activeLink === "/login",
                  })}
                >
                  Login
                </Link>
              )}
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
            <ul className="menu menu-vertical p-2  z-50">
              <li>
                <Link
                  to="/about"
                  onClick={() => handleLinkClick("/about")}
                  className={clsx("text-white btn btn-ghost", {
                    active: activeLink === "/about",
                  })}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  onClick={() => handleLinkClick("/gallery")}
                  className={clsx("text-white btn btn-ghost", {
                    active: activeLink === "/gallery",
                  })}
                >
                  Gallery
                </Link>
              </li>
              <li className="text-white">
                {userLoggedIn ? (
                  isAdmin ? (
                    <details>
                      <summary className="text-white">Account</summary>
                      <ul className="bg-gray-800 rounded-t-none p-2">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={() => handleLinkClick("/dashboard")}
                            className={clsx("text-white btn btn-ghost", {
                              active: activeLink === "/dashboard",
                            })}
                          >
                            Admin Panel
                          </Link>
                        </li>
                        <li>
                          <Link to="" className="text-white btn btn-ghost">
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="text-white btn btn-ghost"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </details>
                  ) : (
                    <details>
                      <summary className="text-white btn btn-ghost">
                        Account
                      </summary>
                      <ul className="bg-gray-800 rounded-t-none p-2">
                        <li>
                          <Link to="" className="text-white btn btn-ghost">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="" className="text-white btn btn-ghost">
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="text-white btn btn-ghost"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </details>
                  )
                ) : (
                  <Link
                    to="/login"
                    onClick={() => handleLinkClick("/login")}
                    className="text-white btn btn-ghost"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
