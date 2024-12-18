import React, { useEffect, useState } from 'react';

function AccidentDetection() {
  const [accidents, setAccidents] = useState([]);
  const [newAccident, setNewAccident] = useState({ location: '', description: '' });

  useEffect(() => {
    // Simulating fetching accident data
    const fetchAccidents = () => {
      const mockAccidents = [
        { id: 1, location: 'Main St & 5th Ave', description: 'Car collision', time: '2023-05-10 14:30' },
        { id: 2, location: 'Park Rd & Oak Ln', description: 'Motorcycle accident', time: '2023-05-10 15:45' },
      ];
      setAccidents(mockAccidents);
    };

    fetchAccidents();
  }, []);

  const handleNewAccident = (e) => {
    e.preventDefault();
    const updatedAccidents = [
      ...accidents,
      { ...newAccident, id: accidents.length + 1, time: new Date().toLocaleString() },
    ];
    setAccidents(updatedAccidents);
    setNewAccident({ location: '', description: '' });
    alert('Accident reported. Notifying nearby medical professionals.');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#1b558b' }}>Accident Detection & Alert</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg border-0 rounded-3 card-animate">
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#1b558b' }}>Recent Accidents</h3>
              <ul className="list-group list-group-flush">
                {accidents.map((accident) => (
                  <li key={accident.id} className="list-group-item bg-light rounded-3 shadow-sm mb-3">
                    <strong style={{ color: '#1b558b' }}>{accident.location}</strong>
                    <br />
                    {accident.description}
                    <br />
                    <small className="text-muted">{accident.time}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg border-0 rounded-3 card-animate">
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#1b558b' }}>Report New Accident</h3>
              <form onSubmit={handleNewAccident}>
                <div className="form-group mb-3">
                  <label htmlFor="accidentLocation" className="form-label" style={{ color: '#1b558b' }}>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="accidentLocation"
                    value={newAccident.location}
                    onChange={(e) => setNewAccident({ ...newAccident, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="accidentDescription" className="form-label" style={{ color: '#1b558b' }}>Description</label>
                  <textarea
                    className="form-control"
                    id="accidentDescription"
                    value={newAccident.description}
                    onChange={(e) => setNewAccident({ ...newAccident, description: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: '#1b558b', color: 'white', width: '100%', padding: '10px' }}>Report Accident</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccidentDetection;
