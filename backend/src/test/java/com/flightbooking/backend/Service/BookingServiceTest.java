package com.flightbooking.backend.Service;

import com.flightbooking.backend.Exception.InvalidBookingException;
import com.flightbooking.backend.Model.*;
import com.flightbooking.backend.Repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private BookingDetailRepository bookingDetailRepository;

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private FlightInstanceRepository flightInstanceRepository;

    @Mock
    private SeatClassRepository seatClassRepository;

    @Mock
    private FlightPriceRepository flightPriceRepository;

    @InjectMocks
    private BookingService bookingService;

    private Booking testBooking;
    private BookingDetail testBookingDetail;
    private FlightInstance testFlightInstance;
    private Flight testFlight;

    @BeforeEach
    void setUp() {
        // Setup test data
        testBooking = Booking.builder()
                .id(1L)
                .bookingCode("BK12345678")
                .customerName("viet12345")
                .contactPhone("0123456789")
                .totalAmount(new java.math.BigDecimal("100.00"))
                .status("CONFIRMED")
                .build();

        testFlight = Flight.builder()
                .id(1L)
                .flightNumber("QW1001")
                .build();

        testFlightInstance = FlightInstance.builder()
                .id(1L)
                .flight(testFlight)
                .departureTime(LocalDateTime.now().plusDays(2)) // 2 days from now
                .arrivalTime(LocalDateTime.now().plusDays(2).plusHours(3))
                .build();

        testBookingDetail = BookingDetail.builder()
                .id(1L)
                .booking(testBooking)
                .flightInstance(testFlightInstance)
                .quantity(1)
                .build();
    }

    @Test
    void cancelBooking_Success_WhenMoreThan24HoursBeforeDeparture() {
        // Arrange
        Long bookingId = 1L;
        String username = "viet12345";

        List<BookingDetail> bookingDetails = new ArrayList<>();
        bookingDetails.add(testBookingDetail);

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));
        when(bookingDetailRepository.findByBookingId(bookingId)).thenReturn(bookingDetails);
        when(bookingRepository.save(any(Booking.class))).thenReturn(testBooking);

        // Act
        assertDoesNotThrow(() -> bookingService.cancelBooking(bookingId, username));

        // Assert
        verify(bookingRepository).findById(bookingId);
        verify(bookingDetailRepository).findByBookingId(bookingId);
        verify(bookingRepository).save(any(Booking.class));
        assertEquals("CANCELLED", testBooking.getStatus());
    }

    @Test
    void cancelBooking_ThrowsException_WhenBookingNotFound() {
        // Arrange
        Long bookingId = 999L;
        String username = "viet12345";

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.empty());

        // Act & Assert
        InvalidBookingException exception = assertThrows(
                InvalidBookingException.class,
                () -> bookingService.cancelBooking(bookingId, username));

        assertEquals("Booking not found: " + bookingId, exception.getMessage());
        verify(bookingRepository).findById(bookingId);
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void cancelBooking_ThrowsException_WhenUnauthorizedUser() {
        // Arrange
        Long bookingId = 1L;
        String username = "wronguser";

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));

        // Act & Assert
        InvalidBookingException exception = assertThrows(
                InvalidBookingException.class,
                () -> bookingService.cancelBooking(bookingId, username));

        assertEquals("You are not authorized to cancel this booking", exception.getMessage());
        verify(bookingRepository).findById(bookingId);
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void cancelBooking_ThrowsException_WhenBookingAlreadyCancelled() {
        // Arrange
        Long bookingId = 1L;
        String username = "viet12345";
        testBooking.setStatus("CANCELLED");

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));

        // Act & Assert
        InvalidBookingException exception = assertThrows(
                InvalidBookingException.class,
                () -> bookingService.cancelBooking(bookingId, username));

        assertEquals("Booking is already cancelled", exception.getMessage());
        verify(bookingRepository).findById(bookingId);
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void cancelBooking_ThrowsException_WhenLessThan24HoursBeforeDeparture() {
        // Arrange
        Long bookingId = 1L;
        String username = "viet12345";

        // Set departure time to 12 hours from now
        testFlightInstance.setDepartureTime(LocalDateTime.now().plusHours(12));

        List<BookingDetail> bookingDetails = new ArrayList<>();
        bookingDetails.add(testBookingDetail);

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));
        when(bookingDetailRepository.findByBookingId(bookingId)).thenReturn(bookingDetails);

        // Act & Assert
        InvalidBookingException exception = assertThrows(
                InvalidBookingException.class,
                () -> bookingService.cancelBooking(bookingId, username));

        assertEquals("Cannot cancel booking less than 24 hours before departure", exception.getMessage());
        verify(bookingRepository).findById(bookingId);
        verify(bookingDetailRepository).findByBookingId(bookingId);
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void cancelBooking_ThrowsException_WhenExactly23HoursBeforeDeparture() {
        // Arrange
        Long bookingId = 1L;
        String username = "viet12345";

        // Set departure time to exactly 23 hours from now
        testFlightInstance.setDepartureTime(LocalDateTime.now().plusHours(23));

        List<BookingDetail> bookingDetails = new ArrayList<>();
        bookingDetails.add(testBookingDetail);

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));
        when(bookingDetailRepository.findByBookingId(bookingId)).thenReturn(bookingDetails);

        // Act & Assert
        InvalidBookingException exception = assertThrows(
                InvalidBookingException.class,
                () -> bookingService.cancelBooking(bookingId, username));

        assertEquals("Cannot cancel booking less than 24 hours before departure", exception.getMessage());
    }

    @Test
    void cancelBooking_Success_WhenExactly25HoursBeforeDeparture() {
        // Arrange
        Long bookingId = 1L;
        String username = "viet12345";

        // Set departure time to exactly 25 hours from now
        testFlightInstance.setDepartureTime(LocalDateTime.now().plusHours(25));

        List<BookingDetail> bookingDetails = new ArrayList<>();
        bookingDetails.add(testBookingDetail);

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));
        when(bookingDetailRepository.findByBookingId(bookingId)).thenReturn(bookingDetails);
        when(bookingRepository.save(any(Booking.class))).thenReturn(testBooking);

        // Act
        assertDoesNotThrow(() -> bookingService.cancelBooking(bookingId, username));

        // Assert
        verify(bookingRepository).save(any(Booking.class));
        assertEquals("CANCELLED", testBooking.getStatus());
    }

    @Test
    void cancelBooking_ChecksEarliestDeparture_WhenMultipleFlights() {
        // Arrange
        Long bookingId = 1L;
        String username = "viet12345";

        // Create multiple flight instances with different departure times
        FlightInstance earlyFlight = FlightInstance.builder()
                .id(2L)
                .flight(testFlight)
                .departureTime(LocalDateTime.now().plusHours(30)) // 30 hours from now - earliest
                .build();

        FlightInstance lateFlight = FlightInstance.builder()
                .id(3L)
                .flight(testFlight)
                .departureTime(LocalDateTime.now().plusDays(5)) // 5 days from now
                .build();

        BookingDetail earlyDetail = BookingDetail.builder()
                .id(2L)
                .booking(testBooking)
                .flightInstance(earlyFlight)
                .quantity(1)
                .build();

        BookingDetail lateDetail = BookingDetail.builder()
                .id(3L)
                .booking(testBooking)
                .flightInstance(lateFlight)
                .quantity(1)
                .build();

        List<BookingDetail> bookingDetails = new ArrayList<>();
        bookingDetails.add(lateDetail); // Add late flight first
        bookingDetails.add(earlyDetail); // Add early flight second

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(testBooking));
        when(bookingDetailRepository.findByBookingId(bookingId)).thenReturn(bookingDetails);
        when(bookingRepository.save(any(Booking.class))).thenReturn(testBooking);

        // Act - should succeed because earliest flight (30 hours) is > 24 hours
        assertDoesNotThrow(() -> bookingService.cancelBooking(bookingId, username));

        // Assert
        verify(bookingRepository).save(any(Booking.class));
        assertEquals("CANCELLED", testBooking.getStatus());
    }
}
