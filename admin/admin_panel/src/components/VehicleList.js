import React, { useState, useEffect } from 'react';
import VehicleTable from './VehicleTable';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    fetch('http://localhost:5000/vehicles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVehicles(data);
      })
      .catch(error => {
        console.error('Error fetching vehicles: ', error);
      });
  };

  const handleDelete = async (vehicleId) => {
    try {
      await fetch(`/vehicles/${vehicleId}`, {
        method: 'DELETE'
      });
      // After successful deletion, fetch updated list of vehicles
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle: ', error);
    }
  };

  return (
    <div>
      <h2>Vehicle List</h2>
      <VehicleTable vehicles={vehicles} onDelete={handleDelete} />
    </div>
  );
};

export default VehicleList;
