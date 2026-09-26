import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { csrfHeaders } from "../auth/csrfHeaders";
import type { ValidationErrors } from "../auth/AuthContext";
import type { AdminRole } from "../types/AdminRole";
import type { AdminUser } from "../types/AdminUser";

export const AdminUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user: authenticatedUser } = useAuth();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [availableRoles, setAvailableRoles] = useState<AdminRole[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [rolesSaving, setRolesSaving] = useState(false);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [rolesSuccessMessage, setRolesSuccessMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      try {
        const [userResponse, rolesResponse] = await Promise.all([
          fetch(`/api/admin/users/${id}`, {
            credentials: "include",
            headers: { Accept: "application/json" },
          }),
          fetch("/api/admin/roles", {
            credentials: "include",
            headers: { Accept: "application/json" },
          }),
        ]);

        if (userResponse.status === 404) {
          setError("User not found.");
          return;
        }

        if (!userResponse.ok || !rolesResponse.ok) {
          throw new Error("Failed to load user");
        }

        const [fetchedUser, fetchedRoles]: [AdminUser, AdminRole[]] =
          await Promise.all([userResponse.json(), rolesResponse.json()]);
        setUser(fetchedUser);
        setFirstName(fetchedUser.first_name);
        setSurname(fetchedUser.surname);
        setEmail(fetchedUser.email);
        setAvailableRoles(fetchedRoles);
        setSelectedRoleIds(
          fetchedRoles
            .filter((role) => fetchedUser.roles.includes(role.name))
            .map((role) => role.id),
        );
      } catch {
        setError("Unable to load this user right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...csrfHeaders(),
        },
        body: JSON.stringify({ first_name: firstName, surname, email }),
      });

      if (response.status === 422) {
        const data = await response.json();
        setFieldErrors(data.errors ?? {});
        return;
      }

      if (response.status === 404) {
        setError("User not found.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to save user");
      }

      const updatedUser: AdminUser = await response.json();
      setUser(updatedUser);
      setFirstName(updatedUser.first_name);
      setSurname(updatedUser.surname);
      setEmail(updatedUser.email);
      setSuccessMessage("User details saved.");
    } catch {
      setError("Unable to save this user right now.");
    } finally {
      setSaving(false);
    }
  };

  const handleRolesSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!id) return;

    setRolesSaving(true);
    setRolesError(null);
    setRolesSuccessMessage(null);

    try {
      const response = await fetch(`/api/admin/users/${id}/roles`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...csrfHeaders(),
        },
        body: JSON.stringify({ roles: selectedRoleIds }),
      });

      if (response.status === 422) {
        const data = await response.json();
        setRolesError(data.errors?.roles?.join(" ") ?? data.message);
        return;
      }

      if (response.status === 404) {
        setRolesError("User not found.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to save roles");
      }

      const updatedUser: AdminUser = await response.json();
      setUser(updatedUser);
      setSelectedRoleIds(
        availableRoles
          .filter((role) => updatedUser.roles.includes(role.name))
          .map((role) => role.id),
      );
      setRolesSuccessMessage("Roles saved.");
    } catch {
      setRolesError("Unable to save roles right now.");
    } finally {
      setRolesSaving(false);
    }
  };

  const isEditingOwnSuperAdminAccount =
    user !== null &&
    String(authenticatedUser?.id) === String(user.id) &&
    user.roles.includes("super-admin");

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <Link to="/admin/users" className="text-sm text-brand hover:underline">
        Back to users
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        User details
      </h1>
      {loading && (
        <p className="mt-6 text-sm text-muted-foreground">Loading user...</p>
      )}
      {error && <p className="mt-6 text-sm text-brand">{error}</p>}
      {!loading && !error && user && (
        <>
          <form
            className="mt-6 space-y-5 rounded-lg border bg-card p-5 shadow-card"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-first-name">
                First name
              </label>
              <input
                id="user-first-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              {fieldErrors.first_name?.map((message) => (
                <p className="text-sm text-brand" key={message}>
                  {message}
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-surname">
                Surname
              </label>
              <input
                id="user-surname"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              {fieldErrors.surname?.map((message) => (
                <p className="text-sm text-brand" key={message}>
                  {message}
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-email">
                Email
              </label>
              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              {fieldErrors.email?.map((message) => (
                <p className="text-sm text-brand" key={message}>
                  {message}
                </p>
              ))}
            </div>
            {successMessage && (
              <p className="text-sm text-muted-foreground" role="status">
                {successMessage}
              </p>
            )}
            {error && <p className="text-sm text-brand">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
          <dl className="mt-5 divide-y rounded-lg border bg-card shadow-card">
            <div className="grid gap-1 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Roles
              </dt>
              <dd className="text-sm">{user.roles.join(", ") || "-"}</dd>
            </div>
            <div className="grid gap-1 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Joined
              </dt>
              <dd className="text-sm">
                {new Date(user.created_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>
          <form
            className="mt-5 space-y-5 rounded-lg border bg-card p-5 shadow-card"
            onSubmit={handleRolesSubmit}
          >
            <div>
              <h2 className="text-lg font-semibold">Roles</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Assign roles to this user.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {availableRoles.map((role) => {
                const checked = selectedRoleIds.includes(role.id);
                const isProtectedRole =
                  isEditingOwnSuperAdminAccount && role.name === "super-admin";

                return (
                  <label
                    key={role.id}
                    className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={isProtectedRole || rolesSaving}
                      onChange={(event) => {
                        setSelectedRoleIds((current) =>
                          event.target.checked
                            ? [...current, role.id]
                            : current.filter((roleId) => roleId !== role.id),
                        );
                      }}
                    />
                    {role.name}
                  </label>
                );
              })}
            </div>
            {rolesError && <p className="text-sm text-brand">{rolesError}</p>}
            {rolesSuccessMessage && (
              <p className="text-sm text-muted-foreground" role="status">
                {rolesSuccessMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={rolesSaving}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {rolesSaving ? "Saving roles..." : "Save roles"}
            </button>
          </form>
        </>
      )}
    </section>
  );
};
