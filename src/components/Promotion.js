import React, { useEffect, useState, useRef } from "react";
import styles from "./Promotion.module.css";
import Header from "./Header";
import Footer from "./Footer";
import FlightSearchModal from './FlightSearchModal'; // Import Modal

// IMPORT ẢNH & ICONS
import imgPromo_1 from "../Assets/Promo_1.png";
import imgPromo_2 from "../Assets/Promo_2.png";

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
const ArrowIcon = () => <span className={styles.arrowIcon}>▼</span>;

// --- DỮ LIỆU ĐỊA ĐIỂM ---
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

// --- HÀM HỖ TRỢ LỌC GIÁ ---
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

// --- COMPONENT SEARCH BAR ---
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
    <div className={styles.filterBarContainer}>
      <div className={`${styles.filterBox} ${error ? styles.error : ""}`} ref={originRef}>
        <div className={styles.filterLabel}>Điểm khởi hành</div>
        <input
          type="text" className={styles.filterValue} placeholder="Chọn điểm đi"
          value={origin}
          onChange={(e) => { setOrigin(e.target.value); setShowOriginMenu(true); }}
          onClick={() => setShowOriginMenu(true)}
        />
        <span className={styles.filterIcon}><LocationIcon /></span>
        {showOriginMenu && (
          <div className={styles.dropdownMenu}>
            {getFilteredList(origin).map((loc, idx) => (
              <div key={idx} className={`${styles.dropdownItem} ${loc === origin ? styles.active : ""}`}
                onClick={() => { setOrigin(loc); setShowOriginMenu(false); }}>
                {loc}
              </div>
            ))}
          </div>
        )}
        {error && <div className={styles.errorMessage}>⚠️ {error}</div>}
      </div>

      <div className={`${styles.filterBox} ${error ? styles.error : ""}`} ref={destRef}>
        <div className={styles.filterLabel}>Điểm đến</div>
        <input
          type="text" className={styles.filterValue} placeholder="Chọn điểm đến"
          value={dest}
          onChange={(e) => { setDest(e.target.value); setShowDestMenu(true); }}
          onClick={() => setShowDestMenu(true)}
        />
        <span className={styles.filterIcon}><LocationIcon /></span>
        {showDestMenu && (
          <div className={styles.dropdownMenu}>
            {getFilteredList(dest).map((loc, idx) => (
              <div key={idx} className={`${styles.dropdownItem} ${loc === dest ? styles.active : ""}`}
                onClick={() => { setDest(loc); setShowDestMenu(false); }}>
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterBox} ref={priceRef} onClick={() => setShowPriceMenu(!showPriceMenu)}>
        <div className={styles.filterLabel}>Giá vé mong muốn</div>
        <div className={styles.filterValue} style={{ fontWeight: price ? 700 : 400, color: price ? "#006D5B" : "#aaa" }}>
          {price || "Chọn mức giá"}
        </div>
        <span className={styles.filterIcon}><PriceIcon /></span>
        <ArrowIcon />
        {showPriceMenu && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem} onClick={(e) => { e.stopPropagation(); setPrice(""); setShowPriceMenu(false); }}>
              Tất cả mức giá
            </div>
            {priceRanges.map((rng, idx) => (
              <div key={idx} className={`${styles.dropdownItem} ${price === rng ? styles.active : ""}`}
                onClick={(e) => { e.stopPropagation(); setPrice(rng); setShowPriceMenu(false); }}>
                {rng}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button className={styles.searchBtn} onClick={handleSearchClick}>
        <SearchIcon />
      </button>
    </div>
  );
};

function Promotion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- STATE MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState({ origin: '', dest: '' });

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
    { id: 7, from: "Thành phố Hà Nội đến", to: "Quy Nhơn", price: "1,150,000", date: "05/01/2026 - 30/04/2026" },
    { id: 8, from: "Thành phố Hồ Chí Minh đến", to: "Vân Đồn", price: "1,450,000", date: "10/12/2025 - 10/03/2026" },
    { id: 9, from: "Thành phố Cần Thơ đến", to: "Hà Nội", price: "1,690,000", date: "01/02/2026 - 01/05/2026" },
    { id: 10, from: "Thành phố Hà Nội đến", to: "Buôn Ma Thuột", price: "850,000", date: "15/01/2026 - 15/04/2026" },
    { id: 11, from: "Thành phố Hồ Chí Minh đến", to: "Thanh Hóa", price: "1,350,000", date: "20/01/2026 - 20/04/2026" },
    { id: 12, from: "Thành phố Đà Nẵng đến", to: "Hải Phòng", price: "920,000", date: "01/03/2026 - 30/06/2026" },
    { id: 13, from: "Thành phố Vinh đến", to: "Nha Trang", price: "1,050,000", date: "10/02/2026 - 10/05/2026" },
    { id: 14, from: "Thành phố Hà Nội đến", to: "Côn Đảo", price: "2,190,000", date: "01/01/2026 - 31/12/2026" },
    { id: 15, from: "Thành phố Hồ Chí Minh đến", to: "Pleiku", price: "790,000", date: "15/02/2026 - 15/05/2026" },
    { id: 16, from: "Phú Quốc đến", to: "Pleiku", price: "690,000", date: "15/02/2026 - 15/05/2026" },
  ];

  const intlFlights = [
    { id: 1, from: "Thành phố Hà Nội đến", to: "Bangkok (Thái Lan)", price: "3,490,000", date: "20/11/2025 - 31/12/2025" },
    { id: 2, from: "Thành phố Hồ Chí Minh đến", to: "Dubai (UAE)", price: "17,900,000", date: "15/12/2025 - 31/03/2026" },
    { id: 3, from: "Thành phố Hồ Chí Minh đến", to: "Kuala Lumpur", price: "3,790,000", date: "20/11/2025 - 30/01/2026" },
    { id: 4, from: "Thành phố Hà Nội đến", to: "Singapore", price: "4,390,000", date: "01/12/2025 - 15/03/2026" },
    { id: 5, from: "Thành phố Hà Nội đến", to: "Seoul (Hàn Quốc)", price: "9,900,000", date: "15/12/2025 - 30/04/2026" },
    { id: 6, from: "Thành phố Hồ Chí Minh đến", to: "Tuscany (Ý)", price: "19,980,000", date: "01/12/2025 - 15/12/2025" },
    { id: 7, from: "Thành phố Hà Nội đến", to: "Paris (Pháp)", price: "21,500,000", date: "10/01/2026 - 31/03/2026" },
    { id: 8, from: "Thành phố Hà Nội đến", to: "Tokyo (Nhật Bản)", price: "12,900,000", date: "01/02/2026 - 31/03/2026" },
    { id: 9, from: "Thành phố Hồ Chí Minh đến", to: "Luân Đôn (Anh)", price: "19,980,000", date: "01/12/2025 - 15/12/2025" },
    { id: 10, from: "Thành phố Đà Nẵng đến", to: "Incheon (Hàn)", price: "8,900,000", date: "01/04/2026 - 30/06/2026" },
    { id: 11, from: "Thành phố Hồ Chí Minh đến", to: "Sydney (Úc)", price: "15,500,000", date: "10/02/2026 - 30/05/2026" },
    { id: 12, from: "Thành phố Hà Nội đến", to: "Frankfurt (Đức)", price: "22,000,000", date: "20/03/2026 - 20/06/2026" },
    { id: 13, from: "Thành phố Phú Quốc đến", to: "Busan (Hàn)", price: "7,500,000", date: "01/01/2026 - 31/03/2026" },
    { id: 14, from: "Thành phố Nha Trang đến", to: "Moscow (Nga)", price: "18,200,000", date: "15/04/2026 - 15/07/2026" },
    { id: 15, from: "Thành phố Hà Nội đến", to: "New York (Mỹ)", price: "29,990,000", date: "01/05/2026 - 30/08/2026" },
  ];

  // Logic lọc và làm sạch từ khóa
  const filterFlights = (flights, criteria) => {
    return flights.filter(flight => {
        const cleanTerm = (term) => {
            if (!term) return "";
            return term.split(" (")[0].toLowerCase().trim();
        };

        const searchOrigin = cleanTerm(criteria.origin);
        const searchDest = cleanTerm(criteria.dest);

        const matchOrigin = criteria.origin 
            ? flight.from.toLowerCase().includes(searchOrigin)
            : true;
        
        const matchDest = criteria.dest 
            ? flight.to.toLowerCase().includes(searchDest)
            : true;
            
        const matchPrice = isPriceInRange(flight.price, criteria.price);

        return matchOrigin && matchDest && matchPrice;
    });
  };

  const filteredDomesticFlights = filterFlights(domesticFlights, domesticFilter);
  const filteredIntlFlights = filterFlights(intlFlights, intlFilter);

  // Xử lý khi click vào vé -> Mở Modal
  const handleTicketClick = (item) => {
    const origin = item.from.replace("Thành phố ", "").replace(" đến", "");
    const dest = item.to;
    setSelectedFlight({ origin, dest });
    setIsModalOpen(true);
  };

  const TicketCard = ({ item }) => (
    <div 
        className={styles.ticketCard}
        onClick={() => handleTicketClick(item)}
        style={{cursor: 'pointer'}}
    >
      <div>
        <div className={styles.cardHeader}>
          <div className={styles.routeInfo}>
            <div className={styles.fromText}>{item.from}</div>
            <div className={styles.toText}>{item.to}</div>
          </div>
          <div className={styles.priceTag}>
            {item.price}<span className={styles.currency}>đ</span>
          </div>
        </div>
        <div className={styles.tag}>Chỗ ngồi có hạn</div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.dateRange}>{item.date}</div>
        <div className={styles.deadline}>
          Hạn chót đăng ký: 23:59' ngày 31/12/2025 hoặc khi hết vé
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.wrapper}>
        
        {/* MODAL */}
        <FlightSearchModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            initialData={selectedFlight}
        />

        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Khám phá ưu đãi mỗi ngày <br /> cùng QAirline</h1>
              <p className={styles.heroDesc}>
                Tiết kiệm nhiều hơn khi đặt vé máy bay và khách sạn đến những
                điểm đến mơ ước. Cùng QAirline biến chuyến đi trong mơ của bạn
                thành hiện thực với mức giá hấp dẫn mỗi ngày!
              </p>
            </div>
            <img src={imgPromo_1} alt="Small Promo" className={styles.heroSmallImg} />
          </div>
          <div className={styles.heroRight}>
            <img src={imgPromo_2} alt="Large Promo" className={styles.heroLargeImg} />
          </div>
        </section>

        <p style={{ fontSize: "0.8rem", fontStyle: "italic", color: "#1b5e20", marginBottom: "40px" }}>
          * Giá vé một chiều, chỉ áp dụng trên web. Không bao gồm hành lý ký gửi. Không có trên tất cả các chuyến bay hoặc ngày bay. Số lượng vé có hạn. Áp dụng các điều kiện.
        </p>

        {/* --- MỤC 1: TRONG NƯỚC --- */}
        <h2 className={styles.sectionTitle}>Ưu đãi bay trong nước</h2>
        
        <PromoSearchBar
          locations={DOMESTIC_LOCATIONS}
          priceRanges={DOMESTIC_PRICE_RANGES}
          onSearch={(criteria) => {
              setDomesticFilter(criteria);
              setVisibleDomestic(9); 
          }}
        />

        <div className={styles.ticketGrid}>
          {filteredDomesticFlights.length > 0 ? (
            filteredDomesticFlights.slice(0, visibleDomestic).map((item) => (
                <TicketCard key={item.id} item={item} />
            ))
          ) : (
             <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '40px', fontStyle: 'italic'}}>
                 Không tìm thấy chuyến bay phù hợp với tiêu chí của bạn.
             </div>
          )}
        </div>

        {visibleDomestic < filteredDomesticFlights.length && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreBtn} onClick={() => setVisibleDomestic((prev) => prev + 6)}>
              Xem thêm ưu đãi
            </button>
          </div>
        )}

        {/* --- MỤC 2: QUỐC TẾ --- */}
        <h2 className={styles.sectionTitle}>Ưu đãi bay quốc tế</h2>
        <PromoSearchBar
          locations={INTERNATIONAL_LOCATIONS}
          priceRanges={INTERNATIONAL_PRICE_RANGES}
          onSearch={(criteria) => {
              setIntlFilter(criteria);
              setVisibleIntl(9);
          }}
        />

        <div className={styles.ticketGrid}>
          {filteredIntlFlights.length > 0 ? (
             filteredIntlFlights.slice(0, visibleIntl).map((item) => (
                <TicketCard key={item.id} item={item} />
             ))
          ) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '40px', fontStyle: 'italic'}}>
                 Không tìm thấy chuyến bay phù hợp với tiêu chí của bạn.
             </div>
          )}
        </div>
        
        {visibleIntl < filteredIntlFlights.length && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreBtn} onClick={() => setVisibleIntl((prev) => prev + 6)}>
              Xem thêm ưu đãi
            </button>
          </div>
        )}
      </main>

    </div>
  );
}

export default Promotion;