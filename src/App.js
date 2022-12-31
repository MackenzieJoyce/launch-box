import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import LaunchData from './pages/LaunchData';
import IssTracker from './pages/IssTracker';


export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LaunchData />} />
          <Route path="/iss-tracker" element={<IssTracker />} />
        </Routes>
      </Router>
    </>
  );
}

