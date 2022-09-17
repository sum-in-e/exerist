import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import {
  signInWithEmail,
  SignInWithEmailParams,
} from '@specifics/auth/modules/api/signIn';

export const useSignInWithEmailMutation = (): UseMutationResult<
  UserCredential,
  FirebaseError,
  SignInWithEmailParams
> => {
  return useMutation(signInWithEmail);
};
