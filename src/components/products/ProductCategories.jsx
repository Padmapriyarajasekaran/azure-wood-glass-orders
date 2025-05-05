
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductCategories = ({ activeCategory, setActiveCategory }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveCategory(value);
    
    // Update URL without refreshing the page
    const searchParams = new URLSearchParams(location.search);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="w-full mb-8">
      <Tabs defaultValue="all" value={activeCategory} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full flex flex-wrap mb-4 h-auto bg-transparent">
          <TabsTrigger 
            value="all" 
            className="flex-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 mb-2"
          >
            All Products
          </TabsTrigger>
          <TabsTrigger 
            value="plywood" 
            className="flex-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 mb-2"
          >
            Plywoods & Boards
          </TabsTrigger>
          <TabsTrigger 
            value="glass" 
            className="flex-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 mb-2"
          >
            Glass Types
          </TabsTrigger>
          <TabsTrigger 
            value="other" 
            className="flex-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 mb-2"
          >
            Other Products
          </TabsTrigger>
        </TabsList>

        {activeCategory === "plywood" && (
          <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
            <Link 
              to="/products?category=plywood&subcategory=bwr" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              BWR Plywood
            </Link>
            <Link 
              to="/products?category=plywood&subcategory=mr" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              MR Grade Plywood
            </Link>
            <Link 
              to="/products?category=plywood&subcategory=marine" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Marine Plywood
            </Link>
            <Link 
              to="/products?category=plywood&subcategory=mdf" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              MDF Boards
            </Link>
            <Link 
              to="/products?category=plywood&subcategory=particle" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Particle Boards
            </Link>
          </div>
        )}

        {activeCategory === "glass" && (
          <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
            <Link 
              to="/products?category=glass&subcategory=toughened" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Toughened Glass
            </Link>
            <Link 
              to="/products?category=glass&subcategory=frosted" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Frosted Glass
            </Link>
            <Link 
              to="/products?category=glass&subcategory=decorative" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Decorative Glass
            </Link>
            <Link 
              to="/products?category=glass&subcategory=float" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Clear Float Glass
            </Link>
            <Link 
              to="/products?category=glass&subcategory=mirror" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Mirror Glass
            </Link>
          </div>
        )}

        {activeCategory === "other" && (
          <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
            <Link 
              to="/products?category=other&subcategory=laminates" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Laminates
            </Link>
            <Link 
              to="/products?category=other&subcategory=veneers" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Veneers
            </Link>
            <Link 
              to="/products?category=other&subcategory=edgebands" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Edge Bands
            </Link>
            <Link 
              to="/products?category=other&subcategory=hardware" 
              className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition"
            >
              Hardware Accessories
            </Link>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default ProductCategories;
