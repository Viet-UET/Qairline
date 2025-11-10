import React from 'react';
import logo from '../Assets/logo.png';

function Header() {
  return (
    <header className="site-header">
      <nav className="main-nav">
        <div className="logo">
          <img src={logo} alt="QAirlineLogo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Khuyến mãi</a></li>
          <li><a href="#">Đặt vé</a></li>
          <li><a href="#" className="active">Khám phá</a></li>
        </ul>
        <div className="user-actions">
          {/* 1. Thêm mục Tiếng Việt */}
          <a href="#" className="language-selector">Tiếng Việt</a>
          
          {/* 2. Giữ div auth-links và thay đổi className của nút */}
          <div className="auth-links">
            <a href="#" className="login-btn">Đăng nhập</a>
            <a href="#" className="register-btn">Đăng ký</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;