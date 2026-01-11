// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import SplashScreen from "./pages/SplashScreen";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import ReportIssue from "./pages/ReportIssue";
// import MyComplaints from "./pages/MyComplaints";
// import ComplaintDetail from "./pages/ComplaintDetail";
// import Notifications from "./pages/Notifications";
// import Profile from "./pages/Profile";
// import NearbyIssues from "./pages/NearbyIssues";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<SplashScreen />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/report-issue" element={<ReportIssue />} />
//           <Route path="/my-complaints" element={<MyComplaints />} />
//           <Route path="/complaint/:id" element={<ComplaintDetail />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/nearby-issues" element={<NearbyIssues />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetail from "./pages/ComplaintDetail";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NearbyIssues from "./pages/NearbyIssues";

import { useNearbyNotifications } from "@/hooks/useNearbyNotifications";
import NearbyPopup from "@/components/NearbyPopup";

const queryClient = new QueryClient();

const App = () => {
  const [popupIssue, setPopupIssue] = useState<any | null>(null);

  // ✅ Hook listens for backend events
  useNearbyNotifications((issue) => setPopupIssue(issue));

  // Handler when "Open" is clicked
  const openIssue = (issue: any) => {
    setPopupIssue(null);
    // Redirect to Nearby Issues page with highlight
    window.location.href = `/nearby-issues?highlight=${issue._id}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/complaint/:id" element={<ComplaintDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nearby-issues" element={<NearbyIssues />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* ✅ Show popup when nearby issue is received */}
        <NearbyPopup
          issue={popupIssue}
          onClose={() => setPopupIssue(null)}
          onOpen={openIssue}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
