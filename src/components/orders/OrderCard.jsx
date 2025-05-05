
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const OrderCard = ({ order, isAdmin = false }) => {
  const [status, setStatus] = useState(order.status);
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    
    // In a real app, this would be an API call to update the order status
    // For now, we'll just simulate it with a toast notification
    toast.success(`Order status updated to ${newStatus}`);
  };
  
  // Format the date and time
  const formattedDate = format(new Date(order.date), "MMM d, yyyy");
  const formattedTime = format(new Date(order.date), "h:mm a");

  return (
    <Card className="mb-4 overflow-hidden animate-fade-in">
      <CardHeader className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
            <CardTitle className="text-lg font-semibold mt-1">{order.orderType}</CardTitle>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{formattedDate} at {formattedTime}</span>
            </div>
            
            {isAdmin ? (
              <div className="mt-2">
                <Select defaultValue={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <Badge className={`mt-2 ${getStatusColor(status)}`}>{status}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium">Delivery Address:</p>
            <p className="text-sm text-gray-500">{order.address}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Total Amount:</p>
            <p className="text-lg font-semibold text-blue-600">₹{order.totalAmount.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Payment Method: {order.paymentMethod}</p>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="bg-gray-50 rounded-lg">
          <AccordionItem value="items" className="border-none">
            <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
              Order Items ({order.items.length})
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex gap-3 py-3 border-t border-gray-200 first:border-t-0"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover object-center rounded"
                      />
                    ) : (
                      <Package className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-xs font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    {item.size && item.dimensions && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.size} · {item.dimensions.width}x{item.dimensions.height} mm
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="sm" className="text-sm">
            Download Invoice
          </Button>
          
          <Button variant="outline" size="sm" className="text-sm">
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
