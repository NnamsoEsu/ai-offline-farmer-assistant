import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Sprout, ShieldAlert, BookOpen, User } from "lucide-react";
import Dashboard from "./components/Dashboard";
import MyFarm from "./components/MyFarm";
import DiagnosisTool from "./components/DiagnosisTool";
import CropInfo from "./components/CropInfo";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0 md:pl-64">
        <Navigation />
        <main className="max-w-4xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farm" element={<MyFarm />} />
            <Route path="/diagnosis" element={<DiagnosisTool />} />
            <Route path="/knowledge" element={<CropInfo />} />
            <Route path="/profile" element={<div className="p-8 text-center">Farmer Profile Coming Soon</div>} />
          </Routes>
        </main>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "My Farm", path: "/farm", icon: Sprout },
    { name: "Diagnosis", path: "/diagnosis", icon: ShieldAlert },
    { name: "Knowledge", path: "/knowledge", icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around p-2 md:hidden z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] mt-1 font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Sprout className="text-primary" size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-primary">Farmer Assistant</h1>
        </div>
        
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
              FA
            </div>
            <div>
              <p className="text-sm font-semibold">Offline Mode</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Active & Ready</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
