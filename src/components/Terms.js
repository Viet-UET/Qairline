import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Terms.module.css';
import Header from './Header';

// IMPORT HÌNH ẢNH (Bạn thay bằng ảnh thật trong Assets)
// Ảnh nền banner chính
import imgHero from '../Assets/plane.png'; 
import imgFamily from '../Assets/family_travel.jpg';
import imgInfant from '../Assets/baby_travel.jpg';
import imgLuggage from '../Assets/luggage.png'; // Ảnh minh họa hành lý

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
        <div className={styles.container}>
            <Header />

            {/* --- 1. HERO BANNER VỚI ẢNH NỀN --- */}
            <div 
                className={styles.heroBanner} 
                style={{backgroundImage: `url(${imgHero})`}}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.mainTitle}>Các điều khoản & Điều kiện</h1>
                    <p className={styles.subTitle}>
                        Chào mừng bạn đến với QAirline. Chúng tôi cam kết mang đến những chuyến bay an toàn và minh bạch. 
                        Vui lòng tham khảo các quy định dưới đây để có sự chuẩn bị tốt nhất cho hành trình của mình.
                    </p>
                </div>
            </div>

            <div className={styles.wrapper}>
                
                {/* --- MỤC 1: QUY ĐỊNH CHUNG --- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Quy định đặt vé & Giữ chỗ</h2>
                    <div className={styles.content}>
                        <p>
                            Mọi vé máy bay được xuất ra từ hệ thống của QAirline đều là bằng chứng của hợp đồng vận chuyển. Hành khách có trách nhiệm cung cấp thông tin chính xác bao gồm Họ tên (đúng theo giấy tờ tùy thân), Ngày sinh và Thông tin liên lạc.
                        </p>
                        <p>
                            Vé khuyến mãi thường không được hoàn hủy hoặc thay đổi. Với các hạng vé Phổ thông linh hoạt và Thương gia, bạn có thể thay đổi ngày bay hoặc hoàn vé với một khoản phí quy định.
                        </p>
                    </div>
                </section>

                {/* --- MỤC 2: ĐI CÙNG GIA ĐÌNH (ID: family) --- */}
                <section className={styles.section} id="family">
                    <img src={imgFamily} alt="Gia đình đi máy bay" className={styles.sectionImage} />
                    <h2 className={styles.sectionTitle}>2. Đi cùng gia đình</h2>
                    <div className={styles.content}>
                        <p>
                            Chuyến đi gia đình là những kỷ niệm tuyệt vời. QAirline luôn dành sự ưu tiên đặc biệt để hỗ trợ các gia đình có người cao tuổi và trẻ nhỏ di chuyển thuận tiện nhất.
                        </p>
                        <div className={styles.adviceBox}>
                            <div className={styles.adviceTitle}>Lời khuyên cho gia đình</div>
                            <ul className={styles.adviceList}>
                                <li><strong>Check-in Online:</strong> Hãy làm thủ tục trực tuyến trước 24h để chọn được chỗ ngồi liền kề cho cả nhà.</li>
                                <li><strong>Giấy tờ trẻ em:</strong> Trẻ em dưới 14 tuổi bắt buộc phải có Giấy khai sinh bản gốc hoặc bản sao trích lục (không chấp nhận bản photo công chứng quá 6 tháng hoặc ảnh chụp).</li>
                                <li><strong>Có mặt sớm:</strong> Gia đình nên đến sân bay trước 2.5 - 3 tiếng để thong thả ký gửi hành lý và qua cửa an ninh.</li>
                                <li><strong>Xe đẩy em bé:</strong> Được vận chuyển miễn phí. Bạn có thể dùng xe đẩy tới tận cửa máy bay và nhân viên sẽ cất vào khoang hành lý giúp bạn.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- MỤC 3: TRẺ SƠ SINH (ID: infant) --- */}
                <section className={styles.section} id="infant">
                    <img src={imgInfant} alt="Em bé trên máy bay" className={styles.sectionImage} />
                    <h2 className={styles.sectionTitle}>3. Đi cùng trẻ sơ sinh</h2>
                    <div className={styles.content}>
                        <p>
                            Để đảm bảo an toàn tuyệt đối cho các hành khách nhí (dưới 2 tuổi), QAirline áp dụng các tiêu chuẩn an toàn hàng không quốc tế nghiêm ngặt.
                        </p>
                        <div className={styles.adviceBox} style={{backgroundColor: '#fff8e1', borderColor: '#ffe082'}}>
                            <div className={styles.adviceTitle} style={{color: '#f57f17'}}>⚠️ Quy định an toàn quan trọng</div>
                            <ul className={styles.adviceList}>
                                <li><strong>Định nghĩa Infant:</strong> Trẻ từ 7 ngày tuổi đến dưới 2 tuổi (tính theo ngày khởi hành của từng chặng bay).</li>
                                <li><strong>Tỷ lệ người lớn:</strong> Mỗi người lớn chỉ được phép đi kèm tối đa <strong>02 trẻ sơ sinh</strong>.</li>
                                <li>
                                    <strong>Sắp xếp chỗ ngồi:</strong> 
                                    <br/> - Bé thứ 1: Ngồi trong lòng người lớn (sử dụng đai an toàn phụ).
                                    <br/> - Bé thứ 2: Bắt buộc phải <strong>mua thêm 01 ghế</strong> (giá vé trẻ em) và gia đình phải tự chuẩn bị ghế ngồi ô tô (Car Seat) đạt chuẩn để đặt bé ngồi lên ghế máy bay.
                                </li>
                                <li><strong>Suất ăn:</strong> Vui lòng đăng ký trước suất ăn dặm cho bé ít nhất 24h trước giờ bay nếu cần.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- MỤC 4: HÀNH LÝ --- */}
                <section className={styles.section}>
                    <img src={imgLuggage} alt="Hành lý" className={styles.sectionImage} style={{height: '350px'}} />
                    <h2 className={styles.sectionTitle}>4. Quy định hành lý</h2>
                    <div className={styles.content}>
                        <p><strong>Hành lý xách tay:</strong> Mỗi hành khách được mang 01 kiện chính (tối đa 7kg) và 01 phụ kiện nhỏ (túi xách, laptop). Kích thước kiện chính không quá 56cm x 36cm x 23cm.</p>
                        <p><strong>Hành lý ký gửi:</strong> Tùy thuộc vào hạng vé, bạn có thể có sẵn 20kg hoặc phải mua thêm. Mỗi kiện ký gửi không được vượt quá 32kg để đảm bảo an toàn lao động cho nhân viên bốc xếp.</p>
                        <p><strong>Vật phẩm cấm:</strong> Không mang chất nổ, khí ga, chất lỏng dễ cháy, pin dự phòng (trong hành lý ký gửi) lên máy bay.</p>
                    </div>
                </section>

                {/* --- MỤC 5: THAY ĐỔI & HOÀN TIỀN --- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Thay đổi vé & Hoàn tiền</h2>
                    <div className={styles.content}>
                        <p>
                            Việc thay đổi ngày bay, giờ bay hoặc hành trình phải được thực hiện ít nhất <strong>03 tiếng</strong> trước giờ khởi hành dự kiến. Phí thay đổi và chênh lệch giá vé (nếu có) sẽ được áp dụng.
                        </p>
                        <p>
                            Vé máy bay khuyến mãi hoặc vé hạng Phổ thông Tiết kiệm thường không được phép hoàn tiền (trừ thuế phí sân bay). Tiền hoàn (nếu đủ điều kiện) sẽ được chuyển về phương thức thanh toán ban đầu trong vòng 30-45 ngày làm việc.
                        </p>
                    </div>
                </section>

                {/* --- MỤC 6: CÂU HỎI THƯỜNG GẶP (FAQ) --- */}
                <section className={styles.faqSection}>
                    <div className={styles.faqHeader}>Câu hỏi thường gặp</div>
                    
                    {FAQ_DATA.map((item, index) => (
                        <div key={index} className={styles.faqItem}>
                            <div 
                                className={styles.faqQuestion} 
                                onClick={() => toggleFaq(index)}
                            >
                                {item.q}
                                <span>{openFaqIndex === index ? '−' : '+'}</span>
                            </div>
                            {openFaqIndex === index && (
                                <div className={styles.faqAnswer}>
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

export default Terms;