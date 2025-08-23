import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Temporarily public for testing */}
            <Route element={<AppLayout />}>
              <Route path="/influencer-lookup" element={<InfluencerLookup />} />
            </Route>
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/draper-ai" element={<DraperAI />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/pipeline" element={<Pipeline />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
