import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Article.module.css";

// --- IMPORT HÌNH ẢNH ---
import imgHeader from "../Assets/Lourve_0.png"; // Ảnh bìa kim tự tháp ngày
import img1 from "../Assets/lourve_1.png"; // Ảnh sân điện Louvre
import img2 from "../Assets/lourve_2.png"; // Ảnh kim tự tháp đêm
import img3 from "../Assets/lourve_3.png"; // Ảnh Mona Lisa / Tượng
import img4 from "../Assets/lourve_4.png"; // Ảnh tranh khổ lớn
import img5 from "../Assets/lourve_5.png"; // Ảnh nội thất dát vàng
import img6 from "../Assets/lourve_6.png"; // Ảnh khách du lịch
import img7 from "../Assets/lourve_7.png"; // Ảnh khách du lịch


function ArticleLouvre() {
  // Tự động cuộn lên đầu trang khi mở bài viết
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
            Bảo tàng Louvre:<br></br> Cung điện nghệ thuật vĩ đại nhất thế giới
          </h1>
        </header>

        {/* 3. ACTION BAR */}
        <div className={styles.actionBar}>
          <span className={styles.metaItem}>
            <strong>Tác giả:</strong> Annia Norwood
          </span>
          <span className={styles.metaItem}>
            <strong>Thời gian đọc:</strong> 7 phút
          </span>
          <span className={styles.metaItem}>
            <strong>Ngày viết:</strong> 20/05/2025
          </span>
        </div>

        {/* Nội dung dẫn nhập */}
        <p>
          Nằm bên bờ sông Seine lãng mạn, Bảo tàng Louvre không chỉ là bảo tàng
          được yêu thích và ghé thăm nhiều nhất thế giới với 8,9 triệu lượt
          khách mỗi năm, mà còn là một hành trình xuyên suốt 800 năm lịch sử -
          từ pháo đài thời trung cổ đến cung điện hoàng gia, và cuối cùng trở
          thành ngôi đền của nghệ thuật nhân loại.
        </p>

        {/* 4. ẢNH CHÍNH (HERO IMAGE) */}
        <img
          src={imgHeader}
          alt="Bảo tàng Louvre toàn cảnh"
          className={styles.mainImage}
        />

        {/* --- NỘI DUNG BÀI VIẾT --- */}
        <p>
          Với 35.000 tác phẩm nghệ thuật được trưng bày trong diện tích 72.735
          mét vuông - từ những nền văn minh cổ đại 4.000 năm trước Công nguyên
          đến thế kỷ 21 - Louvre là nơi hội tụ những kiệt tác vĩ đại nhất mà con
          người từng sáng tạo, từ nụ cười bí ẩn của Mona Lisa đến vẻ đẹp thanh
          tao của Venus de Milo.
        </p>

        {/* PHẦN 1 */}
        <h2>Tám trăm năm lịch sử</h2>
        <h3>Từ pháo đài đến cung điện</h3>
        <p>
          Câu chuyện của Louvre bắt đầu vào năm 1190, khi vua Philip II ra lệnh
          xây dựng một pháo đài có bức tường dày 2,6 mét và hào nước bao quanh
          để bảo vệ Paris khỏi các cuộc xâm lược. Pháo đài gần như vuông vức với
          10 tháp phòng thủ tròn và một tháp chính cao 30 mét ở giữa sân.
        </p>
        <p>
          Đến thế kỷ 14, dưới triều vua Charles V, Louvre bắt đầu chuyển mình từ
          pháo đài sang cung điện hoàng gia theo phong cách Gothic. Thế kỷ 16
          đánh dấu bước ngoặt lớn khi vua Francis I - một vị vua say mê nghệ
          thuật - triệu tập kiến trúc sư Pierre Lescot để biến Louvre thành một
          cung điện Renaissance tráng lệ.
        </p>
        <p>
          Khu Cour Carrée (Sân Vuông) xuất hiện với những cột cổ điển và mặt
          tiền thanh lịch, báo hiệu địa vị mới của Louvre. Thế kỷ 17 chứng kiến
          công trình của Louis XIV với Louvre Colonnade nổi tiếng - một dãy cột
          Corinthian khổng lồ do Claude Perrault thiết kế.
        </p>
        <h3>Trở thành bảo tàng công cộng</h3>
        <p>
          Năm 1793, sau Cách mạng Pháp, Louvre chính thức mở cửa như một bảo
          tàng công cộng lần đầu tiên. Bộ sưu tập ban đầu là kho báu hoàng gia,
          sau đó được mở rộng đáng kể nhờ cuộc viễn chinh Ai Cập của Napoleon
          năm 1798.
        </p>
        <img
          src={img1}
          alt="Toàn cảnh Louvre từ sân chính"
          className={styles["paragraph-image"]}
        />

        {/* PHẦN 2 */}
        <h3>Kim tự tháp kính - Mang hơi thở hiện đại đến lịch sử</h3>
        <p>
          Năm 1981, Tổng thống François Mitterrand khởi động dự án "Grand
          Louvre" để hiện đại hóa bảo tàng. Kiến trúc sư người Mỹ gốc Hoa I.M.
          Pei đã tạo nên một kiệt tác táo bạo: Kim tự tháp kính cao 21 mét bằng
          673 tấm kính ở trung tâm sân Napoléon.
        </p>
        <p>
          Kim tự tháp này - vốn gây tranh cãi khi mới ra đời - giờ đã trở thành
          biểu tượng không thể thiếu của Louvre và một trong những tác phẩm kiến
          trúc hiện đại nổi tiếng nhất thế giới. Bên dưới kim tự tháp là sảnh
          chính rộng lớn, nơi du khách có thể tiếp cận trực tiếp cả ba cánh của
          bảo tàng.
        </p>
        <img
          src={img2}
          alt="Kim tự tháp kính"
          className={styles["paragraph-image"]}
        />
        <p>
          Tuy nhiên, thời gian đã chứng minh tầm nhìn của I.M. Pei. Giờ đây, Kim
          tự tháp kính đã trở thành biểu tượng không thể tách rời của Louvre,
          mang ánh sáng tự nhiên xuống sảnh đón khách ngầm rộng lớn bên dưới và
          là điểm check-in không thể thiếu của du khách.
        </p>

        <h2>Những kiệt tác không thể bỏ lỡ</h2>
        <p>
          Với 35.000 tác phẩm được trưng bày, nếu bạn dành 30 giây cho mỗi tác
          phẩm, bạn sẽ cần 100 ngày liên tục để xem hết. Thực tế, hầu hết du
          khách dành khoảng:
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            <strong>Tour nhanh (2-3 giờ):</strong> Tập trung vào các tác phẩm
            nổi tiếng nhất như Mona Lisa, Thần vệ nữ Milo và Thần chiến thắng có
            cánh.
          </li>
          <li>
            <strong>Nửa ngày (3-4 giờ):</strong> Khám phá cả cánh Denon và
            Sully, với nhịp độ thoải mái hơn
          </li>
          <li>
            <strong>Cả ngày (5-6 giờ):</strong> Đắm chìm trong các bộ sưu tập đa
            dạng với nhiều thời gian nghỉ ngơi
          </li>
          <li>
            <strong>Nhiều ngày:</strong> Những người đam mê nghệ thuật thường
            dành 2-3 ngày để khám phá sâu từng bộ sưu tập.
          </li>
        </ul>
        <p>
          Dưới đây là những kiệt tác bạn không nên bỏ lỡ khi có cơ hội ghé thăm
          nơi đây:
        </p>
        <h3>
          Bộ ba nữ thần huyền thoại: Mona Lisa, Nữ thần Nike của Samothrace và
          Thần Vệ nữ Milo
        </h3>
        <img
          src={img3}
          alt="Các tác phẩm kinh điển"
          className={styles["paragraph-image"]}
        />
        <p>
          Là bức chân dung nổi tiếng nhất thế giới do Leonardo da Vinci vẽ
          khoảng năm 1505, nàng Lisa thu hút hàng triệu du khách mỗi năm. Nụ
          cười bí ẩn của Lisa Gherardini, vợ của một thương gia lụa thành
          Florentine, được tạo nên bằng kỹ thuật sfumato tinh tế của da Vinci -
          sử dụng lớp men mỏng tạo hiệu ứng "khói mờ" và chuyển tiếp màu sắc tự
          nhiên. Leonardo chưa bao giờ hoàn thành bức tranh này, và đã mang theo
          Pháp khi ông trở thành họa sĩ triều đình, chạm chỉnh nó cho đến khi
          qua đời năm 1521. Năm 1911, Mona Lisa bị đánh cắp khỏi Louvre bởi một
          thợ lắp kính tên Vincenzo Peruggia, tạo nên "vụ trộm thế kỷ". Bức
          tranh chỉ được tìm thấy sau hơn hai năm, và sự kiện này đã làm tăng
          thêm danh tiếng của nó.
        </p>
        <p>
          Tượng thần chiến thắng Samothrace (Winged Victory) - tác phẩm điêu
          khắc Hy Lạp cổ đại từ thế kỷ 2 trước Công nguyên - được đặt ở đỉnh cầu
          thang Daru hùng vĩ. Bức tượng cao 5,57 mét này thể hiện nữ thần chiến
          thắng có cánh đang đáp xuống mũi tàu chiến, được tạo ra để tôn vinh
          một chiến thắng hải quân. Dù không còn đầu và tay, tác phẩm này vẫn
          được coi là một trong những bức tượng Hy Lạp nguyên bản vĩ đại nhất
          còn sót lại - vượt xa các bản sao La Mã về cả tuổi đời lẫn kỹ thuật.
        </p>
        <p>
          Venus de Milo - đại diện cho Aphrodite, nữ thần tình yêu và sắc đẹp Hy
          Lạp - có niên đại khoảng năm 100 trước Công nguyên. Được tìm thấy trên
          đảo Milos năm 1820 và hiến tặng cho Louvre năm 1821, bức tượng này dù
          đã mất cả hai cánh tay vẫn toát lên vẻ thanh lịch và nữ tính không thể
          nhầm lẫn, ảnh hưởng sâu sắc đến cách các nhà điêu khắc phương Tây miêu
          tả vẻ đẹp con người
        </p>

        {/* PHẦN 4 */}
        <h3>Những tác phẩm hội họa vĩ đại</h3>
        <p>
          Ngoài "Ba quý bà", Louvre còn sở hữu những bức tranh khổ lớn gây
          choáng ngợp tại phòng tranh Pháp và Ý. Bạn sẽ không thể rời mắt khỏi
          bức "Lễ đăng quang của Napoleon" với kích thước khổng lồ, hay bức "Đám
          cưới ở Cana" chiếm trọn một bức tường lớn.
        </p>
        <img
          src={img4}
          alt="Tranh khổ lớn"
          className={styles["paragraph-image"]}
        />
        <p>
          Đặc biệt là bức tranh biểu tượng của Cách mạng Pháp - "Nữ thần Tự do
          dẫn dắt nhân dân" của Eugène Delacroix, thể hiện tinh thần quật cường
          của người dân Paris.
        </p>

        {/* PHẦN 5 */}
        <h3>Kho báu Ai Cập cổ đại</h3>
        <p>
          Bộ phận Cổ vật Ai Cập của Louvre - một trong những bộ sưu tập lớn nhất
          thế giới với hơn 50.000 hiện vật - trải dài từ năm 4.000 trước Công
          nguyên đến thế kỷ 4 sau Công nguyên. Bộ sưu tập được khai sinh năm
          1827 dưới sự lãnh đạo của Jean-François Champollion, người giải mã chữ
          tượng hình Ai Cập từ bia đá Rosetta.
        </p>
        <p>
          Được bảo vệ bởi Tượng Nhân Sư Khổng Lồ Tanis (khoảng 2.000 năm trước
          Công nguyên), bộ sưu tập gồm khoảng 30 phòng với nghệ thuật, cuộn giấy
          papyrus, xác ướp, công cụ, trang phục, đồ trang sức và vũ khí. Các tác
          phẩm nổi bật bao gồm "Người Thư Ký Ngồi" (The Seated Scribe) - một
          trong những tác phẩm điêu khắc Ai Cập cổ đại tinh xảo nhất
        </p>
        <img
          src={img5}
          alt="Kho báu Ai Cập"
          className={styles["paragraph-image"]}
        />
        <h3>Căn hộ Napoleon III </h3>
        <p>
          Căn hộ Napoleon III - với nội thất nhung đỏ và vàng óng ánh - mang đến
          cảm giác như bước vào một giấc mơ dệt bằng quyền lực và sự xa hoa. Tại
          trung tâm một phòng lớn là ngai vàng của Napoleon với chữ "N" thêu
          vàng, và một tấm thảm lớn có hình đại bàng hoàng gia được tạo ra năm
          1810 cho đám cưới của Napoleon với Marie-Louise.
        </p>
        <img
          src={img6}
          alt="Căn hộ Napoleon III"
          className={styles["paragraph-image"]}
        />

        {/* PHẦN 6 */}
        <h2>Những lưu ý quan trọng khi tham quan</h2>

        <h3>Về giá vé</h3>
        <p>
          22 euro cho người lớn. Miễn phí cho người dưới 18 tuổi và dưới 26 tuổi
          nếu là công dân Khu vực Kinh tế Châu Âu. Cần đặt vé trước bắt buộc với
          khung giờ cụ thể để đảm bảo được vào, vì số lượng khách mỗi ngày bị
          giới hạn. Ngay cả khi có vé, thời gian xếp hàng trung bình có thể lên
          đến 40 phút đến 2 giờ vào những ngày đông.
        </p>

        <h3>Thời gian tham quan lý tưởng</h3>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            <strong>Buổi sáng sớm (9:00-11:00):</strong> Ánh sáng tự nhiên đẹp
            qua cửa sổ, ít đông đúc hơn buổi chiều 50%
          </li>
          <li>
            <strong>Buổi tối (18:00-21:00 thứ Tư, Thứ Sáu):</strong> Ánh sáng
            nhân tạo tạo hiệu ứng ấn tượng, đám đông giảm dần khi người ta đi ăn
            tối
          </li>
          <li>
            <strong>Ngày trong tuần:</strong> Tránh thứ Hai và thứ Tư (ngày sau
            khi đóng cửa). Thứ Năm là lựa chọn tốt nhất
          </li>
          <li>
            <strong>Mùa trong năm:</strong> Tháng 11 đến tháng 3 (mùa thấp điểm)
            có ít du khách nhất, nhưng tránh dịp Giáng sinh và Năm mới
          </li>
        </ul>

        <h3>Giờ mở cửa</h3>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>Thứ Hai, Thứ Năm, Thứ Bảy, Chủ Nhật: 9:00 - 18:00</li>
          <li>Thứ Ba: Đóng cửa</li>
          <li>Thứ Tư, Thứ Sáu: 9:00 - 21:00 (mở cửa buổi tối)</li>
        </ul>
        <p>
          <strong>Lưu ý:</strong> Khách phải vào trước 1 giờ khi đóng cửa, và
          phải rời khỏi phòng trưng bày trước 30 phút khi đóng cửa.
        </p>

        <h3>Cách di chuyển đến Louvre</h3>
        <p>
          <strong>Metro (cách tốt nhất):</strong>
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            Tuyến 1 hoặc 7: Ga Palais Royal-Musée du Louvre (đi bộ 3 phút hoặc
            qua đường hầm)
          </li>
          <li>Tuyến 14: Ga Pyramides (đi bộ 500m, dưới 10 phút)</li>
          <li>
            Giá vé metro tiêu chuẩn: 2,15 euro mỗi lượt trong khu trung tâm
            Paris (zone 1-2)
          </li>
          <li>Vé ngày không giới hạn: 8,45 euro cho metro, xe buýt và tram</li>
        </ul>

        <p>
          <strong>Xe buýt:</strong> Các tuyến 21, 24, 27, 39, 48, 68, 69, 72, 81
          và 95 đều dừng gần Louvre tại trạm Louvre Rivoli hoặc Palais Royal
          Musée du Louvre.
        </p>

        <p>
          <strong>Taxi:</strong>
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>Từ trung tâm Paris: 15-25 euro</li>
          <li>Từ ga tàu: 25-35 euro</li>
          <li>Từ sân bay: 55-75 euro</li>
        </ul>
        <p>
          Khu vực đón khách ở Place André Malraux, khu vực trả khách tại vòng
          xoay Carrousel.
        </p>

        <p>
          <strong>Bãi đỗ xe ngầm:</strong> Tại 1 Avenue du Général Lemonnier, mở
          cửa 7:00-23:00, truy cập bảo tàng qua lối vào Galerie du Carrousel.
        </p>

        <h3>Lối vào bảo tàng</h3>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            <strong>Lối vào Kim tự tháp (Pyramid):</strong> Lối vào chính nổi
            tiếng với 2 điểm kiểm tra an ninh. Phù hợp cho thời tiết đẹp.
          </li>
          <li>
            <strong>Lối vào Carrousel du Louvre:</strong> Lối vào ngầm qua trung
            tâm mua sắm ở 99 Rue de Rivoli. Trước đây là "lối tắt bí mật" ít
            người biết, nhưng giờ cũng đông như lối chính, chỉ có 1 điểm kiểm
            tra an ninh so với 2 điểm của kim tự tháp. Phù hợp cho ngày mưa hoặc
            lạnh.
          </li>
        </ul>
        <p>
          <strong>Mẹo:</strong> Nếu đi metro, sử dụng Exit 6 (Carrousel du
          Louvre) từ ga Palais Royal-Musée du Louvre (tuyến 1 hoặc 7) để vào
          trực tiếp bảo tàng qua đường hầm, mở cửa từ 8:30 sáng.
        </p>

        <h3>Bản đồ và định hướng</h3>
        <p>
          Lấy bản đồ giấy ở quầy thông tin dưới Kim tự tháp khi vào. Bên trong
          các phòng trưng bày không có bản đồ in - thay vào đó có mã QR cho bản
          đồ kỹ thuật số (có Wi-Fi miễn phí).
        </p>

        <h3>Lộ trình tối ưu cho lần đầu tham quan</h3>
        <ol
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>Mona Lisa (Cánh Denon, tầng 1)</li>
          <li>Liberty Leading the People - Delacroix (Cánh Denon, tầng 1)</li>
          <li>Winged Victory of Samothrace (Cánh Denon, tầng 1)</li>
          <li>Châu báu Hoàng gia Pháp (Cánh Denon, tầng 1)</li>
          <li>Tượng Hy Lạp bao gồm Venus de Milo (Cánh Sully, tầng trệt)</li>
          <li>Kho báu Ai Cập (Cánh Sully, tầng trệt)</li>
          <li>Cour Marly và Cour Puget (Cánh Richelieu, tầng -1)</li>
          <li>Căn hộ Napoleon III (Cánh Richelieu, tầng 1)</li>
        </ol>

        <h3>Quy định chụp ảnh</h3>
        <p>
          <strong>Được phép:</strong>
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            Chụp ảnh và quay video trong các bộ sưu tập thường trực cho mục đích
            cá nhân
          </li>
          <li>Sử dụng camera cá nhân và điện thoại thông minh</li>
        </ul>

        <p>
          <strong>Cấm nghiêm ngặt:</strong>
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            Đèn flash - để bảo vệ tác phẩm nghệ thuật nhạy cảm với ánh sáng
          </li>
          <li>
            Chân máy, monopod và gậy selfie - do hạn chế không gian và lo ngại
            an toàn
          </li>
          <li>Thiết bị chuyên nghiệp cần giấy phép đặc biệt</li>
        </ul>

        <p>
          <strong>Lưu ý:</strong> Một số triển lãm tạm thời có thể cấm chụp ảnh
          hoàn toàn do thỏa thuận cho mượn hoặc hạn chế bản quyền.
        </p>

        <h3>Ăn uống gần đó</h3>
        <p>
          Tránh các nhà hàng bẫy khách du lịch ngay cạnh bảo tàng. Dưới đây là
          một số gợi ý tốt cách đi bộ 10-15 phút:
        </p>

        <p>
          <strong>
            Khu vực Rue Montorgueil và Palais Royal (yêu thích của người dân địa
            phương):
          </strong>
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>Chez George - bistro cổ điển Pháp truyền thống</li>
          <li>Kunitoraya - mì udon Nhật Bản chính gốc</li>
          <li>Willis Wine Bar - rượu vang tự nhiên</li>
          <li>
            Stohrer - tiệm bánh ngọt lịch sử từ thế kỷ 18, mở cửa từ 8:00 sáng
          </li>
        </ul>

        <p>
          <strong>Gần hơn:</strong>
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            Café Verlet (256 Rue Saint-Honoré) - quán cà phê tuyệt vời với thức
            ăn sáng/trưa ngon
          </li>
          <li>
            Wild & The Moon (19 Place du Marché Saint-Honoré) - món ăn chay
            thuần túy xuất sắc
          </li>
          <li>
            Au Pied du Cochon - món ăn Pháp truyền thống, thử súp hành nổi tiếng
          </li>
        </ul>

        <h3>Điểm tham quan gần đó</h3>
        <ul
          style={{
            lineHeight: "1.8",
            marginBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          <li>
            <strong>Vườn Tuileries</strong> - công viên lịch sử ngay bên cạnh
            Louvre, hoàn hảo để nghỉ chân sau khi tham quan
          </li>
          <li>
            <strong>Palais Royal</strong> - cung điện và vườn thanh lịch, cách
            đi bộ 5 phút
          </li>
          <li>
            <strong>Musée d'Orsay</strong> - bảo tàng ấn tượng phái nổi tiếng,
            qua sông Seine
          </li>
          <li>
            <strong>Pont des Arts</strong> - cầu bộ hành nổi tiếng với ổ khóa
            tình yêu
          </li>
          <li>
            <strong>Sainte-Chapelle</strong> - nhà thờ Gothic với cửa sổ kính
            màu tuyệt đẹp
          </li>
        </ul>

        <img
          src={img7}
          alt="Louvre về đêm"
          className={styles["paragraph-image"]}
        />
        <h2>Lời kết</h2>
        <p>
          Bảo tàng Louvre không chỉ là một bảo tàng - đó là một hành trình xuyên
          suốt lịch sử nhân loại, nơi mỗi tác phẩm đều kể một câu chuyện về tài
          năng, niềm đam mê và khát vọng của con người qua hàng ngàn năm. Từ nụ
          cười bí ẩn của Mona Lisa đến tư thế bay bổng của Nữ thần Nike, từ kho
          báu Ai Cập cổ đại đến căn hộ lộng lẫy của Napoleon III, mỗi góc của
          Louvre đều là một khám phá mới.
        </p>
        <p>
          Với 35.000 tác phẩm được trưng bày trong một cung điện có lịch sử 800
          năm, không ai có thể xem hết Louvre trong một lần ghé thăm - và đó
          chính là vẻ đẹp của nó. Mỗi chuyến viếng thăm là một trải nghiệm
          riêng, một cuộc gặp gỡ mới với những kiệt tác vĩ đại mà nhân loại đã
          tạo ra.
        </p>
        <p>
          Hãy đặt vé trước, đến sớm, mặc giày êm chân, và chuẩn bị để bị choáng
          ngợp bởi một trong những di sản văn hóa vĩ đại nhất của nhân loại. Vì
          như nhà văn Mỹ Adam Gopnik đã viết: "Sự liên tục mà Louvre đại diện
          chính là sự liên tục của nước Pháp" - và thực sự, đó là sự liên tục
          của nghệ thuật và văn minh nhân loại.
        </p>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Bạn có hứng thú với một chuyến du lịch trải nghiệm tại Bảo tàng
            Lourve không?<br></br> Hãy nhanh tay đặt vé nhé!
          </h2>
          <div className={styles.buttonWrapper}>
            <button className={styles["book-now-button"]}>
              Đến trang đặt vé
            </button>
          </div>
        </div>
        <img
          src={img7}
          alt="Tourist-image"
          className={styles["paragraph-image"]}
          style={{ marginTop: "40px" }}
        />
      </article>
    </main>
  );
}

export default ArticleLouvre;
