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

  const { refetch } = useGetDailyLogByDocIdQuery(
    {
      docId: date,
    },
    { enabled: false }
  );

  const { mutate: updateWorkoutLogsMutate } =
    useUpdateWorkoutLogsByDocIdMutation();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setIsEditable(true);
    handleCloseMenu();
  };

  const handleClickDelete = () => {
    // TODO: confirm 받기
    // TODO: 삭제 mutation
    handleCloseMenu();
  };

  /**
   * @remarks 기존 workoutLogs에서 바뀐 부분을 교체하여 update하는 함수입니다.
   */
  const handleUpdateMemo = () => {
    const copiedWorkoutLogs = [...workoutLogs];
    const modifiedLogIndex = copiedWorkoutLogs.findIndex(
      (log) => log.id === id
    );

    copiedWorkoutLogs.splice(modifiedLogIndex, 1, {
      id,
      group,
      name,
      memo: currentMemo,
    });

    updateWorkoutLogsMutate({
      docId: date,
      workoutLogsData: copiedWorkoutLogs,
    });

    refetch();
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
              {name}
            </Typography>
          </Box>
          <Box>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
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
                  width: '80px',
                },
              }}
            >
              <MenuItem onClick={handleClickEdit}>수정</MenuItem>
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
              style={{ width: '100%' }}
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
    </Card>
  );
}
export default WorkoutLogItem;
