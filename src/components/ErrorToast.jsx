import toast from "react-hot-toast";

const ErrorToast = ({ error, resetErrorBoundary }) => {
  toast.error(error.message, { duration: 3000, position: "top-center" });

  return (
    <>
      <div className="w-max mx-auto mt-10">
        <p>Something went wrong</p>
        <pre className="error-large">{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </>
  );
};

export default ErrorToast;
