import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi đường dẫn (pathname) thay đổi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Component này không hiển thị gì cả
}

export default ScrollToTop;