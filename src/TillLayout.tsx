import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Mobile/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TillPinLogin from "./pages/Till/TillPinLogin";
import Till from "./components/Dashboard/EmployeeDashboard/Till";
const TillLayout = () => {
  return (
    <div className=" font-GeneralSans overflow-hidden">
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Till */}
          <Route path="/till-pin" element={<TillPinLogin />} />
          <Route path="/till" element={<Till />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default TillLayout;
