
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Advisers from "./pages/Advisers";
import AdviserDetail from "./pages/AdviserDetail";
import Performance from "./pages/Performance";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";
import AddAdviser from "./pages/AddAdviser";
import AddPolicy from "./pages/AddPolicy";
import { DataProvider } from "./context/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/advisers" element={<Advisers />} />
            <Route path="/adviser/:id" element={<AdviserDetail />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/add-adviser" element={<AddAdviser />} />
            <Route path="/add-policy" element={<AddPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
