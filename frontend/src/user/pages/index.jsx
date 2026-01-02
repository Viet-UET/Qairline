import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlightSearch from "../../shared/components/common/FlightSearch";

// Images
import imgAdelaide from "../../shared/assets/images/home/Adelaide.png";
import imgTuscany from "../../shared/assets/images/home/Tuscany.png";
import imgMali from "../../shared/assets/images/home/Mali.png";
import imgSarajero from "../../shared/assets/images/home/Sarajevo.png";
import imgCamogli from "../../shared/assets/images/home/Camogli.png";
import imgSagradaFamilia from "../../shared/assets/images/home/Sagrada_Familia.png";

import imgStudent from "../../shared/assets/images/home/student_discount.png";
import imgMember from "../../shared/assets/images/home/membership.png";
import imgSponsor from "../../shared/assets/images/home/sponsors.png";

/* =========================
   HERO SLIDER
========================= */
function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  const prev = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [current]);

  const navigate = useNavigate();

  return (
    <section className="relative mx-auto mt-[60px] h-[430px] w-[1265px] max-w-[95%]">
      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-[-70px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-2xl text-[#006D5B] shadow-md transition hover:bg-[#006D5B] hover:text-white max-[1300px]:left-3"
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-[-70px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-2xl text-[#006D5B] shadow-md transition hover:bg-[#006D5B] hover:text-white max-[1300px]:right-3"
      >
        ›
      </button>

      <div
        onClick={() => (window.location.href = slides[current].link)}
        className="relative h-full w-full cursor-pointer overflow-hidden rounded-[30px] bg-cover bg-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-opacity duration-500"
        style={{ backgroundImage: `url(${slides[current].img})` }}
      >
        <div className="absolute left-14 top-1/2 w-[350px] translate-y-16 rounded-bl-[50px] rounded-br-[20px] rounded-tl-[20px] rounded-tr-[5px] p-8">
          <button 
            className="rounded-full border-2 border-white px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#529246] hover:border-[#529246]"
            onClick={(e) => { e.stopPropagation(); navigate('/discover/popular'); }}
          >
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================
   TICKET CARD
========================= */
function TicketCard({ from, to, price, date, deadline, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex h-[216px] cursor-pointer flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#529246] hover:shadow-[0_10px_25px_rgba(82,146,70,0.15)]"
    >
      <div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-[#004D40]">
              {from} đến
            </p>
            <p className="text-xl font-extrabold text-[#004D40]">
              {to}
            </p>
          </div>
          <p className="text-xl font-extrabold text-red-600">
            {price}
            <span className="text-sm align-super">đ</span>
          </p>
        </div>

        <span className="mt-2 inline-block rounded-md border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
          Chỗ ngồi có hạn
        </span>
      </div>

      <div className="border-t border-dashed pt-3">
        <p className="text-sm font-bold text-[#006D5B]">{date}</p>
        <p className="text-xs italic text-gray-500">{deadline}</p>
      </div>
    </div>
  );
}

/* =========================
   OFFER CARD
========================= */
function OfferCard({ img, title, desc, link }) {
  return (
    <Link
      to={link}
      className="
        group
        flex
        h-[500px]              /* ⬅️ TĂNG HEIGHT TỔNG */
        flex-col
        overflow-hidden
        rounded-2xl
        bg-white
        text-center
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* IMAGE */}
      <div className="relative h-[280px] w-full overflow-hidden">
        {/* ⬆️ ẢNH CAO HƠN RÕ */}
        <img
          src={img}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col justify-center px-8">
        <h3
          className="
            mb-3
            text-2xl
            font-bold
            text-[#004D40]
            transition
            group-hover:text-[#529246]
          "
        >
          {title}
        </h3>

        <p
          className="
            mb-6
            text-base
            italic
            text-[#529246]
            transition
            group-hover:text-[#004D40]
          "
        >
          {desc}
        </p>

        <span
          className="
            text-sm
            font-bold
            text-[#006D5B]
            transition
            group-hover:text-[#004D40]
          "
        >
          &gt;&gt; Tìm hiểu thêm
        </span>
      </div>
    </Link>
  );
}


/* =========================
   NEWSLETTER
========================= */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [langs, setLangs] = useState(["Tiếng Việt"]);
  const [city, setCity] = useState("");
  const [openLang, setOpenLang] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  const langRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setOpenLang(false);
      if (cityRef.current && !cityRef.current.contains(e.target))
        setOpenCity(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggleLang = (l) =>
    setLangs((p) =>
      p.includes(l) ? (p.length > 1 ? p.filter((x) => x !== l) : p) : [...p, l]
    );

  const CITIES = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];

  return (
    <section className="mx-auto mb-16 max-w-[1265px]">
      <h2 className="mb-6 text-center text-5xl font-bold text-[#006D5B]">
        Đăng ký Q-eflight News
      </h2>

      <div className="mx-auto w-[880px] max-w-full rounded-xl border bg-white p-10 text-center shadow">
        <p className="mb-2 text-xl font-bold text-[#004D40]">
          Đăng ký Q-eflight News để cập nhật các ưu đãi mới nhất
        </p>
        <p className="mb-6 italic text-gray-500">
          (Không bao gồm ưu đãi hội viên đặc biệt)
        </p>

        <div className="mb-6 grid grid-cols-[1.5fr_1fr_1.5fr] gap-5">
          {/* Email */}
          <div className="flex flex-col rounded-lg border bg-gray-50 px-4 py-2 text-left focus-within:border-[#006D5B]">
            <label className="text-xs text-[#006D5B]">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent font-semibold outline-none"
            />
          </div>

          {/* Lang */}
          <div
            ref={langRef}
            onClick={() => setOpenLang(!openLang)}
            className="relative flex cursor-pointer flex-col rounded-lg border bg-gray-50 px-4 py-2 text-left"
          >
            <label className="text-xs text-[#006D5B]">Ngôn ngữ</label>
            <div className="font-semibold">{langs.join(", ")}</div>
            {openLang && (
              <div className="absolute top-[110%] left-0 w-full rounded-lg border bg-white shadow">
                {["Tiếng Việt", "Tiếng Anh"].map((l) => (
                  <div
                    key={l}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLang(l);
                    }}
                    className={`cursor-pointer px-4 py-2 ${
                      langs.includes(l)
                        ? "bg-green-50 font-bold text-[#006D5B]"
                        : ""
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* City */}
          <div
            ref={cityRef}
            onClick={() => setOpenCity(!openCity)}
            className="relative flex cursor-pointer flex-col rounded-lg border bg-gray-50 px-4 py-2 text-left"
          >
            <label className="text-xs text-[#006D5B]">Thành phố</label>
            <div className="font-semibold text-gray-600">
              {city || "Chọn thành phố"}
            </div>
            {openCity && (
              <div className="absolute top-[110%] left-0 w-full rounded-lg border bg-white shadow">
                {CITIES.map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setOpenCity(false);
                    }}
                    className={`cursor-pointer px-4 py-2 ${
                      city === c
                        ? "bg-green-50 font-bold text-[#006D5B]"
                        : ""
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="rounded-lg border-2 border-[#529246] px-10 py-2 font-bold text-[#529246] transition hover:bg-[#529246] hover:text-white">
          Đăng ký
        </button>
      </div>
    </section>
  );
}

/* =========================
   HOME PAGE
========================= */
export default function Home() {
  const slides = [
    { img: imgAdelaide, link: "/adelaide" },
    { img: imgTuscany, link: "/tuscany" },
    { img: imgMali, link: "/mali" },
    { img: imgSarajero, link: "/discover/stories/sarajevo" },
    { img: imgCamogli, link: "/camogli" },
    { img: imgSagradaFamilia, link: "/article/sagrada-familia" },
  ];

  return (
    <div className="bg-[#fcfcfc] pb-10 pt-[100px] font-[Afacad]">
      <HeroSlider slides={slides} />

      <div className="-mt-[100px] relative z-10 mb-16">
        <FlightSearch />
      </div>

      {/* Promotions */}
      <section className="mx-auto mb-16 max-w-[1265px]">
        <h2 className="mb-2 text-5xl font-bold text-[#006D5B]">
          Khám phá khuyến mãi hàng ngày
        </h2>
        <p className="mb-8 text-[#529246]">
          Tiết kiệm nhiều hơn khi đặt vé bay
        </p>

        <div className="grid grid-cols-3 gap-6">
          <TicketCard
            from="TP. Hồ Chí Minh"
            to="Bangkok"
            price="3,490,000"
            date="30/11/2025 - 31/12/2025"
            deadline="Hạn chót: 22/11/2025"
          />
          <TicketCard
            from="TP. Hồ Chí Minh"
            to="Hà Nội"
            price="1,290,000"
            date="18/11/2025 - 15/03/2026"
            deadline="Hạn chót: 22/10/2025"
          />

          <Link
            to="/explore/promotions"
            className="relative flex h-[216px] flex-col items-center justify-center rounded-2xl bg-[#004D40] text-white transition hover:-translate-y-1 hover:bg-[#00695c]"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime-400/20" />
            <p className="mb-5 text-lg font-bold">
              Bạn muốn xem thêm ưu đãi?
            </p>
            <button className="rounded-full border px-6 py-2 text-sm font-bold">
              Xem tất cả
            </button>
          </Link>
        </div>
      </section>

      {/* Special Offers */}
      <section className="mx-auto mb-16 max-w-[1265px]">
        <h2 className="mb-8 text-5xl font-bold text-[#006D5B]">
          Ưu đãi đặc biệt
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <OfferCard
            img={imgStudent}
            title="Ưu đãi sinh viên"
            desc="Giảm giá đến 20%"
            link="/special-offers#student"
          />
          <OfferCard
            img={imgMember}
            title="Gói hội viên"
            desc="Ưu đãi độc quyền"
            link="/special-offers#member"
          />
          <OfferCard
            img={imgSponsor}
            title="Nhà tài trợ"
            desc="Mã giảm giá hấp dẫn"
            link="/special-offers#sponsor"
          />
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
