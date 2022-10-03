import { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { muscleGroups } from '@common/constants/exerist';
import { MuscleGroups, WorkoutLog } from '@common/types/workoutLogType';
import { workoutListAll } from '@common/constants/workout';
import SaveAndCancelButtonGroup from '@specifics/exerist/components/SaveAndCancelButtonGroup';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import { useCreateWorkoutLogsByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useCreateWorkoutLogsByDocIdMutation copy';

interface CreateWorkoutLogDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  date: string;
  workoutLogs: WorkoutLog[];
}

function CreateWorkoutLogDialog({
  isOpen,
  handleClose,
  date,
  workoutLogs,
}: CreateWorkoutLogDialogProps) {
  // 여기서 id, group, name 최종 관리 해야 함. 그래야 액션으로 저장 간,ㅇ

  const { refetch: refetchDailyLog } = useGetDailyLogByDocIdQuery(
    {
      docId: date,
    },
    { enabled: false }
  );

  const { mutate } = useCreateWorkoutLogsByDocIdMutation();

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroups>(
    muscleGroups[0]
  );

  const workoutListByMuscleGroup = workoutListAll[selectedMuscleGroup];

  const [selectedWorkout, setSelectedWorkout] = useState(
    workoutListByMuscleGroup[0]
  );

  const handleChangeMuscleGroup = (event: SelectChangeEvent<MuscleGroups>) => {
    setSelectedMuscleGroup(event.target.value as MuscleGroups);
  };

  // TODO: workoutListAll 타입 정의하면 여기 타입도 수정
  const handleChangeWorkout = (event: SelectChangeEvent<string>) => {
    setSelectedWorkout(event.target.value);
  };

  const handleClickAdd = () => {
    const newWorkoutLog = {
      id: `${dayjs()}_${uuid()}`,
      group: selectedMuscleGroup,
      name: selectedWorkout,
      memo: '',
    };

    const copiedWorkoutLogs = [...workoutLogs];
    copiedWorkoutLogs.push(newWorkoutLog);

    mutate(
      { docId: date, workoutLogsData: copiedWorkoutLogs },
      {
        onSuccess: () => {
          refetchDailyLog();
          handleClose();
        },
      }
    );
  };

  const handleClickCancel = () => {
    handleClose();
  };

  useEffect(() => {
    setSelectedWorkout(workoutListByMuscleGroup[0]);
  }, [workoutListByMuscleGroup]);

  return (
    <Dialog open={isOpen} fullWidth>
      <Box p="20px 24px 0 24px" textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          운동 추가
        </Typography>
      </Box>
      <DialogContent>
        {/* MuscleGroup Select */}
        <Box mb={1} display="flex" alignItems="center" gap={1}>
          <Box width="15%">
            <Typography variant="body2" fontWeight="bold">
              근육군
            </Typography>
          </Box>
          <Box width="85%">
            <Select
              value={selectedMuscleGroup}
              onChange={handleChangeMuscleGroup}
              fullWidth
              size="small"
            >
              {muscleGroups.map((group, index) => (
                <MenuItem key={`${group}_${index}`} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Workout Select */}
        {/* TODO: Select Items가 select 아래로 위치하도록 하기 */}
        <Box mb={1} display="flex" alignItems="center" gap={1}>
          <Box width="15%">
            <Typography variant="body2" fontWeight="bold">
              종목
            </Typography>
          </Box>
          <Box width="85%">
            <Select
              value={selectedWorkout}
              onChange={handleChangeWorkout}
              fullWidth
              size="small"
            >
              {workoutListByMuscleGroup.map((workout: any, index: any) => (
                <MenuItem key={`${workout}_${index}`} value={workout}>
                  {workout}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </DialogContent>

      <Box p="0 24px 20px 24px" width="100%">
        <SaveAndCancelButtonGroup
          handleClickSave={handleClickAdd}
          handleClickCancel={handleClickCancel}
        />
      </Box>
    </Dialog>
  );
}

export default CreateWorkoutLogDialog;
