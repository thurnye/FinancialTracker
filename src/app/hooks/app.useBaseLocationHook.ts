import { useLocation } from "react-router-dom";

export default function useBasePathHook() {
  const location = useLocation();

  // Get the current path
  const path = location.pathname; // e.g. "/affiliates/essos"

  // Split by "/" and filter empty parts
  const parts = path.split("/").filter(Boolean); // ["affiliates", "essos"]

  // Return the first part (or empty string if none)
  const basePath = parts.length > 0 ? parts[0] : "";

  return `/${basePath}`;
}
