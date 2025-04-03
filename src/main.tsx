import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'antd/dist/reset.css';
// import 'antd/dist/antd.css'; // cho phiên bản cũ hơn

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);