import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Article.module.css";

// --- IMPORT HÌNH ẢNH ---
import imgHeader from "../Assets/angkowat_0.png"; // Ảnh bìa toàn cảnh
import img1 from "../Assets/angkowat_1.png";      // Ảnh nhìn từ trên cao
import img2 from "../Assets/angkowat_2.png";      // Ảnh nhà sư / kiến trúc
import img3 from "../Assets/angkowat_3.png";      // Ảnh đền Bayon (mặt người)
import img4 from "../Assets/angkowat_4.png";      // Ảnh điêu khắc tường
import img5 from "../Assets/angkowat_5.png";      // Ảnh rễ cây Ta Prohm
import img6 from "../Assets/angkowat_6.png";      // Ảnh hoàng hôn
import img7 from "../Assets/angkowat_7.png";      // Ảnh hoàng hôn
import img8 from "../Assets/angkowat_8.png";      // Ảnh hoàng hôn
function ArticleAngkorWat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.articleMain}>
      <article className={styles["article-container"]}>
        {/* 1. BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <Link to="/discover">Khám phá</Link> &gt;{" "}
          <Link to="/discover/popular">Những địa điểm được yêu thích nhất</Link>
        </div>

        {/* 2. HEADER: TIÊU ĐỀ & META DATA */}
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>
            Angkor Wat:<br></br> Kỳ quan đền đài vĩ đại nhất thế giới
          </h1>
        </header>

        {/* 3. ACTION BAR */}
        <div className={styles.actionBar}>
          <span className={styles.metaItem}>
            <strong>Tác giả:</strong> Annia Norwood
          </span>
          <span className={styles.metaItem}>
            <strong>Thời gian đọc:</strong> 6 phút
          </span>
          <span className={styles.metaItem}>
            <strong>Ngày viết:</strong> 20/05/2025
          </span>
        </div>

        {/* Đoạn dẫn nhập trước ảnh */}
        <p>
          Nằm sâu trong khu rừng già Campuchia, Angkor Wat hiện ra như một giấc
          mơ cổ tích hóa đá. Không chỉ là ngôi đền tôn giáo lớn nhất thế giới,
          quần thể này còn là biểu tượng của sức mạnh, trí tuệ và nghệ thuật
          đỉnh cao của Đế quốc Khmer hùng mạnh một thời. Một lần đặt chân đến
          đây là một lần lạc bước vào cõi thiêng huy hoàng của quá khứ.
        </p>

        {/* 4. ẢNH CHÍNH (HERO IMAGE) */}
        <img
          src={imgHeader}
          alt="Angkor Wat phản chiếu dưới hồ"
          className={styles.mainImage}
        />

        {/* --- NỘI DUNG BÀI VIẾT --- */}
        
        {/* PHẦN 1 */}
        <h2>Từ đô thành phồn hoa đến di sản thế giới</h2>
        <p>
          Được xây dựng vào đầu thế kỷ 12 dưới triều vua Suryavarman II, Angkor
          Wat ban đầu là một ngôi đền Hindu giáo thờ thần Vishnu. Đây từng là
          trái tim của một đô thị rộng lớn với dân số lên tới 1 triệu người -
          con số khổng lồ so với các thành phố châu Âu cùng thời kỳ.
        </p>
        <img
          src={img1}
          alt="Toàn cảnh quần thể Angkor"
          className={styles["paragraph-image"]}
        />
        <p>
          Sau nhiều thế kỷ bị rừng già bao phủ và lãng quên, Angkor Wat được
          "tái phát hiện" bởi nhà thám hiểm người Pháp Henri Mouhot vào năm
          1860. Ông đã thốt lên: "Nó vĩ đại hơn bất cứ thứ gì người Hy Lạp hay
          La Mã để lại cho chúng ta".
        </p>

        {/* PHẦN 2 */}
        <h2>Kiến trúc mô phỏng vũ trụ</h2>
        <p>
          Angkor Wat được thiết kế như một mô hình thu nhỏ của vũ trụ Hindu
          giáo. Ngọn tháp trung tâm cao 65m tượng trưng cho núi Meru huyền thoại
          - nơi ở của các vị thần. Năm ngọn tháp xung quanh tượng trưng cho năm
          đỉnh núi, và hào nước rộng lớn bao quanh đền đại diện cho đại dương
          mênh mông của vũ trụ.
        </p>
        <img
          src={img2}
          alt="Kiến trúc đền đài"
          className={styles["paragraph-image"]}
        />

        {/* PHẦN 3 */}
        <h2>Nụ cười bí ẩn Bayon</h2>
        <p>
          Cách Angkor Wat không xa là Angkor Thom, nơi nổi tiếng với đền Bayon
          và những "nụ cười Khmer" bí ẩn. Hơn 200 khuôn mặt bằng đá khổng lồ với
          nụ cười hiền từ nhưng đầy uy quyền nhìn ra bốn hướng, được cho là chân
          dung của vua Jayavarman VII hoặc khuôn mặt của Bồ Tát Quán Thế Âm.
        </p>
        <img
          src={img3}
          alt="Tượng mặt người đền Bayon"
          className={styles["paragraph-image"]}
        />

        {/* PHẦN 4 */}
        <h2>Nghệ thuật điêu khắc đá tuyệt kỹ</h2>
        <p>
          Điều khiến du khách kinh ngạc nhất chính là những bức phù điêu
          (bas-reliefs) dài hàng trăm mét bao quanh các hành lang. Chúng kể lại
          các sử thi Ramayana, Mahabharata và những cuộc chiến hào hùng của
          người Khmer. Từng chi tiết nhỏ trên trang phục, vũ khí hay cử chỉ của
          hàng nghìn nhân vật đều được chạm khắc sống động đến khó tin.
        </p>
        <img
          src={img4}
          alt="Điêu khắc trên tường đá"
          className={styles["paragraph-image"]}
        />

        {/* PHẦN 5 */}
        <h2>Những trải nghiệm không thể bỏ lỡ</h2>
        <h3>Đón bình minh tại hồ súng</h3>
        <p>
          Hãy thức dậy lúc 4:30 sáng để đến hồ nước phía trước đền chính. Khoảnh
          khắc mặt trời dần nhô lên sau năm ngọn tháp, nhuộm tím cả bầu trời và
          phản chiếu xuống mặt nước tĩnh lặng là hình ảnh kinh điển mà bất kỳ
          nhiếp ảnh gia nào cũng khao khát.
        </p>

        <h3>Lạc lối ở Ta Prohm</h3>
        <p>
          Nổi tiếng qua bộ phim "Bí mật ngôi mộ cổ" (Tomb Raider), Ta Prohm giữ
          nguyên vẻ hoang tàn kỳ bí với những bộ rễ cây Tung, cây Knia khổng lồ
          nuốt chửng lấy các bức tường đá. Đây là minh chứng rõ ràng nhất cho
          sức mạnh của thiên nhiên trước công trình của con người.
        </p>
        <img
          src={img5}
          alt="Rễ cây tại Ta Prohm"
          className={styles["paragraph-image"]}
        />

        {/* PHẦN 6 */}
        <h2>Thông tin quan trọng khi tham quan</h2>
        <ul>
          <li>
            <strong>Vé tham quan (Angkor Pass):</strong> Bắt buộc mua tại trung
            tâm vé. Giá vé: 37 USD (1 ngày), 62 USD (3 ngày), 72 USD (7 ngày).
          </li>
          <li>
            <strong>Trang phục:</strong> Đây là chốn linh thiêng, bạn bắt buộc
            phải mặc trang phục che kín vai và đầu gối. Áo sát nách hay quần
            short ngắn sẽ bị từ chối vào cửa.
          </li>
          <li>
            <strong>Di chuyển:</strong> Thuê xe Tuk-tuk trọn gói (khoảng 15-20
            USD/ngày) là cách thuận tiện và thú vị nhất để khám phá quần thể
            rộng lớn này.
          </li>
        </ul>

        <h2>Lời kết</h2>
        <p>
          Angkor Wat không chỉ là những khối đá vô tri, mà là linh hồn của một
          dân tộc, là bản hùng ca bất diệt của nhân loại. Đứng trước sự vĩ đại
          ấy, con người bỗng thấy mình thật nhỏ bé, nhưng tâm hồn lại trở nên
          rộng mở và bình yên đến lạ thường.
        </p>

        {/* CTA SECTION */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Bạn có muốn tận mắt chiêm ngưỡng kỳ quan này không?<br></br> Hãy
            nhanh tay đặt vé nhé!
          </h2>
          <div className={styles.buttonWrapper}>
            <button className={styles["book-now-button"]}>
              Đến trang đặt vé
            </button>
          </div>
        </div>

        {/* FOOTER IMAGE */}
        <img
          src={img6}
          alt="Hoàng hôn Angkor"
          className={styles["paragraph-image"]}
          style={{ marginTop: "40px" }}
        />
      </article>
    </main>
  );
}

export default ArticleAngkorWat;