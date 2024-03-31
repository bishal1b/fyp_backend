// LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography sx={{mt: 4}}variant="h4" component="h2" align="center" gutterBottom>
        Admin Login
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
