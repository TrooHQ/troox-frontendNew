import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Mobile/NotFound";
import Login from "./Mobile/authPages/Login";
import RegistrationStepForm from "./Mobile/Components/RegistrationStepForm";
import MenuSetupForm from "./Mobile/Components/MenuSetupForm";
import ScrollToTop from "./components/ScrollToTop";
import TableSetupForm from "./Mobile/Components/TableSetupForm";
import Dashboard from "./Mobile/authPages/Dashboard";
import Tickets from "./Mobile/Components/Tickets";
import Menu from "./Mobile/Components/Menu";
import Order from "./Mobile/Components/Order";
import Reporting from "./Mobile/Components/Reporting";
import SettingsPage from "./Mobile/SettingsPage";
import RoomSetupForm from "./Mobile/Components/RoomSetupForm";
import ManageQrCode from "./Mobile/Components/Settings/QrCodeSettings/ManageQrCode";
import EmployeeDashboard from "./Mobile/Employee/EmployeeDashboard";
import EmployeeSettingsPage from "./Mobile/Employee/EmployeeSettingsPage";
import EnterPassword from "./Mobile/authPages/EnterPassword";
import CreatePassword from "./Mobile/authPages/CreatePassword";
import EmployeeLogin from "./Mobile/authPages/EmployeeLogin";
import ListofRestaurants from "./Mobile/Customers/ListofRestaurants";
import StartOrder from "./Mobile/Customers/StartOrder";
import MenuDetails from "./Mobile/Customers/MenuDetails";
import { MenuPage } from "./Mobile/Customers/MenuPage";
const MobileLayout = () => {
  return (
    <div className=" font-GeneralSans">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<EmployeeLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/restaurants" element={<ListofRestaurants />} />
          <Route path="/start-order" element={<StartOrder />} />
          <Route path="/explore-menu" element={<MenuPage />} />
          <Route path="/menu-details/:id" element={<MenuDetails />} />
          <Route path="/ticket" element={<Tickets />} />
          <Route path="/menu-page" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/report" element={<Reporting />} />
          <Route path="/register" element={<RegistrationStepForm />} />
          <Route path="/menu" element={<MenuSetupForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/employee-settings" element={<EmployeeSettingsPage />} />
          <Route path="/password" element={<EnterPassword />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/manage-qr" element={<ManageQrCode />} />
          <Route path="/table" element={<TableSetupForm />} />
          <Route path="/room" element={<RoomSetupForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MobileLayout;
