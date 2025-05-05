
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Package } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
  const toggleLike = (e) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    setLiked(!liked);
    
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (!liked) {
      // Add to favorites
      favorites.push(product.id);
      toast.success(`${product.name} added to favorites`);
    } else {
      // Remove from favorites
      const index = favorites.indexOf(product.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
      toast.success(`${product.name} removed from favorites`);
    }
    
    // Save updated favorites
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  
  const addToCart = (e) => {
    e.stopPropagation(); // Prevent card click when clicking add to cart
    
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    // Check if product already in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      toast.success(`${product.name} quantity updated in cart`);
    } else {
      cartItems.push({
        ...product,
        quantity: 1
      });
      toast.success(`${product.name} added to cart`);
    }
    
    // Save updated cart
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  
  const viewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card className="product-card overflow-hidden h-full cursor-pointer hover:shadow-md transition-shadow"
      onClick={viewDetails}>
      <div className="aspect-[4/3] relative overflow-hidden">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Package size={32} className="text-gray-400" />
          </div>
        )}
        <button 
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm z-10"
          onClick={toggleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
        {product.category === "plywood" && (
          <Badge className="absolute bottom-2 left-2 bg-blue-500 text-white">
            Plywood
          </Badge>
        )}
        {product.category === "glass" && (
          <Badge className="absolute bottom-2 left-2 bg-blue-200 text-blue-800">
            Glass
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-blue-600 font-medium">
            {typeof product.price === "object" 
              ? `₹${product.price.min} - ₹${product.price.max}` 
              : `₹${product.price}`}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs px-2 py-1 h-7"
              onClick={viewDetails}
            >
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs px-2 py-1 h-7"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
