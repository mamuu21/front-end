import React, { useState } from 'react';
import {
  Dropdown,
  Form,
  Table,
  Button,
  InputGroup,
  Modal,
  Pagination,
} from 'react-bootstrap';
import {
  FaSearch,
  FaEllipsisV,
  FaDownload,
  FaPlus,
} from 'react-icons/fa';

const Invoice = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2024-001',
      customer: 'Abdulswamad Makuya',
      amount: '165000',
      currency: 'TZS',
      date: '2024-06-02',
      dueDate: '2024-06-20',
      status: 'Paid',
      shipmentId: 'SHP-001',
    },
    {
      id: 'INV-2024-002',
      customer: 'John Smith',
      amount: '450000',
      currency: 'TZS',
      date: '2024-06-10',
      dueDate: '2024-06-24',
      status: 'Pending',
      shipmentId: 'SHP-002',
    },
    // ... other sample invoices ...
  ]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    shipmentId: '',
    amount: '',
    date: '',
    dueDate: '',
    status: 'Pending',
  });

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getTotals = () => ({
    all: invoices.length,
    paid: invoices.filter((i) => i.status === 'Paid').length,
    pending: invoices.filter((i) => i.status === 'Pending').length,
    overdue: invoices.filter((i) => i.status === 'Overdue').length,
  });

  const totals = getTotals();

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'paid' && inv.status === 'Paid') ||
      (activeTab === 'pending' && inv.status === 'Pending') ||
      (activeTab === 'overdue' && inv.status === 'Overdue');

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Invoice No,Customer,Shipment ID,Date,Due Date,Amount,Status']
        .concat(
          filteredInvoices.map(
            (inv) =>
              `${inv.id},${inv.customer},${inv.shipmentId},${inv.date},${inv.dueDate},${inv.currency} ${inv.amount},${inv.status}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'invoices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInvoices([...invoices, { ...formData, currency: 'TZS' }]);
    setShowModal(false);
    setFormData({
      id: '',
      customer: '',
      shipmentId: '',
      amount: '',
      date: '',
      dueDate: '',
      status: 'Pending',
    });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="fs-3 fw-bold">Invoice</h2>
        <div className="d-flex align-items-center gap-2">
          <InputGroup style={{ maxWidth: '250px', height: '50px' }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ height: '50px' }}
            />
          </InputGroup>
          <Button
            variant="primary"
            style={{ width: '200px', height: '50px' }}
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="me-2" /> New Invoice
          </Button>
        </div>
      </div>

      <div className="row mb-4">
        {['all', 'pending', 'paid', 'overdue'].map((key) => (
          <div key={key} className="col-md-3 mb-2">
            <div
              className={`card ${activeTab === key ? 'bg-light border-primary' : ''}`}
              onClick={() => {
                setActiveTab(key);
                setCurrentPage(1);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h6 className="text-muted text-capitalize mb-2">
                  {key === 'all' ? 'All Invoices' : key}
                </h6>
                <h4 className="fw-bold">{totals[key]}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex gap-3 align-items-center flex-wrap mb-4">
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </Form.Select>
        <Button
          variant="outline-secondary"
          className="ms-auto"
          onClick={handleExportCSV}
        >
          <FaDownload className="me-2" /> Export CSV
        </Button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <Table striped hover responsive className="mb-0 small">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Customer</th>
                <th>Shipment</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="fw-bold">{invoice.id}</td>
                  <td>{invoice.customer}</td>
                  <td>{invoice.shipmentId}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.currency} {invoice.amount}</td>
                  <td>
                    <span className={`badge bg-${getStatusBadge(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item>View invoice</Dropdown.Item>
                        <Dropdown.Item>Download PDF</Dropdown.Item>
                        <Dropdown.Item>Send reminder</Dropdown.Item>
                        <Dropdown.Item>Mark as paid</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-3 d-flex justify-content-end">
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Add New Invoice Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Invoice No</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Shipment ID</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.shipmentId}
                onChange={(e) => setFormData({ ...formData, shipmentId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Invoice;
