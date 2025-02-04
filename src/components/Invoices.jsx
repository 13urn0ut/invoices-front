import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import InvoiceCard from "./InvoiceCard";
import UserContext from "../contexts/UserContext";

const Content = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <header className="invoices-header">
        <div>
          <h1>Invoices</h1>
          <p>there are no invoices</p>
        </div>
        <select name="status" id="status">
          <option value="all">Filter by status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <div>
          <span>+</span>
          <span>New Invoice</span>
        </div>
      </header>

      <div>
        <InvoiceCard />
      </div>
    </>
  );
};

export default Content;
