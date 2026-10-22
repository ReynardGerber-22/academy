import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { AdminUser } from "../types/AdminUser";
import { Trash2 } from "lucide-react";

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        setUsers(await response.json());
      } catch {
        setError("Unable to load users right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  async function deleteUser(userId: number) {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      setError((error as Error)?.message || "Unable to delete user right now.");
    }
  }

  function showConfirmationDelete(userId: number) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setError(null);
      deleteUser(userId);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View registered Academy users.
      </p>
      {loading && (
        <p className="mt-6 text-sm text-muted-foreground">Loading users...</p>
      )}
      {error && <p className="mt-6 text-sm text-brand">{error}</p>}
      {!loading && (
        <div className="mt-6 overflow-x-auto rounded-lg border bg-card shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Roles</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr
                  key={user.id}
                  tabIndex={0}
                  role="link"
                  className="cursor-pointer hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/admin/users/${user.id}`);
                    }
                  }}
                >
                  <td className="px-4 py-3 font-medium">
                    {user.first_name} {user.surname}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">{user.roles.join(", ") || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      aria-label="Delete user"
                      onClick={(e) => {
                        e.stopPropagation();
                        showConfirmationDelete(user.id);
                      }}
                    >
                      <Trash2 className="hover:text-red-500 hover:cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted-foreground">
              No users found.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
