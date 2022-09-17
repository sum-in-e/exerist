import GlobalLayout from '@common/bridges/GlobalLayout';
import SignIn from '@specifics/auth/bridges/SignIn';

function SignInPage() {
  return (
    <GlobalLayout>
      <SignIn />
    </GlobalLayout>
  );
}

export default SignInPage;
