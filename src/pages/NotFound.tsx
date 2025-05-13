
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-galaxy-blue">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page not found</p>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find the page you were looking for. Please check the URL or return to the dashboard.
        </p>
        <Button 
          className="mt-4"
          onClick={() => navigate("/")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
