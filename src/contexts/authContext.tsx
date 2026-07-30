"use client";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { globalActions } from "../redux/services/global.slice";
import zeapApiSlice from "../redux/services/zeapApi.slice";
import { UserInterface } from "@/interface/interface";
import { firebase } from "@/authentication/firebase";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  passwordLogin: (
    email: string,
    password: string,
    callBack?: () => void,
    merge?: boolean,
  ) => void;
  loginWithGoogle: (callBack?: () => void) => Promise<void>;
  logout: () => void;
  user: UserInterface | null | undefined;
  isGuest: boolean;
  loginError: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<
    React.SetStateAction<UserInterface | null | undefined>
  >;
  resetPassword: (email: string) => void;
}>({
  isAuthenticated: false,
  passwordLogin: () => {},
  logout: () => {},
  user: null,
  isGuest: false,
  loginError: null,
  loading: false,
  setLoading: () => {},
  setUser: () => {},
  loginWithGoogle: async () => {},
  resetPassword: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const auth = getAuth(firebase);
  const dispatch = useDispatch();
  // const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  const [user, setUser] = useState<UserInterface | null>();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [triggerGetAuthUser] = zeapApiSlice.useLazyGetAuthUserQuery();

  const [creatGuestUser] = zeapApiSlice.useCreateGuestUserMutation();
  const [createGoogleAppleUser] =
    zeapApiSlice.useCreateGoogleAppleUserMutation();
  const [mergeGoogleAppleLogin] =
    zeapApiSlice.useMergeGoogleAppleLoginGuestUserMutation();
  const [mergePasswordLogin] =
    zeapApiSlice.useMergePasswordLoginGuestUserMutation();

  const getToken = async () => {
    const token = await auth?.currentUser?.getIdToken(true);

    if (token) {
      dispatch(globalActions.setAuthToken(token));
      return token;
    }
    return null;
  };

  useEffect(() => {
    if (!isTokenRefreshed) {
      const refresh = setInterval(async () => {
        setIsTokenRefreshed(!isTokenRefreshed);
        await getToken();
      }, 300000);
      return () => {
        clearInterval(refresh);
      };
    } else {
      const refresh = setInterval(() => {
        setIsTokenRefreshed(!isTokenRefreshed);
      }, 3000);
      return () => {
        clearInterval(refresh);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenRefreshed]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        const accessToken = await getToken();
        if (accessToken) {
          if (currentUser.isAnonymous) {
            setIsGuest(true);
            localStorage.setItem("guestUid", currentUser.uid);
            return creatGuestUser({})
              .unwrap()
              .then((res) => {
                const newuser = res?.data;

                setUser(newuser);
                setLoading(false);
                setIsAuthenticated(true);
              });
          }

          const uid = currentUser.uid;
          const response = await triggerGetAuthUser({ uid });
          const userData = response?.data?.data;
          if (userData) {
            setUser(userData);
            setIsGuest(false);
            setLoading(false);
          } else {
            // Firebase user exists but no DB record for this environment.
            // This happens when a user registered in dev and logs in to prod
            // (or vice versa) for the first time. Auto-provision the DB record
            // using the info already available from the Firebase token.
            const displayName = currentUser.displayName || "";
            const nameParts = displayName.trim().split(" ");
            const autoPayload = {
              email: currentUser.email,
              firstName: nameParts[0] || "",
              lastName: nameParts.slice(1).join(" ") || "",
              uid: currentUser.uid,
              photoURL: currentUser.photoURL || "",
            };
            createGoogleAppleUser({ payload: autoPayload })
              .unwrap()
              .then(async () => {
                // Re-fetch the newly created DB record
                const retryResponse = await triggerGetAuthUser({ uid });
                const newUserData = retryResponse?.data?.data;
                if (newUserData) {
                  setUser(newUserData);
                }
              })
              .catch((err) => {
                // If creation fails (e.g. race condition — record already
                // exists), do one final fetch to ensure user state is set.
                console.error("Auto-provision failed, retrying fetch:", err);
                triggerGetAuthUser({ uid }).then((retryResponse) => {
                  const newUserData = retryResponse?.data?.data;
                  if (newUserData) setUser(newUserData);
                });
              })
              .finally(() => {
                setIsGuest(false);
                setLoading(false);
              });
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        dispatch(globalActions.setAuthToken(null));
        signInAnonymously(auth)
          .then(async (userCredential) => {
            const curtrentUser = userCredential.user;
            if (curtrentUser) {
              await getToken();

              setIsGuest(true);
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
            // ...
          });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const passwordLogin = (
    email: string,
    password: string,
    callBack?: (userData?: UserInterface) => void,
    merge: boolean = true,
  ) => {
    try {
      const redirectSignInPath =
        localStorage.getItem("redirectSignInPath") || "/";

      setLoginError(null);
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const curtrentUser = userCredential.user;
          if (curtrentUser) {
            await getToken();
            setIsAuthenticated(true);
          }
          setLoading(false);

          setIsGuest(false);
          const guestUid = localStorage.getItem("guestUid");
          if (guestUid) {
            const payload = {
              guestUid: guestUid,
            };
            if (merge) {
              mergePasswordLogin({ payload })
                .unwrap()
                .then((result) => {
                  const userData = result.data;
                  setUser(userData);
                  localStorage.removeItem("guestUid");
                  if (callBack) {
                    return callBack(userData);
                  }
                  return router.push(redirectSignInPath);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
          if (callBack) {
            return callBack();
          }
          return router.push(redirectSignInPath);
          // ...
        })
        .catch((e) => {
          console.log("error", e.code);
          if (
            e.code === "auth/user-not-found" ||
            e.code === "auth/invalid-email" ||
            e.code === "auth/wrong-password" ||
            e.code === "auth/invalid-credential"
          ) {
            setLoginError("Password is incorrect. Please try again");
          }
          if (e.code === "auth/too-many-requests") {
            setLoginError("Too many requests, please try again later");
          }

          if (e.code === "auth/user-disabled") {
            setLoginError("User account is disabled");
          }
          if (e.code === "auth/network-request-failed") {
            setLoginError("loginloginError in Network connection");
          }
          setLoading(false);
          // ..
        });

      //  setShowSpinner(false);
    } catch {
      setLoginError("loginloginError in Network connection");
      setLoading(false);
    }
  };

  const loginWithGoogle = async (
    callBack?: (userData?: UserInterface) => void,
  ) => {
    const redirectSignInPath =
      localStorage.getItem("redirectSignInPath") || "/";

    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    await signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const googleCurrentUser = userCredential.user;

        if (googleCurrentUser) {
          await getToken();
          setIsAuthenticated(true);
          setIsGuest(false);
          setLoading(false);

          const guestUid = localStorage.getItem("guestUid");

          if (guestUid) {
            const payload = {
              guestUid,
            };
            mergeGoogleAppleLogin({ payload })
              .unwrap()
              .then((result) => {
                const userData = result.data;
                setUser(userData);
                localStorage.removeItem("guestUid");
                if (callBack) {
                  return callBack(userData);
                }
                return router.push(redirectSignInPath);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (callBack) {
            return callBack();
          }
          return router.push(redirectSignInPath);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
        setLoading(false);
        if (errorCode === "auth/popup-closed-by-user") {
          setLoginError("Popup closed by user");
        }
        if (errorCode === "auth/popup-blocked") {
          setLoginError("Popup blocked by browser");
        }
        if (errorCode === "auth/network-request-failed") {
          setLoginError("loginloginError in Network connection");
        }
        if (errorCode === "auth/operation-not-supported-in-this-environment") {
          setLoginError("Operation not supported in this environment");
        }
        if (errorCode === "auth/operation-not-allowed") {
          setLoginError("Operation not allowed");
        }
        if (errorCode === "auth/invalid-credential") {
          setLoginError("Invalid credential");
        }
        if (errorCode === "auth/invalid-verification-code") {
          setLoginError("Invalid verification code");
        }
      });
    return router.push(redirectSignInPath);
  };

  const logout = () => {
    const auth = getAuth(firebase);
    auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    dispatch(globalActions.setAuthToken(null));
    signInAnonymously(auth)
      .then(async (userCredential) => {
        const curtrentUser = userCredential.user;

        if (curtrentUser) {
          await getToken();
          setIsGuest(true);
        }
        router.push("/vendor-onboarding");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
        // ...
      });
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoginError("Password reset email sent successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        if (error.code === "auth/user-not-found") {
          setLoginError("No user found with this email address");
        } else if (error.code === "auth/invalid-email") {
          setLoginError("Invalid email address");
        } else {
          setLoginError("Error sending password reset email");
        }
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        passwordLogin,
        logout,
        loginError,
        loading,
        setUser,
        setLoading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {loading && <Loading />}

      {children}
    </AuthContext.Provider>
  );
};
