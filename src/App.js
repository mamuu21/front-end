import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Header from './components/Header';
import Dashboard from './pages/dashboard/Dashboardpage';
import Invoice from './pages/invoice';
import TrackShipment from './pages/track';
import WarehousePage from './pages/warehouse';
import ShippingQuoteCalculator from './pages/quote';
import ShipmentDetail from './pages/shipment/detail';
import ShipmentList from './pages/shipment/list'


function App() {
  return(
    <Router>
      <div className='d-flex'>
        <Sidebar />
        <div className='flex-grow-1'>
          <Header />
          
          <div className='content-area p-2'>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/track" element={<TrackShipment />} />
              <Route path="/warehouse" element={<WarehousePage />} />
              <Route path="/quote" element={<ShippingQuoteCalculator />} />
              <Route path="/shipment/:id" element={<ShipmentDetail />} />
              <Route path="/list" element={<ShipmentList />} />

              {/* Add more routes as needed */}
              <Route path="*" element={<h4>Page Not Found</h4>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App