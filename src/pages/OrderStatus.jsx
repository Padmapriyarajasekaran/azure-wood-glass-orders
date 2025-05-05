
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, ClipboardList } from "lucide-react";
import OrderCard from "@/components/orders/OrderCard";

const OrderStatus = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  
  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // If no orders exist, create some mock data for display
    if (savedOrders.length === 0) {
      const mockOrders = [
        {
          id: "ORD-123456",
          orderType: "Wood Products",
          items: [
            {
              id: "plywood1",
              name: "Premium BWR Plywood",
              quantity: 2,
              price: 1200,
            },
            {
              id: "plywood4",
              name: "MDF Board 18mm",
              quantity: 1,
              price: 850,
            }
          ],
          totalAmount: 3250,
          address: "123 Main St, Bangalore, Karnataka - 560001",
          paymentMethod: "Cash on Delivery",
          status: "Delivered",
          date: "2025-05-01T10:30:00Z"
        },
        {
          id: "ORD-789012",
          orderType: "Glass Products",
          items: [
            {
              id: "glass1",
              name: "Toughened Glass 8mm",
              quantity: 1,
              price: 1200,
            }
          ],
          totalAmount: 1200,
          address: "456 Oak Lane, Mumbai, Maharashtra - 400001",
          paymentMethod: "UPI Payment",
          status: "Shipped",
          date: "2025-05-03T14:15:00Z"
        },
        {
          id: "ORD-345678",
          orderType: "Mixed Order",
          items: [
            {
              id: "other1",
              name: "Decorative Laminates",
              quantity: 3,
              price: 350,
            },
            {
              id: "glass5",
              name: "Mirror Glass",
              quantity: 1,
              price: 500,
            }
          ],
          totalAmount: 1550,
          address: "789 Pine Road, Delhi, Delhi - 110001",
          paymentMethod: "Cash on Delivery",
          status: "Processing",
          date: "2025-05-04T16:45:00Z"
        }
      ];
      
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    } else {
      setOrders(savedOrders);
      setFilteredOrders(savedOrders);
    }
  }, []);
  
  // Filter orders when status or search query changes
  useEffect(() => {
    let filtered = [...orders];
    
    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(order => order.status === filterStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }
    
    setFilteredOrders(filtered);
  }, [filterStatus, searchQuery, orders]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Order Status</h1>
      <p className="text-gray-600 mb-6">Track your orders and view order history</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order ID or product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
        
        <div className="w-full md:w-48">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} isAdmin={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ClipboardList className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {searchQuery || filterStatus !== "all" 
              ? "No orders match your current filters. Try adjusting your search criteria."
              : "You haven't placed any orders yet. Browse our products and make your first purchase."}
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
