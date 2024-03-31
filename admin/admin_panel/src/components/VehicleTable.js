import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const VehicleTable = ({ vehicles, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>No. of Seats</TableCell>
            <TableCell>Per Day Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map(vehicle => (
            <TableRow key={vehicle.vehicle_id}>
              <TableCell>{vehicle.title}</TableCell>
              <TableCell>{vehicle.description}</TableCell>
              <TableCell>{vehicle.no_of_seats}</TableCell>
              <TableCell>{vehicle.per_day_price}</TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(vehicle.vehicle_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;
