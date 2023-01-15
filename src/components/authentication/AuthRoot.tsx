import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useSetRecoilState } from "recoil";

import { auth, firestore } from "../../firebase/clientApp";
import { sessionAtom } from "./atomsAuth/sessionAtom";
import Spinner from "./components/spinner";

type AuthRootProps = {
  children: React.ReactNode;
};

const AuthRoot: React.FC<AuthRootProps> = (props: AuthRootProps) => {
  const [AuthState, loadingState] = useAuthState(auth);
  const setSession = useSetRecoilState(sessionAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const recoverRefUser = () => {
    if (AuthState && AuthState.uid)
      return doc(firestore, "users", AuthState.uid);

    return null;
  };
  const [userData, loadingData] = useDocumentData(recoverRefUser());
  const recoverRefFollowing = () => {
    if (AuthState && AuthState.uid)
      return collection(firestore, "users", AuthState.uid, "following");
    return null;
  };
  const [followingData, loadingFollowingData] = useCollectionData(
    recoverRefFollowing()
  );

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
      if (userData && !loadingData && !loadingFollowingData) {
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
            following: followingData,
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
