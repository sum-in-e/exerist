import { Avatar, Box, Divider, Typography } from '@mui/material';
import { colorTheme } from '@styles/theme';

function GlobalHeader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <Typography variant="h5" color={colorTheme.signature} fontWeight="bold">
        EXERIST
      </Typography>
    </Box>
  );
}
export default GlobalHeader;
