export const csrfHeaders = (): HeadersInit => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  return token ? { "X-XSRF-TOKEN": decodeURIComponent(token) } : {};
};
