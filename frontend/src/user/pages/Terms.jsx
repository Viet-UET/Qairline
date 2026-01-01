import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../shared/components/layout/Header';

// IMPORT HÌNH ẢNH (Bạn thay bằng ảnh thật trong Assets)
// Ảnh nền banner chính
import imgHero from '../../shared/assets/images/home/plane.png';
import imgFamily from '../../shared/assets/images/home/plane.png';
import imgInfant from '../../shared/assets/images/home/plane.png';
import imgLuggage from '../../shared/assets/images/home/luggage.png'; // Ảnh minh họa hành lý

// DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ)
const FAQ_DATA = [
    {
        q: "Tôi có thể đổi tên trên vé máy bay không?",
        a: "QAirline cho phép sửa đổi tên (sửa lỗi chính tả nhẹ) miễn phí trong vòng 24h sau khi đặt. Việc đổi sang tên người khác hoàn toàn sẽ áp dụng phí đổi tên và chênh lệch giá vé tùy theo hạng vé bạn đã mua."
    },
    {
        q: "Tôi cần mang giấy tờ gì khi bay nội địa?",
        a: "Đối với công dân Việt Nam, bạn cần mang theo CMND/CCCD (bản chính) hoặc Hộ chiếu. Trẻ em dưới 14 tuổi cần mang Giấy khai sinh (bản gốc hoặc bản sao trích lục). Giấy tờ phải còn hạn sử dụng."
    },
    {
        q: "Bà bầu có được đi máy bay không?",
        a: "Phụ nữ mang thai dưới 32 tuần được chấp nhận vận chuyển bình thường (cần sổ khám thai). Từ 32 đến 36 tuần cần giấy xác nhận sức khỏe của bác sĩ (lập trong vòng 7 ngày trước chuyến bay). Chúng tôi từ chối vận chuyển phụ nữ mang thai trên 36 tuần vì lý do an toàn."
    },
    {
        q: "Tôi có thể mang đồ ăn lên máy bay không?",
        a: "Bạn được phép mang đồ ăn khô (bánh mì, snack) lên máy bay. Tuy nhiên, các loại thực phẩm có mùi nặng (sầu riêng, mít, nước mắm...) không được phép mang trong hành lý xách tay và phải đóng gói kỹ càng nếu ký gửi."
    },
    {
        q: "Làm thế nào để đặt suất ăn đặc biệt?",
        a: "Bạn có thể đặt suất ăn đặc biệt (chay, kiêng, suất ăn trẻ em...) tại mục 'Quản lý đặt chỗ' trên website ít nhất 24 tiếng trước giờ khởi hành."
    },
    {
        q: "Hành lý bị thất lạc tôi phải làm sao?",
        a: "Vui lòng liên hệ ngay với quầy Thất lạc hành lý (Lost & Found) tại sân bay đến trước khi rời khỏi khu vực cách ly. Bạn sẽ cần điền vào biên bản bất thường về hành lý (PIR) để chúng tôi tiến hành tìm kiếm và bồi thường."
    }
];

function Terms() {
    const { hash } = useLocation();

    // State để mở/đóng FAQ
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Logic cuộn trang khi có hash (#)
    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="w-full font-['Afacad']">
            <Header />

            {/* --- 1. HERO BANNER VỚI ẢNH NỀN --- */}
            <div
                className="min-h-[450px] mt-[60px] bg-cover bg-center relative"
                style={{backgroundImage: `url(${imgHero})`}}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Các điều khoản & Điều kiện</h1>
                    <p className="text-lg md:text-xl text-white max-w-4xl leading-relaxed">
                        Chào mừng bạn đến với QAirline. Chúng tôi cam kết mang đến những chuyến bay an toàn và minh bạch.
                        Vui lòng tham khảo các quy định dưới đây để có sự chuẩn bị tốt nhất cho hành trình của mình.
                    </p>
                </div>
            </div>

            <div className="max-w-[1000px] mx-auto px-10 py-[40px]">

                {/* --- MỤC 1: QUY ĐỊNH CHUNG --- */}
                <section className="mb-[60px]">
                    <h2 className="text-5xl font-bold text-[#004D40] mb-[30px] border-l-6 border-[#529246] pl-5 leading-tight">1. Quy định đặt vé & Giữ chỗ</h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-5">
                            Mọi vé máy bay được xuất ra từ hệ thống của QAirline đều là bằng chứng của hợp đồng vận chuyển. Hành khách có trách nhiệm cung cấp thông tin chính xác bao gồm Họ tên (đúng theo giấy tờ tùy thân), Ngày sinh và Thông tin liên lạc.
                        </p>
                        <p className="mb-5">
                            Vé khuyến mãi thường không được hoàn hủy hoặc thay đổi. Với các hạng vé Phổ thông linh hoạt và Thương gia, bạn có thể thay đổi ngày bay hoặc hoàn vé với một khoản phí quy định.
                        </p>
                    </div>
                </section>

                {/* --- MỤC 2: ĐI CÙNG GIA ĐÌNH (ID: family) --- */}
                <section className="mb-[60px]" id="family">
                    <img src={imgFamily} alt="Gia đình đi máy bay" className="w-full h-[450px] object-cover rounded-[20px] mb-[30px] shadow-[0_5px_20px_rgba(0,0,0,0.1)]" />
                    <h2 className="text-5xl font-bold text-[#004D40] mb-[30px] border-l-6 border-[#529246] pl-5 leading-tight">2. Đi cùng gia đình</h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-5">
                            Chuyến đi gia đình là những kỷ niệm tuyệt vời. QAirline luôn dành sự ưu tiên đặc biệt để hỗ trợ các gia đình có người cao tuổi và trẻ nhỏ di chuyển thuận tiện nhất.
                        </p>
                        <div className="bg-[#f1f8e9] border border-[#c5e1a5] rounded-[16px] p-[30px] mt-5">
                            <div className="text-2xl font-bold text-[#2e7d32] mb-4 flex items-center gap-2.5">Lời khuyên cho gia đình</div>
                            <ul className="list-none p-0 m-0">
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Check-in Online:</strong> Hãy làm thủ tục trực tuyến trước 24h để chọn được chỗ ngồi liền kề cho cả nhà.</li>
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Giấy tờ trẻ em:</strong> Trẻ em dưới 14 tuổi bắt buộc phải có Giấy khai sinh bản gốc hoặc bản sao trích lục (không chấp nhận bản photo công chứng quá 6 tháng hoặc ảnh chụp).</li>
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Có mặt sớm:</strong> Gia đình nên đến sân bay trước 2.5 - 3 tiếng để thong thả ký gửi hành lý và qua cửa an ninh.</li>
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Xe đẩy em bé:</strong> Được vận chuyển miễn phí. Bạn có thể dùng xe đẩy tới tận cửa máy bay và nhân viên sẽ cất vào khoang hành lý giúp bạn.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- MỤC 3: TRẺ SƠ SINH (ID: infant) --- */}
                <section className="mb-[60px]" id="infant">
                    <img src={imgInfant} alt="Em bé trên máy bay" className="w-full h-[450px] object-cover rounded-[20px] mb-[30px] shadow-[0_5px_20px_rgba(0,0,0,0.1)]" />
                    <h2 className="text-5xl font-bold text-[#004D40] mb-[30px] border-l-6 border-[#529246] pl-5 leading-tight">3. Đi cùng trẻ sơ sinh</h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-5">
                            Để đảm bảo an toàn tuyệt đối cho các hành khách nhí (dưới 2 tuổi), QAirline áp dụng các tiêu chuẩn an toàn hàng không quốc tế nghiêm ngặt.
                        </p>
                        <div className="bg-[#fff8e1] border border-[#ffe082] rounded-[16px] p-[30px] mt-5">
                            <div className="text-2xl font-bold text-[#f57f17] mb-4 flex items-center gap-2.5">⚠️ Quy định an toàn quan trọng</div>
                            <ul className="list-none p-0 m-0">
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Định nghĩa Infant:</strong> Trẻ từ 7 ngày tuổi đến dưới 2 tuổi (tính theo ngày khởi hành của từng chặng bay).</li>
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Tỷ lệ người lớn:</strong> Mỗi người lớn chỉ được phép đi kèm tối đa <strong>02 trẻ sơ sinh</strong>.</li>
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span>
                                    <strong>Sắp xếp chỗ ngồi:</strong>
                                    <br/> - Bé thứ 1: Ngồi trong lòng người lớn (sử dụng đai an toàn phụ).
                                    <br/> - Bé thứ 2: Bắt buộc phải <strong>mua thêm 01 ghế</strong> (giá vé trẻ em) và gia đình phải tự chuẩn bị ghế ngồi ô tô (Car Seat) đạt chuẩn để đặt bé ngồi lên ghế máy bay.
                                </li>
                                <li className="relative pl-[30px] mb-3"><span className="absolute left-0 top-0 text-[#529246] font-bold">✔</span><strong>Suất ăn:</strong> Vui lòng đăng ký trước suất ăn dặm cho bé ít nhất 24h trước giờ bay nếu cần.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- MỤC 4: HÀNH LÝ --- */}
                <section className="mb-[60px]">
                    <img src={imgLuggage} alt="Hành lý" className="w-full h-[350px] object-cover rounded-[20px] mb-[30px] shadow-[0_5px_20px_rgba(0,0,0,0.1)]" />
                    <h2 className="text-5xl font-bold text-[#004D40] mb-[30px] border-l-6 border-[#529246] pl-5 leading-tight">4. Quy định hành lý</h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-5"><strong>Hành lý xách tay:</strong> Mỗi hành khách được mang 01 kiện chính (tối đa 7kg) và 01 phụ kiện nhỏ (túi xách, laptop). Kích thước kiện chính không quá 56cm x 36cm x 23cm.</p>
                        <p className="mb-5"><strong>Hành lý ký gửi:</strong> Tùy thuộc vào hạng vé, bạn có thể có sẵn 20kg hoặc phải mua thêm. Mỗi kiện ký gửi không được vượt quá 32kg để đảm bảo an toàn lao động cho nhân viên bốc xếp.</p>
                        <p className="mb-5"><strong>Vật phẩm cấm:</strong> Không mang chất nổ, khí ga, chất lỏng dễ cháy, pin dự phòng (trong hành lý ký gửi) lên máy bay.</p>
                    </div>
                </section>

                {/* --- MỤC 5: THAY ĐỔI & HOÀN TIỀN --- */}
                <section className="mb-[60px]">
                    <h2 className="text-5xl font-bold text-[#004D40] mb-[30px] border-l-6 border-[#529246] pl-5 leading-tight">5. Thay đổi vé & Hoàn tiền</h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-5">
                            Việc thay đổi ngày bay, giờ bay hoặc hành trình phải được thực hiện ít nhất <strong>03 tiếng</strong> trước giờ khởi hành dự kiến. Phí thay đổi và chênh lệch giá vé (nếu có) sẽ được áp dụng.
                        </p>
                        <p className="mb-5">
                            Vé máy bay khuyến mãi hoặc vé hạng Phổ thông Tiết kiệm thường không được phép hoàn tiền (trừ thuế phí sân bay). Tiền hoàn (nếu đủ điều kiện) sẽ được chuyển về phương thức thanh toán ban đầu trong vòng 30-45 ngày làm việc.
                        </p>
                    </div>
                </section>

                {/* --- MỤC 6: CÂU HỎI THƯỜNG GẶP (FAQ) --- */}
                <section className="bg-[#fafafa] px-10 py-[60px] rounded-[20px] border border-[#eee] mt-[60px]">
                    <div className="text-center text-5xl font-bold text-[#004D40] mb-10">Câu hỏi thường gặp</div>

                    {FAQ_DATA.map((item, index) => (
                        <div key={index} className="mb-6 bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
                            <div
                                className="p-5 font-bold text-xl text-[#006D5B] cursor-pointer bg-white border-b border-[#f0f0f0] flex justify-between items-center hover:bg-[#f9f9f9]"
                                onClick={() => toggleFaq(index)}
                            >
                                {item.q}
                                <span>{openFaqIndex === index ? '−' : '+'}</span>
                            </div>
                            {openFaqIndex === index && (
                                <div className="p-5 text-[#555] leading-relaxed bg-white">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

            </div>
        </div>
    );
}

export default Terms;</content>
<parameter name="filePath">/home/longha/Desktop/Qairline/frontend/src/user/pages/Terms.jsx