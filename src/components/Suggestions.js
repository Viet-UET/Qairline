import React from 'react';
import styles from './Suggestions.module.css';
import angkorWatImg from '../Assets/angko_wat.png';
import milanImg from '../Assets/milan.png';
import louvreImg from '../Assets/lourve.png';

// Bạn có thể đặt dữ liệu này ở ngoài hoặc trong component
const suggestionsData = [
  {
    id: 1,
    image: angkorWatImg,
    title: 'Angkor Wat',
    location: 'Xiêm Riệp, Campuchia',
    tags: ['Tâm linh', 'Kiến trúc'],
    rating: 4.6,
    ratingCount: '(9.5k)'
  },
  {
    id: 2,
    image: milanImg,
    title: 'Thánh đường Milan',
    location: 'Lombardy, Ý',
    tags: ['Tâm linh', 'Kiến trúc'],
    rating: 4.6,
    ratingCount: '(1.2k)'
  },
  {
    id: 3,
    image: louvreImg,
    title: 'Bảo tàng Louvre',
    location: 'Paris, Pháp',
    tags: ['Văn hóa', 'Kiến trúc'],
    rating: 4.9,
    ratingCount: '(1.3k)'
  }
];

function Suggestions() {
  return (
    <section className={styles['suggestions-section']}>
      <h2 className={styles['suggestions-title']}>Có thể bạn quan tâm:</h2>
      <div className={styles['suggestions-grid']}>
        {/* Dùng .map() để tự động tạo 3 thẻ */}
        {suggestionsData.map((item) => (
          <div className={styles['suggestion-card']} key={item.id}>
            <img src={item.image} alt={item.title} className={styles['suggestion-image']} />
            <div className={styles['suggestion-content']}>
              <h3 className={styles['suggestion-title-card']}>{item.title}</h3>
              <p className={styles['suggestion-location']}>{item.location}</p>
              <div className={styles['suggestion-tags']}>
                {item.tags.map((tag) => (
                  <span className={styles['tag']} key={tag}>{tag}</span>
                ))}
              </div>
              <div className={styles['suggestion-rating']}>
                <span className="styles.star-icon">⭐</span> {/* Sử dụng emoji sao */}
                <span>{item.rating} {item.ratingCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Suggestions;