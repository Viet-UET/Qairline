import { useState } from "react";
import logo from "../../../assets/logo.svg";
import bg from "../../../assets/bg-beach.webp";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập");
      return;
    }

    alert("Đăng nhập thành công (demo)");
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
        <h2 className="text-[32px] text-qa-green font-audiowide text-center leading-tight mb-10">
          Kính chào quý khách!
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6 font-afacad"
        >
          {/* INPUT: Tên đăng nhập */}
          <div className="relative w-[451px]">
            <label
              htmlFor="username"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green focus:ring-2 focus:ring-qa-green focus:outline-none transition-all"
            />
          </div>

          {/* INPUT: Mật khẩu */}
          <div className="relative w-[451px]">
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-[14px] text-qa-green pointer-events-none"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[451px] h-[54px] bg-[#F8F7F9] border border-[#D9D9D9] rounded-lg pt-5 pb-1 px-4 text-[16px] text-qa-green focus:ring-2 focus:ring-qa-green focus:outline-none transition-all pr-10"
            />
            {/* Nút ẩn/hiện mật khẩu */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[22px] cursor-pointer text-qa-green"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* LỖI */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* QUÊN MẬT KHẨU */}
          <a
            href="/forgot-password"
            className="text-qa-green font-semibold hover:underline text-[18px] hover:text-green-800"
          >
            Quý khách quên mật khẩu?
          </a>

          {/* NÚT ĐĂNG NHẬP */}
          <button
            type="submit"
            className="w-[451px] h-[54px] bg-qa-green text-white text-[24px] rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Đăng nhập
          </button>

          {/* ĐĂNG NHẬP BẰNG GOOGLE */}
          <div className="relative w-[451px]">
            <button
              type="button"
              onClick={() => alert("Google Login (demo)")}
              className="w-full h-[54px] border border-gray-300 bg-white text-gray-700 text-[20px] rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-3 font-medium"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-6 h-6"
              />
              Đăng nhập bằng Google
            </button>
          </div>


          {/* CHƯA CÓ TÀI KHOẢN? */}
<p className="text-center text-gray-700 text-[18px]">
  Quý khách chưa có tài khoản?{" "}
  <a
    href="/register"
    className="text-qa-green font-semibold hover:underline"
  >
    Tạo tài khoản
  </a>
</p>



          {/* TRANG CHỦ */}
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
