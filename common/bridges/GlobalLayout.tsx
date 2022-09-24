import { Box } from '@mui/material';
import { colorTheme } from '@styles/theme';
import GlobalHeader from './GlobalHeader';

interface Props {
  children: JSX.Element;
  isShowHeader?: boolean;
}

function GlobalLayout({ children, isShowHeader = false }: Props) {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      style={{ backgroundColor: colorTheme.white }}
      minHeight="100vh"
    >
      <Box maxWidth="1440px" width="100%">
        {isShowHeader && <GlobalHeader />}
        <Box p={2}>
          <main>{children}</main>
        </Box>
      </Box>
    </Box>
  );
}

export default GlobalLayout;
