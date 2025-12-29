import React, { useEffect } from 'react';
import styles from './CustomerCommitment.module.css';
import Header from './Header';
import Footer from './Footer';

// Bạn thay bằng ảnh thật trong Assets (ví dụ ảnh máy bay cất cánh hoặc đội ngũ nhân viên)
import imgHero from '../Assets/flight_attendant_1.png'; 

function CustomerCommitment() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const commitments = [
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            ),
            title: "An toàn tuyệt đối",
            desc: "An toàn là tôn chỉ hoạt động số 1 tại QAirline. Chúng tôi tuân thủ nghiêm ngặt các tiêu chuẩn an toàn hàng không quốc tế, bảo trì tàu bay định kỳ và huấn luyện phi hành đoàn chuyên nghiệp."
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ),
            title: "Đúng giờ (OTP)",
            desc: "Chúng tôi hiểu thời gian của bạn là vàng bạc. QAirline cam kết nỗ lực tối đa để đảm bảo các chuyến bay cất cánh và hạ cánh đúng giờ, giảm thiểu mọi sự chậm trễ không mong muốn."
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            ),
            title: "Tận tâm phục vụ",
            desc: "Khách hàng là trung tâm trong mọi quyết định. Đội ngũ chăm sóc khách hàng của chúng tôi hoạt động 24/7 để lắng nghe, hỗ trợ và giải quyết mọi thắc mắc của bạn một cách nhanh chóng nhất."
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            ),
            title: "Minh bạch giá vé",
            desc: "Không phí ẩn, không chiêu trò. Mọi khoản phí, thuế và phụ thu đều được hiển thị rõ ràng ngay từ bước đặt vé đầu tiên. Bạn chỉ phải trả đúng số tiền bạn nhìn thấy."
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.74 5.88a1 1 0 0 1 .23.95l-1.63 6.06a1 1 0 0 1-.84.73l-6.17 1.13a1 1 0 0 1-.94-.32L2.69 12a1 1 0 0 1 .32-.94L9.18 4.89a1 1 0 0 1 .73-.84l6.06-1.63a1 1 0 0 1 .95.23z"></path></svg>
            ),
            title: "Phát triển bền vững",
            desc: "Với slogan 'Tự động xanh vươn ra thế giới', chúng tôi cam kết giảm thiểu rác thải nhựa trên chuyến bay và đầu tư vào các dòng máy bay tiết kiệm nhiên liệu, thân thiện với môi trường."
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            ),
            title: "Đồng hành cùng cộng đồng",
            desc: "Chúng tôi không chỉ bay, chúng tôi còn sẻ chia. QAirline thường xuyên tham gia các hoạt động thiện nguyện, hỗ trợ vận chuyển y tế và cứu trợ thiên tai khẩn cấp."
        }
    ];

    return (
        <div className={styles.container}>
            <Header />

            {/* HERO BANNER */}
            <div className={styles.heroBanner} style={{backgroundImage: `url(${imgHero})`}}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.mainTitle}>Lời hứa từ QAirline</h1>
                    <p className={styles.subTitle}>
                        Chúng tôi không chỉ bán vé máy bay, chúng tôi trao gửi niềm tin và những hành trình hạnh phúc.
                    </p>
                </div>
            </div>

            <div className={styles.wrapper}>
                
                {/* GIỚI THIỆU */}
                <section className={styles.introSection}>
                    <p className={styles.introText}>
                        Kể từ chuyến bay đầu tiên, QAirline đã đặt ra sứ mệnh kết nối mọi miền tổ quốc và vươn ra thế giới bằng sự tận tâm. Chúng tôi hiểu rằng, mỗi tấm vé quý khách cầm trên tay là một sự tin tưởng tuyệt đối. Dưới đây là những cam kết mà toàn thể đội ngũ QAirline luôn khắc cốt ghi tâm.
                    </p>
                </section>

                {/* GRID CAM KẾT */}
                <section className={styles.commitmentGrid}>
                    {commitments.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconCircle}>
                                {item.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.desc}</p>
                        </div>
                    ))}
                </section>

                {/* QUOTE KẾT THÚC */}
                <section className={styles.quoteSection}>
                    <div className={styles.quoteText}>
                        "Sự hài lòng của bạn là đích đến cuối cùng của mọi chuyến bay."
                    </div>
                    <div className={styles.quoteAuthor}>— Ban lãnh đạo QAirline —</div>
                </section>

            </div>


        </div>
    );
}

export default CustomerCommitment;