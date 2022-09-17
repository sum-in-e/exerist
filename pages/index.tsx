import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import GlobalLayout from '@common/bridges/GlobalLayout';

const Home: NextPage = () => {
  return (
    <GlobalLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
        height="100vh"
      >
        <Typography variant="h4" color="#3b9ae1" fontWeight="bold">
          EXERIST
        </Typography>
      </Box>
    </GlobalLayout>
  );
};

export default Home;
