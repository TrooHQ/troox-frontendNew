import React, { useState } from "react";
import TillOnboardingWeb from "../../components/till/onboarding/web";
import TillOnboardingMobile from "../../components/till/onboarding/mobile";
import { Link, useNavigate } from "react-router-dom";

const TillPinLogin = () => {
  const history = useNavigate();

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigate = (path: string) => {
    history(path);
  };

  return (
    <div>
      <div className="md:block hidden">
        <TillOnboardingWeb onNavigate={handleNavigate} />
      </div>
      <div className="block md:hidden">
        <TillOnboardingMobile
          key="PinInput"
          pin={pin}
          setPin={setPin}
          setActiveIndex={setActiveIndex}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
};

export default TillPinLogin;
