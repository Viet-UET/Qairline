import bg404 from "../../assets/404-bg.jpg";
import icon404 from "../../assets/404-icon.svg";

export default function Error404() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg404})` }}
    >
      {/* CENTER ALL */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center font-afacad">

        {/* SVG 404 */}
        <img
          src={icon404}
          alt="404"
          className="w-[340px] md:w-[460px] mb-10 drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]"
        />

        {/* TITLE */}
        <h2 className="text-[32px] md:text-[40px] text-qa-green font-audiowide mb-4 
                       drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
          Có gì đó không ổn thì phải…?
        </h2>

        {/* DESCRIPTION */}
        <p
          className="text-[#fff2d7] text-[18px] max-w-[750px] leading-relaxed mx-auto 
             drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]"
        >
          Lập trình viên của chúng tôi vừa khoe ảnh chuyến nghỉ mát của anh ấy (là tấm này nè),
          và chắc là ảnh sẽ không về sớm đâu.
          <br />
          Nhưng đừng lo, trong lúc đó hãy tìm những thông tin khác nhé!
        </p>


        {/* BUTTON */}
        <a
          href="/"
          className="mt-10 min-w-[240px] h-[54px] bg-qa-green text-white 
                     text-[22px] rounded-xl hover:bg-green-700 transition font-semibold
                     flex items-center justify-center shadow-lg 
                     drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]"
        >
          Trở lại trang chủ
        </a>
      </div>
    </div>
  );
}
