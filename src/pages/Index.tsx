
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not logged in, dashboard if logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // This page will just redirect, but here's a fallback render
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Plyfind</h1>
        <p className="text-xl text-gray-600">Loading your experience...</p>
      </div>
    </div>
  );
};

export default Index;
