import React from 'react';
import logo from '../Assets/logo.png';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles['site-header']}>
      <nav className={styles['main-nav']}>
        <div className={styles['logo']}>
          <img src={logo} alt="QAirlineLogo" className={styles['logo-image']} />
        </div>
        <ul className={styles['nav-links']}>
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Khuyến mãi</a></li>
          <li><a href="#">Đặt vé</a></li>
          <li><a href="#" className={styles['active']}>Khám phá</a></li>
        </ul>
        <div className={styles['user-actions']}>
          {/* 1. Thêm mục Tiếng Việt */}
          <a href="#" className={styles['language-selector']}>Tiếng Việt</a>

          {/* 2. Giữ div auth-links và thay đổi className của nút */}
          <div className={styles['auth-links']}>
            <a href="#" className={styles['login-btn']}>Đăng nhập</a>
            <a href="#" className={styles['register-btn']}>Đăng ký</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;