import { useState } from "react";
import logo from "../../../shared/assets/logo.svg";
import bg from "../../../shared/assets/bg-village.jpg";

export default function ResetPassword({ onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    onSubmit && onSubmit(password);
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
          Đặt lại mật khẩu mới
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-10 font-afacad"
        >
          {/* INPUT: Mật khẩu mới */}
          <div className="relative w-[451px] font-afacad">
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Mật khẩu mới*
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green placeholder-transparent focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
              placeholder="Mật khẩu mới*"
              required
            />
          </div>

          {/* INPUT: Xác thực mật khẩu */}
          <div className="relative w-[451px] font-afacad">
            <label
              htmlFor="confirm"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Xác thực mật khẩu mới*
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green placeholder-transparent focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
              placeholder="Xác thực mật khẩu mới*"
              required
            />
          </div>

          {/* LỖI */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* NÚT */}
          <button
            type="submit"
            className="w-[451px] h-[54px] bg-qa-green text-white text-[24px] rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Tạo mật khẩu mới
          </button>

          {/* LINK TRANG CHỦ */}
          <a
            href="/"
            className="text-qa-green font-semibold hover:underline text-[24px]"
          >
            Về trang chủ
          </a>
        </form>
      </div>
    </div>
  );
}
