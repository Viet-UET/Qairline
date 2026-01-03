package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

        List<Ticket> findByBookingDetailId(Long bookingDetailId);

        @Query("SELECT t FROM Ticket t WHERE t.bookingDetail.flightInstance.id = :flightInstanceId AND t.seatNumber = :seatNumber")
        boolean existsByFlightInstanceAndSeatNumber(@Param("flightInstanceId") Long flightInstanceId,
                        @Param("seatNumber") String seatNumber);

        @Query("SELECT t.seatNumber FROM Ticket t WHERE t.bookingDetail.flightInstance.id = :flightInstanceId AND t.bookingDetail.seatClass.id = :seatClassId")
        List<String> findBookedSeatsByFlightInstanceAndSeatClass(@Param("flightInstanceId") Long flightInstanceId,
                        @Param("seatClassId") Long seatClassId);
}
