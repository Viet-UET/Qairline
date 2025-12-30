import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./InterestingStories.module.css";
import Header from "./Header";
import Footer from "./Footer";

// IMPORT ẢNH (Thay bằng ảnh thật của bạn)
import imgSarajevo from "../Assets/sagrada_familia_1.png"; // Ảnh Sarajevo
import imgIstanbul from "../Assets/milan.png"; // Ảnh Istanbul
import imgSantorini from "../Assets/sagrada_familia_2.png"; // Ảnh Santorini
import imgKyoto from "../Assets/angko_wat.png"; // Ảnh Kyoto
import imgNull from "../Assets/null_island.png";

function InterestingStories() {
  // Tự động cuộn lên đầu trang khi mở
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dữ liệu giả lập cho danh sách bài viết nổi bật
  const stories = [
    {
      id: "istanbul",
      link: "/discover/stories/istanbul",
      img: imgIstanbul,
      author: "Annia Norwood",
      title: "Lang thang giữa linh hồn Istanbul",
      excerpt:
        '"Istanbul giống như một bản giao hưởng của hai thế giới — nơi Đông gặp Tây, quá khứ chạm vào hiện tại. Thành phố ấy không chỉ khiến bạn choáng ngợp..."',
    },
    {
      id: "santorini",
      link: "/discover/stories/santorini",
      img: imgSantorini,
      author: "Annia Norwood",
      title: "Một mùa hè ở Santorini",
      excerpt:
        '"Santorini là nơi mà ánh sáng có thể khiến bạn tin vào phép màu. Mỗi buổi hoàng hôn nơi đây như một lời thì thầm rằng: có những vẻ đẹp chỉ xuất hiện khi ta thật sự dừng lại..."',
    },
    {
      id: "kyoto",
      link: "/discover/stories/kyoto",
      img: imgKyoto,
      author: "Annia Norwood",
      title: "Kyoto: Giữa hương trà và tiếng chuông chùa",
      excerpt:
        '"Kyoto không phải là nơi để bạn tìm kiếm những điều mới mẻ. Nó là nơi để bạn lắng nghe những điều cũ kỹ — tiếng chuông chùa, hương trà..."',
    },
  ];

  return (
    
    <div className="page-wrapper">
      <Header />

      <main className={styles.container}>
        {/* Breadcrumb */}
        
        <div className={styles.breadcrumb}>
          <Link to="/discover">Khám phá</Link>
          <span>&gt;</span>
          <strong>Những câu chuyện kỳ thú</strong>
        </div>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Những câu chuyện kỳ thú</h1>
          <p className={styles.pageDesc}>
            Mỗi hành trình là một câu chuyện — có khi là cuộc gặp gỡ tình cờ, có
            khi là khoảnh khắc khiến ta đổi thay mãi mãi. Cùng lắng nghe những
            câu chuyện du lịch đầy bất ngờ, thú vị và truyền cảm hứng từ khắp
            bốn phương.
          </p>
        </div>

        {/* SECTION 1: BÀI VIẾT CỦA TUẦN (Sarajevo) */}
        <Link to="/discover/stories/sarajevo" className={styles.weeklyCard}>
          <h2 className={styles.sectionTitle}>Bài viết của tuần</h2>

          <img src={imgSarajevo} alt="Sarajevo" className={styles.weeklyImg} />
          <div className={styles.weeklyContent}>
            <h3 className={styles.weeklyTitle}>10 ngày dạo bước ở Sarajevo</h3>
            <div className={styles.metaInfo}>
              Tác giả: Annia Norwood | Thể loại: Du lịch - Trải nghiệm cá nhân |
              Thời gian đọc: 6 phút
            </div>
            <p className={styles.weeklyExcerpt}>
              Xin chào mọi người,
              <br />
              Mình là Annia Norwood, một blogger du lịch yêu tự do và cái đẹp
              mộc mạc của thế giới. Mình luôn tin rằng, mỗi hành trình đều là
              một cuốn sách - và mỗi vùng đất mới là một chương chưa được viết.
              <br />
              Lần này, trang sách của mình mang tên Sarajevo – thủ đô của Bosnia
              và Herzegovina, thành phố nhỏ bé nằm giữa những dãy núi Ba Lan,
              nơi quá khứ và hiện tại hòa quyện một cách dịu dàng.
            </p>
            <span className={styles.readMore}>&gt;&gt; Đọc tiếp</span>
          </div>
        </Link>

        {/* SECTION 2: BÀI VIẾT NỔI BẬT (List) */}
            <h2 className={styles.sectionTitle}>Những bài viết nổi bật</h2>

            <div className={styles.storiesList}>
              {stories.map((story) => (
                <Link key={story.id} to={story.link} className={styles.storyCard}>
                  <img
                src={story.img}
                alt={story.title}
                className={styles.storyImg}
                  />
                  <div className={styles.storyContent}>
                <div className={styles.authorName}>{story.author}</div>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyExcerpt}>{story.excerpt}</p>
                <span className={styles.readMore}>
                  &gt;&gt; Đọc tiếp
                </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Nút xem thêm */}
        <button className={styles.loadMoreBtn}>Tìm hiểu thêm</button>
      </main>

      <Footer />
    </div>
  );
}

export default InterestingStories;
