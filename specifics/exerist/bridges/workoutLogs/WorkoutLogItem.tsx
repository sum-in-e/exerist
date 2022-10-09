import { ChangeEvent, MouseEvent, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { colorTheme } from '@styles/theme';
import { WorkoutLog } from '@common/types/workoutLogType';
import { useUpdateWorkoutLogsByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useUpdateWorkoutLogsByDocIdMutation';
import { useGetDailyLogByDocIdQuery } from '@specifics/exerist/modules/apiHooks/useGetDailyLogByDocIdQuery';
import SaveAndCancelButtonGroup from '@specifics/exerist/components/SaveAndCancelButtonGroup';
import { useDeleteWorkoutLogsByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useDeleteWorkoutLogsByDocIdMutation';
import SetWorkoutDialog from '../SetWorkoutDialog';

interface WorkoutLogItemProps {
  date: string;
  workoutLogs: WorkoutLog[];
  workoutLog: WorkoutLog;
}

function WorkoutLogItem({
  date,
  workoutLogs,
  workoutLog,
}: WorkoutLogItemProps) {
  const { id, group, name, memo } = workoutLog;
  const [isEditable, setIsEditable] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currentMemo, setCurrentMemo] = useState(memo);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const { refetch } = useGetDailyLogByDocIdQuery(
    {
      docId: date,
    },
    { enabled: false }
  );

  const { mutate: updateWorkoutLogsMutate } =
    useUpdateWorkoutLogsByDocIdMutation();

  const { mutate: deleteWorkoutLogsMutate } =
    useDeleteWorkoutLogsByDocIdMutation();

  const handleDeleteWorkout = () => {
    const copiedWorkoutLogs = [...workoutLogs];
    const seletedLogIndex = copiedWorkoutLogs.findIndex((log) => log.id === id);

    copiedWorkoutLogs.splice(seletedLogIndex, 1);

    deleteWorkoutLogsMutate(
      {
        docId: date,
        workoutLogsData: copiedWorkoutLogs,
      },
      {
        onSuccess: () => {
          alert('삭제되었습니다.');
          refetch();
        },
      }
    );
  };

  const handleUpdateMemo = () => {
    const copiedWorkoutLogs = [...workoutLogs];
    const modifiedLogIndex = copiedWorkoutLogs.findIndex(
      (log) => log.id === id
    );

    // TODO: modifiedLogIndex가 예외상황으로 없다거나 할 경우에 대한 처리는 안 해놨네.. 해야겠다; 무조건 있다고 가정하고 해버림. 다른곳도 검토
    copiedWorkoutLogs.splice(modifiedLogIndex, 1, {
      id,
      group,
      name,
      memo: currentMemo,
    });

    updateWorkoutLogsMutate(
      {
        docId: date,
        workoutLogsData: copiedWorkoutLogs,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setIsEditable(true);
    handleCloseMenu();
  };

  const handleClickChangeWorkout = () => {
    setIsOpenDialog(true);
    handleCloseMenu();
  };

  const handleClickDelete = () => {
    if (window.confirm('해당 기록을 삭제하시겠습니까?')) {
      handleDeleteWorkout();
    }
    handleCloseMenu();
  };

  const handleClickSave = () => {
    if (memo !== currentMemo) {
      handleUpdateMemo();
    }

    setIsEditable(false);
  };

  const handleClickCancel = () => {
    setIsEditable(false);
    setCurrentMemo(memo);
  };

  const handleChangeMemo = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMemo(event.target.value);
  };

  return (
    <Card
      sx={{
        width: '100%',
        background: colorTheme.white,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <CardContent>
        <Box mb={2} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="caption" color={colorTheme.main}>
              {group}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color={colorTheme.main}>
              {`${name}`}
            </Typography>
          </Box>
          <Box>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClickMenu}
              style={{ padding: 0 }}
            >
              <MoreVertIcon fontSize="small" style={{ color: 'grey' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              open={open}
              onClose={handleCloseMenu}
              id="composition-menu"
              aria-labelledby="composition-button"
              PaperProps={{
                style: {
                  width: '100px',
                },
              }}
            >
              <MenuItem onClick={handleClickEdit}>수정</MenuItem>
              <MenuItem onClick={handleClickChangeWorkout}>종목 변경</MenuItem>
              <MenuItem onClick={handleClickDelete}>삭제</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box>
          {isEditable ? (
            <TextareaAutosize
              minRows={4}
              maxRows={6}
              aria-label="maximum height"
              placeholder="내용을 입력해 주세요."
              value={currentMemo}
              onChange={handleChangeMemo}
              style={{ width: '100%', fontSize: '16px' }}
            />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              whiteSpace="pre-wrap"
              style={{ wordBreak: 'break-all' }}
            >
              {currentMemo}
            </Typography>
          )}
        </Box>
      </CardContent>

      {isEditable && (
        <CardActions style={{ padding: '0 16px 16px 16px' }}>
          <SaveAndCancelButtonGroup
            handleClickSave={handleClickSave}
            handleClickCancel={handleClickCancel}
          />
        </CardActions>
      )}

      {/* 운동 종목 변경 다이얼로그 */}
      {isOpenDialog && (
        <SetWorkoutDialog
          type="changeWorkout"
          title="운동 변경"
          id={workoutLog.id}
          initMuscleGroup={workoutLog.group}
          initSelectedWorkout={workoutLog.name}
          isOpen={isOpenDialog}
          handleClose={handleCloseDialog}
          date={date}
          workoutLogs={workoutLogs}
        />
      )}
    </Card>
  );
}
export default WorkoutLogItem;
