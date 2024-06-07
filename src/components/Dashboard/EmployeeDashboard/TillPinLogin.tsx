import { useState } from "react";
import TillOnboardingMobile from "../../till/onboarding/mobile";

const TillPinLogin = () => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigate = (path: string) => {
    // Implement navigation logic here
  };

  return (
    <div>
      hii
      {/* <div className="hidden md:block">
        <TillOnboardingWeb onNavigate={handleNavigate} />
      </div> */}
      <div className="md:hidden block">
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
