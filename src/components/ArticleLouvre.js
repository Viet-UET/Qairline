import React, { useEffect } from "react";
import styles from './Article.module.css';

// --- IMPORT HÌNH ẢNH ---
// Hãy thay thế bằng các file ảnh thật của bạn (louvre_1.jpg, louvre_2.jpg...)
import imgHeader from '../Assets/lourve.png'; // Ảnh bìa kim tự tháp ngày
import img1 from '../Assets/lourve.png';      // Ảnh sân điện Louvre
import img2 from '../Assets/lourve.png';      // Ảnh kim tự tháp đêm
import img3 from '../Assets/lourve.png';      // Ảnh Mona Lisa / Tượng
import img4 from '../Assets/lourve.png';      // Ảnh tranh khổ lớn
import img5 from '../Assets/lourve.png';      // Ảnh nội thất dát vàng
import img6 from '../Assets/lourve.png';      // Ảnh khách du lịch

function ArticleLouvre() {
    // Tự động cuộn lên đầu trang khi mở bài viết
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className={styles.articleMain}>
            <article className={styles['article-container']}>
                {/* TIÊU ĐỀ CHÍNH */}
                <h1>Bảo tàng Louvre:<br />
                    Cung điện nghệ thuật vĩ đại nhất thế giới</h1>
                
                <p className={styles.subtitle}>
                    Tác giả: Annia Norwood | 20/05/2025
                </p>

                <p>
                    Nằm bên hữu ngạn sông Seine thơ mộng, Louvre không chỉ là bảo tàng lớn nhất 
                    và đón nhiều khách tham quan nhất thế giới, mà còn là một di tích lịch sử tráng lệ. 
                    Với diện tích hơn 72.000 mét vuông trưng bày, nơi đây lưu giữ hơn 38.000 hiện vật 
                    từ thời tiền sử đến thế kỷ 21, là giấc mơ của mọi tín đồ nghệ thuật.
                </p>

                <img
                    src={imgHeader}
                    alt="Bảo tàng Louvre toàn cảnh"
                    className="header-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                <p>
                    Suốt hơn 8 thế kỷ tồn tại, Louvre đã chứng kiến những thăng trầm của lịch sử nước Pháp. 
                    Từ một pháo đài trung cổ đến cung điện hoàng gia xa hoa, và cuối cùng là bảo tàng 
                    công cộng vĩ đại nhất hành tinh. Mỗi viên gạch, mỗi hành lang tại đây đều thì thầm 
                    những câu chuyện về quyền lực, nghệ thuật và lịch sử.
                </p>

                {/* PHẦN 1 */}
                <h2>Từ pháo đài đến cung điện</h2>
                <p>
                    Ít ai biết rằng trước khi trở thành thánh địa nghệ thuật, Louvre khởi đầu là một pháo đài 
                    được vua Philippe Auguste xây dựng vào năm 1190 để bảo vệ Paris. Qua nhiều thế kỷ, 
                    các vị vua Pháp - đặc biệt là Charles V và François I - đã biến nó thành một cung điện 
                    hoàng gia xa hoa.
                </p>
                <p>
                    Tuy nhiên, khi Vua Louis XIV quyết định dời triều đình về Versailles vào năm 1682, 
                    Louvre bị bỏ hoang và rơi vào tình trạng xuống cấp. Phải đến Cách mạng Pháp, Quốc hội 
                    mới quyết định biến nơi này thành bảo tàng để trưng bày các kiệt tác của quốc gia.
                </p>
                <img
                    src={img1}
                    alt="Cung điện Louvre cổ kính"
                    className="paragraph-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                {/* PHẦN 2 */}
                <h2>Kim tự tháp kính - Biểu tượng gây tranh cãi</h2>
                <p>
                    Năm 1989, kiến trúc sư I.M. Pei đã gây chấn động dư luận khi thêm vào sân chính Napoleon 
                    một kim tự tháp bằng kính và kim loại hiện đại. Vào thời điểm đó, công trình này bị chỉ trích 
                    gay gắt vì bị cho là "vết sẹo" phá hỏng vẻ đẹp cổ kính của cung điện.
                </p>
                <img
                    src={img2}
                    alt="Kim tự tháp kính lung linh về đêm"
                    className="paragraph-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />
                <p>
                    Tuy nhiên, thời gian đã chứng minh tầm nhìn của I.M. Pei. Giờ đây, Kim tự tháp kính đã trở thành 
                    biểu tượng không thể tách rời của Louvre, mang ánh sáng tự nhiên xuống sảnh đón khách ngầm rộng lớn 
                    bên dưới và là điểm check-in không thể thiếu của du khách.
                </p>

                {/* PHẦN 3 */}
                <h2>"Ba quý bà" của bảo tàng</h2>
                <p>
                    Trong số hàng vạn tác phẩm, có ba kiệt tác được mệnh danh là "Ba quý bà" mà bất cứ ai đến Louvre 
                    cũng phải chiêm ngưỡng, nếu không coi như chưa đến Louvre.
                </p>
                <ul style={{lineHeight: '1.8', marginBottom: '20px', paddingLeft: '20px'}}>
                    <li><strong>Mona Lisa (La Gioconda):</strong> Bức chân dung bí ẩn của Leonardo da Vinci với nụ cười mê hoặc.</li>
                    <li><strong>Tượng Thần Vệ Nữ (Venus de Milo):</strong> Biểu tượng của vẻ đẹp Hy Lạp chuẩn mực dù đã mất đôi tay.</li>
                    <li><strong>Tượng Nữ thần Chiến thắng (Winged Victory of Samothrace):</strong> Kiệt tác điêu khắc thể hiện sự uy quyền và chuyển động tuyệt vời.</li>
                </ul>
                <img
                    src={img3}
                    alt="Các tác phẩm kinh điển"
                    className="paragraph-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                {/* PHẦN 4 */}
                <h2>Những kiệt tác không thể bỏ lỡ khác</h2>
                <p>
                    Ngoài "Ba quý bà", Louvre còn sở hữu những bức tranh khổ lớn gây choáng ngợp tại phòng tranh Pháp 
                    và Ý. Bạn sẽ không thể rời mắt khỏi bức "Lễ đăng quang của Napoleon" với kích thước khổng lồ, 
                    hay bức "Đám cưới ở Cana" chiếm trọn một bức tường lớn.
                </p>
                <img
                    src={img4}
                    alt="Tranh khổ lớn"
                    className="paragraph-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />
                <p>
                    Đặc biệt là bức tranh biểu tượng của Cách mạng Pháp - "Nữ thần Tự do dẫn dắt nhân dân" của Eugène Delacroix, 
                    thể hiện tinh thần quật cường của người dân Paris.
                </p>

                {/* PHẦN 5 */}
                <h2>Kiến trúc và nội thất hoàng gia</h2>
                <p>
                    Đến Louvre, đừng chỉ mải mê ngắm tranh mà quên ngước nhìn lên trần nhà hay quan sát các bức tường. 
                    Khu căn hộ của Napoleon III vẫn được giữ nguyên vẹn với nội thất nhung đỏ, đèn chùm pha lê khổng lồ 
                    và trần nhà dát vàng lộng lẫy.
                </p>
                <img
                    src={img5}
                    alt="Nội thất hoàng gia"
                    className="paragraph-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />
                <p>
                    Đây là minh chứng sống động nhất cho cuộc sống xa hoa tột bậc của hoàng gia Pháp thời Đế chế thứ hai, 
                    khiến du khách cảm thấy như đang lạc vào một buổi yến tiệc hoàng gia thực thụ.
                </p>

                {/* PHẦN 6 */}
                <h2>Kinh nghiệm tham quan</h2>
                <p>
                    Bảo tàng rất rộng, bạn không thể đi hết trong một ngày. Hãy tải bản đồ, lên danh sách các tác phẩm 
                    ưu tiên và mua vé trực tuyến trước để tránh xếp hàng dài. Cổng vào qua trung tâm thương mại 
                    Carrousel du Louvre thường vắng hơn cổng chính Kim tự tháp.
                </p>
                
                <img
                    src={img6}
                    alt="Khách du lịch tại Louvre"
                    className="paragraph-image"
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                <hr style={{margin: '40px 0', border: '0', borderTop: '1px solid #eee'}} />

                <h2>
                    Bạn đã sẵn sàng lạc lối trong cung điện nghệ thuật này chưa?
                </h2>
                <div className={styles['button']} style={{display: 'flex', justifyContent: 'center'}}>
                    <button className={styles['book-now-button']}>Đến trang đặt vé ngay</button>
                </div>
            </article>
        </main>
    );
}

export default ArticleLouvre;