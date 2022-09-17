import Link from 'next/link';
import { Box, Typography } from '@mui/material';

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
      <Typography color="#3b9ae1" variant="caption">
        {guideText}
      </Typography>
      <Link href={href}>
        <Typography
          variant="caption"
          color="#3b9ae1"
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
