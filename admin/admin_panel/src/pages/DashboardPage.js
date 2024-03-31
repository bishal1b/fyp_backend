import React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, Divider, Container, Avatar } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import Users from '../components/Users';
import Vehicles from '../components/Vehicles';
import { Box } from '@mui/system';
import VehicleList from '../components/VehicleList';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Admin Panel
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <Avatar />
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', flexGrow: 1, marginTop: '40px' }}>
        <List style={{ width: '20%', minWidth: '200px' }}>
          <ListItem component={Link} to="/admin/vehicles">
            <ListItemText primary="Vehicles" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/admin/users">
            <ListItemText primary="Users" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/admin/vehicle-category">
            <ListItemText primary="Vehicle category" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/admin/reports">
            <ListItemText primary="Reports" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/admin/track-vehicles">
            <ListItemText primary="Track vehicles" />
          </ListItem>
          <Divider />
          {/* Add more links/buttons for other features */}
        </List>
        <Container style={{ width: '80%' }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
