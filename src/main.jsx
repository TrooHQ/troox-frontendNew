import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MobileLayout from "./MobileLayout";
import SelfCheckoutLayout from "./SelfCheckoutLayout";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function Root() {
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 769px) and (max-width: 1090px)").matches
  );

  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(window.matchMedia("(max-width: 768px)").matches);
      setIsLargeScreen(
        window.matchMedia("(min-width: 769px) and (max-width: 1090px)").matches
      );
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let rootComponent;

  if (isMobileScreen) {
    rootComponent = <MobileLayout />;
  } else if (isLargeScreen) {
    rootComponent = <SelfCheckoutLayout />;
  } else {
    rootComponent = <App />;
  }

  return (
    <React.StrictMode>
      <Provider store={store}>{rootComponent}</Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
