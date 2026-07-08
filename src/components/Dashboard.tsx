import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudRain, Thermometer, Sun, Calendar, Plus, ChevronRight, AlertCircle, ShieldAlert, Sprout, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import * as Sonner from "sonner";

interface PlantedCrop {
  id: string;
  name: string;
  plantedDate: string;
}

export default function Dashboard() {
  const [myCrops, setMyCrops] = useState<PlantedCrop[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("myCrops");
    if (saved) setMyCrops(JSON.parse(saved));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good Morning, Farmer</h1>
          <p className="text-muted-foreground">Here is your farm overview today.</p>
        </div>
        <div className="hidden md:block">
          <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <ShieldAlert size={16} />
            Offline Sync Ready
          </div>
        </div>
      </header>

      {/* Mock Weather Widget (Static for Offline Use) */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-none shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4 scale-150">
          <Sun size={120} />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 font-medium mb-1 uppercase tracking-wider text-xs">Today's Guidance</p>
              <h2 className="text-4xl font-bold mb-4">Planting Season</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                  <Thermometer size={18} />
                  <span>24°C</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                  <CloudRain size={18} />
                  <span>20% Rain</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-emerald-50 max-w-sm">
            Optimal conditions for sowing maize and beans today. Soil moisture is high after yesterday's rain.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">My Active Crops</CardTitle>
            <Sprout className="text-primary" />
          </CardHeader>
          <CardContent>
            {myCrops.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No crops added yet.</p>
                <Link to="/farm">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Start Tracking
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myCrops.slice(0, 3).map((crop, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {crop.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{crop.name}</p>
                        <p className="text-xs text-muted-foreground">Planted {new Date(crop.plantedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                ))}
                <Link to="/farm" className="block text-center text-sm font-medium text-primary hover:underline">
                  View all crops
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="text-emerald-600" size={20} />
              Quick Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              Noticing something strange on your plants? Our offline assistant can help identify the issue.
            </p>
            <Link to="/diagnosis">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <ShieldAlert className="mr-2 h-4 w-4" /> Identify Issue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Knowledge Library</h3>
          <p className="text-muted-foreground mb-4">
            Access thousands of agricultural guides, pest management strategies, and planting schedules without needing data.
          </p>
          <Link to="/knowledge">
            <Button variant="outline">Browse Library</Button>
          </Link>
        </div>
        <div className="w-full md:w-48 h-32 bg-muted rounded-xl flex items-center justify-center">
          <BookOpen className="text-muted-foreground" size={48} />
        </div>
      </div>
    </div>
  );
}
