import { useNavigate } from "react-router";
import { useContext } from "react";
import InvoiceContext from "../contexts/InvoiceContext";

const InvoiceCard = ({ invoice }) => {
  const navigate = useNavigate();
  const { setInvoice } = useContext(InvoiceContext);

  return (
    <>
      <article className="card">
        <p>{invoice.id}</p>
        <p>{new Date(invoice.due_date).toLocaleDateString()}</p>
        <p>{`${invoice.first_name} ${invoice.last_name}`}</p>
        <p>{invoice.amount}</p>
        <button>{invoice.status}</button>
        <button
          onClick={() => {
            setInvoice(invoice);
            navigate("/editInvoice");
          }}
        >{`>`}</button>
      </article>
    </>
  );
};

export default InvoiceCard;
