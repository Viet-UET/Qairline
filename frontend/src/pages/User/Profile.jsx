import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  IdCard,
  Lock,
  Pencil,
} from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const user = {
    firstName: "Minh",
    lastName: "Minh",
    email: "namnam@gmail.com",
    phone: "0973732409",
    dob: "11/11/2000",
    gender: "Nữ",
    cccd: "321",
    passport: "789",
  };

  return (
    <div className="min-h-screen bg-[#F8F7F9]">
      <div className="max-w-[1300px] mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <User className="text-qa-green" />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Thông tin cá nhân
              </h1>
              <p className="text-sm text-gray-500">
                Quản lý và chỉnh sửa thông tin của bạn
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8F7F9] border border-[#D9D9D9] hover:bg-white transition text-sm font-medium"
          >
            <Pencil size={16} />
            {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
          </button>
        </div>

        {/* CONTENT */}
        {!editMode ? (
          <ProfileView user={user} />
        ) : (
          <ProfileEdit user={user} />
        )}
      </div>
    </div>
  );
}

/* ================= VIEW MODE ================= */

function ProfileView({ user }) {
  const Item = ({ icon, label, value }) => (
    <div className="bg-white border border-[#D9D9D9] rounded-xl p-4 flex gap-3 items-start">
      <div className="text-qa-green">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Item
        icon={<User />}
        label="Họ và tên"
        value={`${user.lastName} ${user.firstName}`}
      />
      <Item
        icon={<Calendar />}
        label="Ngày sinh"
        value={user.dob}
      />
      <Item
        icon={<Mail />}
        label="Email"
        value={user.email}
      />
      <Item
        icon={<IdCard />}
        label="CMND/CCCD"
        value={user.cccd}
      />
      <Item
        icon={<Phone />}
        label="Số điện thoại"
        value={user.phone}
      />
      <Item
        icon={<CreditCard />}
        label="Hộ chiếu"
        value={user.passport}
      />
      <Item
        icon={<Lock />}
        label="Giới tính"
        value={user.gender}
      />
    </div>
  );
}

/* ================= EDIT MODE ================= */

function ProfileEdit({ user }) {
  const Input = ({ label, defaultValue, icon, type = "text" }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center gap-2 border border-[#D9D9D9] rounded-xl px-3 h-[44px] bg-white">
        <span className="text-gray-400">{icon}</span>
        <input
          type={type}
          defaultValue={defaultValue}
          className="flex-1 outline-none text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Tên" defaultValue={user.firstName} icon={<User />} />
        <Input label="Họ" defaultValue={user.lastName} icon={<User />} />
        <Input label="Email" defaultValue={user.email} icon={<Mail />} />
        <Input label="Số điện thoại" defaultValue={user.phone} icon={<Phone />} />
        <Input label="Ngày sinh" defaultValue={user.dob} icon={<Calendar />} />
        <Input label="CMND/CCCD" defaultValue={user.cccd} icon={<IdCard />} />
        <Input label="Hộ chiếu" defaultValue={user.passport} icon={<CreditCard />} />
        <Input label="Mật khẩu mới" icon={<Lock />} type="password" />
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-6 h-[44px] rounded-xl border border-[#D9D9D9] hover:bg-[#F8F7F9] transition">
          Hủy
        </button>
        <button className="px-6 h-[44px] rounded-xl bg-qa-green text-white hover:bg-green-700 transition font-medium">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
