import Response from "../lib/response.js";

export const healthCheck = (req, res) => {
  const response = new Response(res);
  return response.success({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
};

export const notFound = (req, res) => {
  const response = new Response(res);
  return response.notFound("The requested resource was not found.");
};
