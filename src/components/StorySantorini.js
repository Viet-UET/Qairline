import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Article.module.css";

// IMPORT ẢNH
import imgHeader from "../Assets/santorini_0.png"; // Ảnh bìa hoàng hôn Oia
import imgWhite from "../Assets/santorini_1.png"; // Ảnh nhà trắng
import imgWine from "../Assets/santorini_2.png"; // Ảnh rượu vang & biển
import imgNight from "../Assets/santorini_3.png"; // Ảnh đêm đầy sao

function StorySantorini() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.articleMain}>
      <article className={styles["article-container"]}>
        {/* 1. BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <Link to="/discover">Khám phá</Link> &gt;{" "}
          <Link to="/discover/stories">Những câu chuyện kỳ thú</Link>
        </div>

        {/* 2. HEADER: TIÊU ĐỀ & META DATA */}
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>Một mùa hè ở Santorini</h1>
        </header>

        {/* 3. ACTION BAR (META DATA) */}
        <div className={styles.actionBar}>
          <span className={styles.metaItem}>
            <strong>Tác giả:</strong> Annia Norwood
          </span>
          <span className={styles.metaItem}>
            <strong>Thời gian đọc:</strong> 5 phút
          </span>
          <span className={styles.metaItem}>
            <strong>Ngày viết:</strong> 13/12/2025
          </span>
        </div>

        {/* 4. ẢNH CHÍNH (HERO IMAGE) */}
        <img
          src={imgHeader}
          alt="Santorini Header"
          className={styles.mainImage}
        />

        {/* 5. TRÍCH DẪN (QUOTE) */}
        <div className={styles.quoteBox}>
          <p className={styles.quoteText}>
            "Santorini là nơi mà ánh sáng có thể khiến bạn tin vào phép màu. Mỗi
            buổi hoàng hôn nơi đây như một lời thì thầm rằng: có những vẻ đẹp
            chỉ xuất hiện khi ta thật sự dừng lại để ngắm nhìn."
          </p>
          <div className={styles.quoteAuthor}>— Annia Norwood</div>
        </div>

        {/* --- NỘI DUNG BÀI VIẾT --- */}
        <h2>Vì sao lại là Santorini?</h2>
        <p>
          Trong danh sách những điểm đến mơ ước của mọi tín đồ du lịch,
          Santorini luôn nằm ở vị trí đầu tiên. Hòn đảo thiên thần của Hy Lạp
          này không chỉ là những ngôi nhà trắng mái xanh, mà là nơi ánh sáng,
          gió biển và lịch sử hòa quyện.
        </p>

        <h2>Bình minh, gió và những bậc thang trắng</h2>
        <p>
          Buổi sáng đầu tiên ở Oia, mình thức dậy khi những tia nắng đầu tiên
          chiếu xuống biển Aegean. Không gian tĩnh lặng, chỉ có tiếng gió và
          tiếng sóng vỗ.
        </p>
        <img
          src={imgWhite}
          alt="Kiến trúc trắng Santorini"
          className={styles["paragraph-image"]}
        />
        <p>
          Những ngôi nhà trắng tinh khôi xếp chồng lên nhau, bám vào vách đá
          dựng đứng tạo nên một khung cảnh siêu thực. Mình đã dành cả buổi sáng
          để lang thang qua những bậc thang nhỏ, lạc vào những con ngõ hẹp và
          chụp hàng trăm bức ảnh.
        </p>

        <h2>Vị rượu vang và những câu chuyện nắng gió</h2>
        <p>
          Santorini không chỉ có biển, mà còn có những vườn nho tuyệt đẹp. Đất
          đai núi lửa ở đây tạo nên hương vị rượu vang Assyrtiko đặc trưng -
          mạnh mẽ, giòn tan và mang vị khoáng chất của biển.
        </p>
        <img
          src={imgWine}
          alt="Rượu vang và biển"
          className={styles["paragraph-image"]}
        />
        <p>
          Mình đã ghé thăm Santo Wines vào buổi chiều tà. Cầm ly rượu vang trắng
          lạnh, nhìn mặt trời từ từ lặn xuống biển Aegean, đó là khoảnh khắc
          mình cảm thấy cuộc sống thật trọn vẹn.
        </p>

        <h2>Biển đen, cát đỏ và sự yên bình tuyệt đối</h2>
        <p>
          Santorini sở hữu những bãi biển độc nhất vô nhị: Biển Đỏ (Red Beach)
          với vách đá dựng đứng màu đỏ rực, và Biển Đen (Perissa) với bờ cát đen
          tuyền từ tro núi lửa.
        </p>
        <img
          src={imgNight}
          alt="Santorini về đêm"
          className={styles["paragraph-image"]}
        />

        <h2>Đêm cuối cùng và giấc mơ mang tên Santorini</h2>
        <p>
          Đêm cuối cùng, mình ngồi ở ban công khách sạn, nhìn xuống thị trấn
          Fira lung linh ánh đèn. Santorini về đêm không ồn ào, mà lấp lánh như
          một dải ngân hà rơi xuống mặt đất.
        </p>
        <p>
          Tạm biệt hòn đảo của những giấc mơ. Santorini đã dạy mình cách sống
          chậm lại, hít thở sâu hơn và trân trọng từng khoảnh khắc đẹp đẽ của tự
          nhiên.
        </p>

        <hr
          style={{ margin: "40px 0", border: "0", borderTop: "1px solid #eee" }}
        />

        {/* CTA SECTION */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Bạn có hứng thú với một chuyến du lịch trải nghiệm tại Santorini
            không?<br></br> Hãy nhanh tay đặt vé nhé!
          </h2>
          <div className={styles.buttonWrapper}>
            <button className={styles["book-now-button"]}>
              Đặt vé đến Santorini ngay
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}

export default StorySantorini;