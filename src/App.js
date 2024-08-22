import './App.css';
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import NotFound from './components/NotFound';
import JobItemDetailsRoute from './components/JobItemDetailsRoute';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
  
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobItemDetailsRoute />} />
    </Route>

    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
  </BrowserRouter>
);

export default App;