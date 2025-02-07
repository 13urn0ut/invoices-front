import { useState } from "react";
import InvoiceContext from "./InvoiceContext";

const InvoiceContextProvider = ({ children }) => {
  const [invoice, setInvoice] = useState(null);

  return (
    <InvoiceContext.Provider value={{ invoice, setInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
