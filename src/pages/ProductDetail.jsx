
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Package, ShoppingCart, Check, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("standard");
  const [dimensions, setDimensions] = useState({ width: "", height: "", depth: "" });
  const [liked, setLiked] = useState(false);

  // Mock product data (in a real app, this would come from an API)
  const mockProducts = [
    // Same products array as in the Products.jsx file
    // Plywoods & Boards
    {
      id: "plywood1",
      name: "Premium BWR Plywood",
      description: "High-quality boiling water resistant plywood, perfect for furniture and kitchen cabinets.",
      category: "plywood",
      subcategory: "bwr",
      price: 1200,
      imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600&h=400",
      features: [
        "Boiling Water Resistant - Withstands extreme moisture conditions",
        "IS:303 Grade BWR certified plywood",
        "11-ply construction for superior strength",
        "Environmentally friendly E-1 grade emission standards",
        "Anti-termite and borer resistant treatment"
      ],
      specifications: {
        thickness: "18mm",
        dimensions: "8ft x 4ft (2440mm x 1220mm)",
        material: "Hardwood",
        finish: "Smooth sanded",
        warranty: "10 years manufacturer warranty"
      },
      availability: true,
      minOrderQuantity: 1
    },
    // Add more mock products...
  ];
  
  useEffect(() => {
    // Simulate API fetch with delay
    const fetchProduct = () => {
      setLoading(true);
      
      setTimeout(() => {
        // Find product by ID from the mock data
        const foundProduct = mockProducts.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // For demo purposes, just show the first product if ID not found
          setProduct(mockProducts[0]);
        }
        
        setLoading(false);
      }, 800);
    };
    
    fetchProduct();
  }, [productId]);
  
  const toggleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Get current cart items from localStorage or initialize empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if product already in cart
      cartItems[existingItemIndex].quantity += quantity;
      toast.success(`Updated quantity of ${product.name} in cart`);
    } else {
      // Add new product to cart
      cartItems.push({
        ...product,
        quantity: quantity,
        size: selectedSize,
        dimensions: dimensions
      });
      toast.success(`${product.name} added to cart`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 text-gray-600"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
      </Button>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded mt-6 mb-4 w-1/4"></div>
              <div className="space-y-4 mt-8">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="flex gap-4 mt-6">
                  <div className="h-12 bg-gray-200 rounded flex-1"></div>
                  <div className="h-12 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : product ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-100 h-96">
                  <Package size={96} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.description}</p>
              
              {/* Price */}
              <div className="mt-6">
                <div className="text-blue-600 font-semibold text-2xl">
                  {typeof product.price === "object" ? 
                    `₹${product.price.min} - ₹${product.price.max}` : 
                    `₹${product.price}`}
                </div>
                <p className="text-green-600 flex items-center mt-1">
                  <Check className="h-4 w-4 mr-1" /> 
                  {product.availability ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              
              {/* Configuration options */}
              <div className="mt-8 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="max-w-[120px]"
                  />
                  {product.minOrderQuantity > 1 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum order: {product.minOrderQuantity} units
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedSize === "custom" && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Width (mm)</label>
                      <Input
                        type="number"
                        placeholder="Width"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Height (mm)</label>
                      <Input
                        type="number"
                        placeholder="Height"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                      />
                    </div>
                    {product.category === "plywood" && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Thickness (mm)</label>
                        <Input
                          type="number"
                          placeholder="Thickness"
                          value={dimensions.depth}
                          onChange={(e) => setDimensions({...dimensions, depth: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4 mt-8">
                <Button 
                  variant="outline" 
                  className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={liked ? "text-red-500 border-red-200" : "text-gray-500 border-gray-200"}
                  onClick={toggleLike}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product details tabs */}
          <div className="mt-12">
            <Tabs defaultValue="features">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <TabsContent value="features">
                  {product.features ? (
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No feature information available for this product.</p>
                  )}
                </TabsContent>
                <TabsContent value="specifications">
                  {product.specifications ? (
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4">
                          <div className="font-medium capitalize">{key}</div>
                          <div className="col-span-2">{value}</div>
                          <Separator className="col-span-3" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No specification information available for this product.</p>
                  )}
                </TabsContent>
                <TabsContent value="shipping">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Delivery</h3>
                      <p>Free shipping on orders above ₹5000. Standard delivery time is 3-5 working days.</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Returns</h3>
                      <p>
                        Returns are accepted within 7 days of delivery if the product is in its original condition.
                        Custom-sized products cannot be returned unless damaged or defective.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Related products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockProducts
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map(relatedProduct => (
                  <Card key={relatedProduct.id} className="product-card h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      {relatedProduct.imageUrl ? (
                        <img 
                          src={relatedProduct.imageUrl} 
                          alt={relatedProduct.name} 
                          className="product-card-image"
                        />
                      ) : (
                        <div className="product-card-image bg-gray-100 flex items-center justify-center">
                          <Package size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-2">{relatedProduct.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-blue-600 font-medium">
                          {typeof relatedProduct.price === "object" ? 
                            `₹${relatedProduct.price.min} - ₹${relatedProduct.price.max}` : 
                            `₹${relatedProduct.price}`}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate(`/products/${relatedProduct.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/products")}>
            Browse All Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
