import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// TODO: Add correct image paths
import imgSarajevo from "../../assets/images/home/sagrada_familia_1.png";
import imgIstanbul from "../../assets/images/home/milan.png";
import imgSantorini from "../../assets/images/home/sagrada_familia_2.png";
import imgKyoto from "../../assets/images/home/angko_wat.png";

function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stories = [
    {
      id: "istanbul",
      link: "/explore/news/istanbul",
      img: imgIstanbul,
      author: "Annia Norwood",
      title: "Lang thang giữa linh hồn Istanbul",
      excerpt: '"Istanbul giống như một bản giao hưởng của hai thế giới — nơi Đông gặp Tây, quá khứ chạm vào hiện tại..."',
    },
    {
      id: "santorini",
      link: "/explore/news/santorini",
      img: imgSantorini,
      author: "Annia Norwood",
      title: "Một mùa hè ở Santorini",
      excerpt: '"Santorini là nơi mà ánh sáng có thể khiến bạn tin vào phép màu..."',
    },
    {
      id: "kyoto",
      link: "/explore/news/kyoto",
      img: imgKyoto,
      author: "Annia Norwood",
      title: "Kyoto: Giữa hương trà và tiếng chuông chùa",
      excerpt: '"Kyoto không phải là nơi để bạn tìm kiếm những điều mới mẻ. Nó là nơi để bạn lắng nghe những điều cũ kỹ..."',
    },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="text-sm text-gray-500 mb-5">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/explore/news" className="hover:underline">Khám phá</Link>
          <span className="mx-2">&gt;</span>
          <strong className="text-gray-700">Tin tức</strong>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-qa-green mb-4">Những câu chuyện kỳ thú</h1>
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            Mỗi hành trình là một câu chuyện — có khi là cuộc gặp gỡ tình cờ, có khi là khoảnh khắc khiến ta đổi thay mãi mãi. Cùng lắng nghe những câu chuyện du lịch đầy bất ngờ, thú vị và truyền cảm hứng từ khắp bốn phương.
          </p>
        </div>

        <Link to="/explore/news/sarajevo" className="block bg-white rounded-2xl shadow-lg overflow-hidden mb-16 transition-transform duration-300 hover:-translate-y-1">
          <h2 className="text-center text-3xl font-bold text-qa-green my-8">Bài viết của tuần</h2>
          <img src={imgSarajevo} alt="Sarajevo" className="w-full h-96 object-cover" />
          <div className="p-8">
            <h3 className="text-2xl font-bold text-qa-green mb-2">10 ngày dạo bước ở Sarajevo</h3>
            <div className="text-sm text-gray-500 italic mb-4">
              Tác giả: Annia Norwood | Thể loại: Du lịch - Trải nghiệm cá nhân | Thời gian đọc: 6 phút
            </div>
            <p className="text-base leading-relaxed text-gray-700 mb-4 text-justify">
              Xin chào mọi người, Mình là Annia Norwood, một blogger du lịch yêu tự do và cái đẹp mộc mạc của thế giới. Mình luôn tin rằng, mỗi hành trình đều là một cuốn sách - và mỗi vùng đất mới là một chương chưa được viết. Lần này, trang sách của mình mang tên Sarajevo – thủ đô của Bosnia và Herzegovina, thành phố nhỏ bé nằm giữa những dãy núi Ba Lan, nơi quá khứ và hiện tại hòa quyện một cách dịu dàng.
            </p>
            <span className="block text-right text-qa-green font-bold hover:underline"> &gt;&gt; Đọc tiếp</span>
          </div>
        </Link>

        <h2 className="text-center text-3xl font-bold text-qa-green mb-8">Những bài viết nổi bật</h2>
        <div className="flex flex-col gap-8 mb-12">
          {stories.map((story) => (
            <Link key={story.id} to={story.link} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <img src={story.img} alt={story.title} className="w-full md:w-64 h-48 md:h-auto object-cover flex-shrink-0" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{story.author}</div>
                  <h3 className="text-xl font-bold text-qa-green mb-2">{story.title}</h3>
                  <p className="text-sm text-gray-600 italic mb-3">{story.excerpt}</p>
                </div>
                <span className="self-end text-qa-green font-bold text-sm hover:underline">&gt;&gt; Đọc tiếp</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
            <button className="px-8 py-3 border border-qa-green text-qa-green bg-white rounded-full font-bold cursor-pointer transition-all hover:bg-qa-green hover:text-white">
                Xem thêm bài viết
            </button>
        </div>
      </main>
    </div>
  );
}

export default News;
