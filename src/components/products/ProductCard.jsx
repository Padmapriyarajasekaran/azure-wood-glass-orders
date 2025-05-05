
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Package } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current cart items from localStorage or initialize empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if product already in cart
      cartItems[existingItemIndex].quantity += 1;
      toast.success(`Updated quantity of ${product.name} in cart`);
    } else {
      // Add new product to cart with quantity 1
      cartItems.push({
        ...product,
        quantity: 1
      });
      toast.success(`${product.name} added to cart`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <Card className="product-card h-full flex flex-col overflow-hidden group animate-fade-in">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="product-card-image object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="product-card-image bg-gray-100 flex items-center justify-center text-gray-400">
              <Package size={48} />
            </div>
          )}
        </div>
        <button
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            liked ? "bg-red-100 text-red-500" : "bg-white/80 text-gray-500 hover:bg-gray-100"
          } transition-colors`}
          onClick={toggleLike}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        {product.price && (
          <p className="text-blue-700 font-medium">
            {typeof product.price === "object" ? 
              `₹${product.price.min} - ₹${product.price.max}` : 
              `₹${product.price}`}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Learn More
        </Button>
        <Button 
          variant="default" 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
