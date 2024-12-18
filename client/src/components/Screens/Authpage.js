import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Authpage() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="row w-100 text-center">
        <div className="col-md-6 mb-4">
          <div className="card border-primary shadow h-100">
            <img src="https://th.bing.com/th/id/OIP.WNQzMWB6nZi_uYlSNxL5SQHaE8?rs=1&pid=ImgDetMain" className="card-img-top" alt="User Registration" />
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h2 className="card-title text-primary mb-4">Register as User</h2>
              <Link to="/login-as-user" className="btn btn-primary btn-lg">
                Click
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card border-primary shadow h-100">
            <img src="https://static.vecteezy.com/system/resources/previews/002/952/463/large_2x/doctor-holding-touching-hands-asian-senior-or-elderly-old-lady-woman-patient-with-love-care-helping-encourage-and-empathy-at-nursing-hospital-ward-healthy-strong-medical-concept-free-photo.jpg" className="card-img-top" alt="Doctor Registration" />
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h2 className="card-title text-primary mb-4">Register as Doctor</h2>
              <Link to="/login-as-doctor" className="btn btn-primary btn-lg">
                Click
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authpage;
