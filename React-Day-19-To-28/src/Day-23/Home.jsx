import {
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import BlogDetails from "./pages/BlogDetails";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";


function Home() {

  return (

    <Routes>

      <Route 
        path="/" 
        element={<MainLayout />}
      >

        <Route 
          index 
          element={<LandingPage />}
        />

        <Route 
          path="about"
          element={<About />}
        />

        <Route 
          path="projects"
          element={<Projects />}
        />

        <Route 
          path="contact"
          element={<Contact />}
        />


        {/* Dynamic Route */}
        <Route
          path="blog/:id"
          element={<BlogDetails />}
        />


        {/* Protected Route */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>


    </Routes>

  );
}


export default Home;