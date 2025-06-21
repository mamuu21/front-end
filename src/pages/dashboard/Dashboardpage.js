import React from 'react';
import Charts from './charts'; 
import { Link } from 'react-router-dom';

const pendingInvoices = [
  {
    parcel: "PCL-04021-1",
    customer: "Abdulswamad Makuya",
    weight: "230 KGS",
    cbm: "1750",
    charge: "165,000",
    date: "06/02/2024",
  },
 
];

const Dashboard = () => {
  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3 fw-bold">Overview</h2>

      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        {/* Shipments */}
        <div className="col-md-3">
          <Link to='/list' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card shadow-sm mb-3">
              <div className="card-body p-3">
                <h6 className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Shipments</h6>
                <div className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>170</div>
                <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                  <span className="text-success">+5%</span> increase vs last month
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Customers */}
        <div className="col-md-3">
          <Link to='/customer' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card shadow-sm mb-3">
              <div className="card-body p-3">
                <h6 className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Customers</h6>
                <div className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>32</div>
                <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                  <span className="text-success">+5%</span> increase vs last month
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Parcels */}
        <div className="col-md-3">
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card shadow-sm mb-3">
              <div className="card-body p-3">
                <h6 className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Parcels</h6>
                <div className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>26</div>
                <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                  <span className="text-success">+5%</span> increase vs last month
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Invoices */}
        <div className="col-md-3">
          <Link to='/invoice' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card shadow-sm mb-3">
              <div className="card-body p-3">
                <h6 className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Invoices</h6>
                <div className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>5</div>
                <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                  <span className="text-success">+5%</span> increase vs last month
                </p>
              </div>
            </div>
          </Link>
        </div>
        
      </div>

      {/* Charts Section */}
      <Charts />

      {/* Pending Invoices Table */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title">Pending Invoices</h5>
          <div className="table-responsive mt-3">
            <table className="table table-striped table-sm" style={{ fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th>Parcel</th>
                  <th>Customer</th>
                  <th>Weight</th>
                  <th>CBM</th>
                  <th>Charge</th>
                  <th>Warehouse Date</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvoices.map((invoice) => (
                  <tr key={invoice.parcel}>
                    <td className="fw-bold">{invoice.parcel}</td>
                    <td>{invoice.customer}</td>
                    <td>{invoice.weight}</td>
                    <td>{invoice.cbm}</td>
                    <td>{invoice.charge}</td>
                    <td>{invoice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
