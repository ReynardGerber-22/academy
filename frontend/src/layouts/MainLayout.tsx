import { Outlet } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Support } from "../components/Support/Support";

export const MainLayout = () => {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <div>
      <Header
        onSupportClick={() => setSupportOpen(true)}
        supportOpen={supportOpen}
      />
      <main
        className={`transition-opacity duration-300 ${
          supportOpen ? "opacity-40" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>
      {supportOpen && (
        <button
          type="button"
          aria-label="Close student support"
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setSupportOpen(false)}
        />
      )}
      <Support open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
};
