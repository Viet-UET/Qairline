
import { useState } from "react";
// test từng màn hình tại đây
// import StepEmail from "./pages/Auth/Register/StepEmail";
// import StepEmail from "./pages/Auth/Register/StepVerifyEmail";
// import StepEmail from "./pages/Auth/Register/StepCreateAccount";
import StepEmail from "./pages/Auth/Login/Login";

export default function App() {
  const [email, setEmail] = useState("");
  const next = () => alert(`Email: ${email}`);

  return (
    <StepEmail email={email} setEmail={setEmail} next={next} />
  );
}


