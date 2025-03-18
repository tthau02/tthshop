export const getBaseUrl = () => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  return `${protocol}://${host}:${port}`;
};
