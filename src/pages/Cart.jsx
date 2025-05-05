
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ShoppingCart, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  useEffect(() => {
    // Load cart items from localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(savedCartItems);
  }, []);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === "object" ? item.price.min : item.price;
    return acc + (price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  
  const handleUpdateCartItem = (updatedItem) => {
    const updatedCart = cartItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  
  const handleRemoveCartItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };
  
  const handlePlaceOrder = () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order placement
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      
      // Clear cart
      localStorage.setItem("cartItems", "[]");
      
      // Run confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Create a mock order object
      const order = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        items: cartItems,
        totalAmount: total,
        address: address,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment",
        status: "Pending",
        date: new Date().toISOString()
      };
      
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        {orderSuccess ? "Order Confirmation" : "Shopping Cart"}
      </h1>
      
      {orderSuccess ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="bg-green-50 border-b">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-center">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center mb-6">
              Thank you for your order. We've received your request and will process it shortly.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Total:</span>
                <span className="font-medium">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-medium">
                  {paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="font-medium text-right">{address}</span>
              </div>
              <Separator />
              <p className="text-sm text-gray-500 text-center">
                You will receive an email confirmation shortly. You can track your order status
                in the "Order Status" section.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/order-status")}
            >
              View Order Status
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      ) : cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={handleUpdateCartItem}
                onRemove={handleRemoveCartItem}
              />
            ))}
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Delivery Address
                  </label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" /> 
                        Cash on Delivery
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI Payment</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Display shipping info */}
                <div className="p-3 bg-blue-50 rounded-md text-sm text-blue-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>
                      Free shipping on orders above ₹5000. Standard delivery time is 3-5 working days.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet.
            Browse our collection and find something you like.
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

export default Cart;
