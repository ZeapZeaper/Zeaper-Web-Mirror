"use client";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import LoadingDots from "../components/loading/LoadingDots";
import CryptoJS from "crypto-js";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

const PasswordSignUP = ({
  email,
  setEmail,
  setCheckedUser,
  callBack,
}: {
  email: string;
  setEmail: (value: string) => void;
  callBack?: () => void;

  setCheckedUser: (value: undefined) => void;
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { passwordLogin, loading } = useContext(AuthContext);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [convert, convertStatus] =
    zeapApiSlice.useConvertPasswordUserMutation();
  const isLoading = convertStatus.isLoading || loading;
  const cryptoEncrypt = useCallback((text: string) => {
    const ENCRYPTION_KEY: string = process.env.NEXT_PUBLIC_ZEAPCRYPTOKEY || "";
    const ciphertext = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    return ciphertext;
  }, []);
  const passwordValidation = useCallback((password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }, []);

  const scrollToTop = () => {
    if (topRef?.current) topRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const validateForm = useCallback(() => {
    setError(null);

    if (!firstName) {
      setError("First name is required");
      return false;
    }
    if (!lastName) {
      setError("Last name is required");
      return false;
    } else if (!password) {
      setError("Password is required");
      return false;
    } else if (!confirmPassword) {
      setError("Confirm password is required");
      return false;
    } else if (password !== confirmPassword) {
      setError("Password and confirm password do not match");
      return false;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    } else if (!passwordValidation(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    }
    return true;
  }, [firstName, lastName, password, confirmPassword, passwordValidation]);

  const convertUser = useCallback(() => {
    if (!validateForm()) {
      scrollToTop();
      return;
    }

    const payload = {
      email,
      password: cryptoEncrypt(password),
      firstName,
      lastName,
      phoneNumber,
    };

    convert({ payload })
      .unwrap()
      .then((res) => {
        const newuser = res?.data?.data;
        setCheckedUser(newuser);
        passwordLogin(email, password);
        setError(null);
        if (callBack) {
          return callBack();
        }
        return router.push("/");
      })
      .catch((err) => {
        console.log("err", err);
        setError(err?.data?.error);
      });
  }, [
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    validateForm,
    cryptoEncrypt,
    convert,
    setCheckedUser,
    passwordLogin,
    callBack,
    router,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        convertUser();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [convertUser]);

  const passwordRules = [
    {
      rule: "Minimum 8 characters",
      isValid: password.length >= 8,
    },
    {
      rule: "At least one uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      rule: "At least one lowercase letter",
      isValid: /[a-z]/.test(password),
    },
    {
      rule: "At least one number",
      isValid: /\d/.test(password),
    },
    // {
    //   rule: "At least one special character",
    //   isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    // }
  ];

  return (
    <div className="w-full ">
      <div className="container ">
        <span className="font-bold text-2xl text-center mb-6">
          Create Account
        </span>
        <div ref={topRef} className="flex justify-between my-4">
          <span className="text-sm">{email}</span>
          <span
            className="text-sm text-primary cursor-pointer underline hover:text-primary/80"
            onClick={() => {
              setEmail("");
              setCheckedUser(undefined);
            }}
          >
            Use different email
          </span>
        </div>
        <div className="grid gap-6">
          {error && (
            <div
              className="w-full px-4 py-3 text-sm text-pink-500 border border-pink-100 rounded bg-pink-50"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}
          <FormItem label="First Name">
            <Input
              type="text"
              rounded="rounded-full"
              sizeClass="h-12 px-4 py-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                error === "First name is required" ? "border-red-500" : ""
              }`}
            />
          </FormItem>
          <FormItem label="Last Name">
            <Input
              type="text"
              rounded="rounded-full"
              sizeClass="h-12 px-4 py-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                error === "Last name is required" ? "border-red-500" : ""
              }`}
            />
          </FormItem>
          <div className="flex flex-col gap-1">
            <FormItem label="Password">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  rounded="rounded-full"
                  sizeClass="h-12 px-4 py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                    error?.includes("Password") ? "border-red-500" : ""
                  }`}
                />
                <span
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                        fill=""
                      />
                      <path
                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </FormItem>
            <div className="flex flex-col gap-1">
              {passwordRules.map((rule, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 ${
                    rule.isValid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      rule.isValid ? "text-green-500" : "text-red-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{rule.rule}</span>
                </div>
              ))}
            </div>
          </div>
          <FormItem label="Confirm Password">
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                rounded="rounded-full"
                sizeClass="h-12 px-4 py-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                  error === "Passwords do not match" ? "border-red-500" : ""
                }`}
              />
              <span
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                      fill=""
                    />
                    <path
                      d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </FormItem>
          <FormItem label="Phone Number">
            <Input
              type="text"
              rounded="rounded-full"
              sizeClass="h-12 px-4 py-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number (optional)"
              className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
            />
          </FormItem>
          <ButtonPrimary
            disabled={isLoading}
            className="w-full"
            onClick={convertUser}
          >
            {isLoading ? <LoadingDots /> : " Continue"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default PasswordSignUP;
