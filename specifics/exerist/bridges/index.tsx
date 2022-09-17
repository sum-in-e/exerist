import { firebaseAuth } from '@firebase';
import { Box, Typography, Table, Chip, Button } from '@mui/material';
import { signOut } from 'firebase/auth';

function Exerist() {
  const handleSignOut = () => {
    signOut(firebaseAuth);
  };

  return (
    <Box>
      <Typography>캘린더 영역</Typography>
      <Box>
        <Typography>리스트 영역</Typography>
        <Button onClick={handleSignOut}>테스트용 로그아웃 버튼</Button>
      </Box>
    </Box>
  );
}

export default Exerist;
