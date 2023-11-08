import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Votre logique de connexion ici

      // Exemple : const res = await axios.post("/users/login", { email, password });
      // handleLogin(res.data.accessToken);
      // navigate("/Dashboard");
    } catch (err) {
      // setError(true);
      console.log(err);
    }
  };

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
  );
};

export default Login;
