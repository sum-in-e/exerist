import { Box } from '@mui/material';
import SignFormGroup from '@specifics/auth/components/SignFormGroup';
import SignTitle from '@specifics/auth/components/SignTitle';
import SignSwitchGroup from '@specifics/auth/components/SignSwitchGroup';
import { useSignInWithEmailMutation } from '@specifics/auth/modules/apiHooks/useSignInWithEmailMutation';
import { firebaseAuth } from '@firebase';
import { useRouter } from 'next/router';

function SignIn() {
  const router = useRouter();

  const { mutate } = useSignInWithEmailMutation();

  const handleSubmitForm = (email: string, password: string) => {
    mutate(
      { auth: firebaseAuth, email, password },
      {
        onSuccess: () => {
          router.push('/exerist');
        },
        onError: (error) => {
          const errorCode = error.code;

          if (errorCode === 'auth/user-not-found') {
            alert('존재하지 않는 이메일 입니다.');
          }
          if (errorCode === 'auth/wrong-password') {
            alert('올바른 비밀번호를 입력해 주세요.');
          }
          if (errorCode === 'auth/invalid-email') {
            alert('잘못된 이메일 형식입니다.');
          }
        },
      }
    );
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
