import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import LandingPage from './pages/LandingPage';


const ProductDetails = lazy(() => import('./pages/ProductDetails'));

function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Suspense>
  );
}

export default Home;