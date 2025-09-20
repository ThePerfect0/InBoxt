import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
<<<<<<< HEAD
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Auth = lazy(() => import("./pages/Auth").then(m => ({ default: m.Auth })));
const Dashboard = lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));
const History = lazy(() => import("./pages/History").then(m => ({ default: m.History })));
const Tasks = lazy(() => import("./pages/Tasks").then(m => ({ default: m.Tasks })));
const Settings = lazy(() => import("./pages/Settings").then(m => ({ default: m.Settings })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.default })));
=======
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { Tasks } from "./pages/Tasks";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
      <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="history" element={<History />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
<<<<<<< HEAD
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense
            fallback={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="space-y-4 w-full max-w-md p-6">
                  <Skeleton className="h-8 w-32 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              </div>
            }
          >
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppRoutes />
            </BrowserRouter>
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
=======
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
>>>>>>> 8acf51f56335fae66838e9ed71c936f0aa720f7d
);

export default App;
