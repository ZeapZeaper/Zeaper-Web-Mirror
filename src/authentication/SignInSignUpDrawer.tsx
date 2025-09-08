"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";

import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PasswordLogin from "./PasswordLogin";
import SignUp from "./SignUp";
import PasswordSignUP from "./PasswordSignUP";

interface CheckedUserInterface {
  firstName: string;
  lastName: string;
  email: string;
}

export function SignInSignUpDrawer({ callBack }: { callBack?: () => void }) {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkedUser, setCheckedUser] = useState<
    CheckedUserInterface | undefined
  >(undefined);

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [trigger] = zeapApiSlice.useLazyCheckUserEmailQuery();

  const validateEmail = useCallback((email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }, []);

  const handleCheckUser = useCallback(async () => {
    if (!token) {
      return;
    }
    if (!email) {
      setError((prevError) => ({ ...prevError, email: "Email is required" }));
      return;
    }
    if (!validateEmail(email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Invalid email address",
      }));
      return;
    }
    setIsLoading(true);
    const response = await trigger({ email });
    const data = response?.data?.data;
    if (data) {
      setCheckedUser(data);
    }
    setIsLoading(false);
  }, [token, email, validateEmail, trigger]);
  const handleContinue = async () => {
    if (!password) {
      return await handleCheckUser();
    }
    return;
  };

  useEffect(() => {
    // watch for enter key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (!password) {
          return handleCheckUser();
        }
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [password, handleCheckUser]);

  return (
    <div className="max-w-[40rem] w-full flex flex-col gap-2 p-4 z-50 overflow-y-auto">
      {!checkedUser && (
        <SignUp
          email={email}
          setEmail={setEmail}
          error={error}
          handleContinue={handleContinue}
          isLoading={isLoading}
          callBack={callBack}
        />
      )}

      {checkedUser?.firstName && (
        <PasswordLogin
          error={error}
          password={password}
          setPassword={setPassword}
          firstName={checkedUser?.firstName}
          email={checkedUser?.email}
          setEmail={setEmail}
          setCheckedUser={setCheckedUser}
          callBack={callBack}
        />
      )}
      {checkedUser && !checkedUser?.firstName && (
        <PasswordSignUP
          email={email}
          setEmail={setEmail}
          setCheckedUser={setCheckedUser}
          callBack={callBack}
        />
      )}
    </div>
  );
}
