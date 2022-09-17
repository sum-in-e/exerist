import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import SignFormGroup from '@specifics/auth/components/SignFormGroup';
import SignTitle from '@specifics/auth/components/SignTitle';
import SignSwitchGroup from '@specifics/auth/components/SignSwitchGroup';

function SignIn() {
  const handleSubmitForm = (email: string, password: string) => {
    // TODO: 로그인 처리
    console.log('email:', email, 'password:', password);
  };

  return (
    <Box>
      <SignTitle />
      <SignFormGroup handleSubmitForm={handleSubmitForm} buttonText="로그인" />
      <SignSwitchGroup
        guideText="보유한 계정이 없으신가요?"
        buttonText="회원가입"
        href="/signUp"
      />
    </Box>
  );
}

export default SignIn;
