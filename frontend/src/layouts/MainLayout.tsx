import { Outlet } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Support } from "../components/Support/Support";
import { Login } from "../components/Login/Login";

export const MainLayout = () => {
  const [supportOpen, setSupportOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div>
      <Header
        onSupportClick={() => setSupportOpen(true)}
        supportOpen={supportOpen}
        onLoginClick={() => setLoginOpen(true)}
        loginOpen={loginOpen}
      />
      <main
        className={`transition-opacity duration-300 ${
          supportOpen || loginOpen ? "opacity-40" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>
      <Support open={supportOpen} onClose={() => setSupportOpen(false)} />
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};
