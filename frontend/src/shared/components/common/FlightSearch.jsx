import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAirports } from '../../../api/airports';
import { normalizeString } from '../../../shared/utils/string';

// ICON COMPONENTS
const PlaneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#529246" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#529246" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const ErrorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
const ArrowIcon = () => (
    <svg className="absolute right-[15px] top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const TICKET_CLASSES = ["Phổ thông", "Thương gia", "Đặc biệt"];

// Mapping for display cities with accents
const cityDisplayMap = {
  'HAN': 'Hà Nội',
  'SGN': 'Hồ Chí Minh',
  // Add more mappings as needed for other airports
};

function FlightSearch({ initialOrigin, initialDest }) {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [airportsError, setAirportsError] = useState(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [dateVal, setDateVal] = useState("");
  const [dateError, setDateError] = useState("");
  const [ticketType, setTicketType] = useState("Khứ hồi");
  const [ticketClass, setTicketClass] = useState("Phổ thông");
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const [showOriginMenu, setShowOriginMenu] = useState(false);
  const [showDestMenu, setShowDestMenu] = useState(false);
  const [showTicketTypeMenu, setShowTicketTypeMenu] = useState(false);
  const [showTicketClassMenu, setShowTicketClassMenu] = useState(false);
  const [showPassengerMenu, setShowPassengerMenu] = useState(false);

  const originRef = useRef(null);
  const destRef = useRef(null);
  const dateInputRef = useRef(null);
  const ticketTypeRef = useRef(null);
  const ticketClassRef = useRef(null);
  const passengerRef = useRef(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirports();
        setAirports(data);
      } catch (err) {
        console.error("Failed to fetch airports:", err);
        setAirports([]);
        setAirportsError("Không thể tải danh sách sân bay");
      }
    };
    fetchAirports();
  }, []);

  useEffect(() => {
    if (initialOrigin !== undefined) setOriginInput(initialOrigin);
    if (initialDest !== undefined) setDestinationInput(initialDest);
  }, [initialOrigin, initialDest]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (originRef.current && !originRef.current.contains(event.target)) setShowOriginMenu(false);
      if (destRef.current && !destRef.current.contains(event.target)) setShowDestMenu(false);
      if (ticketTypeRef.current && !ticketTypeRef.current.contains(event.target)) setShowTicketTypeMenu(false);
      if (ticketClassRef.current && !ticketClassRef.current.contains(event.target)) setShowTicketClassMenu(false);
      if (passengerRef.current && !passengerRef.current.contains(event.target)) setShowPassengerMenu(false);
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
    if (!inputValue.trim()) return airports.map(a => ({ label: `${cityDisplayMap[a.code] || a.city} (${a.code})`, value: { cityRaw: a.city, code: a.code } }));
    const normalizedQuery = normalizeString(inputValue);
    return airports
      .filter(a =>
        normalizeString(a.city).includes(normalizedQuery) ||
        normalizeString(a.code).includes(normalizedQuery) ||
        normalizeString(a.name).includes(normalizedQuery)
      )
      .map(a => ({ label: `${cityDisplayMap[a.code] || a.city} (${a.code})`, value: { cityRaw: a.city, code: a.code } }));
  };

  const currentOriginList = getDropdownList(originInput);
  const currentDestList = getDropdownList(destinationInput);

  const showChildWarning = passengers.child >= 1;
  const showInfantWarning = passengers.infant >= 1;
  const showSameLocationWarning = selectedOrigin && selectedDestination && selectedOrigin.cityRaw === selectedDestination.cityRaw;
  const hasAnyWarning = showChildWarning || showInfantWarning || showSameLocationWarning;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedOrigin || !selectedDestination || selectedOrigin.cityRaw === selectedDestination.cityRaw) return;
    const totalPassengers = passengers.adult + passengers.child + passengers.infant;
    navigate(`/flights/${encodeURIComponent(selectedOrigin.cityRaw)}/${encodeURIComponent(selectedDestination.cityRaw)}/${dateVal}/${totalPassengers}`);
  };

  const renderPassengerText = () => {
    const total = passengers.adult + passengers.child + passengers.infant;
    const details = [];
    if (passengers.child > 0) details.push(`${passengers.child} trẻ em`);
    if (passengers.infant > 0) details.push(`${passengers.infant} sơ sinh`);

    return (
      <div className="text-qa-green font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis">
        {total} Hành khách
        {details.length > 0 && (
          <span className="text-sm text-gray-500 font-normal ml-1">({details.join(", ")})</span>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto my-5 bg-white p-5 rounded-2xl shadow-lg relative z-20">
      <div className="relative w-full text-center border-b-2 border-gray-200 mb-6">
        <div className="inline-flex items-center gap-2.5 text-xl text-qa-green font-bold pb-2.5 border-b-[2.5px] border-qa-green -mb-px relative z-10">
          <PlaneIcon /> Tìm kiếm chuyến bay
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_1.2fr_1fr_54px] gap-4 mb-5">
        {/* Origin */}
        <div className="relative border-2 border-gray-300 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green" ref={originRef}>
          <label className="text-xs text-gray-500 mb-0.5">Điểm khởi hành</label>
          <input
            type="text"
            className="border-none outline-none bg-transparent w-full text-qa-green font-bold text-base"
            placeholder="Chọn điểm đi"
            value={originInput}
            onChange={(e) => { setOriginInput(e.target.value); setShowOriginMenu(true); }}
            onFocus={() => setShowOriginMenu(true)}
            onClick={() => setShowOriginMenu(true)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-qa-green pointer-events-none"><LocationIcon /></span>
          {showOriginMenu && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white border border-qa-green rounded-xl p-1 shadow-lg z-50 max-h-72 overflow-y-auto">
              {airportsError ? (
                <div className="p-2.5 text-red-500">{airportsError}</div>
              ) : currentOriginList.length > 0 ? (
                currentOriginList.map((loc, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100 ${selectedOrigin && loc.value.cityRaw === selectedOrigin.cityRaw ? 'bg-qa-green text-white' : ''}`}
                    onClick={() => { setSelectedOrigin(loc.value); setOriginInput(loc.label); setShowOriginMenu(false); }}
                  >
                    {loc.label}
                  </div>
                ))
              ) : (
                <div className="p-2.5 text-gray-400">Không tìm thấy</div>
              )}
            </div>
          )}
        </div>
        
        {/* Destination */}
        <div className="relative border-2 border-gray-300 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green" ref={destRef}>
            <label className="text-xs text-gray-500 mb-0.5">Điểm đến</label>
            <input
                type="text"
                className="border-none outline-none bg-transparent w-full text-qa-green font-bold text-base"
                placeholder="Chọn điểm đến"
                value={destinationInput}
                onChange={(e) => { setDestinationInput(e.target.value); setShowDestMenu(true); }}
                onFocus={() => setShowDestMenu(true)}
                onClick={() => setShowDestMenu(true)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-qa-green pointer-events-none"><LocationIcon /></span>
            {showDestMenu && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white border border-qa-green rounded-xl p-1 shadow-lg z-50 max-h-72 overflow-y-auto">
                {airportsError ? (
                  <div className="p-2.5 text-red-500">{airportsError}</div>
                ) : currentDestList.length > 0 ? (
                    currentDestList.map((loc, idx) => (
                    <div
                        key={idx}
                        className={`p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100 ${selectedDestination && loc.value.cityRaw === selectedDestination.cityRaw ? 'bg-qa-green text-white' : ''}`}
                        onClick={() => { setSelectedDestination(loc.value); setDestinationInput(loc.label); setShowDestMenu(false); }}
                    >
                        {loc.label}
                    </div>
                    ))
                ) : (
                    <div className="p-2.5 text-gray-400">Không tìm thấy</div>
                )}
                </div>
            )}
        </div>

        {/* Date */}
        <div className={`relative border-2 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer ${dateError ? 'border-red-600 bg-red-50' : 'border-gray-300 focus-within:border-qa-green'}`} onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}>
            <label className="text-xs text-gray-500 mb-0.5">Thời gian xuất phát</label>
            <input
                ref={dateInputRef}
                type="date"
                className="font-sans accent-qa-green text-qa-green font-bold bg-transparent outline-none w-full h-full opacity-100 cursor-pointer"
                value={dateVal}
                onChange={handleDateChange}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-qa-green pointer-events-none"><CalendarIcon /></span>
            {dateError && <span className="absolute -bottom-5 left-0 text-xs text-red-600 font-bold">{dateError}</span>}
        </div>

        {/* Search Button */}
        <button onClick={handleSearch} className="w-[54px] h-[54px] bg-qa-green rounded-xl border-none text-white text-2xl flex items-center justify-center cursor-pointer transition-colors hover:bg-green-800">
            <SearchIcon />
        </button>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr] gap-4 mb-5">
        {/* Ticket Type */}
        <div className="relative border-2 border-gray-300 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green" ref={ticketTypeRef} onClick={() => setShowTicketTypeMenu(!showTicketTypeMenu)}>
            <label className="text-xs text-gray-500 mb-0.5">Loại vé</label>
            <div className="text-qa-green font-bold text-base">{ticketType}</div>
            <ArrowIcon />
            {showTicketTypeMenu && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white border border-qa-green rounded-xl p-1 shadow-lg z-50">
                {["Khứ hồi", "Một chiều"].map((type) => (
                    <div
                        key={type}
                        className={`p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100 ${ticketType === type ? 'bg-qa-green text-white' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setTicketType(type); setShowTicketTypeMenu(false); }}
                    >
                        {type}
                    </div>
                ))}
                </div>
            )}
        </div>

        {/* Ticket Class */}
        <div className="relative border-2 border-gray-300 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green" ref={ticketClassRef} onClick={() => setShowTicketClassMenu(!showTicketClassMenu)}>
            <label className="text-xs text-gray-500 mb-0.5">Hạng vé</label>
            <div className="text-qa-green font-bold text-base">{ticketClass}</div>
            <ArrowIcon />
            {showTicketClassMenu && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white border border-qa-green rounded-xl p-1 shadow-lg z-50">
                {TICKET_CLASSES.map((cls) => (
                    <div
                        key={cls}
                        className={`p-2.5 rounded-lg text-qa-green font-semibold cursor-pointer mb-0.5 text-sm transition-colors hover:bg-gray-100 ${ticketClass === cls ? 'bg-qa-green text-white' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setTicketClass(cls); setShowTicketClassMenu(false); }}
                    >
                        {cls}
                    </div>
                ))}
                </div>
            )}
        </div>

        {/* Passengers */}
        <div className="relative border-2 border-gray-300 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green" ref={passengerRef} onClick={() => setShowPassengerMenu(!showPassengerMenu)}>
            <label className="text-xs text-gray-500 mb-0.5">Hành khách</label>
            {renderPassengerText()}
            <ArrowIcon />
            {showPassengerMenu && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-white border border-qa-green rounded-xl shadow-lg z-50 cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                        <span className="font-bold text-sm text-qa-green">Người lớn</span>
                        <div className="flex items-center gap-2.5">
                            <button className="w-7 h-7 rounded-full border-2 border-red-600 text-red-600 bg-white cursor-pointer flex items-center justify-center font-bold transition-all hover:bg-red-50 hover:scale-110 active:scale-95" onClick={() => updatePassenger("adult", "dec")}>-</button>
                            <span className="font-bold w-5 text-center text-gray-700">{passengers.adult}</span>
                            <button className="w-7 h-7 rounded-full border-2 border-qa-green text-qa-green bg-white cursor-pointer flex items-center justify-center font-bold transition-all hover:bg-green-50 hover:scale-110 active:scale-95" onClick={() => updatePassenger("adult", "inc")}>+</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div>
                            <span className="font-bold text-sm text-qa-green block">Trẻ em</span>
                            <span className="text-xs text-gray-400 block">2 - 11 tuổi</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <button className="w-7 h-7 rounded-full border-2 border-red-600 text-red-600 bg-white cursor-pointer flex items-center justify-center font-bold transition-all hover:bg-red-50 hover:scale-110 active:scale-95" onClick={() => updatePassenger("child", "dec")}>-</button>
                            <span className="font-bold w-5 text-center text-gray-700">{passengers.child}</span>
                            <button className="w-7 h-7 rounded-full border-2 border-qa-green text-qa-green bg-white cursor-pointer flex items-center justify-center font-bold transition-all hover:bg-green-50 hover:scale-110 active:scale-95" onClick={() => updatePassenger("child", "inc")}>+</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                            <span className="font-bold text-sm text-qa-green block">Trẻ sơ sinh</span>
                            <span className="text-xs text-gray-400 block">&lt; 2 tuổi</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <button className="w-7 h-7 rounded-full border-2 border-red-600 text-red-600 bg-white cursor-pointer flex items-center justify-center font-bold transition-all hover:bg-red-50 hover:scale-110 active:scale-95" onClick={() => updatePassenger("infant", "dec")}>-</button>
                            <span className="font-bold w-5 text-center text-gray-700">{passengers.infant}</span>
                            <button className="w-7 h-7 rounded-full border-2 border-qa-green text-qa-green bg-white cursor-pointer flex items-center justify-center font-bold transition-all hover:bg-green-50 hover:scale-110 active:scale-95" onClick={() => updatePassenger("infant", "inc")}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Promo Code */}
        <div className="relative border-2 border-gray-300 rounded-lg px-4 flex flex-col justify-center h-[54px] bg-white cursor-pointer focus-within:border-qa-green">
            <label className="text-xs text-gray-500 mb-0.5">Mã ưu đãi (nếu có)</label>
            <input type="text" className="border-none outline-none bg-transparent w-full text-qa-green font-bold text-base" placeholder="Nhập mã..." />
        </div>
      </div>

      {hasAnyWarning && (
        <div className="mt-5 border-t border-gray-200 pt-5 flex flex-col gap-2.5 animate-fadeIn">
          {showSameLocationWarning && (
            <div className="p-3 rounded-lg flex items-start gap-2.5 leading-snug text-sm bg-red-50 border-2 border-red-100 text-red-800">
              <ErrorIcon />
              <div><strong>Lỗi chọn chuyến:</strong> Điểm khởi hành và điểm đến không được trùng nhau.</div>
            </div>
          )}
          {showChildWarning && (
            <div className="p-3 rounded-lg flex items-start gap-2.5 leading-snug text-sm bg-green-50 border-2 border-green-100 text-green-800">
              <InfoIcon />
              <div><strong>Bay cùng gia đình?</strong> Hãy chắc chắn rằng quý khách đã chuẩn bị một cách có tổ chức và sẵn sàng đi cùng con cái của mình — hãy đọc lời khuyên và hướng dẫn của chúng tôi tại mục <Link to="/terms#family" className="underline font-bold">Đi cùng gia đình</Link>.</div>
            </div>
          )}
          {showInfantWarning && (
            <>
              <div className="p-3 rounded-lg flex items-start gap-2.5 leading-snug text-sm bg-green-50 border-2 border-green-100 text-green-800">
                <InfoIcon />
                <div><strong>Thông tin trẻ sơ sinh:</strong> Trước khi quý khách đặt chỗ, vui lòng đọc hướng dẫn về đặt chỗ cho trẻ sơ sinh, hạn mức hành lý ký gửi, phí cho trẻ sơ sinh và nhiều thông tin khác tại mục <Link to="/terms#infant" className="underline font-bold">Đi cùng trẻ sơ sinh</Link>.</div>
              </div>
              <div className="p-3 rounded-lg flex items-start gap-2.5 leading-snug text-sm bg-yellow-50 border-2 border-yellow-100 text-yellow-800">
                <WarningIcon />
                <div>Một người lớn có thể đi cùng tối đa 1 trẻ sơ sinh...</div>
              </div>
              <div className="p-3 rounded-lg flex items-start gap-2.5 leading-snug text-sm bg-yellow-50 border-2 border-yellow-100 text-yellow-800">
                <WarningIcon />
                <div>Vì lý do an toàn, chỉ cho phép 2 trẻ sơ sinh ngồi trong lòng người lớn...</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
