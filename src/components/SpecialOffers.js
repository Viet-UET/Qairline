import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './SpecialOffers.module.css';
import Header from './Header';


// IMPORT ẢNH (Dùng lại ảnh từ Home hoặc thay ảnh mới)
import imgStudent from "../Assets/student_discount.png";
import imgMember from "../Assets/membership.png";
import imgSponsor from "../Assets/sponsors.png";

function SpecialOffers() {
    const { hash } = useLocation();

    // Logic cuộn xuống đúng mục khi có hash trên URL (ví dụ: /special-offers#student)
    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div style={{ backgroundColor: '#fcfcfc' }}>
            <Header />
            
            <main className={styles.container}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link to="/" className={styles.breadcrumbLink}>Trang chủ</Link> 
                    <span>&gt;</span> 
                    <strong>Ưu đãi đặc biệt</strong>
                </div>

                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Các chương trình ưu đãi đặc biệt</h1>
                    <p className={styles.pageDesc}>
                        QAirline luôn nỗ lực mang đến những giá trị tốt nhất cho khách hàng. 
                        Khám phá ngay các đặc quyền dành riêng cho bạn.
                    </p>
                </div>

                {/* --- 1. SINH VIÊN --- */}
                <div id="student" className={styles.offerSection}>
                    <img src={imgStudent} alt="Student Offer" className={styles.offerImg} />
                    <div className={styles.offerContent}>
                        <h2 className={styles.offerTitle}>Ưu đãi dành cho Sinh viên</h2>
                        <p className={styles.offerDesc}>
                            Đồng hành cùng tri thức, QAirline mang đến chương trình "Bay đến tương lai" với mức giá hỗ trợ tốt nhất cho các bạn học sinh, sinh viên.
                        </p>
                        <ul className={styles.benefitList}>
                            <li className={styles.benefitItem}>Giảm trực tiếp 20% giá vé cơ bản mọi hành trình nội địa.</li>
                            <li className={styles.benefitItem}>Tặng thêm 1 kiện hành lý ký gửi (23kg).</li>
                            <li className={styles.benefitItem}>Miễn phí thay đổi ngày bay 01 lần.</li>
                            <li className={styles.benefitItem}>Truy cập WiFi miễn phí trên các chuyến bay trang bị Internet.</li>
                        </ul>
                        <button className={styles.actionBtn}>Xác thực & Đặt vé ngay</button>
                    </div>
                </div>

                {/* --- 2. HỘI VIÊN --- */}
                <div id="member" className={`${styles.offerSection} ${styles.reverse}`}>
                    <img src={imgMember} alt="Membership Offer" className={styles.offerImg} />
                    <div className={styles.offerContent}>
                        <h2 className={styles.offerTitle}>Đăng ký gói Hội viên Q-Club</h2>
                        <p className={styles.offerDesc}>
                            Trở thành thành viên của đại gia đình QAirline để tận hưởng những đặc quyền thượng lưu và tích lũy dặm thưởng không giới hạn.
                        </p>
                        <ul className={styles.benefitList}>
                            <li className={styles.benefitItem}>Tích lũy dặm thưởng x2 cho mọi chuyến bay.</li>
                            <li className={styles.benefitItem}>Sử dụng phòng chờ Thương gia tại 15 sân bay trong nước.</li>
                            <li className={styles.benefitItem}>Ưu tiên làm thủ tục (Priority Check-in) và lên máy bay.</li>
                            <li className={styles.benefitItem}>Giảm giá vé 10% khi đặt qua App cho hội viên hạng Vàng trở lên.</li>
                        </ul>
                        <button className={styles.actionBtn}>Đăng ký Hội viên</button>
                    </div>
                </div>

                {/* --- 3. NHÀ TÀI TRỢ --- */}
                <div id="sponsor" className={styles.offerSection}>
                    <img src={imgSponsor} alt="Sponsor Offer" className={styles.offerImg} />
                    <div className={styles.offerContent}>
                        <h2 className={styles.offerTitle}>Ưu đãi từ Đối tác & Nhà tài trợ</h2>
                        <p className={styles.offerDesc}>
                            Kết hợp cùng các đối tác hàng đầu trong lĩnh vực du lịch, ngân hàng và công nghệ để mang lại trải nghiệm trọn vẹn nhất cho chuyến đi của bạn.
                        </p>
                        <ul className={styles.benefitList}>
                            <li className={styles.benefitItem}>Giảm 500k khi thanh toán bằng thẻ tín dụng VPBank, Techcombank.</li>
                            <li className={styles.benefitItem}>Mã giảm giá 30% khi đặt phòng khách sạn tại Vinpearl & Mường Thanh.</li>
                            <li className={styles.benefitItem}>Tặng mã di chuyển Grab/Be trị giá 100k đi/đến sân bay.</li>
                            <li className={styles.benefitItem}>Mua sắm miễn thuế (Duty Free) giảm thêm 15%.</li>
                        </ul>
                        <button className={styles.actionBtn}>Xem kho Voucher</button>
                    </div>
                </div>

            </main>

        </div>
    );
}

export default SpecialOffers;