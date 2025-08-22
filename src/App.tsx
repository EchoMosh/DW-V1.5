import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Launchpad from "./pages/Launchpad";
import NotFound from "./pages/NotFound";
import DraperAI from "./pages/DraperAI";
import Approvals from "./pages/Approvals";
import InfluencerLookup from "./pages/InfluencerLookup";
import Pipeline from "./pages/Pipeline";
import AppLayout from "./layouts/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<AppLayout />}>
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/draper-ai" element={<DraperAI />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/influencer-lookup" element={<InfluencerLookup />} />
            <Route path="/pipeline" element={<Pipeline />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
