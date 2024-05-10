import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Mobile/NotFound";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import BeginOrder from "./SelfCheckout/BeginOrder";
import Menu from "./SelfCheckout/Menu";
import { CategoryDetails } from "./SelfCheckout/CategoryDetails";
import MenuDetails from "./SelfCheckout/MenuDetails";
import { Basket } from "./SelfCheckout/Basket";
import PaymentScreen from "./SelfCheckout/PaymentScreen";

const SelfCheckoutLayout = () => {
  return (
    <div className=" font-GeneralSans overflow-hidden">
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<BeginOrder />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category-details/:id" element={<CategoryDetails />} />
          <Route path="/menu-details/:id" element={<MenuDetails />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default SelfCheckoutLayout;
