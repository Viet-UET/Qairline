import React from "react";
import { useParams } from 'react-router-dom';
import img1 from '../Assets/sagrada_familia_1.png';
import img2 from '../Assets/sagrada_familia_2.png';
import img3 from '../Assets/sagrada_familia_3.png';
import img4 from '../Assets/sagrada_familia_4.png';
import img5 from '../Assets/sagrada_familia_5.png';
import img6 from '../Assets/sagrada_familia_6.png';
import img7 from '../Assets/sagrada_familia_7.png';
import styles from './Article.module.css';
function Article() {
    return (
        <main className={styles.articleMain}>
            <article className={styles['article-container']}>
                <h1>Sagrada Familia:<br />
                    Kiệt tác vĩnh cửu giữa lòng Barcelona</h1>
                <p>
                    Giữa những con phố rộn rã của Barcelona, một công trình kiến trúc phi
                    thường đang vươn cao như một bản giao hưởng bằng đá được chơi suốt hơn
                    140 năm. Sagrada Familia - Vương cung Thánh đường Thần thánh Gia tộc -
                    không chỉ đơn thuần là một nhà thờ, mà là tuyệt tác bất hủ của thiên
                    tài kiến trúc Antoni Gaudí, một kiệt tác mà ông đã dành trọn 43 năm
                    cuối đời để hiến dâng.
                </p>
                <img
                    src={img1}
                    alt="Sagrada Familia"
                    className="header-image"
                />

                <p>
                    Với hơn 4 triệu lượt khách mỗi năm, Sagrada Familia là điểm đến được
                    yêu thích nhất tại Barcelona và là một trong những công trình kiến
                    trúc nổi tiếng nhất thế giới. Dù chưa hoàn thành sau hơn 140 năm xây
                    dựng, công trình này vẫn khiến du khách từ khắp nơi trên thế giới phải
                    ngỡ ngàng trước vẻ đẹp kỳ vĩ và sự tinh xảo vượt thời gian.
                </p>
                <h2>Hành trình vượt thế kỷ</h2>
                <p>
                    Câu chuyện của Sagrada Familia bắt đầu vào năm 1882, khi viên gạch đầu
                    tiên được đặt vào ngày lễ Thánh Giuse. Ban đầu, dự án được giao cho
                    kiến trúc sư Francisco de Paula del Villar với thiết kế theo phong
                    cách tân Gothic. Nhưng chỉ một năm sau, năm 1883, Antoni Gaudí - khi
                    đó mới 31 tuổi - đã được giao nhiệm vụ tiếp quản và hoàn toàn thay đổi
                    tầm nhìn cho công trình.
                </p>
                <p>
                    Gaudí đã biến Sagrada Familia thành một dự án hoàn toàn mới, đầy tham
                    vọng hơn với ba mặt tiền vĩ đại, 18 tòa tháp và những chi tiết kiến
                    trúc lấy cảm hứng từ thiên nhiên. Ông đã nói: "Khách hàng của tôi
                    không vội vàng" - ám chỉ đến Chúa Trời, người mà ông tin rằng là người
                    đặt hàng thực sự cho công trình này.
                </p>
                <p>
                    Khi Gaudí qua đời bi thảm vào năm 1926 sau một vụ tai nạn, chỉ khoảng
                    15-25% công trình được hoàn thành. Ông được an táng ngay tại hầm mộ
                    của Sagrada Familia, nằm yên giấc bên dưới kiệt tác vĩ đại nhất của
                    đời mình. Công trình tiếp tục được xây dựng dựa trên những bản vẽ tái
                    tạo và tầm nhìn của Gaudí, với kế hoạch hoàn thành vào năm 2026 - đúng
                    100 năm ngày ông mất
                </p>
                <h2>Kiến trúc vượt thời gian</h2>
                <p>
                    Sagrada Familia được thiết kế như một "bộ Kinh Thánh bằng đá". Gaudí
                    muốn kể câu chuyện của Chúa Giê-su thông qua hình ảnh thay vì chữ
                    viết, để những người không biết chữ vào thời đó cũng có thể hiểu được.
                </p>
                <img
                    src={img2}
                    alt="Mặt tiền Giáng sinh"
                    className="paragraph-image"
                />
                <p>
                    Mặt tiền Giáng sinh (Đông) - hoàn thành trong đời Gaudí - tôn vinh sự
                    ra đời của Chúa Giê-su với những chi tiết tràn đầy sức sống. Mặt tiền
                    này được trang trí bằng hàng nghìn tượng động vật, thực vật - từ chim
                    bồ câu trắng trên cây sự sống đến những con rùa đá đỡ các cột trụ,
                    tượng trưng cho sự ổn định giữa đất liền và biển cả.
                </p>
                <img
                    src={img3}
                    alt="Mặt tiền Khổ hạnh"
                    className="paragraph-image"
                />
                <p>
                    Mặt tiền Khổ hạnh (Tây) - được xây từ năm 1954 đến 1976 - thể hiện sự
                    đau khổ, cái chết và sự phục sinh của Chúa. Khác hẳn với vẻ rực rỡ của
                    mặt tiền Giáng sinh, mặt tiền này có kiểu dáng gầy guộc, góc cạnh như
                    bộ xương, với những tượng khắc hiện đại thể hiện những giây phút cuối
                    cùng trong cuộc đời Chúa Giê-su. Tại đây còn có "Ma phương thần kỳ" -
                    một ô chữ số 4x4 mà tổng các số luôn bằng 33, tượng trưng cho tuổi của
                    Chúa Giê-su khi bị đóng đinh.
                </p>
                <img
                    src={img4}
                    alt="Mặt tiền Vinh quang"
                    className="paragraph-image"
                />
                <p>
                    Mặt tiền Vinh quang (Nam) - đang được xây dựng - sẽ thể hiện sự vinh
                    quang của Chúa Giê-su trong cuộc sống và sự phục sinh của Ngài. Mặt
                    tiền này dự kiến sẽ có những chi tiết hoành tráng và đầy màu sắc, với
                    những tượng khắc thể hiện các thánh và những khoảnh khắc quan trọng
                    trong Kinh Thánh.
                </p>
                <h2>Khu rừng đá kì diệu</h2>
                <img
                    src={img5}
                    alt="Nội thất Sagrada Familia"
                    className="paragraph-image"
                />
                <p>
                    Bước vào bên trong Sagrada Familia, du khách sẽ cảm giác như lạc vào
                    một khu rừng kỳ ảo được làm bằng đá. Gaudí đã thiết kế 36 cột trụ hình
                    cành cây, với các cột lớn chia nhánh như những tán cây chà là, tạo cảm
                    giác như công trình này "mọc lên" thay vì được xây dựng.
                </p>
                <p>
                    Các cột trụ được thiết kế theo một hệ thống phân cấp dựa trên hình sao
                    ở đế: 12 cạnh cho các cột quan trọng nhất (đỡ tòa tháp Chúa Giê-su),
                    10 cạnh, 8 cạnh và 6 cạnh cho các cột nhỏ hơn. Mỗi cột được làm từ các
                    loại đá khác nhau như porphyry đỏ và basalt, với thiết kế xoắn kép
                    tượng trưng cho các thánh nhân đang thăng thiên gặp các thiên thần.
                </p>
                <p>
                    Một trong những trải nghiệm đáng kinh ngạc nhất tại Sagrada Familia
                    chính là hệ thống kính màu của nghệ sĩ Joan Vila-Grau, được thiết kế
                    theo tầm nhìn của Gaudí. Các cửa sổ phía đông - nơi mặt trời mọc -
                    được làm bằng kính màu xanh lam và xanh lục, tượng trưng cho ánh sáng
                    ban mai và thiên nhiên. Các cửa sổ phía tây rực rỡ với sắc đỏ, cam và
                    vàng, đại diện cho hoàng hôn, lửa và sự nhiệt thành.
                </p>
                <p>
                    Ánh sáng chiếu qua các cửa sổ kính màu này tạo nên những vệt sáng đầy
                    màu sắc trên các cột đá trắng và trần nhà, biến không gian bên trong
                    thành một "bản giao hưởng ánh sáng" luôn thay đổi theo từng giờ trong
                    ngày.
                </p>
                <h2>Trải nghiệm không thể bỏ lỡ</h2>
                <h3>Leo tháp ngắm toàn cảnh Barcelona</h3>
                <p>
                    Du khách có thể mua vé lên một trong hai tháp - tháp ở mặt tiền Giáng
                    sinh (nhìn ra phía đông Barcelona) hoặc tháp ở mặt tiền Khổ hạnh (nhìn
                    ra trung tâm thành phố). Giá vé lên tháp là 36 euro. Thang máy sẽ đưa
                    du khách lên đỉnh, sau đó du khách sẽ đi bộ xuống qua các cầu thang
                    xoắn ốc tuyệt đẹp, nơi có thể chiêm ngưỡng chi tiết bên ngoài của tháp
                    và toàn cảnh Barcelona từ trên cao.
                </p>
                <h3>Tham quan bảo tàng Gaudí</h3>
                <p>
                    Sau khi tham quan nhà thờ, đừng bỏ qua bảo tàng ở tầng dưới nơi trưng
                    bày lịch sử xây dựng Sagrada Familia, các mô hình treo bằng dây xích
                    mà Gaudí đã sử dụng để tính toán cấu trúc. Đây cũng là nơi du khách có
                    thể tìm hiểu thêm về cuộc đời và các tác phẩm khác của Gaudí.
                </p>
                <p>
                    {" "}
                    Hầm mộ nằm một tầng dưới vòm chính, là phần lâu đời nhất của Sagrada
                    Familia, được xây từ 1882-1889 theo phong cách tân Gothic. Đây là nơi
                    an nghỉ cuối cùng của Antoni Gaudí, với một ngôi mộ đơn giản nằm dưới
                    Nhà nguyện Đức Mẹ Carmel. Hầm mộ là nơi thờ phụng đang hoạt động với
                    các thánh lễ thường xuyên, và du khách có thể vào trong khi tham dự
                    thánh lễ hoặc qua các tour có hướng dẫn đặc biệt.
                </p>
                <h3>Chương trình Audioguide và Thực tế ảo</h3>
                <p>
                    Để hiểu sâu hơn về lịch sử và kiến trúc của Sagrada Familia, du khách
                    có thể thuê thiết bị audioguide có sẵn bằng 19 ngôn ngữ, với hai phiên
                    bản 45 phút (tiêu chuẩn) hoặc 25 phút (nhanh). Ngoài ra, có các tour
                    thực tế ảo (VR) cho phép du khách trải nghiệm công trình theo cách
                    hoàn toàn mới, khám phá các phần chưa hoàn thành và nhìn thấy tầm nhìn
                    của Gaudí về tương lai của Sagrada Familia.
                </p>
                <h2>Những lưu ý quan trọng khi tham quan</h2>
                <h3>Đặt vé trước</h3>
                <p>
                    Sagrada Familia bán hết vé mỗi ngày, vì vậy bạn cần đặt vé trước trực
                    tuyến - điều này hiện là bắt buộc. Nên đặt vé ít nhất một tháng trước
                    nếu bạn có lịch trình cố định, đặc biệt trong mùa cao điểm từ tháng 5
                    đến tháng 9. Vé cơ bản có giá 26 euro, vé có audioguide 30 euro, và vé
                    kèm leo tháp 36 euro.
                </p>
                <h3>Quy định về trang phục</h3>
                <p>
                    Du khách được khuyến khích ăn mặc lịch sự khi tham quan Sagrada
                    Familia. Điều này có nghĩa là không mặc quần short, áo phông hoặc dép
                    tông. Nên chọn trang phục thoải mái nhưng trang nhã, đặc biệt nếu bạn
                    có kế hoạch tham dự thánh lễ.
                </p>
                <p>
                    {" "}
                    Bảo vệ có quyền từ chối cho vào nếu trang phục không phù hợp, và không
                    hoàn tiền vé. Nên mang theo khăn choàng hoặc áo cardigan nhẹ để che
                    vai nếu cần.
                </p>
                <h3>Thời gian tham quan lý tưởng</h3>
                <p>
                    Để tránh đám đông, thời gian tốt nhất để tham quan Sagrada Familia là
                    vào buổi sáng sớm ngay khi mở cửa (9:00 sáng) hoặc vào cuối buổi chiều
                    (16:00-18:00). Vào những thời điểm này, ánh sáng tự nhiên cũng tạo nên
                    hiệu ứng đẹp bên trong nhà thờ. Tránh các ngày cuối tuần và ngày lễ
                    tôn giáo
                </p>
                <h3>Cách di chuyển</h3>
                <p>
                    Sagrada Familia nằm ở trung tâm Barcelona và rất dễ tiếp cận bằng
                    phương tiện công cộng. Ga tàu điện ngầm Sagrada Familia (Tuyến L2 và
                    L5) nằm ngay bên cạnh nhà thờ, với các tuyến xe buýt số 19, 33, 34,
                    43, 44, 50, 51, B20 và B24 đều có điểm dừng gần đó. Nếu bạn lái xe, có
                    các bãi đậu xe công cộng trong khu vực, nhưng tốt nhất nên sử dụng
                    phương tiện công cộng để tránh tắc đường và khó tìm chỗ đậu xe.
                </p>
                <h3>Gợi ý chụp ảnh</h3>
                <p>
                    Bên ngoài: Plaça de Gaudí (công viên nhỏ phía đông nam) là điểm chụp
                    ảnh yêu thích nhất với tầm nhìn toàn cảnh đẹp về mặt tiền Nativity.
                    Buổi sáng sớm có ánh sáng đẹp chiếu vào mặt tiền phía đông.​ Bên
                    trong: Trần nhà hình tán cây - nằm xuống hoặc ngồi thấp và chụp thẳng
                    lên trên​ Ánh sáng từ kính màu phản chiếu trên cột và tường - tốt nhất
                    vào chiều (16:00-18:00)​ Cầu thang xoắn ốc trong tháp - chụp từ trên
                    xuống hoặc từ dưới lên​ Cài đặt máy ảnh: ISO 800-1600, khẩu độ
                    f/2.8-4.0 cho chụp trong nhà; f/8-11 cho ngoài trời. Chụp ở chế độ RAW
                    để có khả năng chỉnh sửa tốt nhất.
                </p>
                <h3>Ăn uống gần đó</h3>
                <p>
                    Tránh các nhà hàng bẫy khách du lịch ngay xung quanh Sagrada Familia.
                </p>
                <h3>Điểm tham quan gần đó</h3>
                <p>
                    Sau khi tham quan Sagrada Familia, bạn có thể khám phá các điểm tham
                    quan nổi tiếng khác trong khu vực như Công viên Güell, Casa Milà
                    (La Pedrera), Casa Batlló, và Passeig de Gràcia - đại lộ mua sắm sang
                    trọng với nhiều cửa hàng thiết kế và kiến trúc hiện đại. Tất cả đều
                    nằm trong khoảng cách đi bộ hoặc một chuyến tàu điện ngầm ngắn từ Sagrada
                    Familia.
                </p>
                <img
                    src={img6}
                    alt="Sagrada Familia về đêm"
                    className="paragraph-image"
                />
                <h2>Lời kết</h2>
                <p>
                    Sagrada Familia không chỉ là một công trình kiến trúc - đó là một
                    tuyên ngôn về niềm tin, nghệ thuật và sự kiên trì vượt thời gian. Từ
                    những chi tiết tỉ mỉ trên mặt tiền Nativity đến bản giao hưởng ánh
                    sáng bên trong nhà thờ, mỗi góc nhỏ đều mang một câu chuyện riêng. Đây
                    là công trình mà Antoni Gaudí đã dành cả cuộc đời để kiến tạo, và giờ
                    đây, hơn 140 năm sau, nó vẫn tiếp tục làm say đắm hàng triệu con tim.
                </p>
                <p>
                    Dù bạn là người yêu kiến trúc, nghệ thuật, lịch sử hay đơn giản chỉ
                    muốn trải nghiệm vẻ đẹp phi thường, Sagrada Familia sẽ không làm bạn
                    thất vọng. Đặt vé trước, mặc trang phục phù hợp, đến sớm và để cho
                    kiệt tác này làm bạn kinh ngạc. Vì như chính Gaudí đã từng nói - với
                    Chúa làm khách hàng, không có gì phải vội vàng, và vẻ đẹp vĩnh cửu này
                    đáng để chờ đợi.
                </p>
                <h2>
                    Bạn có hứng thú với một chuyến du lịch trải nghiệm tại Sagrada Familia
                    không? Hãy nhanh tay đặt vé nhé!
                </h2>
                <div className={styles['button']}>
                    <button className={styles['book-now-button']}>Đến trang đặt vé</button>
                </div>
                <img
                    src={img7}
                    alt="Tourist-image"
                    className="paragraph-image"
                />
            </article>
        </main>
    );
}

export default Article;
