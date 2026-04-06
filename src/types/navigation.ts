import { NormalizedJob } from "./job";

export type RootStackParamList = {
  OnBoarding: undefined
  "Login Screen": undefined
  "Sign Up as User": undefined
  "OtpVerify":{ otp: string; phone: string };
  "JobDetail": { job: NormalizedJob };
  BottomScreen: undefined
}