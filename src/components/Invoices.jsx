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
  const [filter, setFilter] = useState({ page: 1, limit: 10 });
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
          `${API_URL}/invoices?page=${filter.page}&limit=${filter.limit}${
            filter?.status ? `&status=${filter.status}` : ""
          }`,
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
    <section className="invoices-content">
      <header className="invoices-header">
        <div>
          <h1>Invoices</h1>
          <p>
            there{" "}
            {invoices.count === 1
              ? `is ${invoices.count || "no"} invoice`
              : `are ${invoices.count || "no"} invoices`}
          </p>
        </div>
        <select
          onChange={(e) =>
            setFilter((prev) => {
              return { ...prev, status: e.target.value };
            })
          }
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
        <>
          <div className="invoices-list">
            {invoices.invoices?.map((invoice) => (
              <InvoiceCard key={invoice?.id} invoice={invoice} />
            ))}
          </div>

          <div className="pagination flex items-center justify-between px-6 mt-4">
            <button
              onClick={() => {
                setFilter((prev) => {
                  return { ...prev, page: prev.page - 1 || 1 };
                });
              }}
            >
              {`<< Prev`}
            </button>

            <p>{`Page ${filter.page} of ${Math.ceil(
              invoices.count / filter.limit
            )}`}</p>

            <button
              onClick={() => {
                setFilter((prev) => {
                  return {
                    ...prev,
                    page:
                      prev.page + 1 > Math.ceil(invoices.count / prev.limit)
                        ? Math.ceil(invoices.count / prev.limit)
                        : prev.page + 1,
                  };
                });
              }}
            >
              {`Next >>`}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Content;
