import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase/clientApp";
import Spinner from "./components/spinner";
import useRecoveryData from "../../hooks/useRecoveryData";

type AuthRootProps = {
  children: React.ReactNode;
};

const AuthRoot: React.FC<AuthRootProps> = (props: AuthRootProps) => {
  const [AuthState, loadingState] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { RootRecovery } = useRecoveryData();
  RootRecovery();

  useEffect(() => {
    if (!AuthState && router.pathname !== "/authenticate" && !loadingState) {
      router.push("/authenticate");
    } else if (
      AuthState &&
      router.pathname === "/authenticate" &&
      !loadingState
    ) {
      router.push("/");
    }

    setLoading(false);
  }, [AuthState, router, loadingState]);

  if (loading) {
    return <Spinner />;
  }
  return <>{props.children}</>;
};
export default AuthRoot;
