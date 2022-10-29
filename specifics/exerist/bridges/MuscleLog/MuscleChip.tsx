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

  return (
    <Chip
      onClick={handleClick}
      label={muscleGroup}
      sx={{
        backgroundColor: isIncluded
          ? colorTheme.signature
          : colorTheme.secondary,
        color: isIncluded ? colorTheme.white : colorTheme.main,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: isIncluded
            ? colorTheme.signature
            : colorTheme.secondary,
        },
      }}
    />
  );
}

export default MuscleChip;
