import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContainer from "./pages/AuthContainer/AuthContainer";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import { YourWork } from "./pages/YourWork/YourWork";

function App() {
  const currentLocation = window.location.pathname;
  React.useEffect(() => {
    const routerPath = ["/home", "/authentication", "/your-work"];
    if (!routerPath.includes(currentLocation)) {
      window.location.pathname = routerPath[0];
    }
  }, [currentLocation]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/your-work" element={<YourWork />} />
        </Route>
        <Route path="/authentication" element={<AuthContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
