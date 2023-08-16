
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
// import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';

const Redirect = () => (
    <Navigate to="dashboard" replace />
)

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}