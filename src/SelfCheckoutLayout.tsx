import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Mobile/NotFound";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import BeginOrder from "./SelfCheckout/BeginOrder";
import Menu from "./SelfCheckout/Menu";
import { CategoryDetails } from "./SelfCheckout/CategoryDetails";
import { Basket } from "./SelfCheckout/Basket";
import PaymentScreen from "./SelfCheckout/PaymentScreen";

const SelfCheckoutLayout = () => {
  return (
    <div className=" font-GeneralSans overflow-hidden">
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/demo/selfcheckout/:id" element={<BeginOrder />} />
          <Route path="/demo/menu/selfcheckout" element={<Menu />} />
          <Route
            path="/demo/category-details/:id/selfcheckout"
            element={<CategoryDetails />}
          />
          <Route path="/demo/basket/selfcheckout" element={<Basket />} />
          <Route
            path="/demo/payment/selfcheckout"
            element={<PaymentScreen />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default SelfCheckoutLayout;
