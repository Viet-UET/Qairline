import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./InterestingStories.module.css";
import Header from "./Header";
import Footer from "./Footer";

// IMPORT ẢNH
import imgSarajevo from "../Assets/sarajevo_thumbnail.png"; 
import imgIstanbul from "../Assets/Istanbul_0.png"; 
import imgSantorini from "../Assets/santorini_0.png"; 
import imgKyoto from "../Assets/kinkakuji-pagoda.jpg"; 
import imgAdelaide from "../Assets/Adelaide.png"; // Ảnh thêm để test load more
import imgTuscany from "../Assets/Tuscany.png";   // Ảnh thêm để test load more

function InterestingStories() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- DỮ LIỆU BÀI VIẾT NỔI BẬT ---
  const allStories = [
    {
      id: "istanbul",
      link: "/discover/stories/istanbul",
      img: imgIstanbul,
      author: "Annia Norwood",
      title: "Lang thang giữa linh hồn Istanbul",
      excerpt: '"Istanbul giống như một bản giao hưởng của hai thế giới — nơi Đông gặp Tây, quá khứ chạm vào hiện tại. Thành phố ấy không chỉ khiến bạn choáng ngợp bởi vẻ đẹp kỳ vĩ mà còn bởi chiều sâu tâm hồn..."',
    },
    {
      id: "santorini",
      link: "/discover/stories/santorini",
      img: imgSantorini,
      author: "Annia Norwood",
      title: "Một mùa hè ở Santorini",
      excerpt: '"Santorini là nơi mà ánh sáng có thể khiến bạn tin vào phép màu. Mỗi buổi hoàng hôn nơi đây như một lời thì thầm rằng: có những vẻ đẹp chỉ xuất hiện khi ta thật sự dừng lại..."',
    },
    {
      id: "kyoto",
      link: "/discover/stories/kyoto",
      img: imgKyoto,
      author: "Annia Norwood",
      title: "Kyoto: Giữa hương trà và tiếng chuông chùa",
      excerpt: '"Kyoto không phải là nơi để bạn tìm kiếm những điều mới mẻ. Nó là nơi để bạn lắng nghe những điều cũ kỹ — tiếng chuông chùa, hương trà, và cả nhịp đập dịu dàng của chính mình."',
    },
    // --- Các bài viết ẩn (sẽ hiện khi bấm Xem thêm) ---
    {
      id: "adelaide",
      link: "/discover/stories/adelaide",
      img: imgAdelaide,
      author: "Mark Twain",
      title: "Adelaide: Thành phố của những lễ hội",
      excerpt: '"Không chỉ nổi tiếng với rượu vang, Adelaide còn là thiên đường của nghệ thuật và âm nhạc. Hãy cùng khám phá vẻ đẹp sôi động nhưng cũng đầy chất thơ của thành phố này."',
    },
    {
      id: "tuscany",
      link: "/discover/stories/tuscany",
      img: imgTuscany,
      author: "Sophia Loren",
      title: "Tuscany - Dưới ánh mặt trời nước Ý",
      excerpt: '"Những đồi nho trải dài bất tận, những ngôi làng cổ kính trên đỉnh đồi... Tuscany chính là định nghĩa hoàn hảo nhất về sự lãng mạn và bình yên."',
    },
  ];

  // State quản lý số lượng bài hiển thị
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 1); // Mỗi lần bấm hiện thêm 1 bài
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.container}>
        {/* Breadcrumb: Link điều hướng */}
        <div className={styles.breadcrumb}>
          <Link to="/discover" className={styles.breadcrumbLink}>Khám phá</Link>
          <span>&gt;</span>
          <Link to="/discover/stories" className={styles.breadcrumbLink}><strong>Những câu chuyện kỳ thú</strong></Link>
        </div>

        {/* Header Title */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Những câu chuyện kỳ thú</h1>
          <p className={styles.pageDesc}>
            Mỗi hành trình là một câu chuyện — có khi là cuộc gặp gỡ tình cờ, có
            khi là khoảnh khắc khiến ta đổi thay mãi mãi. Cùng lắng nghe những
            câu chuyện du lịch đầy bất ngờ, thú vị và truyền cảm hứng từ khắp
            bốn phương.
          </p>
        </div>

        {/* --- SECTION 1: BÀI VIẾT CỦA TUẦN --- */}
        <h2 className={styles.sectionTitle}>Bài viết của tuần</h2>
        
        <Link to="/discover/stories/sarajevo" className={styles.weeklyCard}>
          <img src={imgSarajevo} alt="Sarajevo" className={styles.weeklyImg} />
          
          <div className={styles.weeklyContent}>
            <h3 className={styles.weeklyTitle}>10 ngày dạo bước ở Sarajevo</h3>
            
            <div className={styles.metaInfo}>
              Tác giả: Annia Norwood | Thể loại: Du lịch - Trải nghiệm cá nhân | Thời gian đọc: 6 phút
            </div>
            
            <div className={styles.weeklyExcerpt}>
              <p>Xin chào mọi người,</p>
              <p>
                Mình là Annia Norwood, một blogger du lịch yêu tự do và cái đẹp
                mộc mạc của thế giới. Mình luôn tin rằng, mỗi hành trình đều là
                một cuốn sách - và mỗi vùng đất mới là một chương chưa được viết.
              </p>
              <p>
                Lần này, trang sách của mình mang tên Sarajevo – thủ đô của Bosnia
                và Herzegovina, thành phố nhỏ bé nằm giữa những dãy núi Ba Lan,
                nơi quá khứ và hiện tại hòa quyện một cách dịu dàng.
              </p>
            </div>
            
            <span className={styles.readMore}>&gt;&gt; Đọc tiếp</span>
          </div>
        </Link>

        {/* --- SECTION 2: BÀI VIẾT NỔI BẬT --- */}
        <h2 className={styles.sectionTitle}>Những bài viết nổi bật</h2>

        <div className={styles.storiesList}>
          {allStories.slice(0, visibleCount).map((story) => (
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
                <div className={styles.storyReadMore}>
                  &gt;&gt; Đọc tiếp
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Nút Xem thêm (Ẩn khi đã hiện hết) */}
        {visibleCount < allStories.length && (
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                Xem thêm
            </button>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default InterestingStories;