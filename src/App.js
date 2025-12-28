// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import thư viện router
import './styles.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './components/Home';
import Promotion from './components/Promotion';

import PopularDestinations from './components/PopularDestinations'; // Import trang đích
import ArticleLouvre from './components/ArticleLouvre';
import ArticleSagrada from './components/ArticleSagrada';
import ArticleAngkorWat from './components/ArticleAngkorWat';


import InterestingStories from './components/InterestingStories';
import StorySarajevo from './components/StorySarajevo';
import StorySantorini from './components/StorySantorini';


// Import các trang

import Discover from './components/Discover';
// import Home from './components/Home'; // Nếu bạn có trang chủ

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 1. Trang Khám Phá */}
          <Route path="/discover" element={<Discover />} />

          <Route path="/promo" element={<Promotion />} />

          {/* 2. Trang Danh sách địa điểm yêu thích */}
          <Route path="/discover/popular" element={<PopularDestinations />} />

          {/* 3. Trang chi tiết bài viết 
              :id cho phép đường dẫn linh hoạt, ví dụ /article/sagrada-familia 
          */}
          <Route path="/article/:id" element={<ArticleSagrada />} />


          {/* Route cho Sagrada Familia  */}
          <Route path="/article/sagrada-familia" element={<ArticleSagrada />} />

          {/* Route cho Louvre*/}
          <Route path="/article/louvre" element={<ArticleLouvre />} />

          <Route path="/article/angkor-wat" element={<ArticleAngkorWat />} />
          {/* 4. Trang Những câu chuyện kỳ thú */}





           <Route path="/discover/stories" element={<InterestingStories />} />
           <Route path="/discover/stories/sarajevo" element={<StorySarajevo />} />
           <Route path="/discover/stories/santorini" element={<StorySantorini />} />

          {/* Thêm các Route khác nếu cần */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;