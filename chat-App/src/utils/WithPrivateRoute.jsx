import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

const WithPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }
};

export default WithPrivateRoute;
