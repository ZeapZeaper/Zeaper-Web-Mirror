import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LoadingDots from "../components/loading/LoadingDots";
import GoogleAuth from "./GoogleAuth";

const SignUp = ({
  email,
  setEmail,
  error,
  handleContinue,
  isLoading = false,
  callBack,
}: {
  email: string;
  setEmail: (value: string) => void;
  error: {
    email: string;
    password: string;
  };
  handleContinue: () => void;
  isLoading?: boolean;
  callBack?: () => void;
}) => {
  return (
    <div
      className="nc-PageLogin max-h-[calc(100vh-4rem)] overflow-y-auto"
      data-nc-id="PageLogin"
    >
      <div className="container ">
        <span className="font-bold text-2xl text-center mb-6">
          SIGN IN OR CREATE ACCOUNT
        </span>
        <div className="mx-auto max-w-md mt-6">
          <div className="space-y-6">
            <div className="">
              <GoogleAuth callBack={callBack} />
            </div>
            <div className="relative text-center">
              <span className="relative z-10 inline-block rounded-full bg-gray px-4 text-sm font-medium ">
                OR
              </span>
              <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border border-neutral-300" />
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-1">
                <FormItem label="Email address">
                  <Input
                    type="email"
                    rounded="rounded-full"
                    sizeClass="h-12 px-4 py-3"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                      error.email ? "border-red-500" : ""
                    }`}
                  />
                </FormItem>
                {error.email && (
                  <span className="text-red-500 text-sm">{error.email}</span>
                )}
              </div>

              <ButtonPrimary
                disabled={isLoading}
                className="w-full"
                onClick={handleContinue}
              >
                {isLoading ? <LoadingDots /> : " Continue"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
