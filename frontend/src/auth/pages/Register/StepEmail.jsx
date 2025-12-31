import { useState } from "react";
import logo from "../../../shared/assets/logo.svg";
import bg from "../../../shared/assets/bg-city-modern.jpg";

export default function StepEmail({ email, setEmail, next }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }
    next();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white shadow-2xl rounded-[36px] px-24 py-20 w-full max-w-[585px] min-h-[728px] mx-6">
        {/* LOGO */}
        <div className="flex justify-center mb-9">
          <img
            src={logo}
            alt="QAirline"
            className="w-[264px] h-[80px] object-contain translate-x-[22px]"
          />

        </div>

        {/* TIÊU ĐỀ */}
        <h2 className="text-[32px] text-qa-green font-audiowide text-center leading-tight mb-2">
          Kính chào quý khách!
        </h2>
        <p className="text-qa-green text-center text-[24px] font-afacad font-semibold mb-12">
          Tạo tài khoản mới
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-10 font-afacad"
        >
          {/* INPUT: Địa chỉ email */}
          <div className="relative w-[451px] font-afacad">
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Địa chỉ email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green placeholder-transparent focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
              placeholder="Địa chỉ email"
              required
            />
          </div>



          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-[451px] h-[54px] bg-qa-green text-white text-[24px] rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Tiếp tục
          </button>

          <p className="text-center text-gray-700 text-[20px]">
            Quý khách đã có tài khoản rồi?{" "}
            <a
              href="/login"
              className="text-qa-green font-semibold hover:underline"
            >
              Đăng nhập
            </a>
          </p>

          <a
            href="/"
            className="text-qa-green font-semibold hover:underline text-[24px]"
          >
            Trở về trang chủ
          </a>
        </form>
      </div>
    </div>
  );
}
