
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CartItem = ({ item, onUpdate, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [size, setSize] = useState(item.size || "standard");
  const [dimensions, setDimensions] = useState(item.dimensions || { width: "", height: "", depth: "" });
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    setQuantity(newQuantity);
    onUpdate({ ...item, quantity: newQuantity, size, dimensions });
  };
  
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    onUpdate({ ...item, quantity, size: newSize, dimensions });
  };
  
  const handleDimensionChange = (dimension, value) => {
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);
    onUpdate({ ...item, quantity, size, dimensions: newDimensions });
  };

  return (
    <Card className="p-4 mb-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/4 lg:w-1/6">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="rounded-md w-full h-32 object-cover object-center"
            />
          ) : (
            <div className="rounded-md w-full h-32 bg-gray-100 flex items-center justify-center">
              <Package size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
            <button 
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Size</label>
              <Select value={size} onValueChange={handleSizeChange}>
                <SelectTrigger className="h-8">
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
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Width (mm)</label>
              <Input
                type="number"
                placeholder="Width"
                value={dimensions.width}
                onChange={(e) => handleDimensionChange("width", e.target.value)}
                className="h-8"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Height (mm)</label>
              <Input
                type="number"
                placeholder="Height"
                value={dimensions.height}
                onChange={(e) => handleDimensionChange("height", e.target.value)}
                className="h-8"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span>Unit Price: </span>
              <span className="font-medium text-gray-900">₹{item.price || "Price on request"}</span>
            </div>
            <div className="text-lg font-medium text-blue-600">
              ₹{((item.price || 0) * quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
