import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

function BloodDonation() {
  // State for Donate Blood form
  const [donateBloodType, setDonateBloodType] = useState('');
  const [donateQuantity, setDonateQuantity] = useState('');
  const [donateLocation, setDonateLocation] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorContact, setDonorContact] = useState('');

  // State for Request Blood form
  const [requestBloodType, setRequestBloodType] = useState('');
  const [requestQuantity, setRequestQuantity] = useState('');
  const [requestLocation] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [priority, setPriority] = useState('');

  // Handle Donation
  const handleDonation = async (e) => {
    e.preventDefault();

    const donationData = {
      bloodType: donateBloodType,
      quantity: donateQuantity,
      location: donateLocation,
      name: donorName,
      contact: donorContact,
    };

    try {
      const response = await fetch('http://localhost:2000/blood/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
        credentials: 'include', // Ensure credentials are passed here
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData); // Log the error response
        toast.error(errorData.error || 'Failed to submit donation.'); // Show error toast
      } else {
        const result = await response.json();
        toast.success(result.message || 'Thank you for your donation!'); // Show success toast
      }
    } catch (err) {
      console.error('Error during donation:', err);
      toast.error('An error occurred. Please try again.'); // Show error toast
    }
  };

  // Handle Request
  const handleRequest = async (e) => {
    e.preventDefault();

    const requestData = {
      bloodType: requestBloodType,
      quantity: requestQuantity,
      location: requestLocation,
      name: patientName,
      contact: patientContact,
      priority,
    };

    try {
      // Step 1: Check if requested blood is available
      const availabilityResponse = await fetch('http://localhost:2000/blood/request/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bloodType: requestBloodType,
          quantity: requestQuantity,
        }),
        credentials: 'include',
      });

      if (!availabilityResponse.ok) {
        const error = await availabilityResponse.json();
        console.error('Availability Error:', error); // Log the availability error
        toast.error(error.error || 'Failed to check blood availability.'); // Show error toast
        return; // Return early if the availability check failed
      }

      const availabilityResult = await availabilityResponse.json();

      // Step 2: Only show success message if blood is available
      if (availabilityResult.available) {
        toast.success(`The requested blood (${requestBloodType}, ${requestQuantity} ml) is available.`); // Success toast
      } else {
        toast.error(`The requested blood (${requestBloodType}, ${requestQuantity} ml) is not available.`); // Error toast
        return; // Stop further processing if the blood is not available
      }

      // Step 3: Submit the request for tracking purposes if available
      const submitResponse = await fetch('http://localhost:2000/blood/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        credentials: 'include', // Ensure credentials are passed here
      });

      if (!submitResponse.ok) {
        const error = await submitResponse.json();
        console.error('Submit Error:', error); // Log the submit error
        toast.error(error.error || 'Failed to submit blood request.'); // Show error toast
      } else {
        const result = await submitResponse.json();
        toast.success(result.message || 'Blood request submitted successfully.'); // Success toast
      }
    } catch (err) {
      console.error('Error during blood request:', err);
      toast.error('An error occurred. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#1b558b' }}>
        Blood Donation & Request
      </h2>
      <div className="row">
        {/* Donate Blood Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg rounded-3 border-0">
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#1b558b' }}>
                Donate Blood
              </h3>
              <form onSubmit={handleDonation}>
                <div className="form-group mb-3">
                  <label htmlFor="donateBloodType" style={{ color: '#1b558b' }}>
                    Blood Type
                  </label>
                  <select
                    className="form-control"
                    id="donateBloodType"
                    value={donateBloodType}
                    onChange={(e) => setDonateBloodType(e.target.value)}
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
                  <label htmlFor="donateQuantity" style={{ color: '#1b558b' }}>
                    Quantity (ml)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="donateQuantity"
                    value={donateQuantity}
                    onChange={(e) => setDonateQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="donorName" style={{ color: '#1b558b' }}>
                    Donor Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="donorContact" style={{ color: '#1b558b' }}>
                    Contact Information
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="donorContact"
                    value={donorContact}
                    onChange={(e) => setDonorContact(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="donateLocation" style={{ color: '#1b558b' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="donateLocation"
                    value={donateLocation}
                    onChange={(e) => setDonateLocation(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#1b558b',
                    color: 'white',
                    width: '100%',
                    padding: '10px',
                  }}
                >
                  Donate
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Request Blood Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg rounded-3 border-0">
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#1b558b' }}>
                Request Blood
              </h3>
              <form onSubmit={handleRequest}>
                <div className="form-group mb-3">
                  <label htmlFor="requestBloodType" style={{ color: '#1b558b' }}>
                    Blood Type
                  </label>
                  <select
                    className="form-control"
                    id="requestBloodType"
                    value={requestBloodType}
                    onChange={(e) => setRequestBloodType(e.target.value)}
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
                  <label htmlFor="requestQuantity" style={{ color: '#1b558b' }}>
                    Quantity (ml)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="requestQuantity"
                    value={requestQuantity}
                    onChange={(e) => setRequestQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="patientName" style={{ color: '#1b558b' }}>
                    Patient Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="patientContact" style={{ color: '#1b558b' }}>
                    Contact Information
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientContact"
                    value={patientContact}
                    onChange={(e) => setPatientContact(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="requestPriority" style={{ color: '#1b558b' }}>
                    Priority
                  </label>
                  <select
                    className="form-control"
                    id="requestPriority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#1b558b',
                    color: 'white',
                    width: '100%',
                    padding: '10px',
                  }}
                >
                  Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer for rendering notifications */}
      <ToastContainer />
    </div>
  );
}

export default BloodDonation;
