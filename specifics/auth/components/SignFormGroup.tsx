import { Box, Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { colorTheme } from '@styles/theme';

interface Props {
  handleSubmitForm: (email: string, password: string) => void;
  buttonText: string;
}

function SignFormGroup({ handleSubmitForm, buttonText }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    handleSubmitForm(email, password);
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={1} mb={2}>
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: colorTheme.main, padding: '10px 0' }}
      >
        <Typography color="#F4F8FB">{buttonText}</Typography>
      </Button>
    </Box>
  );
}
export default SignFormGroup;
