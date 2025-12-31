import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Import ảnh (Sử dụng ảnh thật hoặc placeholder tương ứng với nội dung trong ảnh)
import imgHeader from "../Assets/sarajevo_thumbnail.png"; // Ảnh cầu Latin và phố cổ (Header)
import imgStreet from "../Assets/sarajevo_2.jpg"; // Ảnh phố cổ Baščaršija (Thay bằng ảnh thật nếu có)
import imgFood from "../Assets/sarajevo_3.jpg"; // Ảnh món ăn (Thay bằng ảnh thật nếu có)
import imgView from "../Assets/sarajevo_4.jpg"; // Ảnh cô gái ngắm cảnh (Thay bằng ảnh thật nếu có)
import imgFooter from "../Assets/sarajevo.jpg"; // Ảnh footer

import styles from "./Article.module.css";

function ArticleSarajevo() {
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
          <h1 className={styles.articleTitle}>
            10 ngày dạo bước ở Sarajevo
          </h1>
        </header>

        {/* 3. ACTION BAR */}
        <div className={styles.actionBar}>
          <span className={styles.metaItem}>
            <strong>Tác giả:</strong> Annia Norwood
          </span>
          <span className={styles.metaItem}>
            <strong>Thể loại:</strong> Du lịch – Trải nghiệm cá nhân
          </span>
          <span className={styles.metaItem}>
            <strong>Thời gian đọc:</strong> 8 phút
          </span>
        </div>

        {/* 4. ẢNH CHÍNH (HERO IMAGE) */}
        <img 
            src={imgHeader} 
            alt="Sarajevo Old Town" 
            className={styles.mainImage} 
        />

        {/* 5. TRÍCH DẪN (QUOTE TỪ ẢNH) */}
        <div className={styles.quoteBox}>
            <p className={styles.quoteText}>
                "Sarajevo không khiến bạn yêu ngay từ cái nhìn đầu tiên. Nhưng nếu bạn cho nó thời gian, thành phố ấy sẽ khẽ chạm vào tim bạn — bằng những câu chuyện, mùi hương và tiếng cười."
            </p>
            <div className={styles.quoteAuthor}>— Annia Norwood</div>
        </div>

        {/* --- NỘI DUNG BÀI VIẾT --- */}
        <p style={{fontStyle: 'italic', fontWeight: 'bold'}}>Xin chào mọi người,</p>
        <p>
          Mình là Annia Norwood, một blogger du lịch yêu tự do và cái đẹp mộc mạc của thế giới. Mình luôn tin rằng, mỗi hành trình đều là một cuốn sách - và mỗi vùng đất mới là một chương chưa được viết.
        </p>
        <p>
          Lần này, trang sách của mình mang tên Sarajevo – thủ đô của Bosnia và Herzegovina, thành phố nhỏ bé nằm giữa những dãy núi Balkan, nơi quá khứ và hiện tại hòa quyện một cách dịu dàng.
        </p>

        <h2>Vi Sao Lại Là Sarajevo?</h2>
        <p>
          Thú thật, trước khi tới đây, người ta thường dặn dò mình: Sarajevo buồn lắm. Ký ức về chiến tranh vẫn còn in hằn trên những bức tường lỗ chỗ vết đạn. Nhưng Sarajevo không chỉ có nỗi buồn... Đó là một thành phố đang hồi sinh mạnh mẽ và tràn đầy hy vọng.
        </p>
        <p>
          Một lý do nữa khiến mình tò mò: Đây là nơi giao thoa của Đông và Tây. Người ta gọi Sarajevo là "Jerusalem của Châu Âu" – nơi mà chỉ cần xoay nhẹ đầu, bạn có thể nhìn thấy tháp chuông nhà thờ Công giáo đứng cạnh những mái vòm Thánh đường Hồi giáo.
        </p>
        <p>
          Mục tiêu chuyến đi này của mình rất đơn giản: sống thật chậm trong 10 ngày, đi dạo qua những con phố nhỏ, uống cà phê, và cảm nhận nhịp thở của thành phố này.
        </p>

        <h2>Ngày 1–2: Lạc Bước Ở Baščaršija – Trái Tim Cổ Kính Của Sarajevo</h2>
        <p>
          Mình đã dành trọn 2 ngày đầu tiên để "lạc" ở khu phố cổ Baščaršija (Old Bazaar). Ngay từ lần hít hà đầu tiên, mình đã choáng ngợp. Không gian ngập tràn mùi thơm của cà phê Bosnia đậm đặc và mùi bánh nướng nhân thịt thơm lừng (Burek) tỏa ra từ những tiệm ăn nhỏ nằm san sát nhau.
        </p>
        <p>
          Điểm nhấn không thể bỏ qua chính là đài phun nước Sebilj – biểu tượng bằng gỗ nằm giữa quảng trường, nơi hàng trăm chú bồ câu sà xuống mổ thóc. Người dân ở đây truyền tai nhau rằng: "Ai uống nước ở Sebilj, người đó sẽ còn quay lại Sarajevo".
        </p>
        <img
          src={imgStreet}
          alt="Phố cổ Baščaršija"
          className={styles["paragraph-image"]}
        />
        <p>
          Mình cũng đi qua cây cầu Latin (Latin Bridge), nơi lịch sử thế giới từng thay đổi mãi mãi. Chính tại đây, vụ ám sát thái tử Áo-Hung đã châm ngòi cho Thế chiến thứ Nhất. Đứng trên cây cầu nhỏ bé bắc qua dòng sông Miljacka hiền hòa, mình bỗng thấy dòng chảy thời gian sao mà kỳ lạ và đáng suy ngẫm.
        </p>

        <h2>Ngày 3–4: Khi vị giác lên tiếng – Ẩm thực Sarajevo</h2>
        <p>
          Nếu bạn là người yêu ẩm thực (như mình), Sarajevo chính là thiên đường dành cho bạn. Đồ ăn ở đây mang đậm phong cách Balkan – mộc mạc, đậm đà và cực kỳ "comfort food".
        </p>
        <p>
          Buổi trưa, mình thử món Cevapi – món "quốc hồn quốc tú" của Bosnia. Đó là những viên thịt nướng nhỏ thơm phức, ăn kèm bánh mì dẹt mềm xốp và hành tây sống. Nghe đơn giản, nhưng hương vị lại đậm đà khó quên.
        </p>
        <img
          src={imgFood}
          alt="Ẩm thực Sarajevo - Món Sogan Dolma"
          className={styles["paragraph-image"]}
        />
        <p>
          Một món khác khiến mình mê mẩn là Klepe (dumplings nhân thịt băm) và Sogan Dolma (hành tây nhồi thịt). Người dân ở đây ăn kèm với một loại sốt kem chua và tỏi rất đặc biệt, làm dậy lên vị ngọt của hành và thịt.
        </p>
        <p>
          Một trải nghiệm thú vị khác là uống cà phê Bosnia. Không giống espresso hay americano, cà phê ở đây được đun trong ấm đồng nhỏ xíu (džezva), rót ra chén nhỏ, đặc quánh và chưa lọc bã. Một buổi chiều ngồi nhâm nhi cà phê, cắn một viên đường và ngắm dòng người qua lại là trải nghiệm "must-try".
        </p>

        <h2>Ngày 5–6: Dạo quanh thành phố của những tín ngưỡng và vết tích lịch sử</h2>
        <p>
          Sarajevo là nơi hiếm hoi trên thế giới mà – Nhà thờ Công giáo, Chính thống giáo, Giáo đường Do Thái và Thánh đường Hồi giáo – cùng tồn tại trong một khu phố.
        </p>
        <p>
          Mình dành trọn một buổi sáng để thăm Gazi Husrev-beg Mosque, một trong những công trình Hồi giáo đẹp nhất vùng Balkan. Chỉ vài bước chân thôi, bạn đã có thể thấy Sacred Heart Cathedral (Nhà thờ Tim Chúa Giêsu) uy nghiêm, và Old Synagogue – bảo tàng Do Thái lâu đời.
        </p>
        <p>
          Buổi chiều, mình đến thăm Đường hầm Hy vọng (Tunnel of Hope). Đây là nơi duy nhất kết nối Sarajevo với thế giới bên ngoài trong những năm tháng bị vây hãm (1992-1995). Đi bộ qua đoạn đường hầm thấp và hẹp, mình cảm nhận rõ hơn bao giờ hết giá trị của hòa bình và sức sống mãnh liệt của con người nơi đây.
        </p>

        <h2>Ngày 7–8: Khi thiên nhiên lên tiếng – những góc xanh quanh Sarajevo</h2>
        <p>
          Vào những ngày cao điểm, mình muốn tìm chút không khí trong lành. Vậy là mình đi cáp treo lên núi Trebević, nơi từng là địa điểm thi đấu Olympic mùa đông 1984. Đường trượt băng cũ giờ đã phủ rêu, nhưng lại trở thành nơi check-in yêu thích của giới trẻ. Từ đỉnh núi, toàn cảnh Sarajevo hiện ra dưới chân – một bức tranh tuyệt đẹp giữa những mái ngói đỏ, thung lũng xanh và dãy núi tuyết bao quanh.
        </p>
        <img
          src={imgView}
          alt="Ngắm cảnh Sarajevo từ trên cao"
          className={styles["paragraph-image"]}
        />
        <p>
          Buổi chiều, mình ghé Yellow Fortress (Pháo đài Vàng), một tàn tích pháo đài cũ để ngắm hoàng hôn. Đây là nơi đẹp nhất để ngắm mặt trời lặn khuất sau những mái vòm của Sarajevo vào những buổi chiều vàng rực rỡ. Khoảnh khắc ấy bình yên đến lạ, mọi lo âu dường như tan biến.
        </p>

        <h2>Ngày 9–10: Thư giãn, mua sắm và tạm biệt Sarajevo</h2>
        <p>
          Những ngày cuối, mình không đi nhiều nữa. Mình dành thời gian đi dạo lại phố cổ Baščaršija để mua vài món quà lưu niệm. Những bộ ấm chén cà phê bằng đồng được chạm khắc tinh xảo là món quà tuyệt vời nhất.
        </p>
        <p>
          Đêm cuối cùng, mình ngồi ở một quán bar nhỏ bên sông, nhấp chút rượu Rakija (rượu trái cây mạnh), nghe nhạc acoustic và nhìn dòng người đi lại. Sarajevo lúc ấy vừa buồn, vừa đẹp, vừa yên bình – như thể muốn nói: "Cảm ơn vì đã đến và cảm nhận tôi bằng cả trái tim".
        </p>

        <h2>Kết lại...</h2>
        <p>
          10 ngày ở Sarajevo trôi qua nhanh như một giấc mơ lấp lánh. Mình đến đây với trái tim tò mò, và rời đi với trái tim đầy yêu thương.
        </p>
        <p>
          Sarajevo không lộng lẫy hào nhoáng "wow" ngay lập tức – nó nhẹ nhàng và lặng. Càng đi sâu vào, đi bao nhiêu ngõ ngách, nói chuyện với bao nhiêu người, bạn càng thấy yêu mến mảnh đất này.
        </p>
        <p>
          Nếu bạn đang tìm một nơi để chữa lành, để sống chậm, hay có thể tìm kiếm sự nghiệm và mỉm cười cùng lúc – thì hãy để Sarajevo nằm trong danh sách "phải đến một lần trong đời".
        </p>
        <p>
          Tin mình đi, bạn sẽ không hối tiếc đâu.
        </p>
        
        <p style={{fontStyle: 'italic', marginTop: '20px'}}>
            Viết từ Sarajevo, với tình yêu và nỗi nhớ cà phê Bosnia.<br/>
            — Annia Norwood —
        </p>

        {/* CTA SECTION */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Bạn có hứng thú với một chuyến du lịch tại thành phố Sarajevo không?<br></br> Hãy nhanh tay đặt vé nhé!
          </h2>
          <div className={styles.buttonWrapper}>
            <button className={styles["book-now-button"]}>
              Đến trang đặt vé
            </button>
          </div>
        </div>

        {/* FOOTER IMAGE */}
        <img
          src={imgFooter}
          alt="Tourist-image"
          className={styles["paragraph-image"]}
          style={{ marginTop: "40px" }}
        />
      </article>
    </main>
  );
}

export default ArticleSarajevo;