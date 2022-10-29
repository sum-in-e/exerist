import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { colorTheme } from '@styles/theme';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import WorkoutLogs from '@specifics/exerist/bridges/workoutLogs';
import SetWorkoutDialog from '@specifics/exerist/bridges/SetWorkoutDialog';
import MuscleLog from '@specifics/exerist/bridges/MuscleLog';
import DailyMemo from '@specifics/exerist/bridges/DailyMemo';

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
      {/* muscleLog */}
      <MuscleLog date={date} />

      {/* dailyLog memo */}
      {<DailyMemo date={date} />}

      {/* workoutLogs */}
      {!isLoading &&
        (data?.workoutLogs && data?.workoutLogs.length !== 0 ? (
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
      {isOpen && (
        <SetWorkoutDialog
          type="createWorkout"
          title="운동 추가"
          isOpen={isOpen}
          handleClose={handleCloseDialog}
          date={date}
          workoutLogs={data?.workoutLogs || []}
        />
      )}
    </Box>
  );
}

export default DailyLog;
