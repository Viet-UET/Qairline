package com.flightbooking.backend.Service;

import com.flightbooking.backend.DTO.BookingDTO;
import com.flightbooking.backend.Exception.InvalidBookingException;
import com.flightbooking.backend.Exception.SeatNotAvailableException;
import com.flightbooking.backend.Model.*;
import com.flightbooking.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

        private final BookingRepository bookingRepository;
        private final BookingDetailRepository bookingDetailRepository;
        private final TicketRepository ticketRepository;
        private final FlightInstanceRepository flightInstanceRepository;
        private final SeatClassRepository seatClassRepository;
        private final FlightPriceRepository flightPriceRepository;

        @Transactional
        public BookingDTO.BookingResponseDTO createBooking(BookingDTO.BookingRequestDTO request, String username) {
                // Validate request
                if (request.getFlightInstanceId() == null || request.getSeatClassId() == null) {
                        throw new InvalidBookingException("Flight instance and seat class are required");
                }

                if (request.getQuantity() == null || request.getQuantity() <= 0) {
                        throw new InvalidBookingException("Quantity must be greater than 0");
                }

                if (request.getSeatNumbers() == null || request.getSeatNumbers().isEmpty()) {
                        throw new InvalidBookingException("Seat numbers are required");
                }

                // Validate quantity matches seat numbers
                if (request.getQuantity() != request.getSeatNumbers().size()) {
                        throw new InvalidBookingException("Quantity must match number of seat numbers provided");
                }

                // Fetch flight instance
                FlightInstance flightInstance = flightInstanceRepository.findById(request.getFlightInstanceId())
                                .orElseThrow(() -> new InvalidBookingException(
                                                "Flight instance not found: " + request.getFlightInstanceId()));

                // Fetch seat class
                SeatClass seatClass = seatClassRepository.findById(request.getSeatClassId())
                                .orElseThrow(() -> new InvalidBookingException(
                                                "Seat class not found: " + request.getSeatClassId()));

                // Validate seat availability
                validateSeatAvailability(flightInstance.getId(), seatClass.getId(), request.getSeatNumbers());

                // Get price
                BigDecimal price = flightPriceRepository.findPriceByFlightAndSeatClass(
                                flightInstance.getFlight().getId(),
                                seatClass.getId())
                                .orElseThrow(() -> new InvalidBookingException(
                                                "Price not found for flight and seat class"));

                // Calculate total amount
                BigDecimal totalAmount = price.multiply(BigDecimal.valueOf(request.getQuantity()));

                // Generate booking code
                String bookingCode = generateBookingCode();

                // Create booking entity
                Booking booking = Booking.builder()
                                .bookingCode(bookingCode)
                                .customerName(username)
                                .contactPhone(request.getContactPhone())
                                .totalAmount(totalAmount)
                                .status("CONFIRMED")
                                .build();

                booking = bookingRepository.save(booking);

                // Create booking detail
                BookingDetail bookingDetail = BookingDetail.builder()
                                .booking(booking)
                                .flightInstance(flightInstance)
                                .seatClass(seatClass)
                                .quantity(request.getQuantity())
                                .build();

                bookingDetail = bookingDetailRepository.save(bookingDetail);

                // Create tickets
                List<BookingDTO.TicketResponseDTO> ticketResponses = new ArrayList<>();
                for (String seatNumber : request.getSeatNumbers()) {
                        Ticket ticket = Ticket.builder()
                                        .bookingDetail(bookingDetail)
                                        .seatNumber(seatNumber)
                                        .build();
                        ticket = ticketRepository.save(ticket);

                        ticketResponses.add(BookingDTO.TicketResponseDTO.builder()
                                        .id(ticket.getId())
                                        .seatNumber(ticket.getSeatNumber())
                                        .build());
                }

                // Build booking detail response
                BookingDTO.BookingDetailResponseDTO detailResponse = BookingDTO.BookingDetailResponseDTO.builder()
                                .id(bookingDetail.getId())
                                .flightInstanceId(flightInstance.getId())
                                .flightNumber(flightInstance.getFlight().getFlightNumber())
                                .departureAirport(flightInstance.getFlight().getOriginAirport().getCode())
                                .arrivalAirport(flightInstance.getFlight().getDestinationAirport().getCode())
                                .departureTime(flightInstance.getDepartureTime())
                                .arrivalTime(flightInstance.getArrivalTime())
                                .seatClassName(seatClass.getName())
                                .quantity(request.getQuantity())
                                .price(price)
                                .tickets(ticketResponses)
                                .build();

                // Build and return response
                return BookingDTO.BookingResponseDTO.builder()
                                .id(booking.getId())
                                .bookingCode(booking.getBookingCode())
                                .customerName(booking.getCustomerName())
                                .contactPhone(booking.getContactPhone())
                                .totalAmount(booking.getTotalAmount())
                                .status(booking.getStatus())
                                .bookingDetails(List.of(detailResponse))
                                .build();
        }

        @Transactional(readOnly = true)
        public List<BookingDTO.BookingResponseDTO> getBookingsByUsername(String username) {
                List<Booking> bookings = bookingRepository.findByCustomerNameOrderByIdDesc(username);

                return bookings.stream()
                                .map(this::convertToResponseDTO)
                                .collect(Collectors.toList());
        }

        private BookingDTO.BookingResponseDTO convertToResponseDTO(Booking booking) {
                List<BookingDetail> details = bookingDetailRepository.findByBookingId(booking.getId());

                List<BookingDTO.BookingDetailResponseDTO> detailResponses = details.stream()
                                .map(detail -> {
                                        List<Ticket> tickets = ticketRepository.findByBookingDetailId(detail.getId());

                                        List<BookingDTO.TicketResponseDTO> ticketResponses = tickets.stream()
                                                        .map(ticket -> BookingDTO.TicketResponseDTO.builder()
                                                                        .id(ticket.getId())
                                                                        .seatNumber(ticket.getSeatNumber())
                                                                        .build())
                                                        .collect(Collectors.toList());

                                        BigDecimal price = flightPriceRepository.findPriceByFlightAndSeatClass(
                                                        detail.getFlightInstance().getFlight().getId(),
                                                        detail.getSeatClass().getId()).orElse(BigDecimal.ZERO);

                                        return BookingDTO.BookingDetailResponseDTO.builder()
                                                        .id(detail.getId())
                                                        .flightInstanceId(detail.getFlightInstance().getId())
                                                        .flightNumber(detail.getFlightInstance().getFlight()
                                                                        .getFlightNumber())
                                                        .departureAirport(detail.getFlightInstance().getFlight()
                                                                        .getOriginAirport().getCode())
                                                        .arrivalAirport(detail.getFlightInstance().getFlight()
                                                                        .getDestinationAirport().getCode())
                                                        .departureTime(detail.getFlightInstance().getDepartureTime())
                                                        .arrivalTime(detail.getFlightInstance().getArrivalTime())
                                                        .seatClassName(detail.getSeatClass().getName())
                                                        .quantity(detail.getQuantity())
                                                        .price(price)
                                                        .tickets(ticketResponses)
                                                        .build();
                                })
                                .collect(Collectors.toList());

                return BookingDTO.BookingResponseDTO.builder()
                                .id(booking.getId())
                                .bookingCode(booking.getBookingCode())
                                .customerName(booking.getCustomerName())
                                .contactPhone(booking.getContactPhone())
                                .totalAmount(booking.getTotalAmount())
                                .status(booking.getStatus())
                                .bookingDetails(detailResponses)
                                .build();
        }

        private String generateBookingCode() {
                String timestamp = String.valueOf(Instant.now().toEpochMilli());
                String random = String.format("%04d", new Random().nextInt(10000));
                return "BK" + timestamp.substring(timestamp.length() - 8) + random;
        }

        private void validateSeatAvailability(Long flightInstanceId, Long seatClassId, List<String> seatNumbers) {
                List<String> bookedSeats = ticketRepository.findBookedSeatsByFlightInstanceAndSeatClass(
                                flightInstanceId, seatClassId);

                for (String seatNumber : seatNumbers) {
                        if (bookedSeats.contains(seatNumber)) {
                                throw new SeatNotAvailableException("Seat " + seatNumber + " is already booked");
                        }
                }
        }

        @Transactional
        public void cancelBooking(Long bookingId, String username) {
                Booking booking = bookingRepository.findById(bookingId)
                                .orElseThrow(() -> new InvalidBookingException("Booking not found: " + bookingId));

                if (!booking.getCustomerName().equals(username)) {
                        throw new InvalidBookingException("You are not authorized to cancel this booking");
                }

                if ("CANCELLED".equals(booking.getStatus())) {
                        throw new InvalidBookingException("Booking is already cancelled");
                }

                List<BookingDetail> bookingDetails = bookingDetailRepository.findByBookingId(bookingId);
                if (!bookingDetails.isEmpty()) {
                        java.time.LocalDateTime earliestDeparture = bookingDetails.stream()
                                        .map(detail -> detail.getFlightInstance().getDepartureTime())
                                        .min(java.time.LocalDateTime::compareTo)
                                        .orElse(null);

                        if (earliestDeparture != null) {
                                java.time.LocalDateTime now = java.time.LocalDateTime.now();
                                long hoursDifference = java.time.Duration.between(now, earliestDeparture).toHours();

                                if (hoursDifference < 24) {
                                        throw new InvalidBookingException(
                                                        "Cannot cancel booking less than 24 hours before departure");
                                }
                        }
                }

                booking.setStatus("CANCELLED");
                bookingRepository.save(booking);
        }
}
