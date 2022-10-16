import { Badge, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { useGetMuscleLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetMuscleLogByDocIdQuery';

interface RenderDayProps {
  date: string;
  DayComponentProps: PickersDayProps<any>;
}

function RenderDay({ date, DayComponentProps }: RenderDayProps) {
  const { data } = useGetMuscleLogByDocIdQuery({
    docId: date,
  });

  const muscleLog = data?.muscleLog || undefined;

  return muscleLog ? (
    <Badge
      key={date.toString()}
      overlap="circular"
      badgeContent={
        <Box
          border="1px solid gray"
          borderRadius="10px"
          sx={{ background: 'black' }}
          p="0 3px"
        >
          <Typography variant="caption" color="white">
            {muscleLog ? muscleLog.join() : ''}
          </Typography>
        </Box>
      }
    >
      <PickersDay {...DayComponentProps} />
    </Badge>
  ) : (
    <PickersDay {...DayComponentProps} />
  );
}

export default RenderDay;
