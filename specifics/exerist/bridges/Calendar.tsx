import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';

function Calendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleChange = (newDate: any) => {
    const formatedNewDate = dayjs(newDate).format('YYYY-MM-DD');
    setSelectedDate(formatedNewDate);
  };

  const handleAccept = (newDate: any) => {
    const formatedNewDate = dayjs(newDate).format('YYYY-MM-DD');
    router.push({ pathname: '/exerist', query: { date: formatedNewDate } });
  };

  useEffect(() => {
    const { date } = router.query;
    const currentDate = date as string;
    const today = dayjs().format('YYYY-MM-DD');

    if (!currentDate) {
      router.push({
        pathname: '/exerist',
        query: { date: today },
      });
      return;
    }

    setSelectedDate(currentDate || today);
  }, [router]);

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          inputFormat="YYYY-MM-DD"
          mask={'____-__-__'}
          value={selectedDate}
          onAccept={handleAccept}
          onChange={handleChange}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default Calendar;
