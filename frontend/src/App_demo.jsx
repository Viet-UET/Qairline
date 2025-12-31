
import { useState } from "react";
/*
test từng màn hình tại đây
màn default là login, uncomment để test từng màn
*/ 


// import StepEmail from "./pages/Auth/Login/Login";

// import StepEmail from "./pages/Auth/Register/StepEmail";
// import StepEmail from "./pages/Auth/Register/StepVerifyEmail";
// import StepEmail from "./pages/Auth/Register/StepCreateAccount";

// import StepEmail from "./pages/Auth/ForgotPassword/ForgotPassword";
// import StepEmail from "./pages/Auth/ForgotPassword/VerifyEmail";
// import StepEmail from "./pages/Auth/ForgotPassword/ResetPassword";

// import FlightSelect from "./pages/Bookings/FlightSelect";
// import PassengerInfo from "./pages/Bookings/PassengerInfo";
// import SeatSelect from "./pages/Bookings/SeatSelect";

// import StepEmail from "./pages/Error/Error404";

import FlightResults from "./pages/bookings/FlightResults";
import FlightCard from "./components/bookings/flight/FlightCard";

export default function App() {
  const [email, setEmail] = useState("");
  const next = () => alert(`Email: ${email}`);

  return (
    <StepEmail email={email} setEmail={setEmail} next={next} />
  );
}

