import React from 'react';
import logo from '../Assets/white-logo.png';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles['site-footer-main']}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-logo-links']}>
          <img src={logo} alt="QAirlineLogo" className={styles['footer-logo']} />
          <div className={styles['footer-links']}>
            <a href="#">Liên hệ</a>
            <a href="#">Về chúng tôi</a>
            <a href="#">Cam kết với khách hàng</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Các điều khoản và điều kiện</a>
            <a href="#">Bản đồ sân bay</a>
          </div>
        </div>
        <div className={styles['footer-legal']}>
          <p>© 2025 QAirline, Inc.</p>
          <p>Trường Đại học Công nghệ - ĐHQGHN, 144 Xuân Thủy, Cầu Giấy, Hà Nội.</p>
          <p>Điện thoại: 0914181519 | Email: contact.qairline@gmail.com | Hotline: 1900 123 456</p>
          <p>Giấy chứng nhận đăng ký doanh nghiệp, mã số doanh nghiệp: 0108755515, đăng ký lần đầu ngày 30/02/2010, đăng ký thay đổi lần thứ 1 ngày 12/06/2021, cấp bởi Sở KHĐT thành phố Hà Nội.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;