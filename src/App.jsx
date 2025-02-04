import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Content from "./components/Invoices";
import Logout from "./components/Logout";

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
    </>
  );
}

export default App;
