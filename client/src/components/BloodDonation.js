import React, { useState } from 'react';

function BloodDonation() {
  const [bloodType, setBloodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');

  const handleDonation = (e) => {
    e.preventDefault();
    // Add your blood donation logic here
    console.log('Blood donation:', bloodType, quantity, location);
    alert('Thank you for your donation!');
  };

  const handleRequest = (e) => {
    e.preventDefault();
    // Add your blood request logic here
    console.log('Blood request:', bloodType, quantity, location);
    alert('Blood request submitted. We will notify you when a match is found.');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#1b558b' }}>Blood Donation & Receive</h2>
      <div className="row">
        {/* Donate Blood Section */}
        <div className="col-md-6 mb-4 animated fadeIn">
          <div className="card shadow-lg rounded-3 border-0">
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#1b558b' }}>Donate Blood</h3>
              <form onSubmit={handleDonation}>
                <div className="form-group mb-3">
                  <label htmlFor="donateBloodType" style={{ color: '#1b558b' }}>Blood Type</label>
                  <select
                    className="form-control"
                    id="donateBloodType"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="donateQuantity" style={{ color: '#1b558b' }}>Quantity (ml)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="donateQuantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="donateLocation" style={{ color: '#1b558b' }}>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="donateLocation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: '#1b558b', color: 'white', width: '100%', padding: '10px' }} 
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Click to donate">Donate</button>
              </form>
            </div>
          </div>
        </div>

        {/* Request Blood Section */}
        <div className="col-md-6 mb-4 animated fadeIn">
          <div className="card shadow-lg rounded-3 border-0">
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#1b558b' }}>Request Blood</h3>
              <form onSubmit={handleRequest}>
                <div className="form-group mb-3">
                  <label htmlFor="requestBloodType" style={{ color: '#1b558b' }}>Blood Type</label>
                  <select
                    className="form-control"
                    id="requestBloodType"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="requestQuantity" style={{ color: '#1b558b' }}>Quantity (ml)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="requestQuantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="requestLocation" style={{ color: '#1b558b' }}>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="requestLocation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: '#1b558b', color: 'white', width: '100%', padding: '10px' }} 
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Click to request blood">Request</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodDonation;
