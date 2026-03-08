import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PatientRegister from "./pages/PatientRegister";
import Dashboard from "./pages/Dashboard";
import GenerateInvite from "./pages/GenerateInvite";
import FamilyInvite from "./pages/FamilyInvite";
import StaffFirstLogin from "./pages/StaffFirstLogin";
import PatientSnapshot from "./pages/PatientSnapshot";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<PatientRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invite" element={<GenerateInvite />} />
          <Route path="/family-invite" element={<FamilyInvite />} />
          <Route path="/staff-first-login" element={<StaffFirstLogin />} />
          <Route path="/snapshot" element={<PatientSnapshot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
