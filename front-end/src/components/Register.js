import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ThemeProvider,
  Link,
  createTheme,
} from '@mui/material';
import axios from 'axios';

// ตัวอย่างธีม
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่า Password และ Confirm Password ตรงกัน
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // ล้างข้อความแสดงข้อผิดพลาดก่อน

    try {
      // ส่งข้อมูลการสมัครไปยัง Backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      // หากสำเร็จ แสดงข้อความสำเร็จ
      setSuccessMessage(response.data.message);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // จัดการข้อผิดพลาด
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" variant="body2" gutterBottom>
              {successMessage}
            </Typography>
          )}
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleRegister}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Link href="/" variant="body2">
            Already have an account? Log in
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
