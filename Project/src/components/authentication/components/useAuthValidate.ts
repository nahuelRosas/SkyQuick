import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import {
  emailRegex,
  lowerCaseRegex,
  minLengthRegex,
  numberRegex,
  specialCharRegex,
  upperCaseRegex,
} from "../../../utils/regex";
import { authModalAtom } from "../../../atoms/authModalAtom";
import { sessionAtom } from "../../../atoms/sessionAtom";

export const useAuthValidate = (
  type?: "sign" | "create" | "resetPassword" | "AuthButtons"
) => {
  const toast = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const setSessionState = useSetRecoilState(sessionAtom);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //!---------------- REACT FIREBASE HOOKS ----------------//
  const [functionSign, userSign, loadingSign, errorSign] =
    useSignInWithEmailAndPassword(auth);
  const [functionCreate, userCreate, loadingCreate, errorCreate] =
    useCreateUserWithEmailAndPassword(auth);
  const [functionResetPassword, loadingResetPassword, errorResetPassword] =
    useSendPasswordResetEmail(auth);
  const [functionEmailVerification] = useSendEmailVerification(auth);
  const [functionSignOut] = useSignOut(auth);
  const [
    functionSignGoogle,
    userSignGoogle,
    loadingSignGoogle,
    errorSignGoogle,
  ] = useSignInWithGoogle(auth);
  //!---------------- CHANGE MODAL STATE ----------------//
  const changeModalState = (subType: "login" | "signUp" | "resetPassword") => {
    setAuthModalState((prevState) => ({ ...prevState, type: subType }));
  };
  //!---------------- CHANGE FORM USERDATA ----------------//
  const onChangeShow = (type: "password" | "confirmPassword") => {
    if (type === "password") {
      setShowPassword((prevState) => !prevState);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };
  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  //!---------------- VALIDATE FORM ----------------//
  const [errorState, setErrorState] = useState({
    email: "",
    password: {
      lowerCase: {
        status: false,
        title: "At least one lowercase letter",
      },
      upperCase: {
        status: false,
        title: "At least one uppercase letter",
      },
      number: {
        status: false,
        title: "At least one number",
      },
      specialChar: {
        status: false,
        title: "At least one special character",
      },
      length: {
        status: false,
        title: "At least 8 characters",
      },
    },
    confirmPassword: "",
    otherErrors: "",
  });
  const SetError = ({
    type,
    error,
    withOutPreset,
    blank,
    key,
    boolean,
  }: {
    type: "email" | "password" | "confirmPassword" | "otherErrors";
    error?: string;
    withOutPreset?: true;
    blank?: true;
    key?: "number" | "lowerCase" | "upperCase" | "specialChar" | "length";
    boolean?: boolean;
  }) => {
    const Error = withOutPreset
      ? error
      : blank
      ? ""
      : `${error}, wait 5 seconds and try again.`;
    if (key && boolean !== undefined) {
      setErrorState((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          [key]: {
            ...prevState.password[key],
            status: boolean,
          },
        },
      }));
      return;
    }
    setErrorState((prevState) => ({
      ...prevState,
      [type]: Error,
    }));
  };
  const ValidateEmail = useCallback(() => {
    if (!emailRegex.test(form.email) && form.email.length > 0) {
      SetError({
        type: "email",
        error: "Email is not valid format",
        withOutPreset: true,
      });

      return;
    } else if (form.email.length === 0 && form.password.length > 0) {
      SetError({
        type: "email",
        error: "Email is required",
        withOutPreset: true,
      });
      return;
    } else {
      SetError({ type: "email", blank: true });
    }
  }, [form.email, form.password]);
  const ValidatePassword = useCallback(() => {
    if (type === "resetPassword") return;
    if (form.password.length > 0) {
      if (!lowerCaseRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "lowerCase",
          boolean: false,
        });
      } else if (lowerCaseRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "lowerCase",
          boolean: true,
        });
      }
      if (!minLengthRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "length",
          boolean: false,
        });
      } else if (minLengthRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "length",
          boolean: true,
        });
      }
      if (!numberRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "number",
          boolean: false,
        });
      } else if (numberRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "number",
          boolean: true,
        });
      }
      if (!specialCharRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "specialChar",
          boolean: false,
        });
      } else if (specialCharRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "specialChar",
          boolean: true,
        });
      }
      if (!upperCaseRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "upperCase",
          boolean: false,
        });
      } else if (upperCaseRegex.test(form.password)) {
        SetError({
          type: "password",
          key: "upperCase",
          boolean: true,
        });
      }
    }
  }, [form.password, form.email]);
  const ValidateConfirmPassword = useCallback(() => {
    if (type === "resetPassword" || type === "sign") return;

    if (
      form.confirmPassword !== form.password &&
      (form.password.length >= 0 || form.confirmPassword.length >= 0)
    ) {
      SetError({
        type: "confirmPassword",
        error: "Passwords do not match",
        withOutPreset: true,
      });
      return;
    } else {
      SetError({ type: "confirmPassword", blank: true });
      return;
    }
  }, [form.confirmPassword, form.password]);
  const ValidateErrorFirebase = useCallback(() => {
    const Error =
      errorSign?.message ||
      errorCreate?.message ||
      errorResetPassword?.message ||
      "";
    if (Error.length > 0) {
      SetError({
        type: "otherErrors",
        error: FIREBASE_ERRORS[Error as keyof typeof FIREBASE_ERRORS],
      });
      toast({
        title: "Error",
        description: FIREBASE_ERRORS[Error as keyof typeof FIREBASE_ERRORS],
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        SetError({ type: "otherErrors", blank: true });
        if (errorSign?.message) errorSign.message = "";
        if (errorCreate?.message) errorCreate.message = "";
        if (errorResetPassword?.message) errorResetPassword.message = "";
      }, 5000);
    }
  }, [errorSign, errorCreate, errorResetPassword]);
  useEffect(() => {
    ValidateEmail();
    ValidatePassword();
    ValidateErrorFirebase();
    ValidateConfirmPassword();
  }, [
    form.email,
    form.password,
    form.confirmPassword,
    errorSign,
    errorCreate,
    errorResetPassword,
  ]);
  //!---------------- RETURN DATA ----------------//
  const returnShow = (
    type: "email" | "password" | "confirmPassword" | "otherErrors",
    button?: boolean
  ) => {
    if (type === "password") {
      if (button) return !showPassword;
      return showPassword;
    } else if (type === "confirmPassword") {
      if (button) return !showConfirmPassword;
      return showConfirmPassword;
    } else if (type === "email" || type === "otherErrors") {
      return true;
    }
  };
  const returnValueForm = (
    type: "email" | "password" | "confirmPassword" | "otherErrors"
  ) => {
    if (type === "otherErrors") return "Something went wrong";
    return form[type];
  };
  const returnErrorStateAsString = (
    type: "email" | "password" | "otherErrors" | "confirmPassword"
  ) => {
    return errorState[type];
  };
  const returnErrorStateAsBoolean = (
    type: "email" | "password" | "otherErrors" | "confirmPassword"
  ) => {
    return errorState[type].length > 0;
  };
  const returnStatusButton = () => {
    const Error = Object.values(errorState).filter((error) => error.length > 0);
    const ErrorPassword = Object.values(errorState.password).filter(
      (error) => error.status === false
    );
    if (ErrorPassword.length > 0 && type !== "resetPassword") {
      return true;
    }
    if (Error.length === 0 && form.email.length > 0) {
      return false;
    }
    return true;
  };
  const returnErrorBlocking = () => {
    if (errorState.otherErrors) return errorState.otherErrors.length > 0;
    return false;
  };
  const returnLoadingState = () => {
    if (type === "create") return loadingCreate;
    if (type === "resetPassword") return loadingResetPassword;
    if (type === "sign") return loadingSign;
  };

  //!---------------- SUBMIT FORM ----------------//
  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === "resetPassword")
      return await functionResetPassword(form.email)
        .then((res) => {
          if (res) {
            toast({
              title: "Email sent",
              status: "success",
              description: `
              Check your mail and follow the instructions to recover your password,
              you may need to check your spam folder`,
              duration: 15000,
              isClosable: true,
            });
            changeModalState("login");
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description:
              FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS],
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    if (type === "create")
      return await functionCreate(form.email, form.password).then(
        async (res) => {
          if (res) {
            changeModalState("login");
            await functionEmailVerification();
            toast({
              title: "Email sent",
              status: "success",
              description: `
          Check your mail and follow the instructions to verify your account,
          you may need to check your spam folder`,
              duration: 5000,
              isClosable: true,
            });
            await functionSignOut();
            return;
          }
        }
      );
    if (type === "sign")
      return await functionSign(form.email, form.password)
        .then(async (res) => {
          if (res && !res.user.emailVerified) {
            SetError({
              type: "otherErrors",
              error:
                "You must first verify your account. We sent you a new email",
              withOutPreset: true,
            });
            toast({
              title: "Error",
              description: "You need to verify your account first",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setTimeout(() => {
              SetError({ type: "otherErrors", blank: true });
            }, 5000);
            await functionEmailVerification();
            await functionSignOut();
            return;
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description:
              FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS],
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
  };

  //!---------------- SOCIAL MEDIA  ----------------//
  const returnErrorSocialMedia =
    (FIREBASE_ERRORS[
      errorSignGoogle?.message as keyof typeof FIREBASE_ERRORS
    ] as string) || "An error occurred";
  const SignWithGoogle = {
    onClick: () => {
      functionSignGoogle();
    },
    isLoading: () => {
      return loadingSignGoogle;
    },
    error: () => {
      return returnErrorSocialMedia;
    },
    errorBoolean: () => {
      return errorSignGoogle ? true : false;
    },
  };

  return {
    changeModalState,
    onChangeShow,
    onChangeForm,
    returnShow,
    returnValueForm,
    returnErrorStateAsString,
    returnErrorStateAsBoolean,
    returnStatusButton,
    returnErrorBlocking,
    returnLoadingState,
    onSubmitForm,
    SignWithGoogle,
  };
};
