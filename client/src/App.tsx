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
import About from "./pages/About";
import Contact from "./pages/Contact";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Workspace from "./pages/Workspace";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/client-dashboard" component={ClientDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/dashboard" component={ClientDashboard} />
      <Route path="/students" component={Workspace} />
      <Route path="/results" component={Results} />
      <Route path="/analytics" component={Workspace} />
      <Route path="/attendance" component={Workspace} />
      <Route path="/assignments" component={Workspace} />
      <Route path="/reports" component={Workspace} />
      <Route path="/settings" component={Workspace} />
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
