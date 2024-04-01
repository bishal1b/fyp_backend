import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const VehicleTable = ({ vehicles, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedVehicle, setEditedVehicle] = useState({});

  const handleEdit = (vehicle) => {
    setEditMode(vehicle.vehicle_id);
    setEditedVehicle({ ...vehicle });
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedVehicle({});
  };

  const handleSaveEdit = () => {
    onUpdate(editedVehicle);
    setEditMode(null);
    setEditedVehicle({});
  };

  const handleDeleteClick = (vehicleId) => {
    onDelete(vehicleId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
          <TableCell style={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: 18 }}>Title</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontFamily: 'Poppins', fontSize: 18  }}>Description</TableCell>
            <TableCell style={{ fontWeight: 'bold' ,fontFamily: 'Poppins', fontSize: 18 }}>No. of Seats</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontFamily: 'Poppins', fontSize: 18  }}>Per Day Price</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontFamily: 'Poppins', fontSize: 18  }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map(vehicle => (
            <TableRow key={vehicle.vehicle_id}>
              <TableCell>
                {editMode === vehicle.vehicle_id ? (
                  <TextField
                    name="title"
                    value={editedVehicle.title}
                    onChange={handleInputChange}
                  />
                ) : (
                  vehicle.title
                )}
              </TableCell>
              <TableCell>
                {editMode === vehicle.vehicle_id ? (
                  <TextField
                    name="description"
                    value={editedVehicle.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  vehicle.description
                )}
              </TableCell>
              <TableCell>
                {editMode === vehicle.vehicle_id ? (
                  <TextField
                    name="no_of_seats"
                    type="number"
                    value={editedVehicle.no_of_seats}
                    onChange={handleInputChange}
                  />
                ) : (
                  vehicle.no_of_seats
                )}
              </TableCell>
              <TableCell>
                {editMode === vehicle.vehicle_id ? (
                  <TextField
                    name="per_day_price"
                    type="number"
                    value={editedVehicle.per_day_price}
                    onChange={handleInputChange}
                  />
                ) : (
                  vehicle.per_day_price
                )}
              </TableCell>
              <TableCell>
                {editMode === vehicle.vehicle_id ? (
                  <>
                    <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button variant="contained" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" sx={{bgcolor: 'red'}} onClick={() => handleDeleteClick(vehicle.vehicle_id)}>
                    Delete
                  </Button>
                )}
                {!editMode && (
                  <Button sx={{ml: 3}}variant="contained" color="primary" onClick={() => handleEdit(vehicle)}>
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;
