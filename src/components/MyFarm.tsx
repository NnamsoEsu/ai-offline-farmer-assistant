import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Calendar, Sprout, Search } from "lucide-react";
import { Link } from "react-router-dom";
import * as Sonner from "sonner";
import knowledgeBase from "../data/knowledge-base.json";

interface PlantedCrop {
  id: string;
  cropId: string;
  name: string;
  plantedDate: string;
  area: string;
}

export default function MyFarm() {
  const [crops, setCrops] = useState<PlantedCrop[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  const [newCrop, setNewCrop] = useState({
    cropId: "",
    plantedDate: new Date().toISOString().split('T')[0],
    area: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("myCrops");
    if (saved) setCrops(JSON.parse(saved));
  }, []);

  const saveCrops = (updated: PlantedCrop[]) => {
    setCrops(updated);
    localStorage.setItem("myCrops", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newCrop.cropId) {
      Sonner.toast.error("Please select a crop type");
      return;
    }
    
    const cropTemplate = knowledgeBase.crops.find(c => c.id === newCrop.cropId);
    if (!cropTemplate) return;

    const planted: PlantedCrop = {
      id: Math.random().toString(36).substr(2, 9),
      cropId: newCrop.cropId,
      name: cropTemplate.name,
      plantedDate: newCrop.plantedDate,
      area: newCrop.area
    };

    saveCrops([planted, ...crops]);
    setIsAdding(false);
    setNewCrop({ cropId: "", plantedDate: new Date().toISOString().split('T')[0], area: "" });
    Sonner.toast.success(`${cropTemplate.name} added to your farm!`);
  };

  const handleDelete = (id: string) => {
    const updated = crops.filter(c => c.id !== id);
    saveCrops(updated);
    Sonner.toast.success("Crop removed");
  };

  const filteredCrops = crops.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Farm</h1>
          <p className="text-muted-foreground">Manage and track your planted crops.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="md:w-auto w-full">
          {isAdding ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add New Crop</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Register New Plantation</CardTitle>
            <CardDescription>Fill in the details to track your growth cycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Crop Type</Label>
                <Select onValueChange={(val) => setNewCrop({...newCrop, cropId: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {knowledgeBase.crops.map(crop => (
                      <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Planted Date</Label>
                <Input 
                  type="date" 
                  value={newCrop.plantedDate} 
                  onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label>Area / Quantity (Optional)</Label>
                <Input 
                  placeholder="e.g. 2 Acres, 50 Stems" 
                  value={newCrop.area}
                  onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Save Crop</Button>
          </CardFooter>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Search my crops..." 
          className="pl-10" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredCrops.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border">
          <Sprout className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-lg font-semibold">No crops found</h3>
          <p className="text-muted-foreground">Start adding crops to your farm to track them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden group">
              <div className="flex h-full">
                <div className="w-4 bg-primary" />
                <div className="flex-1 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{crop.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span>Planted {new Date(crop.plantedDate).toLocaleDateString()}</span>
                        </div>
                        {crop.area && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Sprout size={14} />
                            <span>{crop.area}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => handleDelete(crop.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                      Growth In Progress
                    </div>
                    <Link to={`/knowledge`} className="text-sm font-medium text-primary hover:underline">
                      View Care Guide
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
