import React, { useState } from "react";

const FlipCard = ({ frontImage, backImage, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`w-[700px] h-[450px] relative cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative w-full h-full text-center transition-transform duration-1000 cubic-bezier(0.175,0.885,0.32,1.275) transform-style-3d shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[12px]">
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-none overflow-hidden bg-white border-[10px] border-white">
          <img src={frontImage} alt="Postcard Cover" className="w-full h-full object-cover rounded-[4px]" />
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rounded-none overflow-hidden bg-white border-[10px] border-white rotate-y-180 flex">
          <div className="flex-1 overflow-hidden relative border-r border-[#ddd]">
            <img src={backImage} alt="Our Team" className="w-full h-full object-cover" />
          </div>
          <div className="flex-[1.2] p-[30px] flex flex-col justify-center text-left translate-y-[30px]">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;