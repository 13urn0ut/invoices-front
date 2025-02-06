const InvoiceCard = ({ invoice }) => {
  return (
    <>
      <article className="card">
        <p>{invoice.id}</p>
        <p>{new Date(invoice.due_date).toLocaleDateString()}</p>
        <p>{`${invoice.first_name} ${invoice.last_name}`}</p>
        <p>{invoice.amount}</p>
        <button>{invoice.status}</button>
        <button>{`>`}</button>
      </article>
    </>
  );
};

export default InvoiceCard;
