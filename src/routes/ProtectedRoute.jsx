import { Outlet , Navigate } from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? (/* si hay un usuario logueado entonces*/
    <Outlet /> /* permitime seguir en esta ruta */
  ) : (
    <Navigate to="/login" replace /> /* caso contrario mandame de nuevo a login */
  );
}