import { MuscleGroups } from '@common/types/workoutLogType';
import { Chip } from '@mui/material';
import { colorTheme } from '@styles/theme';

interface MuscleChipProps {
  muscleGroup: MuscleGroups;
  isIncluded: boolean;
  handleClickMuscleGroup: (selectedMuscle: MuscleGroups) => void;
}

function MuscleChip({
  muscleGroup,
  isIncluded,
  handleClickMuscleGroup,
}: MuscleChipProps) {
  const handleClick = () => {
    handleClickMuscleGroup(muscleGroup);
  };

  const bgColor = isIncluded ? colorTheme.signature : colorTheme.secondary;

  return (
    <Chip
      onClick={handleClick}
      label={muscleGroup}
      sx={{
        backgroundColor: bgColor,
        color: isIncluded ? colorTheme.white : colorTheme.main,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: bgColor,
        },
      }}
    />
  );
}

export default MuscleChip;
