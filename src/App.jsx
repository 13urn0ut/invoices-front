import { Route, Routes } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

const Navbar = lazy(() => import("./components/Navbar"));
const SignupForm = lazy(() => import("./components/SignupForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const Content = lazy(() => import("./components/Invoices"));
const Logout = lazy(() => import("./components/Logout"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const ErrorToast = lazy(() => import("./components/ErrorToast"));
const InvoiceForm = lazy(() => import("./components/InvoiceForm"));

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <ErrorBoundary FallbackComponent={ErrorToast}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            {/* <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Content />
                </ProtectedRoute>
              }
            />
            <Route path="/newInvoice" element={<ProtectedRoute>
              <InvoiceForm />
            </ProtectedRoute>} /> */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Content />} />
              <Route path="/newInvoice" element={<InvoiceForm />} />
            </Route>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
