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
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ตัวอย่างธีม
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError(''); // ล้างข้อความแสดงข้อผิดพลาดก่อน
    setIsLoading(true); // เริ่มแสดง Loading

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // หากเข้าสู่ระบบสำเร็จ
      localStorage.setItem('authToken', response.data.token); // บันทึก Token ลง Local Storage
      navigate('/index'); // นำไปยังหน้าหลัก
    } catch (err) {
      // จัดการข้อผิดพลาด
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false); // หยุด Loading
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
            Sign In
          </Typography>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleLogIn}
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
            <Link href="/register" variant="body2" sx={{ display: 'block', mt: 2 }}>
              Don&apos;t have an account? Register here
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // ปิดปุ่มหากกำลัง Loading
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
