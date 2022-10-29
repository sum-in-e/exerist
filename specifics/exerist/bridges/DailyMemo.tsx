import { Box, TextareaAutosize, Typography, Divider } from '@mui/material';
import { colorTheme } from '@styles/theme';
import { ChangeEvent, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveAndCancelButtonGroup from '@specifics/exerist/components/SaveAndCancelButtonGroup';
import { useSetDailyMemoByDocIdMutation } from '@common/modules/apiHooks/useSetDailyMemoByDocIdMutation';
import { useGetDailyMemoByDocIdQuery } from '@common/modules/apiHooks/useGetDailyMemoByDocIdQuery';

interface DailyMemoProps {
  date: string;
}

function DailyMemo({ date }: DailyMemoProps) {
  const { data, refetch } = useGetDailyMemoByDocIdQuery({
    docId: date,
  });

  const { mutate } = useSetDailyMemoByDocIdMutation();

  const [memo, setMemo] = useState(data?.memo || '');
  const [isEditable, setIsEditable] = useState(false);

  const handleChangeMemo = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleClickEdit = () => {
    setIsEditable(true);
  };

  const handleUpdateMemo = () => {
    mutate(
      { docId: date, memo },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleClickSave = () => {
    if (data?.memo !== memo) {
      handleUpdateMemo();
    }
    setIsEditable(false);
  };

  const handleClickCancel = () => {
    setMemo(data?.memo);
    setIsEditable(false);
  };

  useEffect(() => {
    setMemo(data?.memo);
  }, [data]);

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
          <TextareaAutosize
            minRows={4}
            maxRows={6}
            aria-label="maximum height"
            placeholder="내용을 입력해 주세요."
            value={memo}
            onChange={handleChangeMemo}
            style={{ width: '100%', marginBottom: '16px', fontSize: '16px' }}
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

export default DailyMemo;
