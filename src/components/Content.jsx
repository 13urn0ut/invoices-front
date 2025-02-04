import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";

const Content = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1 className="text-8xl font-bold text-center mt-20">Content</h1>
    </div>
  );
};

export default Content;
