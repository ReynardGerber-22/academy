import { Routes, Route, Navigate } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { AuthProvider } from "./auth/AuthProvider";
import { RequireAuth } from "./auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<RequireAuth />}>
            <Route
              path="/my-learning/*"
              element={
                <h1 className="mx-auto max-w-6xl px-5 py-12 text-2xl">
                  My Learning
                </h1>
              }
            />
            <Route
              path="/my-progress/*"
              element={
                <h1 className="mx-auto max-w-6xl px-5 py-12 text-2xl">
                  My Progress
                </h1>
              }
            />
            <Route
              path="/forums/*"
              element={
                <h1 className="mx-auto max-w-6xl px-5 py-12 text-2xl">
                  Student Forums
                </h1>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
