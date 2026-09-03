import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerRoute from './components/OwnerRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';
import MyListings from './pages/MyListings';
import Favorites from './pages/Favorites';
import Roommates from './pages/Roommates';
import RoommateDetails from './pages/RoommateDetails';
import RoommateProfile from './pages/RoommateProfile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/properties" element={<Properties />} />
              <Route
                path="/properties/new"
                element={
                  <OwnerRoute>
                    <NewProperty />
                  </OwnerRoute>
                }
              />
              <Route
                path="/properties/mine"
                element={
                  <OwnerRoute>
                    <MyListings />
                  </OwnerRoute>
                }
              />
              <Route
                path="/properties/:id/edit"
                element={
                  <OwnerRoute>
                    <EditProperty />
                  </OwnerRoute>
                }
              />
              <Route path="/properties/:id" element={<PropertyDetails />} />

              <Route
                path="/roommates"
                element={
                  <ProtectedRoute>
                    <Roommates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roommates/:id"
                element={
                  <ProtectedRoute>
                    <RoommateDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roommate-profile"
                element={
                  <ProtectedRoute>
                    <RoommateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
