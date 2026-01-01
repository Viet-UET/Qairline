import React from "react";
import FlipCard from "../common/FlipCard";

const GratitudeSection = ({ frontImage, backImage }) => {
  const backContent = (
    <>
      <div className="text-[1.3rem] font-bold text-[#004D40] mb-[20px]">Thân gửi Quý khách,</div>
      <div className="text-[1.05rem] leading-[30px] text-[#333] font-afacad mb-[20px]">
        Cảm ơn bạn đã lựa chọn QAirlines cho hành trình của mình. Mỗi chuyến bay của bạn là động lực để chúng tôi nỗ lực hơn mỗi ngày.
        <br/><br/>
        Chúc bạn luôn có những chuyến đi an toàn, ngập tràn niềm vui và hạnh phúc!
      </div>
      <div className="mt-auto text-right text-[1.4rem] font-bold text-[#529246]">Ban Lãnh Đạo QAirlines</div>
    </>
  );

  return (
    <section className="flex justify-center items-center py-[80px] px-[20px] bg-[#f0f7f4] perspective-[1500px] flex-col">
      <h2 className="text-[3rem] text-[#004D40] font-bold mb-[40px] text-center">
        Lời tri ân từ trái tim
      </h2>

      <FlipCard
        frontImage={frontImage}
        backImage={backImage}
        backContent={backContent}
      />

      <div className="mt-[30px] text-[#004D40] text-[0.9rem] italic opacity-70 animate-bounce">
        (Nhấp vào tấm thiệp để lật mặt sau)
      </div>
    </section>
  );
};

export default GratitudeSection;