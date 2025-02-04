import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate, Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { data: result } = await axios.post(
        `${API_URL}/users/login`,
        data,
        {
          withCredentials: true,
        }
      );

      setError(null);
      setUser(result.data);

      navigate("/");
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
    }
  };

  return (
    <div className="login">
      <div className="error-large">{error}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: true })}
            // placeholder="Email"
            der="Email"
          />
          {errors.email && (
            <p className="error-small">This field is required</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
            // placeholder="Password"
          />
          {errors.password && (
            <p className="error-small">This field is required</p>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
      <div className="link">
        <p>Don't have an account?</p> <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
