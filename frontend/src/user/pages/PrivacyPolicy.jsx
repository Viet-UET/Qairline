import React, { useEffect } from 'react';
import Header from '../../shared/components/layout/Header';

// IMPORT ẢNH (Dùng chung ảnh Hero hoặc ảnh khác tùy bạn chọn)
import imgHero from '../../shared/assets/images/home/membership.png';

function PrivacyPolicy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full bg-white font-['Afacad'] text-[#333] pb-20">
            <Header />

            {/* HERO BANNER (Cấu trúc giống trang Cam kết) */}
            <div className="relative w-full min-h-[400px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center text-white mt-[60px] px-5" style={{backgroundImage: `url(${imgHero})`}}>
                <div className="absolute inset-0 bg-[#004D40] bg-opacity-25 z-10"></div>
                <div className="relative z-20 max-w-[800px]">
                    <h1 className="text-6xl font-bold mb-4 text-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">Chính sách bảo mật</h1>
                    <p className="text-2xl font-medium opacity-95 leading-relaxed">
                        Cam kết bảo vệ sự riêng tư và an toàn thông tin của bạn là ưu tiên hàng đầu tại QAirline.
                    </p>
                </div>
            </div>

            <div className="max-w-[1000px] mx-auto px-5 py-[60px]">

                {/* 1. CAM KẾT CHUNG */}
                <section className="mb-[60px]">
                    <h2 className="text-4xl text-[#004D40] font-bold mb-5 flex items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-[#e8f5e9] rounded-[12px] flex items-center justify-center text-[#529246]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        1. Cam kết chung
                    </h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-4">
                            QAirline hiểu rằng Quý khách quan tâm đến việc thông tin cá nhân của mình được sử dụng và chia sẻ như thế nào. Chúng tôi coi trọng sự tin tưởng của Quý khách và cam kết bảo mật thông tin đó một cách cẩn trọng và hợp lý.
                        </p>
                        <p className="mb-4">
                            Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của Quý khách khi sử dụng website, ứng dụng di động và các dịch vụ của QAirline.
                        </p>
                    </div>
                </section>

                {/* 2. THÔNG TIN THU THẬP */}
                <section className="mb-[60px]">
                    <h2 className="text-4xl text-[#004D40] font-bold mb-5 flex items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-[#e8f5e9] rounded-[12px] flex items-center justify-center text-[#529246]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                        2. Thông tin chúng tôi thu thập
                    </h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-4">Để cung cấp dịch vụ vé máy bay và các dịch vụ liên quan, chúng tôi có thể yêu cầu Quý khách cung cấp các thông tin sau:</p>
                        <ul className="list-none p-0 m-4">
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span><strong>Thông tin định danh:</strong> Họ tên, ngày sinh, giới tính, quốc tịch, số hộ chiếu/CMND.</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span><strong>Thông tin liên lạc:</strong> Số điện thoại, địa chỉ email, địa chỉ thường trú.</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span><strong>Thông tin thanh toán:</strong> Chi tiết thẻ tín dụng/ghi nợ (được mã hóa), lịch sử giao dịch.</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span><strong>Thông tin hành trình:</strong> Điểm đi, điểm đến, ngày bay, yêu cầu suất ăn đặc biệt hoặc hỗ trợ y tế.</li>
                        </ul>
                    </div>
                </section>

                {/* 3. CÁCH SỬ DỤNG THÔNG TIN */}
                <section className="mb-[60px]">
                    <h2 className="text-4xl text-[#004D40] font-bold mb-5 flex items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-[#e8f5e9] rounded-[12px] flex items-center justify-center text-[#529246]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                        </div>
                        3. Cách chúng tôi sử dụng thông tin
                    </h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-4">Thông tin của Quý khách được sử dụng cho các mục đích chính đáng sau:</p>
                        <ul className="list-none p-0 m-4">
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Xử lý và quản lý đặt chỗ, xuất vé máy bay.</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Gửi thông báo về thay đổi lịch bay, xác nhận hành trình.</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Hỗ trợ làm thủ tục check-in và các dịch vụ mặt đất.</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Nâng cao trải nghiệm khách hàng và cá nhân hóa ưu đãi (nếu Quý khách đồng ý nhận tin).</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Đảm bảo an ninh, an toàn hàng không theo quy định của pháp luật.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. CHIA SẺ THÔNG TIN */}
                <section className="mb-[60px]">
                    <h2 className="text-4xl text-[#004D40] font-bold mb-5 flex items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-[#e8f5e9] rounded-[12px] flex items-center justify-center text-[#529246]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        </div>
                        4. Chia sẻ thông tin
                    </h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-4">
                            QAirline cam kết <strong>không bán</strong> thông tin cá nhân của Quý khách cho bên thứ ba vì mục đích thương mại. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp cần thiết:
                        </p>
                        <ul className="list-none p-0 m-4">
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Cơ quan chức năng, an ninh sân bay, hải quan (theo yêu cầu luật pháp).</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Các đối tác liên danh (nếu chuyến bay của Quý khách có chặng bay do hãng khác khai thác).</li>
                            <li className="relative pl-6 mb-2.5"><span className="absolute left-1.5 top-[-5px] text-[#529246] font-bold text-2xl">•</span>Đơn vị cung cấp dịch vụ thanh toán để xử lý giao dịch.</li>
                        </ul>
                    </div>
                </section>

                {/* 5. BẢO MẬT & COOKIES */}
                <section className="mb-[60px]">
                    <h2 className="text-4xl text-[#004D40] font-bold mb-5 flex items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-[#e8f5e9] rounded-[12px] flex items-center justify-center text-[#529246]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        5. Bảo mật & Cookies
                    </h2>
                    <div className="text-xl leading-[1.8] text-[#444] text-justify">
                        <p className="mb-4">
                            Chúng tôi áp dụng các biện pháp an ninh vật lý và kỹ thuật số (như mã hóa SSL) để bảo vệ dữ liệu của Quý khách khỏi truy cập trái phép.
                        </p>
                        <p className="mb-4">
                            Website QAirline sử dụng Cookies để ghi nhớ tùy chọn ngôn ngữ, trạng thái đăng nhập và phân tích lưu lượng truy cập nhằm cải thiện hiệu suất trang web. Quý khách có thể tắt Cookies trong trình duyệt, nhưng một số tính năng có thể không hoạt động ổn định.
                        </p>
                    </div>
                </section>

                {/* BOX LIÊN HỆ */}
                <div className="bg-[#f9fcf9] border border-[#c8e6c9] rounded-[16px] p-10 text-center mt-10">
                    <div className="text-2xl text-[#004D40] font-bold mb-4">Bạn có thắc mắc về quyền riêng tư?</div>
                    <p className="mb-4">Vui lòng liên hệ với Bộ phận Bảo vệ Dữ liệu của chúng tôi qua email:</p>
                    <a href="mailto:privacy@qairline.com" className="text-[#529246] font-bold text-xl no-underline hover:underline">privacy@qairline.com</a>
                </div>

            </div>


        </div>
    );
}

export default PrivacyPolicy;</content>
<parameter name="filePath">/home/longha/Desktop/Qairline/frontend/src/user/pages/PrivacyPolicy.jsx