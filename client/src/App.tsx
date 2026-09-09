import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Teachers from "./pages/Teachers";
import Results from "./pages/Results";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/students" component={Dashboard} />
      <Route path="/results" component={Results} />
      <Route path="/analytics" component={Dashboard} />
      <Route path="/attendance" component={Dashboard} />
      <Route path="/assignments" component={Dashboard} />
      <Route path="/reports" component={Dashboard} />
      <Route path="/settings" component={Dashboard} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
