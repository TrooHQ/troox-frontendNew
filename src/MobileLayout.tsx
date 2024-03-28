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
import ListofRestaurants from "./Mobile/Customers/ListofRestaurants";
import StartOrder from "./Mobile/Customers/StartOrder";
import MenuDetails from "./Mobile/Customers/MenuDetails";
import { MenuPage } from "./Mobile/Customers/MenuPage";
import Home from "./LandingPage/Home";
import PosPage from "./LandingPage/Products/PosPage";
import KDSPage from "./LandingPage/Products/KDSPage";
import TableOrderingPage from "./LandingPage/Products/TableOrderingPage";
import DigitalOrderingPage from "./LandingPage/Products/DigitalOrderingPage";
import PaymentPage from "./LandingPage/Products/PaymentPage";
import RestaurantsPage from "./LandingPage/Businesses/RestaurantsPage";
import HotelPage from "./LandingPage/Businesses/HotelPage";
import LoungesPage from "./LandingPage/Businesses/LoungesPage";
import CafePage from "./LandingPage/Businesses/CafePage";
import FastFoodPage from "./LandingPage/Businesses/FastFoodPage";
import FoodTruckPage from "./LandingPage/Businesses/FoodTruckPage";
import DemoPage from "./LandingPage/Businesses/DemoPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Basket } from "./Mobile/Customers/Basket";
import { Tip } from "./Mobile/Customers/Tip";
import { SelectPayment } from "./Mobile/Customers/SelectPayment";
import { Receipt } from "./Mobile/Customers/Receipt";
import { GetReceipt } from "./Mobile/Customers/GetReceipt";
import VerifyAccount from "./Mobile/Components/VerifyAccount";
import ForgotPassword from "./Mobile/authPages/ForgotPassword";
const MobileLayout = () => {
  return (
    <div className=" font-GeneralSans overflow-hidden">
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/pos" element={<PosPage />} />
          <Route path="/kds" element={<KDSPage />} />
          <Route path="/table-ordering" element={<TableOrderingPage />} />
          <Route path="/digital-ordering" element={<DigitalOrderingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/restaurant" element={<RestaurantsPage />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/lounges" element={<LoungesPage />} />
          <Route path="/cafe" element={<CafePage />} />
          <Route path="/fast-food" element={<FastFoodPage />} />
          <Route path="/food-truck" element={<FoodTruckPage />} />
          <Route path="/request-demo" element={<DemoPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/restaurants" element={<ListofRestaurants />} />
          {/* <Route path="/start-order" element={<StartOrder />} /> */}
          <Route path="/" element={<StartOrder />} />
          <Route path="/explore-menu" element={<MenuPage />} />
          <Route path="/menu-details/:id" element={<MenuDetails />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/tip" element={<Tip />} />
          <Route path="/payment-type" element={<SelectPayment />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/get-receipt" element={<GetReceipt />} />

          <Route path="/ticket" element={<Tickets />} />
          <Route path="/menu-page" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/report" element={<Reporting />} />
          <Route path="/register" element={<RegistrationStepForm />} />
          <Route path="/verify" element={<VerifyAccount />} />
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
