import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@firebase';
import { useCallback } from 'react';

interface RouteGuardProps {
  children: JSX.Element;
}

/**
 * @TODO
 * 현재 원하는대로 동작은 하지만 로그인 안 된 상태에서 '/exerist'로 이동 시 잠깐 exerist가 보였다가 로그인 화면으로 보내지는 등 허술한 부분이 많이 있음.
 * 추후 V1 개발 끝나고 나서 인증 라우팅 관련해서 자료 리서치해서 제대로 개선하기. -> 블로깅
 */

const anyoneCannotAccessPath = '/'; // TODO: 추후 HOME 페이지 개발 시 해제
const userCannotAccessPath = ['/signIn', '/signUp']; // 로그인 필요 없는 페이지
const privatePath = ['/exerist']; // 로그인 필요한 페이지

function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();

  const routeGuarding = useCallback(() => {
    const currentPath = router.pathname;

    const isPrivatePath = privatePath.some(
      (path) => path === currentPath || currentPath.startsWith(path)
    );

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // 로그인 된 상태에서 HOME, 회원가입, 로그인 페이지 접근 시
        if (
          currentPath === anyoneCannotAccessPath ||
          userCannotAccessPath.includes(currentPath)
        ) {
          router.push('/exerist');
        }
      } else {
        // 로그인 안 된 상태에서 HOME, exerist 페이지 접근 시
        if (currentPath === anyoneCannotAccessPath || isPrivatePath) {
          router.push('/signIn');
        }
      }
    });
  }, [router]);

  routeGuarding();

  return children;
}

export default RouteGuard;
