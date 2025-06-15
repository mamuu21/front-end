import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

const ParcelCreate = ({ show, onClose, onAddParcel }) => {
  const [formData, setFormData] = useState({
    parcelNo: '',
    weight: '',
    volume: '',
    recipient: '',
    charge: '',
    commodity: '',
    payment: 'Unpaid',
    status: 'Pending'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddParcel(formData);
    onClose();
    setFormData({
      parcelNo: '',
      weight: '',
      weightunit: 'kg',
      volume: '',
      volumeunit: 'm3',
      recipient: '',
      charge: '',
      commodity: '',
      payment: 'Unpaid',
      status: 'Pending'
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Parcel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Parcel No</Form.Label>
                <Form.Control
                type="text"
                name="parcelNo"
                value={formData.parcelNo}
                onChange={handleChange}
                placeholder="Enter parcel number"
                required
                />
            </Form.Group>

            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                    <InputGroup>
                    <Form.Control
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Enter weight"
                        required
                    />
                    <Form.Select
                        name='weightunit'
                        value={formData.weightunit}
                        onChange={handleChange}
                        style={{ maxWidth: '6rem' }}
                    >
                        <option value='kg'>kg</option>
                        <option value='lb'>lb</option>
                        <option value='ton'>ton</option>
                    </Form.Select>
                    </InputGroup>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Volume</Form.Label>
                    <InputGroup>
                    <Form.Control
                        type="number"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        placeholder="Enter volume"
                        required
                    />
                    <Form.Select
                        name='volumeunit'
                        value={formData.volumeunit}
                        onChange={handleChange}
                        style={{ maxWidth: '6rem' }}
                    >
                        <option value='m3'>m³</option>
                        <option value='ft3'>ft³</option>
                        <option value='L'>L</option>
                    </Form.Select>
                    </InputGroup>
                </Form.Group>
                </Col>
            </Row>


          <Form.Group className="mb-2">
            <Form.Label>Recipient</Form.Label>
            <Form.Control name="recipient" value={formData.recipient} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Charge</Form.Label>
            <Form.Control name="charge" value={formData.charge} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Commodity</Form.Label>
            <Form.Control name="commodity" value={formData.commodity} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Payment</Form.Label>
            <Form.Select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value="In Transit">In Transit</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onClose} className="me-2">Cancel</Button>
            <Button type="submit" variant="primary">Add Parcel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ParcelCreate;
