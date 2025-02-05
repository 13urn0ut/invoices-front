import { NavLink } from "react-router";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white py-4 px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {!user ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
