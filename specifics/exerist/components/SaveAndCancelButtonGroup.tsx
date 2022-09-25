import { Box, Button } from '@mui/material';
import { colorTheme } from '@styles/theme';

interface SaveAndCancelButtonGroupProps {
  handleClickSave: () => void;
  handleClickCancel: () => void;
}

function SaveAndCancelButtonGroup({
  handleClickSave,
  handleClickCancel,
}: SaveAndCancelButtonGroupProps) {
  return (
    <Box display="flex" gap={1} width="100%">
      <Button
        size="small"
        variant="contained"
        style={{
          width: '50%',
          background: colorTheme.signature,
          fontWeight: 'bold',
        }}
        onClick={handleClickSave}
      >
        저장
      </Button>
      <Button
        size="small"
        variant="outlined"
        style={{
          width: '50%',
          color: colorTheme.signature,
          border: `${colorTheme.signature} 1px solid`,
          fontWeight: 'bold',
        }}
        onClick={handleClickCancel}
      >
        취소
      </Button>
    </Box>
  );
}

export default SaveAndCancelButtonGroup;
