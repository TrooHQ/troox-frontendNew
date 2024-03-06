import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.tsx";
import LoginPage from "./pages/LoginPage.js";
import NotFound from "./components/NotFound.tsx";
import CheckMail from "./components/authPages/CheckMail.tsx";
import ForgotPassword from "./components/authPages/ForgotPassword.tsx";
import ResetPassword from "./components/authPages/ResetPassword.tsx";
import PasswordChanged from "./components/authPages/PasswordChanged.tsx";
import BusinessProfiles from "./components/authPages/BusinessProfiles.tsx";
import Register from "./components/authPages/Register.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ManageUsers from "./components/Dashboard/ManageUsers.tsx";
import Overview from "./components/Dashboard/Overview.tsx";
import Roles from "./components/Dashboard/Roles.tsx";
import NewRoles from "./components/Dashboard/NewRoles.tsx";
import MenuBuilder from "./components/Dashboard/MenuBuilder.tsx";
import PriceList from "./components/Dashboard/PriceList.tsx";
import ManageTables from "./components/Dashboard/ManageTables.tsx";
import TableList from "./components/Dashboard/TableList.tsx";
import Home from "./LandingPage/Home.tsx";
import BusinessTabs from "./LandingPage/BusinessTabs.tsx";
import PosPage from "./LandingPage/Products/PosPage.tsx";
import KDSPage from "./LandingPage/Products/KDSPage.tsx";
import TableOrderingPage from "./LandingPage/Products/TableOrderingPage.tsx";
import DigitalOrderingPage from "./LandingPage/Products/DigitalOrderingPage.tsx";
import PaymentPage from "./LandingPage/Products/PaymentPage.tsx";

export default function App() {
  return (
    <div className=" font-GeneralSans">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pos" element={<PosPage />} />
          <Route path="/kds" element={<KDSPage />} />
          <Route path="/table-ordering" element={<TableOrderingPage />} />
          <Route path="/digital-ordering" element={<DigitalOrderingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/tabs" element={<BusinessTabs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-tables" element={<ManageTables />} />
          <Route path="/table-list" element={<TableList />} />
          <Route path="/menu-builder" element={<MenuBuilder />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/new-roles" element={<NewRoles />} />
          <Route path="/register" element={<Register />} />
          <Route path="/business-profile" element={<BusinessProfiles />} />
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
