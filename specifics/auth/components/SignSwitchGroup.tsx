import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { colorTheme } from '@styles/theme';

interface SignSwitchGroupProps {
  guideText: string;
  buttonText: string;
  href: string;
}

function SignSwitchGroup({
  guideText,
  buttonText,
  href,
}: SignSwitchGroupProps) {
  return (
    <Box
      mt={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Typography color={colorTheme.main} variant="caption">
        {guideText}
      </Typography>
      <Link href={href}>
        <Typography
          variant="caption"
          color={colorTheme.main}
          fontWeight="bold"
          style={{ cursor: 'pointer' }}
        >
          {buttonText}
        </Typography>
      </Link>
    </Box>
  );
}

export default SignSwitchGroup;
