import React, { useEffect } from 'react';
import './FlightSearchModal.css'; // Import file CSS vừa tạo
import FlightSearch from './FlightSearch';

function FlightSearchModal({ isOpen, onClose, initialData }) {
    
    // Xử lý sự kiện nhấn phím ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        // onClick vào Overlay thì đóng Modal
        <div className="modalOverlay" onClick={onClose}>
            {/* onClick vào nội dung thì KHÔNG đóng (stopPropagation) */}
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeBtn" onClick={onClose}>&times;</button>
                
                {/* Gọi lại khung tìm kiếm và truyền dữ liệu vào */}
                <FlightSearch 
                    initialOrigin={initialData.origin} 
                    initialDest={initialData.dest} 
                />
            </div>
        </div>
    );
}

export default FlightSearchModal;