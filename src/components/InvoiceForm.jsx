import axios from "axios";
import { useForm } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import InvoiceContext from "../contexts/InvoiceContext";

const API_URL = import.meta.env.VITE_API_URL;

const InvoiceForm = ({ mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { invoice } = useContext(InvoiceContext);

  const createEditInvoice = async (data) => {
    try {
      if (mode === "edit") {
        console.log(data);

        await axios.patch(`${API_URL}/invoices/${invoice.id}`, data, {
          withCredentials: true,
        });

        navigate("/");
        return;
      }

      const { data: result } = await axios.post(
        `${API_URL}/invoices`,
        { ...data, user_id: user.id },
        {
          withCredentials: true,
        }
      );

      console.log(result);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          showBoundary(err.response.data);
        } else {
          showBoundary(err);
        }
      } else {
        showBoundary(err);
      }
    }
  };

  return (
    <div className="invoice-form">
      <form onSubmit={handleSubmit(createEditInvoice)}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount", { required: true, min: 0.01 })}
            type="number"
            min="0.01"
            step="0.01"
            id="amount"
            name="amount"
            defaultValue={mode === "edit" ? invoice?.amount : ""}
          />
          {errors.amount && (
            <p className="error-small">{errors.amount?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="due_date">Due date</label>
          <input
            {...register("due_date", { required: true })}
            type="date"
            id="due_date"
            name="due_date"
            defaultValue={
              mode === "edit" ? invoice?.due_date.split("T")[0] : ""
            }
          />
          {errors.due_date && (
            <p className="error-small">{errors.due_date?.message}</p>
          )}
        </div>

        {mode === "edit" && (
          <div>
            <label htmlFor="invoice_status">Status</label>
            <select
              {...register("invoice_status")}
              name="invoice_status"
              id="invoice_status"
              defaultValue={invoice?.status}
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            {errors.status && (
              <p className="error-small">{errors.status?.message}</p>
            )}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
