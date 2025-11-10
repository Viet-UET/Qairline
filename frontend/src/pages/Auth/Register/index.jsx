import { useState } from "react";
import StepEmail from "./StepEmail";
import StepVerifyEmail from "./StepVerifyEmail";
import StepCreateAccount from "./StepCreateAccount";

export default function RegisterFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <>
      {step === 1 && (
        <StepEmail
          email={email}
          setEmail={setEmail}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepVerifyEmail
          email={email}
          code={code}
          setCode={setCode}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepCreateAccount
          email={email}
          back={() => setStep(2)}
        />
      )}
    </>
  );
}
