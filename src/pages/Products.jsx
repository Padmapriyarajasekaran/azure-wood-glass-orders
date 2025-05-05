import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import ProductCategories from "@/components/products/ProductCategories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock products data (in a real app, this would come from an API)
  const mockProducts = [
    // Plywoods & Boards
    {
      id: "plywood1",
      name: "Premium BWR Plywood",
      description: "High-quality boiling water resistant plywood, perfect for furniture and kitchen cabinets.",
      category: "plywood",
      subcategory: "bwr",
      price: 1200,
      imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "plywood2",
      name: "MR Grade Plywood",
      description: "Moisture resistant plywood ideal for indoor furniture applications in humid conditions.",
      category: "plywood",
      subcategory: "mr",
      price: 950,
      imageUrl: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "plywood3",
      name: "Marine Grade Plywood",
      description: "Waterproof plywood with excellent strength and durability for outdoor applications.",
      category: "plywood",
      subcategory: "marine",
      price: 1500,
      imageUrl: "https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "plywood4",
      name: "MDF Board 18mm",
      description: "Medium-density fiberboard with smooth finish, ideal for furniture and interior design.",
      category: "plywood",
      subcategory: "mdf",
      price: 850,
      imageUrl: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "plywood5",
      name: "Particle Board",
      description: "Engineered wood product manufactured from wood chips and resin, cost-effective alternative.",
      category: "plywood",
      subcategory: "particle",
      price: 650,
      imageUrl: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=600&h=400"
    },
    
    // Glass Types
    {
      id: "glass1",
      name: "Toughened Glass 8mm",
      description: "Heat-treated safety glass with increased strength and break resistance. Ideal for doors and partitions.",
      category: "glass",
      subcategory: "toughened",
      price: { min: 450, max: 1200 },
      imageUrl: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "glass2",
      name: "Frosted Glass Panel",
      description: "Translucent glass offering privacy while allowing light transmission. Perfect for bathrooms and office partitions.",
      category: "glass",
      subcategory: "frosted",
      price: { min: 550, max: 1100 },
      imageUrl: "https://images.unsplash.com/photo-1600607686527-27cecbcaf290?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "glass3",
      name: "Decorative Patterned Glass",
      description: "Textured and designed glass for aesthetic appeal in interior applications.",
      category: "glass",
      subcategory: "decorative",
      price: { min: 650, max: 1500 },
      imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "glass4",
      name: "Clear Float Glass 5mm",
      description: "Transparent glass with smooth surfaces and minimal visual distortion.",
      category: "glass",
      subcategory: "float",
      price: { min: 350, max: 900 },
      imageUrl: "https://images.unsplash.com/photo-1614332625575-6bef183904b7?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "glass5",
      name: "Mirror Glass",
      description: "Reflective glass with silver coating, available in multiple thickness options.",
      category: "glass",
      subcategory: "mirror",
      price: { min: 500, max: 1200 },
      imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=600&h=400"
    },
    
    // Other Products
    {
      id: "other1",
      name: "Decorative Laminates",
      description: "Durable and decorative surfacing material for countertops, furniture, and cabinetry.",
      category: "other",
      subcategory: "laminates",
      price: { min: 350, max: 950 },
      imageUrl: "https://images.unsplash.com/photo-1618221771885-8c5c4ce783a4?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "other2",
      name: "Natural Wood Veneers",
      description: "Thin slices of premium wood for furniture finishing and interior decoration.",
      category: "other",
      subcategory: "veneers",
      price: { min: 280, max: 1200 },
      imageUrl: "https://images.unsplash.com/photo-1580816922981-7606aa8f8eb4?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "other3",
      name: "PVC Edge Bands",
      description: "Protective and decorative edging material for plywood and MDF furniture parts.",
      category: "other",
      subcategory: "edgebands",
      price: { min: 120, max: 300 },
      imageUrl: "https://images.unsplash.com/photo-1555441293-6c6fb1eb9773?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: "other4",
      name: "Hardware Accessories Kit",
      description: "Complete set of furniture fittings including handles, knobs, hinges, and other accessories.",
      category: "other",
      subcategory: "hardware",
      price: 1800,
      imageUrl: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=600&h=400"
    },
  ];
  
  useEffect(() => {
    // Simulate API fetch with delay
    const fetchProducts = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        let filteredProducts = [...mockProducts];
        
        // Filter by category
        if (activeCategory !== "all") {
          filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
        }
        
        // Filter by subcategory if specified in URL
        const subcategory = searchParams.get("subcategory");
        if (subcategory) {
          filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
        }
        
        setProducts(filteredProducts);
        setIsLoading(false);
      }, 800);
    };
    
    fetchProducts();
  }, [activeCategory, location.search]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }
    
    // Filter products based on search query
    const results = mockProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (results.length === 0) {
      toast.info("No products found matching your search");
    } else {
      setProducts(results);
      toast.success(`Found ${results.length} products`);
    }
  };
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Our Products</h1>
      <p className="text-gray-600 mb-6">Browse our selection of premium wood and glass products</p>
      
      {/* Search bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
      
      {/* Categories */}
      <ProductCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      {/* Products grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try selecting a different category or search term.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
