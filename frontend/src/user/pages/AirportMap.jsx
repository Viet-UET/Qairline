import React, { useEffect, useState } from 'react';
import Header from '../../shared/components/layout/Header';
import { getAirports } from '../../api/airports';

// IMPORT ẢNH
import imgHero from '../../shared/assets/images/home/plane_2.png';
// Note: Map images not available in target assets, using placeholders
// import imgMapDomestic from '../../shared/assets/images/home/domestic.jpg';
// import imgMapWorld from '../../shared/assets/images/home/international.png';

// --- DỮ LIỆU SÂN BAY & ĐƯỜNG BAY (Trích xuất từ Promotion.js) ---

// 1. Danh sách các đường bay khai thác (Dùng để hiển thị list)
const DOMESTIC_ROUTES = [
    "Hà Nội ↔ TP. Hồ Chí Minh", "Hà Nội ↔ Đà Nẵng", "Hà Nội ↔ Phú Quốc",
    "Hà Nội ↔ Nha Trang", "Hà Nội ↔ Huế", "Hà Nội ↔ Quy Nhơn",
    "Hà Nội ↔ Buôn Ma Thuột", "Hà Nội ↔ Côn Đảo", "TP. Hồ Chí Minh ↔ Đà Nẵng",
    "TP. Hồ Chí Minh ↔ Hà Nội", "TP. Hồ Chí Minh ↔ Phú Quốc", "TP. Hồ Chí Minh ↔ Đà Lạt",
    "TP. Hồ Chí Minh ↔ Thanh Hóa", "TP. Hồ Chí Minh ↔ Vân Đồn", "TP. Hồ Chí Minh ↔ Pleiku"
];

const INT_ROUTES = [
    "Hà Nội ↔ Bangkok (Thái Lan)", "Hà Nội ↔ Singapore", "Hà Nội ↔ Seoul (Hàn Quốc)",
    "Hà Nội ↔ Tokyo (Nhật Bản)", "Hà Nội ↔ Paris (Pháp)", "Hà Nội ↔ Frankfurt (Đức)",
    "Hà Nội ↔ New York (Mỹ)", "TP. Hồ Chí Minh ↔ Dubai (UAE)", "TP. Hồ Chí Minh ↔ Kuala Lumpur",
    "TP. Hồ Chí Minh ↔ Sydney (Úc)", "TP. Hồ Chí Minh ↔ London (Anh)", "Đà Nẵng ↔ Incheon (Hàn Quốc)"
];

// 2. Danh sách Sân bay liên kết (Đầy đủ hơn)
const INTERNATIONAL_AIRPORTS = [
    { code: "BKK", name: "Suvarnabhumi", city: "Bangkok, Thái Lan", web: "https://suvarnabhumi.airportthai.co.th/" },
    { code: "SIN", name: "Changi Airport", city: "Singapore", web: "https://www.changiairport.com/" },
    { code: "ICN", name: "Incheon Intl", city: "Seoul, Hàn Quốc", web: "https://www.airport.kr/" },
    { code: "NRT", name: "Narita Intl", city: "Tokyo, Nhật Bản", web: "https://www.narita-airport.jp/" },
    { code: "CDG", name: "Charles de Gaulle", city: "Paris, Pháp", web: "https://www.parisaeroport.fr/" },
    { code: "LHR", name: "Heathrow", city: "London, Anh", web: "https://www.heathrow.com/" },
    { code: "DXB", name: "Dubai International", city: "Dubai, UAE", web: "https://www.dubaiairports.ae/" },
    { code: "SYD", name: "Sydney Airport", city: "Sydney, Úc", web: "https://www.sydneyairport.com.au/" },
];

// ICON Component
const PlaneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
);

const LocationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

function AirportMap() {
    const [domesticAirports, setDomesticAirports] = useState([]);
    const [loadingAirports, setLoadingAirports] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchAirports = async () => {
            setLoadingAirports(true);
            try {
                const data = await getAirports();
                const mapped = data.map(airport => ({
                    code: airport.code,
                    name: airport.name,
                    city: airport.city,
                    web: '#' // placeholder
                }));
                setDomesticAirports(mapped);
            } catch (error) {
                console.error('Error fetching airports:', error);
                setDomesticAirports([]);
            } finally {
                setLoadingAirports(false);
            }
        };
        fetchAirports();
    }, []);

    return (
        <div className="w-full bg-[#fcfcfc] font-['Afacad'] text-[#333]">
            <Header />
            <div className="relative w-full h-[650px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center text-white" style={{backgroundImage: `url(${imgHero})`}}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#004D40]/70 to-[#004D40]/40 z-10"></div>
                <div className="relative z-20 max-w-[800px] px-5">
                    <h1 className="text-6xl font-bold mb-4 uppercase tracking-wider">Mạng lưới đường bay</h1>
                    <p className="text-2xl font-normal mb-0 opacity-90">
                        QAirline tự hào kết nối bạn đến hơn 50 điểm đến hấp dẫn trong nước và quốc tế.
                    </p>
                </div>
            </div>

            {/* --- STATS --- */}
            <div className="grid grid-cols-4 gap-[30px] text-center -mt-[50px] relative z-20 bg-white p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] max-w-[1100px] mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-5xl text-[#529246] font-bold m-0">50+</h3>
                    <p className="text-lg text-[#555] font-semibold uppercase mt-1.5">Điểm đến</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-5xl text-[#529246] font-bold m-0">20+</h3>
                    <p className="text-lg text-[#555] font-semibold uppercase mt-1.5">Quốc gia & Vùng lãnh thổ</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-5xl text-[#529246] font-bold m-0">400+</h3>
                    <p className="text-lg text-[#555] font-semibold uppercase mt-1.5">Chuyến bay mỗi ngày</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-5xl text-[#529246] font-bold m-0">10M+</h3>
                    <p className="text-lg text-[#555] font-semibold uppercase mt-1.5">Hành khách mỗi năm</p>
                </div>
            </div>

            {/* --- 1. GIỚI THIỆU ĐƯỜNG BAY ĐANG KHAI THÁC --- */}
            <section className="max-w-[1200px] mx-auto px-5 py-20 bg-white">
                <div className="text-center mb-[50px]">
                    <h2 className="text-5xl text-[#004D40] font-bold mb-4 relative inline-block after:content-[''] after:block after:w-[60px] after:h-1 after:bg-[#529246] after:mx-auto after:mt-2.5 after:rounded-sm">Các đường bay trọng điểm</h2>
                    <p className="text-xl text-[#666] max-w-[700px] mx-auto m-0">
                        QAirline tự hào mang đến mạng lưới kết nối rộng khắp, giúp bạn dễ dàng di chuyển
                        giữa các trung tâm kinh tế, văn hóa và du lịch lớn.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-[60px]">
                    {/* Cột Nội Địa */}
                    <div>
                        <h3 className="text-3xl text-[#004D40] mb-6 border-l-4 border-[#529246] pl-4">Đường bay Nội địa</h3>
                        <ul className="list-none p-0 grid grid-cols-2 gap-4">
                            {DOMESTIC_ROUTES.map((route, idx) => (
                                <li key={idx} className="text-lg text-[#444] p-2.5 bg-white border border-[#eee] rounded-lg flex items-center gap-2.5 transition-all duration-200 hover:border-[#529246] hover:translate-x-1.5 hover:text-[#006D5B] hover:bg-[#f9fff9]">
                                    <PlaneIcon /> {route}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột Quốc Tế */}
                    <div>
                        <h3 className="text-3xl text-[#004D40] mb-6 border-l-4 border-[#529246] pl-4">Đường bay Quốc tế</h3>
                        <ul className="list-none p-0 grid grid-cols-2 gap-4">
                            {INT_ROUTES.map((route, idx) => (
                                <li key={idx} className="text-lg text-[#444] p-2.5 bg-white border border-[#eee] rounded-lg flex items-center gap-2.5 transition-all duration-200 hover:border-[#529246] hover:translate-x-1.5 hover:text-[#006D5B] hover:bg-[#f9fff9]">
                                    <PlaneIcon /> {route}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sơ đồ chuyến bay (Ảnh) - Using placeholder for now */}
                <div className="mt-[60px] text-center">
                    <h2 className="text-5xl text-[#004D40] font-bold mb-4 relative inline-block after:content-[''] after:block after:w-[60px] after:h-1 after:bg-[#529246] after:mx-auto after:mt-2.5 after:rounded-sm">Sơ đồ mạng lưới đường bay Nội địa</h2>
                    <div className="w-full max-w-[900px] h-[400px] bg-gray-200 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-10 border-4 border-white mx-auto flex items-center justify-center text-gray-500">
                        Map Image Placeholder - Domestic Routes
                    </div>

                    <h2 className="text-5xl text-[#004D40] font-bold mb-4 relative inline-block after:content-[''] after:block after:w-[60px] after:h-1 after:bg-[#529246] after:mx-auto after:mt-2.5 after:rounded-sm">Sơ đồ mạng lưới đường bay Quốc tế</h2>
                    <div className="w-full max-w-[900px] h-[400px] bg-gray-200 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-10 border-4 border-white mx-auto flex items-center justify-center text-gray-500">
                        Map Image Placeholder - International Routes
                    </div>
                </div>
            </section>

            {/* --- 2. SÂN BAY LIÊN KẾT & HUBS --- */}
            <section className="max-w-[1200px] mx-auto px-5 py-20 bg-[#f4f6f8]">
                <div className="text-center mb-[50px]">
                    <h2 className="text-5xl text-[#004D40] font-bold mb-4 relative inline-block after:content-[''] after:block after:w-[60px] after:h-1 after:bg-[#529246] after:mx-auto after:mt-2.5 after:rounded-sm">Sân bay liên kết</h2>
                    <p className="text-xl text-[#666] max-w-[700px] mx-auto m-0">
                        QAirline hợp tác với các cảng hàng không hàng đầu để đảm bảo trải nghiệm
                        mặt đất tiện nghi và suôn sẻ nhất cho hành khách.
                    </p>
                </div>

                {/* Hubs */}
                <div className="grid grid-cols-2 gap-10 mb-[60px]">
                    <div className="flex items-center gap-5 bg-[#f0f7f4] p-10 rounded-[20px] border border-dashed border-[#529246]">
                        <div className="w-[60px] h-[60px] bg-[#529246] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">HAN</div>
                        <div>
                            <h4 className="text-2xl text-[#004D40] m-0 mb-1.5">Trung tâm Nội Bài (Hà Nội)</h4>
                            <p className="m-0 text-[#555]">Cửa ngõ miền Bắc, kết nối thủ đô với thế giới. Phòng chờ Bông Sen hạng Thương gia 5 sao.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#f0f7f4] p-10 rounded-[20px] border border-dashed border-[#529246]">
                        <div className="w-[60px] h-[60px] bg-[#529246] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">SGN</div>
                        <div>
                            <h4 className="text-2xl text-[#004D40] m-0 mb-1.5">Trung tâm Tân Sơn Nhất (TP.HCM)</h4>
                            <p className="m-0 text-[#555]">Đầu mối giao thương sầm uất nhất cả nước. Dịch vụ check-in nhanh Priority.</p>
                        </div>
                    </div>
                </div>

                {/* LIST SÂN BAY NỘI ĐỊA */}
                <h3 className="text-[#004D40] mb-5 ml-2.5">Mạng lưới Quốc nội</h3>
                <div className="grid grid-cols-4 gap-6">
                  {loadingAirports ? (
                    <div className="col-span-4 text-center">Loading airports...</div>
                  ) : (
                    domesticAirports.map((apt, idx) => (
                        <div key={idx} className="bg-white border border-[#e0e0e0] rounded-[16px] p-6 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#ccc] before:transition-colors before:duration-300 hover:-translate-y-2.5 hover:shadow-[0_15px_30px_rgba(0,77,64,0.1)] hover:border-transparent hover:before:bg-[#529246]">
                            <div>
                                <div className="text-4xl font-bold text-[#004D40] mb-2.5 -tracking-1">{apt.code}</div>
                                <div className="text-xl font-bold text-[#333] mb-1.5 leading-tight">{apt.name}</div>
                                <div className="text-base text-[#666] mb-5 flex items-center"><LocationIcon /> {apt.city}</div>
                            </div>
                            <a href={apt.web} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#529246] border border-[#529246] py-2 px-4 rounded-[20px] text-center transition-all duration-300 self-start hover:bg-[#529246] hover:text-white no-underline">
                                Website sân bay
                            </a>
                        </div>
                    ))
                  )}
                </div>

                {/* LIST SÂN BAY QUỐC TẾ */}
                <h3 className="text-[#004D40] my-[50px] ml-2.5">Mạng lưới Quốc tế</h3>
                <div className="grid grid-cols-4 gap-6">
                    {INTERNATIONAL_AIRPORTS.map((apt, idx) => (
                        <div key={idx} className="bg-white border border-[#e0e0e0] rounded-[16px] p-6 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#ccc] before:transition-colors before:duration-300 hover:-translate-y-2.5 hover:shadow-[0_15px_30px_rgba(0,77,64,0.1)] hover:border-transparent hover:before:bg-[#529246]">
                            <div>
                                <div className="text-4xl font-bold text-[#004D40] mb-2.5 -tracking-1">{apt.code}</div>
                                <div className="text-xl font-bold text-[#333] mb-1.5 leading-tight">{apt.name}</div>
                                <div className="text-base text-[#666] mb-5 flex items-center"><LocationIcon /> {apt.city}</div>
                            </div>
                            <a href={apt.web} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#529246] border border-[#529246] py-2 px-4 rounded-[20px] text-center transition-all duration-300 self-start hover:bg-[#529246] hover:text-white no-underline">
                                Website sân bay
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AirportMap;</content>
<parameter name="filePath">/home/longha/Desktop/Qairline/frontend/src/user/pages/AirportMap.jsx