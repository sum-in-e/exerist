import { Box, Button, Typography } from '@mui/material';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import WorkoutLogs from '@specifics/exerist/bridges/workoutLogs';
import { colorTheme } from '@styles/theme';
import { border, borderRadius } from '@mui/system';

interface DailyLogProps {
  date: string;
}

function DailyLog({ date }: DailyLogProps) {
  const { data, isLoading } = useGetDailyLogByDocIdQuery({
    docId: date,
  });

  const handleClickAdd = () => {
    //TODO: 운동 추가
  };

  return (
    <Box>
      {data ? (
        <Box>
          <WorkoutLogs date={date} workoutLogs={data.workoutLogs} />
        </Box>
      ) : (
        !isLoading && (
          <Box
            textAlign="center"
            style={{ background: colorTheme.secondary }}
            borderRadius="5px"
            p={2}
          >
            <Typography fontWeight="bold" color={colorTheme.main}>
              기록이 없습니다.
            </Typography>
          </Box>
        )
      )}

      <Box mt={2}>
        <Button
          size="large"
          variant="contained"
          style={{ background: colorTheme.signature, fontWeight: 'bold' }}
          onClick={handleClickAdd}
          fullWidth
        >
          운동 추가하기
        </Button>
      </Box>
    </Box>
  );
}

export default DailyLog;
