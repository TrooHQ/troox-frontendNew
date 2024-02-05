import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Mobile/NotFound";
import Login from "./Mobile/authPages/Login";
import RegistrationStepForm from "./Mobile/Components/RegistrationStepForm";
import MenuSetupForm from "./Mobile/Components/MenuSetupForm";
const MobileLayout = () => {
  return (
    <div>
      <Router>
        {/* <ScrollToTop /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationStepForm />} />
          <Route path="/menu" element={<MenuSetupForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MobileLayout;
