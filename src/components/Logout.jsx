import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const Logout = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${API_URL}/users/logout`, {
          withCredentials: true,
        });

        setError(null);
        navigate("/login");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred");
          }
        } else {
          setError("An error occurred");
        }

        navigate("/login");
      }
    };

    logout();
  });
  return (
    <div>
      <h1 className="error-large">{error}</h1>
    </div>
  );
};

export default Logout;
