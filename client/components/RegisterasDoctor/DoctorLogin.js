import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // To display success/error messages
import Doctorpage from '../Screens/Doctorpage';

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigatepage , setnavigatepage]=useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // API call to login endpoint
      const response = await fetch("http://localhost:2000/doctor-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies for session
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        toast.success("Login successful!");
        localStorage.setItem("doctor", JSON.stringify(data.doctor)); // Store doctor session data;
      } else {
        // Handle login failure
        toast.error(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handelnavigate=(navigateroute)=>{
    setnavigatepage(navigateroute);
  }
  if(navigatepage==="doctor-screen"){
    return <Doctorpage />
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '25rem' }}>
        <h3 className="text-center mb-4 animated fadeIn" style={{ color: '#1b558b' }}>
          Login as Doctor
        </h3>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#1b558b" }} onClick={()=>{handelnavigate("doctor-screen")}}>
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register-as-doctor">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
