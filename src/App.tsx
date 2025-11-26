import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthPage from './pages/AuthPage';
import MainApp from './pages/MainApp';

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!user ? (
          <AuthPage onLogin={setUser} />
        ) : (
          <MainApp user={user} onLogout={() => setUser(null)} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
