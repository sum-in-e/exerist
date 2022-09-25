import {
  Box,
  TextareaAutosize,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { colorTheme } from '@styles/theme';
import { ChangeEvent, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveAndCancelButtonGroup from '@specifics/exerist/components/SaveAndCancelButtonGroup';
import { useUpdateDailyLogMemoByDocIdMutation } from '@specifics/exerist/modules/apiHooks/useUpdateDailyLogMemoByDocIdMutation';

interface DailyLogMemoProps {
  date: string;
  initMemo: string;
}

function DailyLogMemo({ date, initMemo }: DailyLogMemoProps) {
  const [memo, setMemo] = useState(initMemo);
  const [isEditable, setIsEditable] = useState(false);

  const { mutate } = useUpdateDailyLogMemoByDocIdMutation();

  const handleChangeMemo = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleClickEdit = () => {
    setIsEditable(true);
  };

  const handleUpdateMemo = () => {
    mutate({ docId: date, memo });
  };

  const handleClickSave = () => {
    if (initMemo !== memo) {
      handleUpdateMemo();
    }
    setIsEditable(false);
  };

  const handleClickCancel = () => {
    setMemo(initMemo);
    setIsEditable(false);
  };

  return (
    <Box
      style={{ background: colorTheme.secondary }}
      borderRadius="5px"
      p={2}
      mb={2}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold" style={{ color: colorTheme.main }}>
          오늘의 메모
        </Typography>
        <EditIcon
          onClick={handleClickEdit}
          fontSize="small"
          style={{ color: colorTheme.main }}
        />
      </Box>
      <Divider style={{ margin: '10px 0 15px 0' }} />
      {isEditable ? (
        <Box>
          {/* TODO: TextArea를 여기랑 WorkoutLogItem에서 똑같이 쓰는데 이부분 공통화 가능 */}
          <TextareaAutosize
            minRows={4}
            maxRows={6}
            aria-label="maximum height"
            placeholder="내용을 입력해 주세요."
            value={memo}
            onChange={handleChangeMemo}
            style={{ width: '100%', marginBottom: '16px' }}
          />
          <SaveAndCancelButtonGroup
            handleClickSave={handleClickSave}
            handleClickCancel={handleClickCancel}
          />
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          whiteSpace="pre-wrap"
          style={{ wordBreak: 'break-all' }}
        >
          {memo}
        </Typography>
      )}
    </Box>
  );
}

export default DailyLogMemo;
