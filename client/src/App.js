import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AUthPage from "./user/pages/AuthPage";
import BookmarkPage from "./bookmark/pages/BookmarkPage";
import Login from "./user/components/Login";
import Signup from "./user/components/Signup";
import Reset from "./user/components/Reset";
import ResetPassword from "./user/components/ResetPassword";
import Home from "./bookmark/pages/Home";
import Archive from "./bookmark/pages/Archive";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <AUthPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "reset", element: <Reset /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/bookmark",
    element: <BookmarkPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "archive", element: <Archive /> },
    ],
  },
]);

function App() {
  const mode = useSelector((s) => s.theme.mode);
  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(mode === "dark" ? "theme-dark" : "theme-light");
  }, [mode]);
  return (
    <main className="min-h-screen relative">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
