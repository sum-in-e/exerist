import { Box, Typography } from '@mui/material';
import { WorkoutLog } from '@common/types/workoutLogType';
import WorkoutLogItem from './WorkoutLogItem';

interface WorkoutLogsProps {
  date: string;
  workoutLogs: WorkoutLog[];
}

function WorkoutLogs({ date, workoutLogs }: WorkoutLogsProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {workoutLogs.map((log) => (
        <WorkoutLogItem
          date={date}
          workoutLogs={workoutLogs}
          workoutLog={log}
          key={`${log.id}_${log.name}`}
        />
      ))}
    </Box>
  );
}

export default WorkoutLogs;
