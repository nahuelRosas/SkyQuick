import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSetRecoilState } from "recoil";

import { sessionAtom } from "./atomsAuth/sessionAtom";
import { auth, firestore } from "../../firebase/clientApp";
import Spinner from "./components/spinner";

type AuthRootProps = {
  children: React.ReactNode;
};

const AuthRoot: React.FC<AuthRootProps> = (props: AuthRootProps) => {
  const [AuthState, loadingState] = useAuthState(auth);
  const setSession = useSetRecoilState(sessionAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const recoverRef = () => {
    if (AuthState && AuthState.uid)
      return doc(firestore, "users", AuthState.uid);
    return null;
  };
  const [userData, loadingData] = useDocumentData(recoverRef());

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
      if (userData && !loadingData) {
        setLoading(false);
        setSession({
          user: {
            uid: AuthState.uid,
            email: AuthState.email,
            displayName: AuthState.displayName,
            photoURL: userData.photoURL,
            emailVerified: AuthState.emailVerified,
            createdAt: userData.createdAt,
            providerData: AuthState.providerData,
            updatedAt: userData.updatedAt,
          },
        });
      }
    }
  }, [AuthState, router.pathname, loadingState, userData, loadingData]);

  if (loading) {
    return <Spinner />;
  }
  return <>{props.children}</>;
};
export default AuthRoot;
