import "./App.css";
import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./services/routes/routes";
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
