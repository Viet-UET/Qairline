import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PopularDestinations.module.css';
import Header from './Header';
import Footer from './Footer';

// Import ảnh (Bạn hãy thay thế bằng ảnh thật trong project của bạn)
// Tôi dùng tạm các biến ảnh đã có hoặc placeholder
import imgSagrada from '../Assets/sagrada_familia_1.png';
import imgLouvre from '../Assets/lourve.png';
import imgAngkor from '../Assets/angko_wat.png';
import imgMilan from '../Assets/milan.png';
import imgNull from '../Assets/null_island.png';
// Với các ảnh chưa có, bạn cứ import 1 ảnh bất kỳ để test layout, sau đó thay tên file sau

const destinationsData = [
  { id: 'sagrada-familia', img: imgSagrada, title: 'Sagrada Familia', loc: 'Barcelona, Tây Ban Nha', tags: ['Tâm linh', 'Kiến trúc'], rate: '4.8 (1.2k)' },
  { id: 'louvre', img: imgLouvre, title: 'Bảo tàng Louvre', loc: 'Paris, Pháp', tags: ['Văn hóa', 'Kiến trúc'], rate: '4.9 (2k)' },
  { id: 'angkor-wat', img: imgAngkor, title: 'Angkor Wat', loc: 'Xiêm Riệp, Campuchia', tags: ['Tâm linh', 'Kiến trúc'], rate: '4.6 (950)' },
  { id: 'great-wall', img: imgNull, title: 'Vạn Lý Trường Thành', loc: 'Bắc Kinh, Trung Quốc', tags: ['Lịch sử', 'Kiến trúc'], rate: '4.7 (780)' }, // Thay ảnh
  { id: 'machu-picchu', img: imgNull, title: 'Machu Picchu', loc: 'Peru', tags: ['Cổ đại', 'Kiến trúc'], rate: '4.8 (1.5k)' }, // Thay ảnh
  { id: 'milan', img: imgMilan, title: 'Thánh đường Milan', loc: 'Lombardy, Ý', tags: ['Tâm linh', 'Kiến trúc'], rate: '4.6 (1.2k)' },
  { id: 'halong', img: imgNull, title: 'Vịnh Hạ Long', loc: 'Quảng Ninh, Việt Nam', tags: ['Tự nhiên', 'Nghỉ dưỡng'], rate: '4.6 (950)' }, // Thay ảnh
  { id: 'eiffel', img: imgNull, title: 'Tháp Eiffel', loc: 'Paris, Pháp', tags: ['Lịch sử', 'Kiến trúc'], rate: '4.7 (780)' }, // Thay ảnh
  { id: 'taj-mahal', img: imgNull, title: 'Taj Mahal', loc: 'Agra, Ấn Độ', tags: ['Lịch sử', 'Kiến trúc'], rate: '4.8 (1.5k)' }, // Thay ảnh
  { id: 'iguazu', img: imgNull, title: 'Thác Iguazu', loc: 'Biên giới Argentina - Brazil', tags: ['Tự nhiên', 'Nghỉ dưỡng'], rate: '4.9 (2k)' }, // Thay ảnh
  { id: 'majorelle', img: imgNull, title: 'Vườn Majorelle', loc: 'Marrakesh, Maroc', tags: ['Cảnh quan', 'Sáng tạo'], rate: '4.6 (950)' }, // Thay ảnh
  { id: 'fushimi', img: imgNull, title: 'Đền Fushimi Inari', loc: 'Kyoto, Nhật Bản', tags: ['Lịch sử', 'Kiến trúc'], rate: '4.7 (780)' }, // Thay ảnh
];

function PopularDestinations() {
  return (
    <div className="page-wrapper">
      <Header />
      
      <main className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
            <Link to="/discover">Khám phá</Link> 
            <span>&gt;</span> 
            <span className={styles['active-crumb']}>Những địa điểm được yêu thích nhất</span>
        </div>

        {/* Header Section */}
        <section className={styles['header-section']}>
            <h1 className={styles['main-title']}>Những địa điểm <br/> được yêu thích nhất</h1>
            <p className={styles['sub-description']}>
                Từ những góc phố quen thuộc mà ai cũng muốn quay lại, đến những miền đất khiến du khách
                lỡ một lần là nhớ mãi - đây là những điểm đến chiếm trọn trái tim của hàng triệu người yêu du lịch trên khắp thế giới.
            </p>
        </section>

        {/* Featured Section */}
        <h2 className={styles['section-heading']}>Địa điểm nổi bật</h2>

        {/* Grid Section */}
        <div className={styles['grid-container']}>
            {destinationsData.map((item) => (
                // QUAN TRỌNG: Link dẫn đến trang chi tiết
                // Nếu item.id là 'sagrada-familia', nó sẽ dẫn đến /article/sagrada-familia
                <Link to={`/article/${item.id}`} className={styles.card} key={item.id}>
                    <img src={item.img} alt={item.title} className={styles['card-image']} />
                    <div className={styles['card-content']}>
                        <h3 className={styles['card-title']}>{item.title}</h3>
                        <p className={styles['card-location']}>{item.loc}</p>
                        <div className={styles['card-footer']}>
                            {item.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>{tag}</span>
                            ))}
                            <span className={styles.rating}>⭐ {item.rate}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PopularDestinations;