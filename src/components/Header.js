import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Import Link và useLocation
import logo from '../Assets/logo.png';
import styles from './Header.module.css';

function Header() {
  const location = useLocation(); // Lấy đường dẫn hiện tại để xử lý class 'active'

  return (
    <header className={styles['site-header']}>
      <nav className={styles['main-nav']}>
        {/* Logo: Bấm vào logo thì về Trang chủ */}
        <div className={styles['logo']}>
          <Link to="/"> 
            <img src={logo} alt="QAirlineLogo" className={styles['logo-image']} />
          </Link>
        </div>

        <ul className={styles['nav-links']}>
          {/* Trang chủ */}
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? styles['active'] : ''}
            >
              Trang chủ
            </Link>
          </li>

          {/* Khuyến mãi (Ví dụ chưa có trang thì để tạm to="/promo") */}
          <li>
            <Link to="/promo">Khuyến mãi</Link>
          </li>

          {/* Đặt vé (Ví dụ chưa có trang thì để tạm to="/booking") */}
          <li>
            <Link to="/booking">Đặt vé</Link>
          </li>

          {/* Khám phá: Trỏ đến /discover */}
          <li>
            <Link 
              to="/discover" 
              // Kiểm tra xem URL hiện tại có chứa '/discover' không để gạch chân
              className={location.pathname.includes('/discover') ? styles['active'] : ''}
            >
              Khám phá
            </Link>
          </li>
        </ul>

        <div className={styles['user-actions']}>
          <a href="#" className={styles['language-selector']}>Tiếng Việt</a>

          <div className={styles['auth-links']}>
            {/* Nếu sau này có trang login thì đổi href="#" thành to="/login" */}
            <Link to="/login" className={styles['login-btn']}>Đăng nhập</Link>
            <Link to="/register" className={styles['register-btn']}>Đăng ký</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;