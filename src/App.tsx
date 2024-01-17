import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.tsx";
import LoginPage from "./pages/LoginPage.js";
import NotFound from "./components/NotFound.tsx";
import CheckMail from "./components/CheckMail.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import Register from "./components/Register.tsx";
import ResetPassword from "./components/ResetPassword.tsx";
import PasswordChanged from "./components/PasswordChanged.tsx";

export default function App() {
  return (
    <div className="">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkmail" element={<CheckMail />} />
          <Route path="/password-changed" element={<PasswordChanged />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
