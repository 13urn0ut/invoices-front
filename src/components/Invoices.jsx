import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useErrorBoundary } from "react-error-boundary";
import InvoiceCard from "./InvoiceCard";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const Content = () => {
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState(null);
  const { user } = useContext(UserContext);
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }

    const fetchData = async () => {
      try {
        const { data: result } = await axios.get(
          `${API_URL}/invoices${filter ? `?status=${filter}` : ""}`,
          {
            withCredentials: true,
          }
        );

        setInvoices(result.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(err.response.data.message);
            // showBoundary(err.response.data);
          } else {
            setError("An error occurred");
            // showBoundary(err);
          }
        } else {
          setError("An error occurred");
          // showBoundary(err);
        }
        setInvoices([]);
      }
    };

    fetchData();
  }, [user, navigate, filter, showBoundary]);

  return (
    <>
      <header className="invoices-header">
        <div>
          <h1>Invoices</h1>
          <p>there are {invoices.length || "no"} invoices</p>
        </div>
        <select
          onChange={(e) => setFilter(e.target.value)}
          name="status"
          id="status"
        >
          <option value="">Filter by status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <div onClick={() => navigate("/newInvoice")}>
          <span>+</span>
          <span>New Invoice</span>
        </div>
      </header>

      <div className="error-large mx-auto w-max mt-8">{error}</div>

      {!error && (
        <div>
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice?.id} invoice={invoice} />
          ))}
        </div>
      )}
    </>
  );
};

export default Content;
