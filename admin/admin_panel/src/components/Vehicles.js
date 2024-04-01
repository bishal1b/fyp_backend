import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import VehicleList from './VehicleList';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    no_of_seats: '',
    image: null,
    category_id: '',
    added_by: '',
    rating: '',
    per_day_price: '',
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
    const reader = new FileReader();
  
    reader.onload = (event) => {
      setFormData((prevData) => ({
        ...prevData,
        image: imageFile,
        // Add a new property for preview URL (optional)
        previewUrl: event.target.result,
      }));
    };
  
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();

    // Append form fields to FormData object
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('no_of_seats', formData.no_of_seats);
    formDataToSend.append('per_day_price', formData.per_day_price);
    formDataToSend.append('added_by', formData.added_by);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('rating', formData.rating);
  
    // Append image file to FormData object
    formDataToSend.append('image', formData.image);
  
    // Send form data to backend API for processing
    try {
      const response = await fetch('http://localhost:5000/vehicles', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
  
      const responseData = await response.json();
      console.log('Vehicle added successfully:', responseData);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 2 }}>
        <Button onClick={() => setShowForm(!showForm)} sx={{mt:3, ml: 90}} variant="contained" color="primary">
          {showForm ? 'Close Form' : 'Add Vehicle'}
        </Button>
      </Box>
      {showForm && (
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add New Vehicle
          </Typography>
          <form onSubmit={handleSubmit}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  label="Price per Day ($)"
                  name="per_day_price"
                  type="number"
                  value={formData.per_day_price}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Added By"
                  name="added_by"
                  value={formData.added_by}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Category ID"
                  name="category_id"
                  type="number"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Rating"
                  name="rating"
                  type="number"
                  value={formData.rating}
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
          </form>
        </Box>
      )}
      <VehicleList />
    </Container>
  );
};

export default VehicleForm;
