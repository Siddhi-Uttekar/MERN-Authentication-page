import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";

function App() {
  return (
    <div className="App">
      <h1>Hellooo</h1>
      <Outlet /> {/* Render the child routes here */}
    </div>
  );
}

// Set up routing with createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export { appRouter };
