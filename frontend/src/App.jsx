import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ADMIN
import LoginPage from "./pages/Admin/LoginPage";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import ManajemenKatalog from "./pages/Admin/ManajemenKatalog/ManajemenKatalog";
import ManajemenOrder from "./pages/Admin/ManajemenOrder";
import ManajemenSettings from "./pages/Admin/ManajemenSettings";
import CreateKatalog from "./pages/Admin/ManajemenKatalog/CreateKatalog";
import EditKatalog from "./pages/Admin/ManajemenKatalog/EditKatalog";

// PUBLIC
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import KatalogPage from "./pages/KatalogPage";
import OrderPage from "./pages/OrderPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="katalog" element={<KatalogPage />} />
          <Route path="order/:id" element={<OrderPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="katalog" />} />
          <Route path="katalog" element={<ManajemenKatalog />} />
          <Route path="katalog/create" element={<CreateKatalog />} />
          <Route path="katalog/edit/:id" element={<EditKatalog />} />
          <Route path="orders" element={<ManajemenOrder />} />
          <Route path="settings" element={<ManajemenSettings />} />
        </Route>

        {/* <Route
          path="*"
          element={
            <Navigate
              to={localStorage.getItem("token") ? "/admin" : "/login"}
            />
          }
        /> */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
