import React, { useEffect, useState, useRef } from "react";

// TODO: Move images to this path
import imgPromo_1 from "../../shared/assets/images/promotions/Promo_1.png";
import imgPromo_2 from "../../shared/assets/images/promotions/Promo_2.png";

// ICONS
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
    <svg className="absolute right-[15px] top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

// DATA
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
  "Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "1 - 2 triệu", "2 - 3 triệu", "Trên 3 triệu",
];
const INTERNATIONAL_PRICE_RANGES = [
  "Dưới 1.000.000đ", "Từ 1.000.000đ - 5.000.000đ", "5 - 7 triệu", "7 - 10 triệu", "Trên 10 triệu",
];

// HELPER FUNCTIONS
const parsePrice = (priceStr) => {
    if(!priceStr) return 0;
    return parseInt(priceStr.toString().replace(/[^0-9]/g, ''), 10);
};
const isPriceInRange = (flightPriceStr, rangeLabel) => {
    if (!rangeLabel) return true;
    const price = parsePrice(flightPriceStr);
    if (rangeLabel === "Dưới 500.000đ") return price < 500000;
    if (rangeLabel === "Từ 500.000đ - 1.000.000đ") return price >= 500000 && price <= 1000000;
    if (rangeLabel === "1 - 2 triệu") return price >= 1000000 && price <= 2000000;
    if (rangeLabel === "2 - 3 triệu") return price >= 2000000 && price <= 3000000;
    if (rangeLabel === "Trên 3 triệu") return price > 3000000;
    if (rangeLabel === "Dưới 1.000.000đ") return price < 1000000;
    if (rangeLabel === "Từ 1.000.000đ - 5.000.000đ") return price >= 1000000 && price <= 5000000;
    if (rangeLabel === "5 - 7 triệu") return price >= 5000000 && price <= 7000000;
    if (rangeLabel === "7 - 10 triệu") return price >= 7000000 && price <= 10000000;
    if (rangeLabel === "Trên 10 triệu") return price > 10000000;
    return true;
};

// SUB-COMPONENTS
const PromoSearchBar = ({ locations, priceRanges, onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [showOriginMenu, setShowOriginMenu] = useState(false);
  const [showDestMenu, setShowDestMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);
  const originRef = useRef(null);
  const destRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (originRef.current && !originRef.current.contains(e.target)) setShowOriginMenu(false);
      if (destRef.current && !destRef.current.contains(e.target)) setShowDestMenu(false);
      if (priceRef.current && !priceRef.current.contains(e.target)) setShowPriceMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (origin && dest && origin === dest) setError("Điểm đi và đến không được trùng nhau");
    else setError("");
  }, [origin, dest]);

  const handleSearchClick = () => {
    if (origin && dest && origin === dest) return;
    onSearch({ origin, dest, price });
  };

  const getFilteredList = (val) => {
    if (locations.includes(val) || val === "") return locations;
    return locations.filter((loc) => loc.toLowerCase().includes(val.toLowerCase()));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_54px] gap-4 mb-10 items-start relative z-10">
      {/* Origin & Destination with Error Handling */}
      {[ { val: origin, setVal: setOrigin, show: showOriginMenu, setShow: setShowOriginMenu, ref: originRef, label: 'Điểm khởi hành', placeholder: 'Chọn điểm đi' },
         { val: dest, setVal: setDest, show: showDestMenu, setShow: setShowDestMenu, ref: destRef, label: 'Điểm đến', placeholder: 'Chọn điểm đến' } ].map(item => (
        <div key={item.label} className={`relative h-[54px] ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} ref={item.ref}>
            <div className={`relative border-2 rounded-xl px-4 flex flex-col justify-center h-full bg-white cursor-pointer focus-within:border-qa-green ${error ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="text-xs text-qa-green mb-0.5">{item.label}</div>
                <input
                    type="text" className="border-none outline-none bg-transparent w-full text-qa-green font-bold text-base placeholder-gray-400"
                    placeholder={item.placeholder}
                    value={item.val}
                    onChange={(e) => { item.setVal(e.target.value); item.setShow(true); }}
                    onClick={() => item.setShow(true)}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-qa-green pointer-events-none"><LocationIcon /></span>
                {item.show && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-white border border-qa-green rounded-xl p-1 shadow-lg z-50 max-h-72 overflow-y-auto">
                        {getFilteredList(item.val).map((loc, idx) => (
                            <div key={idx} className={`p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100 ${loc === item.val ? 'bg-qa-green text-white' : ''}`}
                                onClick={() => { item.setVal(loc); item.setShow(false); }}>
                                {loc}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && item.label === 'Điểm khởi hành' && <div className="absolute -bottom-6 left-0 text-xs text-red-600 font-bold flex items-center gap-1 whitespace-nowrap">⚠️ {error}</div>}
        </div>
      ))}

      {/* Price Range */}
      <div className="relative border-2 border-gray-300 rounded-xl px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green" ref={priceRef} onClick={() => setShowPriceMenu(!showPriceMenu)}>
        <div className="text-xs text-qa-green mb-0.5">Giá vé mong muốn</div>
        <div className={`text-base whitespace-nowrap overflow-hidden text-ellipsis ${price ? 'text-qa-green font-bold' : 'text-gray-400'}`}>
            {price || "Chọn mức giá"}
        </div>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-qa-green pointer-events-none"><PriceIcon /></span>
        <ArrowIcon />
        {showPriceMenu && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white border border-qa-green rounded-xl p-1 shadow-lg z-50">
            <div className="p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); setPrice(""); setShowPriceMenu(false); }}>Tất cả mức giá</div>
            {priceRanges.map((rng, idx) => (
              <div key={idx} className={`p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100 ${price === rng ? 'bg-qa-green text-white' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPrice(rng); setShowPriceMenu(false); }}>
                {rng}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button className="w-[54px] h-[54px] bg-qa-green rounded-xl border-none text-white flex items-center justify-center cursor-pointer transition-colors hover:bg-green-800 shadow-lg shadow-green-500/20" onClick={handleSearchClick}>
        <SearchIcon />
      </button>
    </div>
  );
};

const TicketCard = ({ item, onClick }) => (
    <div 
        className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-md border border-gray-200 transition-all duration-200 hover:shadow-green-500/20 hover:-translate-y-1.5 hover:border-qa-green cursor-pointer flex flex-col justify-between"
        onClick={() => onClick(item)}
    >
      <div>
        <div className="flex justify-between items-start mb-2.5">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium text-green-900">{item.from}</div>
            <div className="text-xl font-extrabold text-green-900 leading-tight">{item.to}</div>
          </div>
          <div className="text-right leading-none">
            <div className="text-2xl font-extrabold text-red-600">{item.price}<span className="text-sm align-super ml-0.5">đ</span></div>
          </div>
        </div>
        <div className="inline-block bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">Chỗ ngồi có hạn</div>
      </div>
      <div className="border-t border-dashed border-gray-200 pt-4 mt-4 flex flex-col gap-2">
        <div className="text-sm font-bold text-qa-green">{item.date}</div>
        <div className="text-xs italic text-gray-500">Hạn chót đăng ký: 23:59' ngày 31/12/2025 hoặc khi hết vé</div>
      </div>
    </div>
);

function Promotion() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [visibleDomestic, setVisibleDomestic] = useState(9);
  const [visibleIntl, setVisibleIntl] = useState(9);
  const [domesticFilter, setDomesticFilter] = useState({ origin: "", dest: "", price: "" });
  const [intlFilter, setIntlFilter] = useState({ origin: "", dest: "", price: "" });

  const domesticFlights = [
    { id: 1, from: "Thành phố Hà Nội đến", to: "Đà Nẵng", price: "990,000", date: "01/12/2025 - 31/03/2026" },
    { id: 2, from: "Thành phố Hồ Chí Minh đến", to: "Hà Nội", price: "1,290,000", date: "15/11/2025 - 15/02/2026" },
    { id: 3, from: "Thành phố Hà Nội đến", to: "Phú Quốc", price: "1,590,000", date: "20/12/2025 - 30/03/2026" },
    { id: 4, from: "Thành phố Hồ Chí Minh đến", to: "Nha Trang", price: "890,000", date: "01/12/2025 - 28/02/2026" },
    { id: 5, from: "Thành phố Hà Nội đến", to: "Huế", price: "1,090,000", date: "01/01/2026 - 31/03/2026" },
    { id: 6, from: "Thành phố Hồ Chí Minh đến", to: "Đà Lạt", price: "980,000", date: "20/11/2025 - 30/03/2026" },
  ];
  const intlFlights = [
    { id: 1, from: "Thành phố Hà Nội đến", to: "Bangkok (Thái Lan)", price: "3,490,000", date: "20/11/2025 - 31/12/2025" },
    { id: 2, from: "Thành phố Hồ Chí Minh đến", to: "Dubai (UAE)", price: "17,900,000", date: "15/12/2025 - 31/03/2026" },
    { id: 3, from: "Thành phố Hồ Chí Minh đến", to: "Kuala Lumpur", price: "3,790,000", date: "20/11/2025 - 30/01/2026" },
  ];

  const filterFlights = (flights, criteria) => {
    return flights.filter(flight => {
        const cleanTerm = (term) => term ? term.split(" (")[0].toLowerCase().trim() : "";
        const searchOrigin = cleanTerm(criteria.origin);
        const searchDest = cleanTerm(criteria.dest);
        const matchOrigin = criteria.origin ? flight.from.toLowerCase().includes(searchOrigin) : true;
        const matchDest = criteria.dest ? flight.to.toLowerCase().includes(searchDest) : true;
        const matchPrice = isPriceInRange(flight.price, criteria.price);
        return matchOrigin && matchDest && matchPrice;
    });
  };

  const filteredDomesticFlights = filterFlights(domesticFlights, domesticFilter);
  const filteredIntlFlights = filterFlights(intlFlights, intlFilter);

  const handleTicketClick = (item) => {
    console.log("Ticket clicked, should open booking flow for:", item);
  };

  return (
    <div className="bg-gray-50 text-green-900 font-sans">
      <main className="max-w-7xl mx-auto px-5 py-8">
        <section className="flex flex-col lg:flex-row gap-10 justify-center items-end mb-12">
          <div className="w-full lg:w-3/5 flex flex-col gap-8">
            <div className="text-left">
              <h1 className="text-5xl text-green-900 font-extrabold mb-5 leading-tight">Khám phá ưu đãi mỗi ngày <br /> cùng QAirline</h1>
              <p className="text-lg text-qa-green leading-relaxed max-w-2xl">
                Tiết kiệm nhiều hơn khi đặt vé máy bay và khách sạn đến những điểm đến mơ ước. Cùng QAirline biến chuyến đi trong mơ của bạn thành hiện thực với mức giá hấp dẫn mỗi ngày!
              </p>
            </div>
            <img src={imgPromo_1} alt="Promotion" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
          </div>
          <div className="w-full lg:w-2/5 flex-shrink-0">
            <img src={imgPromo_2} alt="Promotion 2" className="w-full h-[635px] object-cover rounded-2xl shadow-lg" />
          </div>
        </section>

        <p className="text-sm italic text-green-800 mb-10">* Giá vé một chiều, chỉ áp dụng trên web. Không bao gồm hành lý ký gửi...</p>

        {/* Domestic Flights */}
        <h2 className="text-4xl text-green-900 font-bold mb-8 mt-16">Ưu đãi bay trong nước</h2>
        <PromoSearchBar locations={DOMESTIC_LOCATIONS} priceRanges={DOMESTIC_PRICE_RANGES} onSearch={(criteria) => { setDomesticFilter(criteria); setVisibleDomestic(9); }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 justify-items-center">
          {filteredDomesticFlights.length > 0 ? (
            filteredDomesticFlights.slice(0, visibleDomestic).map((item) => <TicketCard key={item.id} item={item} onClick={handleTicketClick} />)
          ) : (
             <div className="col-span-full text-center text-gray-500 italic py-10">Không tìm thấy chuyến bay phù hợp với tiêu chí của bạn.</div>
          )}
        </div>
        {visibleDomestic < filteredDomesticFlights.length && (
          <div className="flex justify-center my-10">
            <button className="bg-white border-2 border-qa-green text-qa-green px-10 py-2.5 rounded-full font-bold text-base cursor-pointer transition-all hover:bg-qa-green hover:text-white" onClick={() => setVisibleDomestic((prev) => prev + 6)}>
              Xem thêm ưu đãi
            </button>
          </div>
        )}

        {/* International Flights */}
        <h2 className="text-4xl text-green-900 font-bold mb-8 mt-24">Ưu đãi bay quốc tế</h2>
        <PromoSearchBar locations={INTERNATIONAL_LOCATIONS} priceRanges={INTERNATIONAL_PRICE_RANGES} onSearch={(criteria) => { setIntlFilter(criteria); setVisibleIntl(9); }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 justify-items-center">
          {filteredIntlFlights.length > 0 ? (
             filteredIntlFlights.slice(0, visibleIntl).map((item) => <TicketCard key={item.id} item={item} onClick={handleTicketClick} />)
          ) : (
            <div className="col-span-full text-center text-gray-500 italic py-10">Không tìm thấy chuyến bay phù hợp với tiêu chí của bạn.</div>
          )}
        </div>
        {visibleIntl < filteredIntlFlights.length && (
          <div className="flex justify-center my-10">
            <button className="bg-white border-2 border-qa-green text-qa-green px-10 py-2.5 rounded-full font-bold text-base cursor-pointer transition-all hover:bg-qa-green hover:text-white" onClick={() => setVisibleIntl((prev) => prev + 6)}>
              Xem thêm ưu đãi
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Promotion;
