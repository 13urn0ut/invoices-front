import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (user) return;
    const fetchUser = async () => {
      try {
        const { data: result } = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });

        // console.log(result);

        setUser(result.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("An error occurred");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error, setError, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
