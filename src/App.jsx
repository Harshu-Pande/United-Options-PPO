// File: App.jsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cptCode, setCptCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setHospitals([]);

    try {
      const response = await axios.post(
        'https://zxekqoptzazggpsbrufy.supabase.co/rest/v1/rpc/get_hospitals',
        {
          billing_code: cptCode,
          zip_code: zipCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZWtxb3B0emF6Z2dwc2JydWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTY5MTUsImV4cCI6MjAzMDQzMjkxNX0.E0uQ2Q_FC-IFRCAAjAB4Mwn8xNOooBF3IPjPcGh523w',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZWtxb3B0emF6Z2dwc2JydWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTY5MTUsImV4cCI6MjAzMDQzMjkxNX0.E0uQ2Q_FC-IFRCAAjAB4Mwn8xNOooBF3IPjPcGh523w',
          },
        }
      );
      setHospitals(response.data);
    } catch (err) {
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5">Price Transparency App</h1>
          <form onSubmit={handleSearch} className="mb-5">
            <div className="mb-4">
              <label htmlFor="cptCode" className="block text-gray-700 text-sm font-bold mb-2">
                CPT Code
              </label>
              <input
                type="text"
                id="cptCode"
                value={cptCode}
                onChange={(e) => setCptCode(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && <p className="text-red-500 mb-5">{error}</p>}
          {hospitals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Results</h2>
              <ul className="space-y-2">
                {hospitals.map((hospital, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-semibold">{hospital.organization_name}</p>
                    <p>{hospital.city}</p>
                    <p className="text-green-600 font-semibold">${parseFloat(hospital.negotiated_rate).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;