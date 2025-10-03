import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import logo from "/images/Logo.png"

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="bg-[#3C75A6] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Kanbino Logo" className="h-18 w-auto mr-0" />
            <Link to="/" className="text-2xl font-bold tracking-wide">Kanbino</Link>
          </div>

          {user ? (
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  onClick={handleSignOut}
                  className="hover:text-[#F36A1B] transition-colors"
                >
                  Sign-Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/sign-in"
                  className="hover:text-[#F36A1B] transition-colors"
                >
                  Sign-In
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="hover:text-[#F36A1B] transition-colors"
                >
                  Sign-Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

