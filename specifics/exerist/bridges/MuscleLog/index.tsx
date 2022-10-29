import { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { MuscleGroups } from '@common/types/workoutLogType';
import { MUSCLE_GROUPS_FOR_MUSCLE_LOG } from '@common/constants/muscleGroups';
import { useGetMuscleLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetMuscleLogByDocIdQuery';
import { useSetMuscleLogByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useSetMuscleLogByDocIdMutation';
import MuscleChip from '@specifics/exerist/bridges/MuscleLog/MuscleChip';

interface MuscleLogProps {
  date: string;
}

function MuscleLog({ date }: MuscleLogProps) {
  const { data, isLoading, refetch } = useGetMuscleLogByDocIdQuery({
    docId: date,
  });
  const muscleLog = data?.muscleLog || [];

  const [selectedGroups, setSelectedGroups] = useState<MuscleGroups[] | []>(
    muscleLog
  );

  const { mutate } = useSetMuscleLogByDocIdMutation();

  const handleClickMuscleGroup = (selectedMuscle: MuscleGroups) => {
    const newSelectedGroups = [...selectedGroups];

    if (selectedGroups.includes(selectedMuscle as never)) {
      // 선택한 근육군이 선택한 근육군 리스트에 이미 존재하는 경우 -> 리스트에서 제거
      const selectedIndex = newSelectedGroups.findIndex(
        (muscleGroup) => muscleGroup === selectedMuscle
      );
      newSelectedGroups.splice(selectedIndex, 1);
    } else {
      // 선택한 근육군이 선택한 근육군 리스트에 존재하지 않는 경우 -> 리스트에 추가
      newSelectedGroups.push(selectedMuscle);
    }

    mutate(
      {
        docId: date,
        muscleLogData: newSelectedGroups,
      },
      {
        onSuccess: () => {
          refetch();
          setSelectedGroups(newSelectedGroups);
        },
      }
    );
  };

  useEffect(() => {
    if (!isLoading) {
      setSelectedGroups(muscleLog);
    }
  }, [date, isLoading, setSelectedGroups]);

  return (
    <Box
      p="16px"
      mb="16px"
      borderRadius="5px"
      sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
    >
      {isLoading ? (
        <Skeleton width="100%" height="50px" />
      ) : (
        <Box>
          <Typography fontWeight="bold">오늘의 운동 부위</Typography>
          <Box
            display="flex"
            overflow="scroll"
            gap={1}
            mt={1}
            sx={{
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {MUSCLE_GROUPS_FOR_MUSCLE_LOG.map((muscleGroup) => {
              return (
                <MuscleChip
                  muscleGroup={muscleGroup}
                  isIncluded={selectedGroups.includes(muscleGroup as never)}
                  handleClickMuscleGroup={handleClickMuscleGroup}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MuscleLog;
