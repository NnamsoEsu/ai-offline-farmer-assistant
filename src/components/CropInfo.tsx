import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Info, Leaf, Clock, MapPin, Lightbulb, ChevronRight } from "lucide-react";
import knowledgeBase from "../data/knowledge-base.json";

export default function CropInfo() {
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<any | null>(null);

  const filteredCrops = knowledgeBase.crops.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.scientificName.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedCrop) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedCrop(null)}
          className="text-primary font-medium flex items-center gap-2 hover:underline mb-4"
        >
          <ChevronRight className="rotate-180" size={16} /> Back to Library
        </button>

        <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden shadow-xl mb-8">
          <img 
            src={selectedCrop.image} 
            alt={selectedCrop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
            <h1 className="text-4xl font-bold">{selectedCrop.name}</h1>
            <p className="italic text-emerald-100 opacity-90">{selectedCrop.scientificName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info size={20} className="text-primary" />
                Cultivation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock size={14} />
                    <span>Planted Season</span>
                  </div>
                  <p className="font-semibold">{selectedCrop.plantingSeason}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin size={14} />
                    <span>Recommended Spacing</span>
                  </div>
                  <p className="font-semibold">{selectedCrop.spacing}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Leaf size={14} />
                    <span>Time to Maturity</span>
                  </div>
                  <p className="font-semibold">{selectedCrop.maturity}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Lightbulb size={20} className="text-amber-500" />
                  Expert Success Tips
                </h3>
                <ul className="space-y-3">
                  {selectedCrop.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedCrop.commonIssues.map((issueId: string) => {
                    const issue = knowledgeBase.diseases.find(d => d.id === issueId);
                    return (
                      <div key={issueId} className="p-3 bg-muted rounded-lg text-sm font-medium">
                        {issue?.name || issueId}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Library</h1>
        <p className="text-muted-foreground">Expert advice for your crops, available offline.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Search for a crop (e.g. Maize)..." 
          className="pl-10 h-12" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredCrops.map((crop) => (
          <Card 
            key={crop.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => setSelectedCrop(crop)}
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={crop.image} 
                alt={crop.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{crop.name}</CardTitle>
                  <CardDescription className="italic">{crop.scientificName}</CardDescription>
                </div>
                <Badge variant="secondary">{crop.maturity}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Learn about {crop.name} cultivation, spacing, and pest management.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No matching crops found in the offline library.</p>
        </div>
      )}
    </div>
  );
}
