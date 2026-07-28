import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./styles.css";

import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/project/:id"
          element={<ProjectPage />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);