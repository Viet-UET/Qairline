import React, { useEffect, useState, useRef } from "react";

// IMAGES
import imgPromo_1 from "../../shared/assets/images/promotions/Promo_1.png";
import imgPromo_2 from "../../shared/assets/images/promotions/Promo_2.png";

/* ================= ICONS ================= */

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#529246" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PriceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#529246" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="12" y1="2" x2="12" y2="6" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ArrowIcon = () => (
  <span className="absolute right-[15px] top-[65%] -translate-y-1/2 text-[0.7rem] text-[#999]">▼</span>
);

/* ================= DATA ================= */

const DOMESTIC_LOCATIONS = [
  "Hà Nội (HAN)", "Hồ Chí Minh (SGN)", "Đà Nẵng (DAD)", "Nha Trang (CXR)",
  "Phú Quốc (PQC)", "Huế (HUI)", "Đà Lạt (DLI)", "Hải Phòng (HPH)",
  "Cần Thơ (VCA)", "Vân Đồn (VDO)", "Vinh (VII)", "Quy Nhơn (UIH)",
];

const INTERNATIONAL_LOCATIONS = [
  ...DOMESTIC_LOCATIONS,
  "Bangkok (BKK)", "Singapore (SIN)", "Seoul (ICN)", "Tokyo (NRT)",
  "Taipei (TPE)", "London (LHR)", "Paris (CDG)", "Dubai (DXB)", "Sydney (SYD)",
];

const DOMESTIC_PRICE_RANGES = [
  "Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "1 - 2 triệu",
  "2 - 3 triệu", "Trên 3 triệu",
];

const INTERNATIONAL_PRICE_RANGES = [
  "Dưới 1.000.000đ", "Từ 1.000.000đ - 5.000.000đ",
  "5 - 7 triệu", "7 - 10 triệu", "Trên 10 triệu",
];

/* ================= HELPERS ================= */

const parsePrice = (priceStr) =>
  parseInt(priceStr.toString().replace(/[^0-9]/g, ""), 10);

const isPriceInRange = (priceStr, range) => {
  if (!range) return true;
  const price = parsePrice(priceStr);

  const map = {
    "Dưới 500.000đ": price < 500000,
    "Từ 500.000đ - 1.000.000đ": price >= 500000 && price <= 1000000,
    "1 - 2 triệu": price >= 1000000 && price <= 2000000,
    "2 - 3 triệu": price >= 2000000 && price <= 3000000,
    "Trên 3 triệu": price > 3000000,
    "Dưới 1.000.000đ": price < 1000000,
    "Từ 1.000.000đ - 5.000.000đ": price >= 1000000 && price <= 5000000,
    "5 - 7 triệu": price >= 5000000 && price <= 7000000,
    "7 - 10 triệu": price >= 7000000 && price <= 10000000,
    "Trên 10 triệu": price > 10000000,
  };

  return map[range] ?? true;
};

/* ================= COMPONENTS ================= */

const PromoSearchBar = ({ locations, priceRanges, onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [price, setPrice] = useState("");
  const [showMenu, setShowMenu] = useState(null);

  const handleSearch = () => onSearch({ origin, dest, price });

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_54px] gap-4 mb-10">
      {[["Điểm khởi hành", origin, setOrigin], ["Điểm đến", dest, setDest]].map(
        ([label, val, setVal]) => (
          <div key={label} className="relative bg-white rounded-xl border px-4 py-2">
            <div className="text-xs text-[#006D5B]">{label}</div>
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full font-bold outline-none"
              placeholder={`Chọn ${label.toLowerCase()}`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <LocationIcon />
            </span>
          </div>
        )
      )}

      <div
        className="relative bg-white rounded-xl border px-4 py-2 cursor-pointer"
        onClick={() => setShowMenu(showMenu === "price" ? null : "price")}
      >
        <div className="text-xs text-[#006D5B]">Giá vé mong muốn</div>
        <div className="font-bold">{price || "Chọn mức giá"}</div>
        <PriceIcon />
        <ArrowIcon />

        {showMenu === "price" && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow z-20">
            {priceRanges.map((r) => (
              <div
                key={r}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setPrice(r);
                  setShowMenu(null);
                }}
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        className="bg-[#529246] rounded-xl flex items-center justify-center"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

/* ================= MAIN PAGE ================= */

export default function Promotion() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="w-full bg-[#fcfcfc] font-afacad text-[#1b5e20]">
      <main className="max-w-[1300px] mx-auto px-5 pb-16">

        {/* HERO */}
        <section className="pt-[140px] flex gap-10 items-end mb-20">
          <div className="w-[737px]">
            <h1 className="text-[3.6rem] font-extrabold text-[#004D40] mb-6 leading-tight">
              Khám phá ưu đãi mỗi ngày <br /> cùng QAirline
            </h1>
            <p className="text-[#529246] text-lg mb-8 max-w-[90%]">
              Tiết kiệm nhiều hơn khi đặt vé máy bay và khách sạn đến những điểm đến mơ ước.
            </p>
            <img
              src={imgPromo_1}
              className="w-full h-[365px] object-cover rounded-3xl shadow-lg"
              alt="promo"
            />
          </div>

          <img
            src={imgPromo_2}
            className="w-[488px] h-[635px] object-cover rounded-3xl shadow-lg"
            alt="promo"
          />
        </section>

        {/* NOTE */}
        <p className="text-xs italic mb-10">
          * Giá vé một chiều, chỉ áp dụng trên web. Không bao gồm hành lý ký gửi.
        </p>

        {/* DOMESTIC */}
        <h2 className="text-4xl font-bold text-[#004D40] mb-6">
          Ưu đãi bay trong nước
        </h2>
        <PromoSearchBar
          locations={DOMESTIC_LOCATIONS}
          priceRanges={DOMESTIC_PRICE_RANGES}
          onSearch={() => {}}
        />

        {/* INTERNATIONAL */}
        <h2 className="text-4xl font-bold text-[#004D40] mt-16 mb-6">
          Ưu đãi bay quốc tế
        </h2>
        <PromoSearchBar
          locations={INTERNATIONAL_LOCATIONS}
          priceRanges={INTERNATIONAL_PRICE_RANGES}
          onSearch={() => {}}
        />
      </main>
    </div>
  );
}
