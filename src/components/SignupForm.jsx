import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useErrorBoundary } from "react-error-boundary";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const SignupForm = () => {
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

  const {showBoundary} = useErrorBoundary();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const { data: result } = await axios.post(
        `${API_URL}/users/signup`,
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

      showBoundary();
    }
  };

  return (
    <div className="signup">
      <div className="error-large">{error && <p className="">{error}</p>}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="error-small">This field is required</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <p className="error-small">This field is required</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: true })}
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
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <p className="error-small">This field is required</p>
          )}
        </div>

        <div>
          <label htmlFor="passwordconfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordconfirm"
            id="passwordconfirm"
            {...register("passwordconfirm", { required: true, minLength: 8 })}
          />
          {errors.passwordconfirm && (
            <p className="error-small">This field is required</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className="link">
        <p>Already have an account? </p> <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignupForm;
