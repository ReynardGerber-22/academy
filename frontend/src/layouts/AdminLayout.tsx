import { Link, Outlet } from "react-router";
import { LayoutDashboard, LogIn, LogOut, Menu, Scale, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export const AdminLayout = () => {
  const { logout, user, loading } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      setDrawerVisible(true);
      return;
    }

    const timeout = window.setTimeout(() => setDrawerVisible(false), 200);
    return () => window.clearTimeout(timeout);
  }, [drawerOpen]);

  const openDrawer = () => {
    setDrawerVisible(true);
    window.requestAnimationFrame(() => setDrawerOpen(true));
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Open admin navigation"
              title="Open admin navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
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
          </div>
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
      {drawerVisible && (
        <>
          <button
            type="button"
            onClick={closeDrawer}
            className={`fixed inset-0 z-40 cursor-default bg-foreground/20 transition-opacity duration-200 ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Close admin navigation"
          />
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-card shadow-xl transition-transform duration-200 ease-out ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-label="Admin navigation"
          >
            <div className="flex h-16 items-center justify-between border-b px-5">
              <span className="font-display text-lg font-semibold">
                Admin navigation
              </span>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Close admin navigation"
                title="Close admin navigation"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="space-y-1 p-4">
              <Link
                to="/admin/users"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Users
              </Link>
              <span className="block rounded-md px-3 py-2 text-sm text-muted-foreground">
                Courses <span className="text-xs">(coming soon)</span>
              </span>
              <span className="block rounded-md px-3 py-2 text-sm text-muted-foreground">
                Settings <span className="text-xs">(coming soon)</span>
              </span>
            </nav>
          </aside>
        </>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
