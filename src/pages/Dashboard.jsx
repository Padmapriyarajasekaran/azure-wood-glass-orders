
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ClipboardCheck } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Welcome to Plyfind</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="bg-blue-50 text-blue-700">
            <CardTitle className="text-xl">Product Ordering</CardTitle>
            <CardDescription className="text-blue-600">Browse and purchase our products</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Package size={48} className="text-blue-500 mb-4" />
              <p className="mb-4">
                Explore our wide range of premium wood and glass products. Choose from various categories, 
                customize your selections, and place orders online.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={() => navigate("/products")}
              >
                Browse Products
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50 text-gray-700">
            <CardTitle className="text-xl">Order Status</CardTitle>
            <CardDescription className="text-gray-600">Track your orders and view history</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <ClipboardCheck size={48} className="text-gray-500 mb-4" />
              <p className="mb-4">
                Review your purchase history, track current orders, and check delivery status. 
                Stay updated on all your transactions with our order management system.
              </p>
              <Button 
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-100"
                onClick={() => navigate("/order-status")}
              >
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders Preview */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Button 
            variant="ghost"
            onClick={() => navigate("/order-status")}
          >
            View All
          </Button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">You don't have any recent orders.</p>
          <Button 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
