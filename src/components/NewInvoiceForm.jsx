import axios from "axios";
import { useForm } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const NewInvoiceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const createInvoice = async (data) => {
    try {
      const { data: result } = await axios.post(`${API_URL}/invoices`, { ...data, user_id: user.id }, {
        withCredentials: true,
      });

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
      <form onSubmit={handleSubmit(createInvoice)}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount", { required: true, min: 0.01 })}
            type="number"
            min="0.01"
            step="0.01"
            id="amount"
            name="amount"
          />
          {errors.amount && (
            <p className="error-small">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="due_date">Due date</label>
          <input
            {...register("due_date", { required: true })}
            type="date"
            id="due_date"
            name="due_date"
          />
          {errors.due_date && (
            <p className="error-small">{errors.due_date.message}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewInvoiceForm;
