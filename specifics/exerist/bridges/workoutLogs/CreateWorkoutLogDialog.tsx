import { muscleGroups } from '@common/constants/exerist';
import { MuscleGroups } from '@common/types/workoutLogType';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import SaveAndCancelButtonGroup from '@specifics/exerist/components/SaveAndCancelButtonGroup';
import { useState } from 'react';

interface CreateWorkoutLogDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateWorkoutLogDialog({
  isOpen,
  handleClose,
}: CreateWorkoutLogDialogProps) {
  const [muscleGruop, setMuscleGroup] = useState<MuscleGroups>('Chest');

  const handleClickAdd = () => {
    // 추가 시 액션
    // 추가 onSuccess 시 닫기
    // handleClose();
  };

  const handleClickCancel = () => {
    handleClose();
  };

  const handleChangeMuscleGroup = (event: SelectChangeEvent<MuscleGroups>) => {
    setMuscleGroup(event.target.value as MuscleGroups);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <Box p={2} textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          운동 추가
        </Typography>
      </Box>
      <DialogContent>
        <Select
          value={muscleGruop}
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
        {/* <Select></Select> */}
      </DialogContent>
      <DialogActions>
        <SaveAndCancelButtonGroup
          handleClickSave={handleClickAdd}
          handleClickCancel={handleClickCancel}
        />
      </DialogActions>
    </Dialog>
  );
}

export default CreateWorkoutLogDialog;
