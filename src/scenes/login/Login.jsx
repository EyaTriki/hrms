import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useAuth } from '../../context/AuthContext';
import Dashboard from '../dashboard';


const Login = () => {
  const [user , setUser]=useState(null);
  const [email,setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [error, setError]=useState(false);
  const [success , setSuccess]=useState(false);
  const { isAuthenticated , handleLogin} = useAuth();
  const navigate = useNavigate();


  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/users/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    
const res= await axios.post("http://localhost:5001/api/users/login",{email , password})
setUser(res.data)
handleLogin(res.data.accessToken);
console.log(res.data)
//navigate("/dashboard");
window.location.replace("/dashboard");
  } catch (err) {
    setSuccess(false);
      setError(true);
      
      console.log(err);
  }
}


  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B', // Vert foncé (couleur professionnelle)
      },
      secondary: {
        main: '#3F51B5', // Bleu indigo (couleur professionnelle)
      },
      error: {
        main: '#E53935', // Rouge (couleur d'erreur)
      },
    },
  });

  return (
    <>

    {isAuthenticated ?(
       <Dashboard/>
     ) : (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#e0e0e3', // Gris clair légèrement plus sombre
        }}
      >
        <Paper elevation={6} sx={{ padding: 6  , maxWidth: '600px', width: '100%' }}>
          <Typography variant="h5" color="primary" align="center">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
            {error && (
              <Typography variant="body2" color="error" paragraph>
                Please enter both email and password.
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
      )}
      </>
  );
};

export default Login;
