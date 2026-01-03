package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingCode(String bookingCode);

    List<Booking> findByCustomerName(String customerName);

    List<Booking> findByCustomerNameOrderByIdDesc(String customerName);
}
