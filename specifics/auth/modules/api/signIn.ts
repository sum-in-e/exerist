import { Auth, signInWithEmailAndPassword } from 'firebase/auth';

export interface SignInWithEmailParams {
  auth: Auth;
  email: string;
  password: string;
}

const signInWithEmail = ({ auth, email, password }: SignInWithEmailParams) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { signInWithEmail };
