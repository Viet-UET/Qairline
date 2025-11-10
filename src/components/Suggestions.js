import React from 'react';

// Bạn có thể đặt dữ liệu này ở ngoài hoặc trong component
const suggestionsData = [
  {
    id: 1,
    image: '/Assets/angkor-wat.png', // Thay bằng đường dẫn ảnh của bạn
    title: 'Angkor Wat',
    location: 'Xiêm Riệp, Campuchia',
    tags: ['Tâm linh', 'Kiến trúc'],
    rating: 4.6,
    ratingCount: '(9.5k)'
  },
  {
    id: 2,
    image: '/Assets/milan.png', // Thay bằng đường dẫn ảnh của bạn
    title: 'Thánh đường Milan',
    location: 'Lombardy, Ý',
    tags: ['Tâm linh', 'Kiến trúc'],
    rating: 4.6,
    ratingCount: '(1.2k)'
  },
  {
    id: 3,
    image: '/Assets/louvre.png', // Thay bằng đường dẫn ảnh của bạn
    title: 'Bảo tàng Louvre',
    location: 'Paris, Pháp',
    tags: ['Văn hóa', 'Kiến trúc'],
    rating: 4.9,
    ratingCount: '(1.3k)'
  }
];

function Suggestions() {
  return (
    <section className="suggestions-section">
      <h2 className="suggestions-title">Có thể bạn quan tâm:</h2>
      <div className="suggestions-grid">
        {/* Dùng .map() để tự động tạo 3 thẻ */}
        {suggestionsData.map((item) => (
          <div className="suggestion-card" key={item.id}>
            <img src={item.image} alt={item.title} className="suggestion-image" />
            <div className="suggestion-content">
              <h3 className="suggestion-title-card">{item.title}</h3>
              <p className="suggestion-location">{item.location}</p>
              <div className="suggestion-tags">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="suggestion-rating">
                <span className="star-icon">⭐</span> {/* Sử dụng emoji sao */}
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