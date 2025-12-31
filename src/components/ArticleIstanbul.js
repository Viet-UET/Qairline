import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// IMPORT HÌNH ẢNH (Sử dụng ảnh placeholder tạm thời, bạn hãy thay bằng ảnh thật của Istanbul sau này)
import imgHeader from "../Assets/Istanbul_0.png"; // Ảnh bìa (Hagia Sophia/Blue Mosque)
import imgBazaar from "../Assets/istanbul_1.png"; // Ảnh Grand Bazaar/Spice Bazaar
import imgBosphorus from "../Assets/istanbul_2.png"; // Ảnh du thuyền Bosphorus/Tháp Galata
import imgFood from "../Assets/istanbul_3.png"; // Ảnh ẩm thực đường phố
import imgFooter from "../Assets/istanbul_5.png"; // Ảnh footer du khách

import styles from "./Article.module.css";

function ArticleIstanbul() {
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
            Lang thang giữa linh hồn Istanbul
          </h1>
        </header>

        {/* 3. ACTION BAR & META DATA (Theo cấu trúc file mẫu) */}
        <div className={styles.actionBar}>
          <span className={styles.metaItem}>
            <strong>Tác giả:</strong> Annia Norwood
          </span>
          <span className={styles.metaItem}>
            <strong>Thể loại:</strong> Du lịch - Trải nghiệm cá nhân
          </span>
          <span className={styles.metaItem}>
            <strong>Thời gian đọc:</strong> 8 phút
          </span>
        </div>

        {/* 4. ẢNH CHÍNH (HERO IMAGE) */}
        <img
          src={imgHeader}
          alt="Istanbul Cityscape"
          className={styles.mainImage}
        />

        {/* 5. TRÍCH DẪN (QUOTE TỪ ẢNH) */}
        <div className={styles.quoteBox}>
          <p className={styles.quoteText}>
            "Istanbul giống như một bản giao hưởng của hai thế giới — nơi Đông gặp Tây, quá khứ chạm vào hiện tại. Thành phố ấy không chỉ khiến bạn choáng ngợp bởi vẻ đẹp kỳ vĩ mà còn bởi chiều sâu tâm hồn..."
          </p>
          <div className={styles.quoteAuthor}>— Annia Norwood</div>
        </div>

        {/* --- NỘI DUNG BÀI VIẾT --- */}
        <p style={{ fontStyle: "italic", fontWeight: "bold" }}>
          Xin chào mọi người,
        </p>
        <p>
          Mình là Annia Norwood. Nếu bạn đã từng đọc bài viết của mình về
          Sarajevo, bạn sẽ biết mình yêu những thành phố có bề dày lịch sử và
          sự pha trộn văn hóa đến nhường nào. Và lần này, hành trình của mình
          dừng lại ở một trong những thành phố vĩ đại nhất thế giới: Istanbul,
          Thổ Nhĩ Kỳ.
        </p>

        <h2>Vì Sao Lại Là Istanbul?</h2>
        <p>
          Có một câu nói rằng: "Nếu thế giới chỉ là một quốc gia, thì Istanbul
          sẽ là thủ đô của nó." Napoleon Bonaparte đã nói như vậy, và khi đặt
          chân đến đây, mình hiểu tại sao.
        </p>
        <p>
          Istanbul là thành phố duy nhất trên thế giới nằm trên hai châu lục:
          Châu Âu và Châu Á, được ngăn cách bởi eo biển Bosphorus huyền thoại.
          Đây từng là kinh đô của ba đế chế vĩ đại: La Mã, Byzantine và Ottoman.
          Lịch sử ở đây không chỉ nằm trong sách vở, mà nó hiện hữu trên từng
          viên đá lát đường, từng mái vòm nhà thờ và từng ngọn tháp thánh đường.
        </p>
        <p>
          Mình đến Istanbul không phải để chạy đua với danh sách các điểm
          check-in, mà để lạc lối, để lắng nghe và để cảm nhận nhịp đập của một
          thành phố đã sống qua hàng ngàn năm.
        </p>

        <h2>Ngày 1–2: Lạc bước giữa những biểu tượng (Khu Sultanahmet)</h2>
        <p>
          Mình dành hai ngày đầu tiên để đắm mình trong khu lịch sử Sultanahmet.
          Cảm giác đầu tiên khi đứng giữa quảng trường này là sự choáng ngợp.
        </p>
        <p>
          Bên này là <strong>Hagia Sophia (Ayasofya)</strong> – công trình kiến
          trúc vĩ đại đã từng là nhà thờ Thiên Chúa giáo trong gần 1000 năm, sau
          đó trở thành Thánh đường Hồi giáo, rồi bảo tàng, và nay lại là Thánh
          đường. Bước vào bên trong, nhìn lên mái vòm khổng lồ dường như lơ
          lửng giữa không trung, và những tia sáng xuyên qua cửa sổ kính màu,
          mình thực sự cảm thấy nhỏ bé trước sự kỳ diệu của kiến trúc và đức
          tin.
        </p>
        <p>
          Ngay đối diện là <strong>Thánh đường Xanh (Blue Mosque)</strong>. Với
          6 ngọn tháp minaret vươn cao và hơn 20.000 viên gạch gốm Iznik màu
          xanh lấp lánh bên trong, nơi này mang một vẻ đẹp lộng lẫy nhưng đầy
          bình yên. Mình đã ngồi lặng lẽ ở một góc, lắng nghe tiếng cầu nguyện
          vang vọng và cảm nhận sự tĩnh lặng trong tâm hồn.
        </p>

        <h2>Ngày 3–4: Mê cung của những giác quan (Grand Bazaar & Spice Bazaar)</h2>
        <p>
          Đến Istanbul mà không đi chợ thì coi như chưa đến. Mình đã chuẩn bị
          tinh thần để "lạc" ở <strong>Grand Bazaar (Kapalıçarşı)</strong> –
          một trong những khu chợ có mái che lớn nhất và cổ nhất thế giới.
        </p>
        <img
          src={imgBazaar}
          alt="Grand Bazaar Istanbul"
          className={styles["paragraph-image"]}
        />
        <p>
          Hơn 4.000 cửa hàng nằm trong một mê cung của những con phố nhỏ. Đó là
          một sự bùng nổ của màu sắc và âm thanh: những chiếc đèn lồng thủy
          tinh rực rỡ, những tấm thảm dệt tay tinh xảo, đồ gốm, trang sức...
          Những người bán hàng đon đả mời chào, tiếng mặc cả rộn ràng, mùi trà
          táo thơm lừng... tất cả tạo nên một bầu không khí sống động đến nghẹt
          thở.
        </p>
        <p>
          Sau đó, mình ghé <strong>Chợ Gia Vị (Spice Bazaar - Mısır Çarşısı)</strong>.
          Vừa bước vào, mùi hương nồng nàn của quế, nghệ tây, cumin và hàng
          trăm loại gia vị khác đã xộc vào mũi. Mình đã không kìm được mà mua
          rất nhiều trà hoa hồng và Lokum (kẹo dẻo Thổ Nhĩ Kỳ) ngọt ngào.
        </p>

        <h2>Ngày 5–6: Hơi thở của Bosphorus và nhịp sống hiện đại</h2>
        <p>
          Không có trải nghiệm nào ở Istanbul trọn vẹn nếu thiếu một chuyến phà
          trên eo biển <strong>Bosphorus</strong>. Với mình, đây là cách tuyệt
          vời nhất để cảm nhận sự giao thoa Đông - Tây.
        </p>
        <p>
          Mình mua một chiếc bánh simit (bánh mì vòng vừng), lên phà công cộng
          và ngồi ở boong ngoài. Gió biển mát lạnh, những chú hải âu bay lượn
          trên đầu chờ được cho ăn, và hai bên bờ là những cung điện, biệt thự
          cổ kính xen lẫn những tòa nhà hiện đại. Cảm giác lênh đênh giữa hai
          châu lục, nhâm nhi ly trà nóng thật sự khó tả.
        </p>
        <img
          src={imgBosphorus}
          alt="Bosphorus Cruise and Galata Tower"
          className={styles["paragraph-image"]}
        />
        <p>
          Buổi chiều, mình leo lên <strong>Tháp Galata</strong> để ngắm hoàng
          hôn. Cả thành phố Istanbul nhuộm màu vàng cam rực rỡ, với những ngọn
          tháp của Hagia Sophia và Blue Mosque nổi bật trên nền trời. Sau đó,
          mình hòa vào dòng người tấp nập trên đại lộ <strong>Istiklal</strong>,
          ngắm chiếc tàu điện màu đỏ cổ kính chạy qua và cảm nhận nhịp sống
          hiện đại, sôi động của giới trẻ Istanbul ở khu Beyoğlu.
        </p>

        <h2>Ngày 7–8: Ẩm thực – Linh hồn của phố thị</h2>
        <p>
          Ẩm thực Istanbul xứng đáng một chương riêng. Nó phong phú, đa dạng và
          đầy hương vị như chính lịch sử của thành phố này.
        </p>
        <ul>
          <li>
            <strong>Simit:</strong> Bữa sáng đơn giản nhưng gây nghiện. Chiếc
            bánh mì vòng phủ đầy vừng, giòn bên ngoài, mềm bên trong, ăn kèm
            với chút phô mai và một ly trà là khởi đầu hoàn hảo cho ngày mới.
          </li>
          <li>
            <strong>Balık Ekmek:</strong> Mình đã đến khu vực cầu Galata để thử
            món bánh mì kẹp cá nướng nổi tiếng này. Ngồi trên những chiếc ghế
            nhựa nhỏ ven bờ biển, ăn chiếc bánh mì nóng hổi với cá tươi, hành
            tây, rau xà lách và nhìn những người câu cá trên cầu là một trải
            nghiệm rất "đời".
          </li>
        </ul>
        <img
          src={imgFood}
          alt="Istanbul Street Food"
          className={styles["paragraph-image"]}
        />
        <p>
          Và tất nhiên, không thể thiếu trà (Çay) và cà phê Thổ Nhĩ Kỳ. Trà được
          uống trong những chiếc ly nhỏ hình hoa tulip ở khắp mọi nơi, mọi lúc.
          Còn cà phê thì đậm đặc, đắng và thơm nồng, thường được phục vụ kèm
          một viên kẹo dẻo.
        </p>

        <h2>Ngày 9–10: Những góc lặng và lời tạm biệt</h2>
        <p>
          Những ngày cuối, mình muốn tìm những góc yên tĩnh hơn của Istanbul.
          Mình tìm đến khu phố <strong>Fener và Balat</strong>. Nơi đây từng là
          khu vực sinh sống của cộng đồng người Hy Lạp và Do Thái. Những ngôi
          nhà cổ đầy màu sắc, những con dốc nhỏ lát đá, những quán cà phê
          vintage xinh xắn... Balat mang một vẻ đẹp hoài cổ, bình yên và rất
          "nghệ".
        </p>
        <p>
          Buổi chiều cuối cùng, mình chỉ ngồi bên bờ biển ở khu Üsküdar (phía
          bờ Á), nhìn về phía tháp Maiden (Kız Kulesi) giữa biển và ngắm hoàng
          hôn buông xuống phía bờ Âu.
        </p>

        <h2>Kết lại...</h2>
        <p>
          10 ngày ở Istanbul là một hành trình của những giác quan. Thành phố
          này có thể ồn ào, hỗn loạn, đôi khi khiến bạn kiệt sức, nhưng nó cũng
          vô cùng quyến rũ, nồng hậu và hào phóng.
        </p>
        <p>
          Istanbul là một sự va chạm tuyệt đẹp giữa cũ và mới, giữa thiêng liêng
          và trần tục. Nó là nơi bạn có thể nghe tiếng gọi cầu nguyện từ thế kỷ
          thứ 7 trong khi đang uống một ly latte hiện đại.
        </p>
        <p>
          Nếu bạn đang tìm kiếm một nơi để lạc lối và tìm thấy những điều kỳ
          diệu ở mỗi góc phố, hãy đến Istanbul. Nó sẽ đón chào bạn bằng một ly
          trà nóng, một nụ cười và một câu chuyện chưa từng được kể.
        </p>

        <p style={{ fontStyle: "italic", marginTop: "20px" }}>
          Tạm biệt Istanbul, hẹn ngày gặp lại giữa hai châu lục.<br />
          — Annia Norwood —
        </p>

        {/* CTA SECTION */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Bạn có hứng thú với một chuyến du lịch trải nghiệm tại Istanbul không?<br /> Hãy nhanh tay đặt vé nhé!
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
          alt="Tourist in Istanbul"
          className={styles["paragraph-image"]}
          style={{ marginTop: "40px" }}
        />
      </article>
    </main>
  );
}

export default ArticleIstanbul;