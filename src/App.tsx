
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import ExpensesPage from "./pages/Expenses";
import IncomePage from "./pages/Income";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import GroupsPage from "./pages/Groups";
import AdminPage from "./pages/Admin";
import BudgetPage from "./pages/Budget";
import ReportsPage from "./pages/Reports";
import SchedulePage from "./pages/Schedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/expenses/new" element={<ExpensesPage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/income/new" element={<IncomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
