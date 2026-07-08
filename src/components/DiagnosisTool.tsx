import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle2, ChevronLeft, Lightbulb } from "lucide-react";
import knowledgeBase from "../data/knowledge-base.json";

export default function DiagnosisTool() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<any | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const runDiagnosis = () => {
    if (selectedSymptoms.length === 0) return;

    // Simple matching logic: find disease with most matching symptoms
    let bestMatch = null;
    let maxMatches = 0;

    knowledgeBase.diseases.forEach(disease => {
      const matches = disease.symptoms.filter(s => selectedSymptoms.includes(s)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = disease;
      }
    });

    setResult(bestMatch);
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="space-y-6 animate-in zoom-in-95 duration-300">
        <Button variant="ghost" onClick={() => setResult(null)} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to symptoms
        </Button>

        <Card className="border-2 border-emerald-500 shadow-xl overflow-hidden">
          <div className="bg-emerald-500 p-6 text-white flex items-center gap-4">
            <CheckCircle2 size={32} />
            <div>
              <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Analysis Result</p>
              <h2 className="text-2xl font-bold">{result.name}</h2>
            </div>
          </div>
          <CardContent className="p-8 space-y-8">
            <section>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={20} />
                Diagnosis
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {result.diagnosis}
              </p>
            </section>

            <section className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-emerald-800">
                <ShieldAlert className="text-emerald-600" size={20} />
                Recommended Treatment
              </h3>
              <p className="text-emerald-900 leading-relaxed">
                {result.treatment}
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Lightbulb className="text-primary" size={20} />
                Future Prevention
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {result.prevention}
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={reset} variant="outline" className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" /> Start Over
          </Button>
          <Button className="flex-1" onClick={() => window.print()}>
            Save / Print Guide
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">AI Diagnosis</h1>
        <p className="text-muted-foreground">Select all symptoms you observe on your plants.</p>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeBase.symptoms.map((symptom) => (
              <div 
                key={symptom.id} 
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedSymptoms.includes(symptom.id) 
                    ? "border-primary bg-primary/5" 
                    : "border-transparent bg-muted hover:border-muted-foreground/20"
                }`}
                onClick={() => toggleSymptom(symptom.id)}
              >
                <Checkbox 
                  id={symptom.id} 
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={() => toggleSymptom(symptom.id)}
                />
                <Label 
                  htmlFor={symptom.id} 
                  className="flex-1 cursor-pointer font-medium text-base py-1"
                >
                  {symptom.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-20 left-4 right-4 md:static">
        <Button 
          className="w-full h-14 text-lg font-bold shadow-lg" 
          disabled={selectedSymptoms.length === 0}
          onClick={runDiagnosis}
        >
          <ShieldAlert className="mr-2" />
          Run Offline Diagnosis ({selectedSymptoms.length})
        </Button>
      </div>

      {!result && selectedSymptoms.length === 0 && (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
          <AlertTriangle className="text-amber-500 shrink-0" size={20} />
          <p className="text-sm text-amber-800">
            Please select at least one symptom to start the analysis. The "AI" matching works best with 2 or more symptoms.
          </p>
        </div>
      )}
    </div>
  );
}
