import { useState } from "react";
import logo from "../../../shared/assets/logo.svg";
import bg from "../../../shared/assets/bg-village.jpg";

export default function VerifyEmail({ email, code, setCode, next, back }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const regex = /^[0-9]{6}$/;
    if (!regex.test(code)) {
      setError("Mã xác minh không hợp lệ (phải gồm 6 chữ số)");
      return;
    }

    next(); // chuyển sang màn ResetPassword
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
        <p className="text-qa-green text-center text-[24px] font-afacad font-semibold mb-4">
          Xác minh email
        </p>

        {/* MÔ TẢ */}
        <p className="text-center text-qa-green font-afacad text-[18px] mb-10 leading-relaxed">
          Chúng tôi đã gửi email chứa mã xác minh đến:
          <br />
          <span className="font-semibold">{email}</span>
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-10 font-afacad"
        >
          {/* INPUT: Mã xác minh */}
          <div className="relative w-[451px] font-afacad">
            <label
              htmlFor="code"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Nhập mã gồm 6 chữ số
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green placeholder-transparent focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
              placeholder="Nhập mã gồm 6 chữ số"
              required
            />
          </div>

          {/* LỖI */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* NÚT TIẾP TỤC */}
          <button
            type="submit"
            className="w-[451px] h-[54px] bg-qa-green text-white text-[24px] rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Tiếp tục
          </button>

          {/* GỬI LẠI + QUAY LẠI */}
          <p className="text-center text-gray-700 text-[20px]">
            Quý khách chưa nhận được mã?{" "}
            <a href="#" className="text-qa-green font-semibold hover:underline">
              Gửi lại
            </a>
          </p>

          <a
            href="#"
            onClick={back}
            className="text-qa-green font-semibold hover:underline text-[24px]"
          >
            Quay lại trang trước
          </a>
        </form>
      </div>
    </div>
  );
}
