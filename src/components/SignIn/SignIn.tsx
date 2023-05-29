import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signin } from '../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useEffect } from 'react';

// Based on: https://mui.com/material-ui/getting-started/templates/
// Source: https://github.com/mui/material-ui/tree/v5.13.2/docs/data/material/getting-started/templates/sign-in

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright ©FranklinCastillo '}
      <Link color="inherit" href="https://about.me/fcastillo18/">
        about.me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = React.useState<string | null>(null);
  const [from, setFrom] = React.useState<string | null>(null); // to navigate back to previous page

  useEffect(() => {
    if (location.state) {
      // const { from } = location.state as { from: { pathname: string } };
      const { from, error } = location.state;
      if (error && error.code === 401) {
        setFrom(from);
        setError(
          'Session expired or you tried access a unauthorized route. Please sign in again.'
        );
        // navigated back to previous page
        // navigate(from);
      }
    }
  }, []);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    setError('');
    event?.preventDefault();
    const data = new FormData(event?.currentTarget);

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      const response = await signin(email, password);

      if (from) {
        // navigated back to previous page
        navigate(from);
      }

      // Redirect to the dashboard and send userData throw the state
      navigate('/dashboard', {
        state: {
          user: response.user,
        },
      });
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Incorrect username or password, please try again.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // TODO I need to implement states for the inputs, in order to use this and getting the data inside the function without the need of passing form data
              // onKeyDown={(event) => {
              //   // Check if the ENTER key was pressed
              //   if (event.key === 'Enter') {
              //     // Prevent the default action
              //     event.preventDefault();
              //     // Call the handleSubmit function
              //     handleSubmit();
              //   }
              // }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 2 }} />
            <Typography color="error" align="center">
              {error}
            </Typography>
            {/* TODO SigUp is not yet being considerate, might be implemented later. We have CreatedUser for that */}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
