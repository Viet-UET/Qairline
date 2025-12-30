import React, { useState, useRef, useEffect } from "react";
import styles from "./FlightSearch.module.css";
import { Link } from 'react-router-dom';

// ICON COMPONENTS (Giữ nguyên)
const PlaneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const LocationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#529246"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#529246"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const InfoIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const WarningIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const ErrorIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
const ArrowIcon = () => <span className={styles.arrowIcon}>▼</span>;

const LOCATIONS = [
  "Hà Nội (HAN)",
  "Hồ Chí Minh (SGN)",
  "Đà Nẵng (DAD)",
  "Nha Trang (CXR)",
  "Phú Quốc (PQC)",
  "Huế (HUI)",
  "Đà Lạt (DLI)",
  "Hải Phòng (HPH)",
  "Cần Thơ (VCA)",
  "Bangkok (BKK)",
  "Singapore (SIN)",
  "Seoul (ICN)",
  "Tokyo (NRT)",
];

const TICKET_CLASSES = ["Phổ thông", "Thương gia", "Đặc biệt"];

// [CHỈNH SỬA] Nhận props initialOrigin và initialDest
function FlightSearch({ initialOrigin, initialDest }) {
  // STATE
  // [CHỈNH SỬA] Khởi tạo state với giá trị từ props (nếu có)
  const [origin, setOrigin] = useState(initialOrigin || "");
  const [destination, setDestination] = useState(initialDest || "");
  
  const [dateVal, setDateVal] = useState("");
  const [dateError, setDateError] = useState("");
  const [ticketType, setTicketType] = useState("Khứ hồi");
  const [ticketClass, setTicketClass] = useState("Phổ thông");
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  // MENU VISIBILITY
  const [showOriginMenu, setShowOriginMenu] = useState(false);
  const [showDestMenu, setShowDestMenu] = useState(false);
  const [showTicketTypeMenu, setShowTicketTypeMenu] = useState(false);
  const [showTicketClassMenu, setShowTicketClassMenu] = useState(false);
  const [showPassengerMenu, setShowPassengerMenu] = useState(false);

  // REFS
  const originRef = useRef(null);
  const destRef = useRef(null);
  const dateInputRef = useRef(null);
  const ticketTypeRef = useRef(null);
  const ticketClassRef = useRef(null);
  const passengerRef = useRef(null);

  // [THÊM MỚI] useEffect để cập nhật state khi props thay đổi
  // Giúp điền tự động khi người dùng click vào các thẻ vé khác nhau
  useEffect(() => {
    if (initialOrigin !== undefined) setOrigin(initialOrigin);
    if (initialDest !== undefined) setDestination(initialDest);
  }, [initialOrigin, initialDest]);

  // CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (originRef.current && !originRef.current.contains(event.target))
        setShowOriginMenu(false);
      if (destRef.current && !destRef.current.contains(event.target))
        setShowDestMenu(false);
      if (
        ticketTypeRef.current &&
        !ticketTypeRef.current.contains(event.target)
      )
        setShowTicketTypeMenu(false);
      if (
        ticketClassRef.current &&
        !ticketClassRef.current.contains(event.target)
      )
        setShowTicketClassMenu(false);
      if (passengerRef.current && !passengerRef.current.contains(event.target))
        setShowPassengerMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePassenger = (type, operation) => {
    setPassengers((prev) => {
      const newValue = operation === "inc" ? prev[type] + 1 : prev[type] - 1;
      if (type === "adult" && newValue < 1) return prev;
      if (newValue < 0) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDateVal(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(selectedDate) < today) {
      setDateError("Ngày đi không được nhỏ hơn ngày hiện tại");
    } else {
      setDateError("");
    }
  };

  const getDropdownList = (inputValue) => {
    const isExactMatch = LOCATIONS.includes(inputValue);
    if (isExactMatch || inputValue === "") return LOCATIONS;
    return LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const currentOriginList = getDropdownList(origin);
  const currentDestList = getDropdownList(destination);

  const showChildWarning = passengers.child >= 1;
  const showInfantWarning = passengers.infant >= 1;
  const showSameLocationWarning =
    origin && destination && origin === destination;
  const hasAnyWarning =
    showChildWarning || showInfantWarning || showSameLocationWarning;

  // --- LOGIC HIỂN THỊ TEXT HÀNH KHÁCH MỚI ---
  const renderPassengerText = () => {
    const total = passengers.adult + passengers.child + passengers.infant;
    const details = [];
    if (passengers.child > 0) details.push(`${passengers.child} trẻ em`);
    if (passengers.infant > 0) details.push(`${passengers.infant} sơ sinh`);

    return (
      <div className={styles.inputValue}>
        {total} Hành khách
        {details.length > 0 && (
          <span className={styles.passengerDetail}>({details.join(", ")})</span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>
          <PlaneIcon /> Tìm kiếm chuyến bay
        </div>
      </div>

      <div className={styles.topRow}>
        <div className={styles.boxStyle} ref={originRef}>
          <label className={styles.label}>Điểm khởi hành</label>
          <input
            type="text"
            className={styles.inputValue}
            placeholder="Chọn điểm đi"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setShowOriginMenu(true);
            }}
            onFocus={() => setShowOriginMenu(true)}
            onClick={() => setShowOriginMenu(true)}
          />
          <span className={styles.iconRight}>
            <LocationIcon />
          </span>
          {showOriginMenu && (
            <div className={styles.dropdownMenu}>
              {currentOriginList.length > 0 ? (
                currentOriginList.map((loc, idx) => (
                  <div
                    key={idx}
                    className={`${styles.menuItem} ${
                      loc === origin ? styles.active : ""
                    }`}
                    onClick={() => {
                      setOrigin(loc);
                      setShowOriginMenu(false);
                    }}
                  >
                    {loc}
                  </div>
                ))
              ) : (
                <div className={styles.menuItem} style={{ color: "#999" }}>
                  Không tìm thấy
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.boxStyle} ref={destRef}>
          <label className={styles.label}>Điểm đến</label>
          <input
            type="text"
            className={styles.inputValue}
            placeholder="Chọn điểm đến"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestMenu(true);
            }}
            onFocus={() => setShowDestMenu(true)}
            onClick={() => setShowDestMenu(true)}
          />
          <span className={styles.iconRight}>
            <LocationIcon />
          </span>
          {showDestMenu && (
            <div className={styles.dropdownMenu}>
              {currentDestList.length > 0 ? (
                currentDestList.map((loc, idx) => (
                  <div
                    key={idx}
                    className={`${styles.menuItem} ${
                      loc === destination ? styles.active : ""
                    }`}
                    onClick={() => {
                      setDestination(loc);
                      setShowDestMenu(false);
                    }}
                  >
                    {loc}
                  </div>
                ))
              ) : (
                <div className={styles.menuItem} style={{ color: "#999" }}>
                  Không tìm thấy
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`${styles.boxStyle} ${dateError ? styles.error : ""}`}
          onClick={() =>
            dateInputRef.current && dateInputRef.current.showPicker()
          }
        >
          <label className={styles.label}>Thời gian xuất phát</label>
          <input
            ref={dateInputRef}
            type="date"
            className={`${styles.inputValue} ${styles.dateInput}`}
            value={dateVal}
            onChange={handleDateChange}
          />
          <span className={styles.iconRight}>
            <CalendarIcon />
          </span>
          {dateError && <span className={styles.dateError}>{dateError}</span>}
        </div>

        <button className={styles.searchBtn}>
          <SearchIcon />
        </button>
      </div>

      <div className={styles.bottomRow}>
        <div
          className={styles.boxStyle}
          ref={ticketTypeRef}
          onClick={() => setShowTicketTypeMenu(!showTicketTypeMenu)}
        >
          <label className={styles.label}>Loại vé</label>
          <div className={styles.inputValue}>{ticketType}</div>
          <ArrowIcon />
          {showTicketTypeMenu && (
            <div className={styles.dropdownMenu}>
              {["Khứ hồi", "Một chiều"].map((type) => (
                <div
                  key={type}
                  className={`${styles.menuItem} ${
                    ticketType === type ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTicketType(type);
                    setShowTicketTypeMenu(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={styles.boxStyle}
          ref={ticketClassRef}
          onClick={() => setShowTicketClassMenu(!showTicketClassMenu)}
        >
          <label className={styles.label}>Hạng vé</label>
          <div className={styles.inputValue}>{ticketClass}</div>
          <ArrowIcon />
          {showTicketClassMenu && (
            <div className={styles.dropdownMenu}>
              {TICKET_CLASSES.map((cls) => (
                <div
                  key={cls}
                  className={`${styles.menuItem} ${
                    ticketClass === cls ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTicketClass(cls);
                    setShowTicketClassMenu(false);
                  }}
                >
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={styles.boxStyle}
          ref={passengerRef}
          onClick={() => setShowPassengerMenu(!showPassengerMenu)}
        >
          <label className={styles.label}>Hành khách</label>
          {/* Gọi hàm render mới để hiển thị chi tiết */}
          {renderPassengerText()}

          <ArrowIcon />
          {showPassengerMenu && (
            <div
              className={`${styles.dropdownMenu} ${styles.passengerMenu}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.passengerItem}>
                <span className={styles.pType}>Người lớn</span>
                <div className={styles.counterControl}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => updatePassenger("adult", "dec")}
                  >
                    -
                  </button>
                  <span className={styles.counterVal}>{passengers.adult}</span>
                  <button
                    className={`${styles.counterBtn} ${styles.plus}`}
                    onClick={() => updatePassenger("adult", "inc")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles.passengerItem}>
                <div>
                  <span className={styles.pType}>Trẻ em</span>
                  <span className={styles.pSub}>2 - 11 tuổi</span>
                </div>
                <div className={styles.counterControl}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => updatePassenger("child", "dec")}
                  >
                    -
                  </button>
                  <span className={styles.counterVal}>{passengers.child}</span>
                  <button
                    className={`${styles.counterBtn} ${styles.plus}`}
                    onClick={() => updatePassenger("child", "inc")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles.passengerItem}>
                <div>
                  <span className={styles.pType}>Trẻ sơ sinh</span>
                  <span className={styles.pSub}>&lt; 2 tuổi</span>
                </div>
                <div className={styles.counterControl}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => updatePassenger("infant", "dec")}
                  >
                    -
                  </button>
                  <span className={styles.counterVal}>{passengers.infant}</span>
                  <button
                    className={`${styles.counterBtn} ${styles.plus}`}
                    onClick={() => updatePassenger("infant", "inc")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.boxStyle}>
          <label className={styles.label}>Mã ưu đãi (nếu có)</label>
          <input
            type="text"
            className={styles.inputValue}
            placeholder="Nhập mã..."
          />
        </div>
      </div>

      {hasAnyWarning && (
        <div className={styles.warningSection}>
          {showSameLocationWarning && (
            <div className={`${styles.alertBox} ${styles.redAlert}`}>
              <ErrorIcon />{" "}
              <div>
                <strong>Lỗi chọn chuyến:</strong> Điểm khởi hành và điểm đến
                không được trùng nhau.
              </div>
            </div>
          )}
          {showChildWarning && (
            <div className={`${styles.alertBox} ${styles.greenAlert}`}>
              <InfoIcon />{" "}
              <div>
                <strong>Bay cùng gia đình?</strong> Hãy chắc chắn rằng quý khách
                đã chuẩn bị một cách có tổ chức và sẵn sàng đi cùng con cái của
                mình — hãy đọc lời khuyên và hướng dẫn của chúng tôi tại mục{" "}
                {/* LINK ĐẾN MỤC GIA ĐÌNH */}
                <Link to="/terms#family" style={{color: 'inherit', textDecoration: 'underline', fontWeight: 'bold'}}>
                    Đi cùng gia đình
                </Link>.
              </div>
            </div>
          )}
          {showInfantWarning && (
            <>
              <div className={`${styles.alertBox} ${styles.greenAlert}`}>
                <InfoIcon />{" "}
                <div>
                  <strong>Thông tin trẻ sơ sinh:</strong> Trước khi quý khách
                  đặt chỗ, vui lòng đọc hướng dẫn về đặt chỗ cho trẻ sơ sinh,
                  hạn mức hành lý ký gửi, phí cho trẻ sơ sinh và nhiều thông tin
                  khác tại mục {/* LINK ĐẾN MỤC SƠ SINH */}
                <Link to="/terms#infant" style={{color: 'inherit', textDecoration: 'underline', fontWeight: 'bold'}}>
                    Đi cùng trẻ sơ sinh
                </Link>.
                </div>
              </div>
              <div className={`${styles.alertBox} ${styles.yellowAlert}`}>
                <WarningIcon />{" "}
                <div>Một người lớn có thể đi cùng tối đa 1 trẻ sơ sinh...</div>
              </div>
              <div className={`${styles.alertBox} ${styles.yellowAlert}`}>
                <WarningIcon />{" "}
                <div>
                  Vì lý do an toàn, chỉ cho phép 2 trẻ sơ sinh ngồi trong lòng
                  người lớn...
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;