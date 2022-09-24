import { Box, Typography } from '@mui/material';
import { colorTheme } from '@styles/theme';

function SignTitle() {
  return (
    <Box textAlign="center" mt={3} mb={4}>
      <Typography variant="h4" color={colorTheme.signature} fontWeight="bold">
        EXERIST
      </Typography>
    </Box>
  );
}

export default SignTitle;
