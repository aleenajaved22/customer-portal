import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { InvoicePaymentPage } from './pages/InvoicePaymentPage';
import { LoginPage } from './pages/LoginPage';
import { PaymentMethodsPage } from './pages/PaymentMethodsPage';
import { ReportsPage } from './pages/ReportsPage';
import { useAuth } from './auth/AuthContext';

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/reports' : '/login'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice-payment"
        element={
          <ProtectedRoute>
            <InvoicePaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-methods"
        element={
          <ProtectedRoute>
            <PaymentMethodsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
