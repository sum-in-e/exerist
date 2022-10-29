import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { MUSCLE_GROUPS } from '@common/constants/muscleGroups';
import { MuscleGroups, WorkoutLog } from '@common/types/workoutLogType';
import { workoutListAll } from '@common/constants/workout';
import SaveAndCancelButtonGroup from '@specifics/exerist/components/SaveAndCancelButtonGroup';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import { useCreateWorkoutLogsByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useCreateWorkoutLogsByDocIdMutation';
import { useUpdateWorkoutLogsByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useUpdateWorkoutLogsByDocIdMutation';
import { WorkoutListAll } from '@common/types/workoutType';

interface SetWorkoutDialogProps {
  title: string;
  type: 'createWorkout' | 'changeWorkout';
  id?: string;
  initMuscleGroup?: MuscleGroups;
  initSelectedWorkout?: WorkoutListAll;
  isOpen: boolean;
  handleClose: () => void;
  date: string;
  workoutLogs: WorkoutLog[];
}

function SetWorkoutDialog({
  title,
  type,
  id,
  initMuscleGroup,
  initSelectedWorkout,
  isOpen,
  handleClose,
  date,
  workoutLogs,
}: SetWorkoutDialogProps) {
  // 여기서 id, group, name 최종 관리 해야 함. 그래야 액션으로 저장 간,ㅇ

  const { refetch: refetchDailyLog } = useGetDailyLogByDocIdQuery(
    {
      docId: date,
    },
    { enabled: false }
  );

  const { mutate: createWorkoutLogsMutate } =
    useCreateWorkoutLogsByDocIdMutation();

  const { mutate: updateWorkoutLogsMutate } =
    useUpdateWorkoutLogsByDocIdMutation();

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroups>(
    initMuscleGroup || MUSCLE_GROUPS[0]
  );

  const workoutListByMuscleGroup = [
    ...workoutListAll[selectedMuscleGroup],
  ].sort();

  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutListAll>(
    initSelectedWorkout || workoutListByMuscleGroup[0]
  );

  const handleChangeMuscleGroup = (event: SelectChangeEvent<MuscleGroups>) => {
    const newWorkoutListByMuscleGroup = [
      ...workoutListAll[event.target.value as MuscleGroups],
    ].sort();

    setSelectedMuscleGroup(event.target.value as MuscleGroups);
    setSelectedWorkout(newWorkoutListByMuscleGroup[0]);
  };

  const handleChangeWorkout = (event: SelectChangeEvent<WorkoutListAll>) => {
    setSelectedWorkout(event.target.value as WorkoutListAll);
  };

  const handleCreate = () => {
    const newWorkoutLog = {
      id: `${dayjs()}_${uuid()}`,
      group: selectedMuscleGroup,
      name: selectedWorkout,
      memo: '',
    };

    const copiedWorkoutLogs = [...workoutLogs];
    copiedWorkoutLogs.push(newWorkoutLog);

    createWorkoutLogsMutate(
      { docId: date, workoutLogsData: copiedWorkoutLogs },
      {
        onSuccess: () => {
          refetchDailyLog();
          handleClose();
        },
      }
    );
  };

  const handleUpdate = () => {
    const copiedWorkoutLogs = [...workoutLogs];
    const modifiedLogIndex = copiedWorkoutLogs.findIndex(
      (log) => log.id === id
    );
    if (modifiedLogIndex !== -1) {
      const { id, group, name, memo } = copiedWorkoutLogs[modifiedLogIndex];

      if (group !== selectedMuscleGroup || name !== selectedWorkout) {
        copiedWorkoutLogs.splice(modifiedLogIndex, 1, {
          id,
          group: selectedMuscleGroup,
          name: selectedWorkout,
          memo,
        });

        updateWorkoutLogsMutate(
          {
            docId: date,
            workoutLogsData: copiedWorkoutLogs,
          },
          {
            onSuccess: () => {
              refetchDailyLog();
              handleClose();
            },
          }
        );
      }
    } else {
      alert('수정하고자하는 운동을 찾지 못 했습니다.');
      handleClose();
    }
  };

  const handleClickSave = () => {
    if (type === 'createWorkout') {
      handleCreate();
    }
    if (type === 'changeWorkout') {
      handleUpdate();
    }
  };

  const handleClickCancel = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <Box p="20px 24px 0 24px" textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          {title}
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
              {MUSCLE_GROUPS.map((group, index) => (
                <MenuItem key={`${group}_${index}`} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Workout Select */}
        <Box mb={1} display="flex" alignItems="center" gap={1}>
          <Box width="15%">
            <Typography variant="body2" fontWeight="bold">
              종목
            </Typography>
          </Box>
          <Box width="80%">
            <Select
              value={selectedWorkout}
              onChange={handleChangeWorkout}
              size="small"
              fullWidth
              sx={{ maxWidth: '100%' }}
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

      {/* Dialog Actions */}
      <Box p="0 24px 20px 24px" width="100%">
        <SaveAndCancelButtonGroup
          handleClickSave={handleClickSave}
          handleClickCancel={handleClickCancel}
        />
      </Box>
    </Dialog>
  );
}

export default SetWorkoutDialog;
