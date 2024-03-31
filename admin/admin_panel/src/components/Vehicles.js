import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import VehicleList from './VehicleList';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    no_of_seats: 0,
    image: null,
    category: '',
    per_day_price: 0,
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend API for processing
    console.log(formData);
    // Reset form data after submission
    setFormData({
      title: '',
      description: '',
      no_of_seats: 0,
      image: null,
      category: '',
      per_day_price: 0,
    });
    // Close the form
    setShowForm(false);
  };

  return (
    <Container maxWidth="sm">
      <Button onClick={() => setShowForm(!showForm)} variant="contained" color="primary">
        {showForm ? 'Close Form' : 'Add Vehicle'}
      </Button>
      {showForm && (
        <>
          <Typography variant="h4" gutterBottom>
            Add New Vehicle
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Number of Seats"
                  name="no_of_seats"
                  type="number"
                  value={formData.no_of_seats}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <VehicleList />
    </Container>
  );
};

export default VehicleForm;
