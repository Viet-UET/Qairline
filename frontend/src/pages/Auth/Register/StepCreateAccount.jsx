import { useState } from "react";
import logo from "../../../assets/logo.svg";
import bg from "../../../assets/bg-city-modern.jpg";

export default function StepCreateAccount({ next, back }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !password || !confirm) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    next?.();
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
        <p className="text-qa-green text-center text-[24px] font-afacad font-semibold mb-8">
          Tạo tài khoản
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6 font-afacad"
        >
          {/* INPUT: Tên */}
          <div className="relative w-[451px]">
            <label
              htmlFor="firstName"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Tên*
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
            />
          </div>

          {/* INPUT: Họ */}
          <div className="relative w-[451px]">
            <label
              htmlFor="lastName"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Họ
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
            />
          </div>

          {/* INPUT: Mật khẩu */}
          <div className="relative w-[451px]">
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Mật khẩu*
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
            />
          </div>

          {/* INPUT: Xác thực mật khẩu */}
          <div className="relative w-[451px]">
            <label
              htmlFor="confirm"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Xác thực mật khẩu*
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
            />
          </div>

          {/* THÔNG BÁO LỖI */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* ĐIỀU KHOẢN */}
          <p className="text-[14px] text-gray-700 text-center leading-relaxed w-[451px] mb-2">
            Bằng cách nhấp vào bên dưới và tạo tài khoản, quý khách đồng ý với{" "}
            <a href="#" className="text-qa-green font-semibold hover:underline">
              Điều khoản và điều kiện Tài khoản của tôi
            </a>{" "}
            và quý khách bằng lòng để QAirline sử dụng thông tin cá nhân như đã
            nêu trong{" "}
            <a href="#" className="text-qa-green font-semibold hover:underline">
              Chính sách quyền riêng tư của Airline
            </a>{" "}
            (bao gồm cả sử dụng cookie).
          </p>

          {/* NÚT TẠO TÀI KHOẢN */}
          <button
            type="submit"
            className="w-[451px] h-[54px] bg-qa-green text-white text-[24px] rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Tạo tài khoản
          </button>

          {/* QUAY LẠI */}
          <a
            onClick={back}
            className="text-qa-green font-semibold hover:underline text-[24px] cursor-pointer"
          >
            Quay lại trang trước
          </a>
        </form>
      </div>
    </div>
  );
}
