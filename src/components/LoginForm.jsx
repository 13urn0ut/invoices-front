import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-hot-toast";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const {
    // user,
    setUser,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const { showBoundary } = useErrorBoundary();

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
      toast.success("Login successful");

      navigate("/");
    } catch (err) {
      console.log(err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data.message);
          showBoundary(err.response.data);
        } else {
          setError("An error occurred");
          showBoundary(err);
        }
      } else {
        setError("An error occurred");
        showBoundary(err);
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
        <p>Don&apos;t have an account?</p> <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
