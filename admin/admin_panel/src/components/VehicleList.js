import React, { useState, useEffect } from 'react';
import VehicleTable from './VehicleTable';

const VehicleList = () => {
  const API_URL = 'http://localhost:5000/vehicles';
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    fetch(API_URL)
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

  const handleDelete = (vehicleId) => {
    fetch(`${API_URL}/${vehicleId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }
      fetchVehicles(); // Fetch updated list of vehicles after deletion
    })
    .catch(error => {
      console.error('Error deleting vehicle: ', error);
    });
  };

  const handleUpdate = async (updatedVehicle) => {
    try {
      await fetch(`http://localhost:5000/vehicles/${updatedVehicle.vehicle_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVehicle),
      });
      // After successful update, fetch updated list of vehicles
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle: ', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{fontSize: '30px', }}> Vehicle List</h2>
      <VehicleTable vehicles={vehicles} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default VehicleList;