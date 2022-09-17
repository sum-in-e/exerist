import GlobalLayout from '@common/bridges/GlobalLayout';
import SignUp from '@specifics/auth/bridges/SignUp';

function SignUpPage() {
  return (
    <GlobalLayout>
      <SignUp />
    </GlobalLayout>
  );
}

export default SignUpPage;
