import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import DestinationNav from "./components/layout/DestinationNav";
import PopupForm from "./components/ui/PopupForm";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import TripDetails from "./pages/TripDetails";
import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Destination from "./pages/Destination";
import NotFound from "./pages/NotFound";

// Admin Panel Imports Added
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Packages from "./pages/admin/Packages";
import CreatePackage from "./pages/admin/CreatePackage";
import Leads from "./pages/admin/Leads";
import EditPackage from "./pages/admin/EditPackage";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar />
      <DestinationNav />
      <PopupForm />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/destinations/:slug" element={<Destination />} />
          <Route path="/trips/:slug" element={<TripDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/new" element={<CreatePackage />} />
          <Route path="packages/edit/:id" element={<EditPackage />} />
          <Route path="leads" element={<Leads />} />
        </Route>
      </Routes>
    </Router>
  );
}