import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/clientApp';
import Spinner from '../spinner';

type AuthRootProps = {
  children: React.ReactNode;
};

const AuthRoot: React.FC<AuthRootProps> = (props: AuthRootProps) => {
  const [AuthState, loadingState] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!AuthState && router.pathname !== "/authenticate" && !loadingState) {
      router.push("/authenticate");
    } else if (
      AuthState &&
      router.pathname === "/authenticate" &&
      !loadingState
    ) {
      router.push("/");
    } else if (
      !AuthState &&
      router.pathname === "/authenticate" &&
      !loadingState
    ) {
      setLoading(false);
    } else if (
      AuthState &&
      router.pathname !== "/authenticate" &&
      !loadingState
    ) {
      setLoading(false);
    }
  }, [AuthState, router.pathname, loadingState]);

  if (loading) {
    return <Spinner />;
  }
  return <>{props.children}</>;
};
export default AuthRoot;
