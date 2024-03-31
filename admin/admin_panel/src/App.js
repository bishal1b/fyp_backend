import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import Vehicles from './components/Vehicles';

function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        
            <Route path="/admin/vehicles" element={<Vehicles />} />
           
            {/* Add more routes for other components */}
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
