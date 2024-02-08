// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./index.css";
// import { Provider } from "react-redux";
// import { store } from "./store/store";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MobileLayout from "./MobileLayout";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function Root() {
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(window.matchMedia("(max-width: 768px)").matches);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rootComponent = isMobileScreen ? <MobileLayout /> : <App />;

  return (
    <React.StrictMode>
      <Provider store={store}>{rootComponent}</Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
