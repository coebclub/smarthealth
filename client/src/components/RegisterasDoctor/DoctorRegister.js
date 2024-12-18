import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DoctorRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [contact, setContact] = useState("");
  const [experience, setExperience] = useState("");
  const [currentHospital, setCurrentHospital] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/doctor-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          specialization,
          contact,
          experience,
          currentHospital,
          address
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/login-as-doctor");
      } else {
        toast.error(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '30rem' }}>
        <h2 className="text-center mb-4 animated fadeIn" style={{ color: '#1b558b' }}>Register as Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="specialization" className="form-label">Specialization</label>
            <input
              type="text"
              className="form-control"
              id="specialization"
              placeholder="Enter your specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="experience" className="form-label">Years of Experience</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              placeholder="Enter your years of experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hospital" className="form-label">Current Hospital/Clinic</label>
            <input
              type="text"
              className="form-control"
              id="hospital"
              placeholder="Enter your current workplace"
              value={currentHospital}
              onChange={(e) => setCurrentHospital(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success" style={{ backgroundColor: "#1b558b" }}>Register</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login-as-doctor">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default DoctorRegister;
