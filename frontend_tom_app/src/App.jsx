import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import * as React from "react";
import * as api from "./api";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<div>sdsdd</div>} />
        <Route path="/protected1" element={<div>Protected 1</div>} />
        <Route path="/proteected2" element={<div>Protected 2</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
