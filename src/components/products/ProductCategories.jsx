
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const ProductCategories = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    navigate(category === "all" ? "/products" : `/products?category=${category}`);
  };

  const handleSubcategorySelect = (category, subcategory) => {
    navigate(`/products?category=${category}&subcategory=${subcategory}`);
  };

  // Category definitions with their subcategories
  const categories = [
    {
      id: "all",
      name: "All Products",
      subcategories: []
    },
    {
      id: "plywood",
      name: "Plywoods & Boards",
      subcategories: [
        { id: "bwr", name: "BWR Plywood" },
        { id: "mr", name: "MR Grade Plywood" },
        { id: "marine", name: "Marine Plywood" },
        { id: "mdf", name: "MDF Boards" },
        { id: "particle", name: "Particle Boards" }
      ]
    },
    {
      id: "glass",
      name: "Glass Types",
      subcategories: [
        { id: "toughened", name: "Toughened Glass" },
        { id: "frosted", name: "Frosted Glass" },
        { id: "decorative", name: "Decorative Glass" },
        { id: "float", name: "Clear Float Glass" },
        { id: "mirror", name: "Mirror Glass" }
      ]
    },
    {
      id: "other",
      name: "Other Products",
      subcategories: [
        { id: "laminates", name: "Laminates" },
        { id: "veneers", name: "Veneers" },
        { id: "edgebands", name: "Edge Bands" },
        { id: "hardware", name: "Hardware Accessories" }
      ]
    }
  ];

  return (
    <div className="mb-8">
      <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap whitespace-nowrap">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {activeCategory !== "all" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.find(cat => cat.id === activeCategory)?.subcategories.map(subcategory => (
            <Button
              key={subcategory.id}
              variant="outline"
              size="sm"
              onClick={() => handleSubcategorySelect(activeCategory, subcategory.id)}
              className="text-sm"
            >
              {subcategory.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
