import React from "react";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/colors.css";
import "./assets/css/global.css";

import { ToastContainer } from "react-toastify";
import Routers from "./routes";

function App() {
  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  );
}

export default App;
