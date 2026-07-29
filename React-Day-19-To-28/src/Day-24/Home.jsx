import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';

function Home() {
    return (
    <Router>
      <div className="min-h-screen bg-primary flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
 
}

export default Home;