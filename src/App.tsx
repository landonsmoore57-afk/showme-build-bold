import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ServiceCityPage from "./pages/ServiceCityPage";
import ServicesDirectory from "./pages/ServicesDirectory";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServiceAreaHub from "./pages/ServiceAreaHub";
import StateHubPage from "./pages/StateHubPage";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesDirectory />} />
            <Route path="/services/:service" element={<ServiceDetailPage />} />
            <Route path="/service-area" element={<ServiceAreaHub />} />
            <Route path="/service-area/:state" element={<StateHubPage />} />
            <Route path="/service-area/:state/:city" element={<CityPage />} />
            <Route path="/service-area/:state/:city/:service" element={<ServiceCityPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
