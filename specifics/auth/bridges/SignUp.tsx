import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import SignFormGroup from '@specifics/auth/components/SignFormGroup';
import SignTitle from '@specifics/auth/components/SignTitle';
import SignSwitchGroup from '@specifics/auth/components/SignSwitchGroup';

function SignUp() {
  const handleSubmitForm = (email: string, password: string) => {
    alert('회원가입을 지원하지 않습니다.');
  };

  return (
    <Box>
      <SignTitle />
      <SignFormGroup
        handleSubmitForm={handleSubmitForm}
        buttonText="회원가입"
      />
      <SignSwitchGroup
        guideText="보유한 계정이 이미 있으신가요?"
        buttonText="로그인"
        href="/signIn"
      />
    </Box>
  );
}

export default SignUp;
