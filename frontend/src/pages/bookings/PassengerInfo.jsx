import { useState } from "react";
import logo from "../../assets/logo.svg";

export default function PassengerInfo() {
  const [gender, setGender] = useState("Ông");
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white min-h-screen w-full">
      {/* HEADER */}
      <div className="border-b py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <img src={logo} alt="QAirline" className="w-[160px]" />

          <div className="flex items-center text-qa-green font-medium space-x-7">
            <span>Chuyến bay</span>
            <span>Hành khách</span>
            <span>Ghế</span>
            <span>Hành lý</span>
            <span>Dịch vụ</span>
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      {/* MAIN BOX */}
      <div className="flex justify-center mt-10">
        <div className="bg-white border rounded-3xl shadow-md px-10 py-8 w-[1200px]">

          {/* TITLE */}
          <h2 className="text-[28px] font-bold text-qa-green mb-6">
            Thông tin hành khách
          </h2>

          <p className="text-gray-600 text-[15px] mb-6">
            Vì lý do nhập cảnh và an ninh, hãy nhập họ tên chính xác như trên hộ chiếu của bạn.{" "}
            <a href="#" className="text-qa-green underline">Tìm hiểu thêm.</a>
          </p>

          {/* FORM GRID */}
          <div className="grid grid-cols-2 gap-6 font-afacad">

            {/* DANH XƯNG */}
            <div>
              <label className="block text-gray-700 mb-1">Danh xưng</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-[50px] border border-gray-300 rounded-xl px-4 bg-[#F8F7F9]"
              >
                <option>Ông</option>
                <option>Bà</option>
                <option>Khác</option>
              </select>
            </div>

            {/* HỌ */}
            <div>
              <label className="block text-gray-700 mb-1">Họ</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full h-[50px] border border-gray-300 rounded-xl bg-[#F8F7F9] px-4"
              />
            </div>

            {/* TÊN */}
            <div>
              <label className="block text-gray-700 mb-1">Tên</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full h-[50px] border border-gray-300 rounded-xl bg-[#F8F7F9] px-4"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-gray-700 mb-1">Số điện thoại liên hệ</label>
              <div className="flex gap-3">
                <select className="w-[150px] h-[50px] border border-gray-300 rounded-xl bg-[#F8F7F9] px-3">
                  <option>Vietnam (+84)</option>
                  <option>USA (+1)</option>
                  <option>Japan (+81)</option>
                </select>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 h-[50px] border border-gray-300 rounded-xl bg-[#F8F7F9] px-4"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 mb-1">Địa chỉ email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] border border-gray-300 rounded-xl bg-[#F8F7F9] px-4"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end mt-10 gap-4 text-afacad">
            <button className="px-8 h-[50px] text-qa-green border border-qa-green rounded-xl hover:bg-gray-100 transition">
              Chuyển đến thanh toán
            </button>
            <button className="px-10 h-[50px] bg-qa-green text-white rounded-xl hover:bg-green-700 transition">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-qa-green text-white mt-20 py-10">
        <div className="max-w-[1200px] mx-auto text-center space-y-2">
          <p>Liên hệ • Cam kết với khách hàng • Chính sách bảo mật</p>
          <p>Các điều khoản & điều kiện • Bản đồ sân bay</p>
          <p className="opacity-70 text-sm mt-3">
            © 2025 QAirline JSC — Trường Đại học Công nghệ, ĐHQGHN
          </p>
        </div>
      </div>
    </div>
  );
}
