import { Link, Outlet } from "react-router";
import { LogIn, LogOut, Scale } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export const AdminLayout = () => {
  const { logout, user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/admin" className="flex items-center gap-2.5">
            <span className="gradient-brand flex h-8 w-8 items-center justify-center rounded-sm">
              <Scale
                className="h-4.5 w-4.5 text-brand-foreground"
                aria-hidden="true"
              />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Academy Admin
            </span>
          </Link>
          {!user && !loading && (
            <Link
              to="/login"
              className="inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Log in
            </Link>
          )}
          {user && !loading && (
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </button>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
