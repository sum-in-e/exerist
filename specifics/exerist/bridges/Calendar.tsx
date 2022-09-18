import { Box, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

function Calendar() {
  const initDate = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(initDate);

  const handleChange = (newDate: any) => {
    setSelectedDate(dayjs(newDate).format('YYYY-MM-DD'));
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          inputFormat="YYYY-MM-DD"
          mask={'____-__-__'}
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default Calendar;
