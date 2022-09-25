import { Box, Button } from '@mui/material';
import Calendar from '@specifics/exerist/bridges/Calendar';
import DailyLog from '@specifics/exerist/bridges/dailyLog';
import { useRouter } from 'next/router';

function Exerist() {
  const router = useRouter();
  const { date } = router.query;
  const currentDate = date as string;

  return (
    <Box>
      <Calendar />
      {currentDate && <DailyLog date={currentDate} />}
    </Box>
  );
}

export default Exerist;
