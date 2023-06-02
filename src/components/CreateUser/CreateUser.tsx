import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { ERole } from '../../types/Constants';
import { signup } from '../../api/api';
import { SignupRequest } from '../../types/UserTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [role, setRole] = useState<ERole>(ERole.ADMIN);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(Number(event.target.value));
  };

  const handleRoleChange = (event: SelectChangeEvent<ERole>) => {
    setRole(event.target.value as ERole);
  };

  const mutation = useMutation(signup, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalidate the 'users' query to trigger a refresh
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const createUserRequest: SignupRequest = {
      username,
      email,
      password,
      role: [role],
      balance,
    };

    try {
      await mutation.mutateAsync(createUserRequest); // Call the mutation function with the request data
      setAlertMessage('User created successfully');
    } catch (error) {
      setAlertMessage('Error creating user.');
    }
  };

  return (
    <form noValidate autoComplete="off">
      <Typography variant="h5" component="h2" sx={{ mt: 6, mb: 4 }}>
        Create User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Balance"
            type="number"
            value={balance || ''}
            onChange={handleBalanceChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create User
          </Button>
        </Grid>
      </Grid>
      {alertMessage && (
        <Alert
          severity="success"
          onClose={() => setAlertMessage('')}
          sx={{ mt: 4 }}
        >
          {alertMessage}
        </Alert>
      )}
    </form>
  );
};

export default CreateUser;
