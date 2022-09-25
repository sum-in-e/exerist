import { Box, Button, Typography } from '@mui/material';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import WorkoutLogs from '@specifics/exerist/bridges/workoutLogs';
import { colorTheme } from '@styles/theme';
import DailyLogMemo from './dailyLogMemo';

interface DailyLogProps {
  date: string;
}

function DailyLog({ date }: DailyLogProps) {
  // isLoding이면 data: undefined임
  const { data, isLoading } = useGetDailyLogByDocIdQuery({
    docId: date,
  });

  const handleClickAdd = () => {
    //TODO: 운동 추가
  };

  return (
    <Box>
      {/* dailyLog memo */}
      {!isLoading && <DailyLogMemo date={date} initMemo={data?.memo} />}

      {/* workoutLogs */}
      {!isLoading &&
        (data?.workoutLogs ? (
          <Box>
            <WorkoutLogs date={date} workoutLogs={data.workoutLogs} />
          </Box>
        ) : (
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
        ))}

      {/* 운동 추가 버튼 */}
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
