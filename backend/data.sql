-- ================================================================
-- SAMPLE DATA FOR QAIRLINE FLIGHT BOOKING SYSTEM
-- Generated: 2026-01-03
-- Note: Skip users and news tables as requested
-- All departure times are set in the future (from January 2026 onwards)
-- IMPORTANT: All prices are in thousands of VND (x1000)
--            Example: 1450.00 in DB = 1,450,000 VND actual price
-- ================================================================

-- Clear existing data (in reverse order of dependencies)
DELETE FROM tickets;
DELETE FROM booking_details;
DELETE FROM bookings;
DELETE FROM flight_instances;
DELETE FROM flight_prices;
DELETE FROM aircraft_seats;
DELETE FROM flights;
DELETE FROM aircrafts;
DELETE FROM airports;
DELETE FROM airlines;
DELETE FROM seat_classes;

-- Reset auto-increment counters (if needed)
-- ALTER TABLE tickets AUTO_INCREMENT = 1;
-- ALTER TABLE booking_details AUTO_INCREMENT = 1;
-- ALTER TABLE bookings AUTO_INCREMENT = 1;
-- ALTER TABLE flight_instances AUTO_INCREMENT = 1;
-- ALTER TABLE flight_prices AUTO_INCREMENT = 1;
-- ALTER TABLE aircraft_seats AUTO_INCREMENT = 1;
-- ALTER TABLE flights AUTO_INCREMENT = 1;
-- ALTER TABLE aircrafts AUTO_INCREMENT = 1;
-- ALTER TABLE airports AUTO_INCREMENT = 1;
-- ALTER TABLE airlines AUTO_INCREMENT = 1;
-- ALTER TABLE seat_classes AUTO_INCREMENT = 1;

-- ================================================================
-- 1. AIRLINES - Các hãng hàng không
-- ================================================================
INSERT INTO airlines (id, code, name) VALUES
(1, 'VNA', 'Vietnam Airlines'),
(2, 'VJC', 'VietJet Air'),
(3, 'BBA', 'Bamboo Airways'),
(4, 'PAC', 'Pacific Airlines'),
(5, 'VAS', 'Vietravel Airlines');

-- ================================================================
-- 2. AIRPORTS - Sân bay các thành phố lớn Việt Nam
-- ================================================================
INSERT INTO airports (id, code, name, city) VALUES
(1, 'HAN', 'Noi Bai International Airport', 'Ha Noi'),
(2, 'SGN', 'Tan Son Nhat International Airport', 'Ho Chi Minh'),
(3, 'DAD', 'Da Nang International Airport', 'Da Nang'),
(4, 'CXR', 'Cam Ranh International Airport', 'Nha Trang'),
(5, 'HPH', 'Cat Bi International Airport', 'Hai Phong'),
(6, 'VII', 'Vinh International Airport', 'Vinh'),
(7, 'HUI', 'Phu Bai International Airport', 'Hue'),
(8, 'UIH', 'Phu Cat Airport', 'Quy Nhon'),
(9, 'VCA', 'Can Tho International Airport', 'Can Tho'),
(10, 'PQC', 'Phu Quoc International Airport', 'Phu Quoc'),
(11, 'DLI', 'Lien Khuong Airport', 'Da Lat'),
(12, 'BMV', 'Buon Ma Thuot Airport', 'Buon Ma Thuot');

-- ================================================================
-- 3. SEAT CLASSES - Các hạng ghế
-- ================================================================
INSERT INTO seat_classes (id, name) VALUES
(1, 'Economy'),
(2, 'Premium Economy'),
(3, 'Business'),
(4, 'First Class');

-- ================================================================
-- 4. AIRCRAFTS - Máy bay của các hãng
-- ================================================================
INSERT INTO aircrafts (id, airline_id, model, registration_code) VALUES
-- Vietnam Airlines
(1, 1, 'Boeing 787-9', 'VN-A861'),
(2, 1, 'Boeing 787-10', 'VN-A879'),
(3, 1, 'Airbus A350-900', 'VN-A891'),
(4, 1, 'Airbus A321neo', 'VN-A640'),
(5, 1, 'Airbus A321-200', 'VN-A336'),

-- VietJet Air
(6, 2, 'Airbus A321neo', 'VN-A651'),
(7, 2, 'Airbus A320-200', 'VN-A678'),
(8, 2, 'Airbus A321-200', 'VN-A695'),

-- Bamboo Airways
(9, 3, 'Boeing 787-9', 'VN-A819'),
(10, 3, 'Airbus A321neo', 'VN-A590'),
(11, 3, 'Embraer E195', 'VN-A598'),

-- Pacific Airlines
(12, 4, 'Airbus A320-200', 'VN-A562'),
(13, 4, 'Airbus A321-200', 'VN-A571'),

-- Vietravel Airlines
(14, 5, 'Airbus A321-200', 'VN-A207'),
(15, 5, 'Airbus A320-200', 'VN-A218');

-- ================================================================
-- 5. AIRCRAFT SEATS - Cấu hình ghế cho mỗi máy bay
-- ================================================================
INSERT INTO aircraft_seats (id, aircraft_id, seat_class_id, quantity) VALUES
-- Boeing 787-9 (VNA) - Wide body
(1, 1, 4, 8),    -- First Class
(2, 1, 3, 28),   -- Business
(3, 1, 2, 35),   -- Premium Economy
(4, 1, 1, 180),  -- Economy

-- Boeing 787-10 (VNA) - Wide body
(5, 2, 4, 10),
(6, 2, 3, 32),
(7, 2, 2, 40),
(8, 2, 1, 230),

-- Airbus A350-900 (VNA) - Wide body
(9, 3, 3, 29),
(10, 3, 2, 45),
(11, 3, 1, 231),

-- Airbus A321neo (VNA) - Narrow body
(12, 4, 3, 16),
(13, 4, 1, 168),

-- Airbus A321-200 (VNA) - Narrow body
(14, 5, 3, 16),
(15, 5, 1, 168),

-- VietJet Airbus A321neo - Narrow body (all economy focus)
(16, 6, 2, 12),
(17, 6, 1, 218),

-- VietJet Airbus A320-200 - Narrow body
(18, 7, 1, 180),

-- VietJet Airbus A321-200
(19, 8, 2, 12),
(20, 8, 1, 218),

-- Bamboo Boeing 787-9 - Wide body
(21, 9, 3, 26),
(22, 9, 2, 36),
(23, 9, 1, 228),

-- Bamboo Airbus A321neo
(24, 10, 3, 20),
(25, 10, 1, 186),

-- Bamboo Embraer E195 - Regional
(26, 11, 1, 120),

-- Pacific Airbus A320-200
(27, 12, 2, 12),
(28, 12, 1, 138),

-- Pacific Airbus A321-200
(29, 13, 2, 16),
(30, 13, 1, 178),

-- Vietravel Airbus A321-200
(31, 14, 3, 8),
(32, 14, 1, 177),

-- Vietravel Airbus A320-200
(33, 15, 1, 180);

-- ================================================================
-- 6. FLIGHTS - Các tuyến bay chính
-- ================================================================
INSERT INTO flights (id, airline_id, flight_number, origin_airport_id, destination_airport_id) VALUES
-- Vietnam Airlines - Domestic routes
(1, 1, 'VN210', 1, 2),   -- HAN -> SGN
(2, 1, 'VN211', 2, 1),   -- SGN -> HAN
(3, 1, 'VN130', 1, 3),   -- HAN -> DAD
(4, 1, 'VN131', 3, 1),   -- DAD -> HAN
(5, 1, 'VN140', 2, 3),   -- SGN -> DAD
(6, 1, 'VN141', 3, 2),   -- DAD -> SGN
(7, 1, 'VN310', 1, 4),   -- HAN -> CXR (Nha Trang)
(8, 1, 'VN311', 4, 1),   -- CXR -> HAN
(9, 1, 'VN420', 2, 10),  -- SGN -> PQC (Phu Quoc)
(10, 1, 'VN421', 10, 2), -- PQC -> SGN
(11, 1, 'VN520', 2, 11), -- SGN -> DLI (Da Lat)
(12, 1, 'VN180', 1, 7),  -- HAN -> HUI (Hue)

-- VietJet Air - Budget routes
(13, 2, 'VJ120', 1, 2),  -- HAN -> SGN
(14, 2, 'VJ121', 2, 1),  -- SGN -> HAN
(15, 2, 'VJ320', 1, 3),  -- HAN -> DAD
(16, 2, 'VJ321', 3, 1),  -- DAD -> HAN
(17, 2, 'VJ510', 2, 4),  -- SGN -> CXR
(18, 2, 'VJ511', 4, 2),  -- CXR -> SGN
(19, 2, 'VJ620', 2, 10), -- SGN -> PQC
(20, 2, 'VJ621', 10, 2), -- PQC -> SGN
(21, 2, 'VJ150', 2, 3),  -- SGN -> DAD
(22, 2, 'VJ151', 3, 2),  -- DAD -> SGN

-- Bamboo Airways
(23, 3, 'QH210', 1, 2),  -- HAN -> SGN
(24, 3, 'QH211', 2, 1),  -- SGN -> HAN
(25, 3, 'QH310', 1, 3),  -- HAN -> DAD
(26, 3, 'QH311', 3, 1),  -- DAD -> HAN
(27, 3, 'QH410', 2, 10), -- SGN -> PQC
(28, 3, 'QH411', 10, 2), -- PQC -> SGN
(29, 3, 'QH520', 1, 4),  -- HAN -> CXR
(30, 3, 'QH630', 2, 9),  -- SGN -> VCA (Can Tho)

-- Pacific Airlines
(31, 4, 'BL320', 1, 3),  -- HAN -> DAD
(32, 4, 'BL340', 2, 4),  -- SGN -> CXR
(33, 4, 'BL560', 1, 5),  -- HAN -> HPH (Hai Phong)

-- Vietravel Airlines
(34, 5, 'VU220', 1, 2),  -- HAN -> SGN
(35, 5, 'VU330', 2, 3),  -- SGN -> DAD
(36, 5, 'VU450', 2, 11); -- SGN -> DLI

-- ================================================================
-- 7. FLIGHT PRICES - Giá vé theo hạng ghế (nghìn VNĐ)
-- ================================================================
INSERT INTO flight_prices (id, flight_id, seat_class_id, price) VALUES
-- VN210: HAN -> SGN (Vietnam Airlines)
(1, 1, 1, 1450.00),   -- Economy: 1,450,000 VND
(2, 1, 2, 2200.00),   -- Premium Economy: 2,200,000 VND
(3, 1, 3, 4500.00),   -- Business: 4,500,000 VND
(4, 1, 4, 8900.00),   -- First Class: 8,900,000 VND

-- VN211: SGN -> HAN
(5, 2, 1, 1450.00),
(6, 2, 2, 2200.00),
(7, 2, 3, 4500.00),
(8, 2, 4, 8900.00),

-- VN130: HAN -> DAD
(9, 3, 1, 980.00),
(10, 3, 2, 1580.00),
(11, 3, 3, 3200.00),

-- VN131: DAD -> HAN
(12, 4, 1, 980.00),
(13, 4, 2, 1580.00),
(14, 4, 3, 3200.00),

-- VN140: SGN -> DAD
(15, 5, 1, 890.00),
(16, 5, 2, 1480.00),
(17, 5, 3, 2980.00),

-- VN141: DAD -> SGN
(18, 6, 1, 890.00),
(19, 6, 2, 1480.00),
(20, 6, 3, 2980.00),

-- VN310: HAN -> CXR (Nha Trang)
(21, 7, 1, 1250.00),
(22, 7, 2, 1980.00),
(23, 7, 3, 3890.00),

-- VN311: CXR -> HAN
(24, 8, 1, 1250.00),
(25, 8, 2, 1980.00),
(26, 8, 3, 3890.00),

-- VN420: SGN -> PQC (Phu Quoc)
(27, 9, 1, 780.00),
(28, 9, 2, 1380.00),
(29, 9, 3, 2680.00),

-- VN421: PQC -> SGN
(30, 10, 1, 780.00),
(31, 10, 2, 1380.00),
(32, 10, 3, 2680.00),

-- VN520: SGN -> DLI (Da Lat)
(33, 11, 1, 650.00),
(34, 11, 2, 1180.00),
(35, 11, 3, 2380.00),

-- VN180: HAN -> HUI (Hue)
(36, 12, 1, 880.00),
(37, 12, 2, 1450.00),
(38, 12, 3, 2850.00),

-- VietJet Air (VJ) - Budget prices, mainly Economy and Premium Economy
-- VJ120: HAN -> SGN
(39, 13, 1, 1180.00),
(40, 13, 2, 1790.00),

-- VJ121: SGN -> HAN
(41, 14, 1, 1180.00),
(42, 14, 2, 1790.00),

-- VJ320: HAN -> DAD
(43, 15, 1, 790.00),

-- VJ321: DAD -> HAN
(44, 16, 1, 790.00),

-- VJ510: SGN -> CXR
(45, 17, 1, 980.00),
(46, 17, 2, 1580.00),

-- VJ511: CXR -> SGN
(47, 18, 1, 980.00),
(48, 18, 2, 1580.00),

-- VJ620: SGN -> PQC
(49, 19, 1, 590.00),

-- VJ621: PQC -> SGN
(50, 20, 1, 590.00),

-- VJ150: SGN -> DAD
(51, 21, 1, 720.00),
(52, 21, 2, 1280.00),

-- VJ151: DAD -> SGN
(53, 22, 1, 720.00),
(54, 22, 2, 1280.00),

-- Bamboo Airways (QH)
-- QH210: HAN -> SGN
(55, 23, 1, 1350.00),
(56, 23, 2, 2050.00),
(57, 23, 3, 4200.00),

-- QH211: SGN -> HAN
(58, 24, 1, 1350.00),
(59, 24, 2, 2050.00),
(60, 24, 3, 4200.00),

-- QH310: HAN -> DAD
(61, 25, 1, 920.00),
(62, 25, 3, 3100.00),

-- QH311: DAD -> HAN
(63, 26, 1, 920.00),
(64, 26, 3, 3100.00),

-- QH410: SGN -> PQC
(65, 27, 1, 720.00),
(66, 27, 2, 1320.00),
(67, 27, 3, 2580.00),

-- QH411: PQC -> SGN
(68, 28, 1, 720.00),
(69, 28, 2, 1320.00),
(70, 28, 3, 2580.00),

-- QH520: HAN -> CXR
(71, 29, 1, 1180.00),
(72, 29, 3, 3680.00),

-- QH630: SGN -> VCA (Can Tho)
(73, 30, 1, 490.00),

-- Pacific Airlines (BL)
-- BL320: HAN -> DAD
(74, 31, 1, 850.00),
(75, 31, 2, 1450.00),

-- BL340: SGN -> CXR
(76, 32, 1, 1080.00),
(77, 32, 2, 1780.00),

-- BL560: HAN -> HPH
(78, 33, 1, 450.00),

-- Vietravel Airlines (VU)
-- VU220: HAN -> SGN
(79, 34, 1, 1250.00),
(80, 34, 3, 3890.00),

-- VU330: SGN -> DAD
(81, 35, 1, 790.00),

-- VU450: SGN -> DLI
(82, 36, 1, 620.00);

-- ================================================================
-- 8. FLIGHT INSTANCES - Chuyến bay cụ thể (tương lai từ 05/01/2026)
-- ================================================================
INSERT INTO flight_instances (id, flight_id, aircraft_id, departure_time, arrival_time) VALUES
-- Vietnam Airlines - VN210 (HAN -> SGN) - Multiple days
(1, 1, 1, '2026-01-05 06:00:00', '2026-01-05 08:15:00'),
(2, 1, 2, '2026-01-05 10:30:00', '2026-01-05 12:45:00'),
(3, 1, 3, '2026-01-05 15:00:00', '2026-01-05 17:15:00'),
(4, 1, 1, '2026-01-06 07:00:00', '2026-01-06 09:15:00'),
(5, 1, 2, '2026-01-07 12:00:00', '2026-01-07 14:15:00'),

-- VN211 (SGN -> HAN)
(6, 2, 1, '2026-01-05 09:30:00', '2026-01-05 11:45:00'),
(7, 2, 2, '2026-01-05 14:00:00', '2026-01-05 16:15:00'),
(8, 2, 3, '2026-01-05 18:30:00', '2026-01-05 20:45:00'),
(9, 2, 1, '2026-01-06 11:00:00', '2026-01-06 13:15:00'),

-- VN130 (HAN -> DAD)
(10, 3, 4, '2026-01-05 06:30:00', '2026-01-05 08:00:00'),
(11, 3, 5, '2026-01-05 11:00:00', '2026-01-05 12:30:00'),
(12, 3, 4, '2026-01-06 07:30:00', '2026-01-06 09:00:00'),
(13, 3, 5, '2026-01-08 16:00:00', '2026-01-08 17:30:00'),

-- VN131 (DAD -> HAN)
(14, 4, 4, '2026-01-05 09:00:00', '2026-01-05 10:30:00'),
(15, 4, 5, '2026-01-05 13:30:00', '2026-01-05 15:00:00'),
(16, 4, 4, '2026-01-06 10:00:00', '2026-01-06 11:30:00'),

-- VN140 (SGN -> DAD)
(17, 5, 4, '2026-01-05 06:00:00', '2026-01-05 07:20:00'),
(18, 5, 5, '2026-01-05 14:30:00', '2026-01-05 15:50:00'),
(19, 5, 4, '2026-01-07 08:00:00', '2026-01-07 09:20:00'),

-- VN141 (DAD -> SGN)
(20, 6, 4, '2026-01-05 10:00:00', '2026-01-05 11:20:00'),
(21, 6, 5, '2026-01-05 17:00:00', '2026-01-05 18:20:00'),

-- VN310 (HAN -> CXR - Nha Trang)
(22, 7, 5, '2026-01-05 07:00:00', '2026-01-05 09:10:00'),
(23, 7, 5, '2026-01-06 14:00:00', '2026-01-06 16:10:00'),
(24, 7, 4, '2026-01-10 08:00:00', '2026-01-10 10:10:00'),

-- VN311 (CXR -> HAN)
(25, 8, 5, '2026-01-05 10:00:00', '2026-01-05 12:10:00'),
(26, 8, 5, '2026-01-06 17:00:00', '2026-01-06 19:10:00'),

-- VN420 (SGN -> PQC - Phu Quoc)
(27, 9, 5, '2026-01-05 06:30:00', '2026-01-05 07:30:00'),
(28, 9, 4, '2026-01-05 12:00:00', '2026-01-05 13:00:00'),
(29, 9, 5, '2026-01-06 09:00:00', '2026-01-06 10:00:00'),
(30, 9, 4, '2026-01-08 16:00:00', '2026-01-08 17:00:00'),

-- VN421 (PQC -> SGN)
(31, 10, 5, '2026-01-05 08:30:00', '2026-01-05 09:30:00'),
(32, 10, 4, '2026-01-05 14:00:00', '2026-01-05 15:00:00'),
(33, 10, 5, '2026-01-06 11:00:00', '2026-01-06 12:00:00'),

-- VN520 (SGN -> DLI - Da Lat)
(34, 11, 5, '2026-01-05 07:00:00', '2026-01-05 08:00:00'),
(35, 11, 5, '2026-01-06 15:00:00', '2026-01-06 16:00:00'),

-- VN180 (HAN -> HUI - Hue)
(36, 12, 5, '2026-01-05 08:00:00', '2026-01-05 09:20:00'),
(37, 12, 4, '2026-01-07 13:00:00', '2026-01-07 14:20:00'),

-- VietJet Air - VJ120 (HAN -> SGN)
(38, 13, 6, '2026-01-05 05:30:00', '2026-01-05 07:45:00'),
(39, 13, 7, '2026-01-05 11:00:00', '2026-01-05 13:15:00'),
(40, 13, 8, '2026-01-05 16:30:00', '2026-01-05 18:45:00'),
(41, 13, 6, '2026-01-06 06:30:00', '2026-01-06 08:45:00'),
(42, 13, 7, '2026-01-07 10:00:00', '2026-01-07 12:15:00'),

-- VJ121 (SGN -> HAN)
(43, 14, 6, '2026-01-05 08:30:00', '2026-01-05 10:45:00'),
(44, 14, 7, '2026-01-05 14:00:00', '2026-01-05 16:15:00'),
(45, 14, 8, '2026-01-05 19:30:00', '2026-01-05 21:45:00'),

-- VJ320 (HAN -> DAD)
(46, 15, 6, '2026-01-05 06:00:00', '2026-01-05 07:30:00'),
(47, 15, 7, '2026-01-05 13:00:00', '2026-01-05 14:30:00'),
(48, 15, 6, '2026-01-06 08:00:00', '2026-01-06 09:30:00'),

-- VJ321 (DAD -> HAN)
(49, 16, 6, '2026-01-05 08:30:00', '2026-01-05 10:00:00'),
(50, 16, 7, '2026-01-05 15:30:00', '2026-01-05 17:00:00'),

-- VJ510 (SGN -> CXR)
(51, 17, 6, '2026-01-05 07:00:00', '2026-01-05 08:20:00'),
(52, 17, 8, '2026-01-06 13:30:00', '2026-01-06 14:50:00'),

-- VJ511 (CXR -> SGN)
(53, 18, 6, '2026-01-05 09:30:00', '2026-01-05 10:50:00'),
(54, 18, 8, '2026-01-06 16:00:00', '2026-01-06 17:20:00'),

-- VJ620 (SGN -> PQC)
(55, 19, 7, '2026-01-05 06:00:00', '2026-01-05 07:00:00'),
(56, 19, 7, '2026-01-05 14:00:00', '2026-01-05 15:00:00'),
(57, 19, 7, '2026-01-06 10:00:00', '2026-01-06 11:00:00'),

-- VJ621 (PQC -> SGN)
(58, 20, 7, '2026-01-05 08:00:00', '2026-01-05 09:00:00'),
(59, 20, 7, '2026-01-05 16:00:00', '2026-01-05 17:00:00'),

-- VJ150 (SGN -> DAD)
(60, 21, 6, '2026-01-05 06:30:00', '2026-01-05 07:50:00'),
(61, 21, 8, '2026-01-05 15:00:00', '2026-01-05 16:20:00'),

-- VJ151 (DAD -> SGN)
(62, 22, 6, '2026-01-05 09:00:00', '2026-01-05 10:20:00'),
(63, 22, 8, '2026-01-05 17:30:00', '2026-01-05 18:50:00'),

-- Bamboo Airways - QH210 (HAN -> SGN)
(64, 23, 9, '2026-01-05 06:30:00', '2026-01-05 08:45:00'),
(65, 23, 10, '2026-01-05 13:00:00', '2026-01-05 15:15:00'),
(66, 23, 9, '2026-01-06 09:00:00', '2026-01-06 11:15:00'),

-- QH211 (SGN -> HAN)
(67, 24, 9, '2026-01-05 10:00:00', '2026-01-05 12:15:00'),
(68, 24, 10, '2026-01-05 16:30:00', '2026-01-05 18:45:00'),

-- QH310 (HAN -> DAD)
(69, 25, 10, '2026-01-05 07:00:00', '2026-01-05 08:30:00'),
(70, 25, 10, '2026-01-06 14:00:00', '2026-01-06 15:30:00'),

-- QH311 (DAD -> HAN)
(71, 26, 10, '2026-01-05 09:30:00', '2026-01-05 11:00:00'),
(72, 26, 10, '2026-01-06 16:00:00', '2026-01-06 17:30:00'),

-- QH410 (SGN -> PQC)
(73, 27, 9, '2026-01-05 08:00:00', '2026-01-05 09:00:00'),
(74, 27, 10, '2026-01-06 14:00:00', '2026-01-06 15:00:00'),

-- QH411 (PQC -> SGN)
(75, 28, 9, '2026-01-05 10:00:00', '2026-01-05 11:00:00'),
(76, 28, 10, '2026-01-06 16:00:00', '2026-01-06 17:00:00'),

-- QH520 (HAN -> CXR)
(77, 29, 10, '2026-01-05 07:30:00', '2026-01-05 09:40:00'),
(78, 29, 10, '2026-01-08 15:00:00', '2026-01-08 17:10:00'),

-- QH630 (SGN -> VCA - Can Tho)
(79, 30, 11, '2026-01-05 06:00:00', '2026-01-05 06:45:00'),
(80, 30, 11, '2026-01-06 12:00:00', '2026-01-06 12:45:00'),

-- Pacific Airlines - BL320 (HAN -> DAD)
(81, 31, 12, '2026-01-05 08:00:00', '2026-01-05 09:30:00'),
(82, 31, 13, '2026-01-06 15:00:00', '2026-01-06 16:30:00'),

-- BL340 (SGN -> CXR)
(83, 32, 12, '2026-01-05 09:00:00', '2026-01-05 10:20:00'),
(84, 32, 13, '2026-01-07 14:00:00', '2026-01-07 15:20:00'),

-- BL560 (HAN -> HPH - Hai Phong)
(85, 33, 12, '2026-01-05 06:30:00', '2026-01-05 07:10:00'),
(86, 33, 12, '2026-01-06 17:00:00', '2026-01-06 17:40:00'),

-- Vietravel Airlines - VU220 (HAN -> SGN)
(87, 34, 14, '2026-01-05 07:00:00', '2026-01-05 09:15:00'),
(88, 34, 15, '2026-01-06 13:00:00', '2026-01-06 15:15:00'),

-- VU330 (SGN -> DAD)
(89, 35, 14, '2026-01-05 08:00:00', '2026-01-05 09:20:00'),
(90, 35, 15, '2026-01-07 16:00:00', '2026-01-07 17:20:00'),

-- VU450 (SGN -> DLI - Da Lat)
(91, 36, 15, '2026-01-05 06:30:00', '2026-01-05 07:30:00'),
(92, 36, 15, '2026-01-08 14:00:00', '2026-01-08 15:00:00');

-- ================================================================
-- 9. BOOKINGS - Đơn đặt vé mẫu (giá tính bằng nghìn VNĐ)
-- ================================================================
INSERT INTO bookings (id, booking_code, customer_name, contact_phone, total_amount, status) VALUES
(1, 'BK20260105001', 'Nguyen Van An', '0912345678', 2900.00, 'CONFIRMED'),        -- 2,900,000 VND
(2, 'BK20260105002', 'Tran Thi Binh', '0923456789', 1450.00, 'CONFIRMED'),        -- 1,450,000 VND
(3, 'BK20260105003', 'Le Hoang Cuong', '0934567890', 4500.00, 'CONFIRMED'),       -- 4,500,000 VND
(4, 'BK20260105004', 'Pham Thi Dung', '0945678901', 1560.00, 'CONFIRMED'),        -- 1,560,000 VND (round trip)
(5, 'BK20260105005', 'Vo Van Em', '0956789012', 2360.00, 'CONFIRMED'),            -- 2,360,000 VND (round trip)
(6, 'BK20260105006', 'Hoang Thi Phuong', '0967890123', 1180.00, 'PENDING'),       -- 1,180,000 VND
(7, 'BK20260105007', 'Dang Van Gia', '0978901234', 3200.00, 'CONFIRMED'),         -- 3,200,000 VND
(8, 'BK20260105008', 'Bui Thi Hoa', '0989012345', 1780.00, 'CONFIRMED'),          -- 1,780,000 VND (round trip)
(9, 'BK20260105009', 'Truong Van Hai', '0901234567', 5040.00, 'CONFIRMED'),       -- 5,040,000 VND (round trip)
(10, 'BK20260105010', 'Ly Thi Khanh', '0912345670', 1350.00, 'CANCELLED');        -- 1,350,000 VND (cancelled)

-- ================================================================
-- 10. BOOKING DETAILS - Chi tiết đặt vé
-- ================================================================
INSERT INTO booking_details (id, booking_id, flight_instance_id, seat_class_id, quantity) VALUES
-- Booking 1: VN210 HAN->SGN, 2 Economy tickets
(1, 1, 1, 1, 2),

-- Booking 2: VN210 HAN->SGN, 1 Economy ticket
(2, 2, 2, 1, 1),

-- Booking 3: VN211 SGN->HAN, 1 Business ticket
(3, 3, 6, 3, 1),

-- Booking 4: VJ120 HAN->SGN, 1 Economy ticket + VJ121 SGN->HAN, 1 Economy (round trip)
(4, 4, 38, 1, 1),

-- Booking 5: VN130 HAN->DAD, 1 Premium Economy + VN131 DAD->HAN, 1 Premium Economy
(5, 5, 10, 2, 1),

-- Booking 6: VJ120 HAN->SGN, 1 Economy ticket
(6, 6, 39, 1, 1),

-- Booking 7: VN130 HAN->DAD, 1 Business ticket
(7, 7, 11, 3, 1),

-- Booking 8: VJ510 SGN->CXR, 1 Premium Economy + VJ511 CXR->SGN, 1 Premium Economy
(8, 8, 51, 2, 1),

-- Booking 9: QH210 HAN->SGN, 1 Business + QH211 SGN->HAN, 1 Business (round trip)
(9, 9, 64, 3, 1),

-- Booking 10: QH210 HAN->SGN, 1 Economy (cancelled)
(10, 10, 65, 1, 1);

-- ================================================================
-- 11. TICKETS - Vé cụ thể với số ghế
-- ================================================================
INSERT INTO tickets (id, booking_detail_id, seat_number) VALUES
-- Booking 1: 2 tickets
(1, 1, '12A'),
(2, 1, '12B'),

-- Booking 2: 1 ticket
(3, 2, '15C'),

-- Booking 3: 1 ticket (Business)
(4, 3, '3A'),

-- Booking 4: 1 ticket (outbound)
(5, 4, '18F'),

-- Booking 5: 1 ticket (outbound)
(6, 5, '8D'),

-- Booking 6: 1 ticket
(7, 6, '22A'),

-- Booking 7: 1 ticket (Business)
(8, 7, '2C'),

-- Booking 8: 1 ticket (outbound)
(9, 8, '9B'),

-- Booking 9: 1 ticket (outbound, Business)
(10, 9, '4F'),

-- Booking 10: 1 ticket (cancelled)
(11, 10, '20D');

-- ================================================================
-- END OF SAMPLE DATA
-- ================================================================
-- Total records inserted:
-- - Airlines: 5
-- - Airports: 12
-- - Seat Classes: 4
-- - Aircrafts: 15
-- - Aircraft Seats: 33
-- - Flights: 36
-- - Flight Prices: 82
-- - Flight Instances: 92
-- - Bookings: 10
-- - Booking Details: 10
-- - Tickets: 11
-- ================================================================
