import { Box, Button, Typography } from '@mui/material';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import WorkoutLogs from '@specifics/exerist/bridges/workoutLogs';
import { colorTheme } from '@styles/theme';
import DailyLogMemo from './dailyLogMemo';
import CreateWorkoutLogDialog from '../workoutLogs/CreateWorkoutLogDialog';
import { useState } from 'react';

interface DailyLogProps {
  date: string;
}

function DailyLog({ date }: DailyLogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  // isLoding이면 data: undefined임
  const { data, isLoading } = useGetDailyLogByDocIdQuery({
    docId: date,
  });

  const handleClickAdd = () => {
    setIsOpen(true);
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

      {/* 운동 추가 다이얼로그 */}
      <CreateWorkoutLogDialog isOpen={isOpen} handleClose={handleCloseDialog} />
    </Box>
  );
}

export default DailyLog;
