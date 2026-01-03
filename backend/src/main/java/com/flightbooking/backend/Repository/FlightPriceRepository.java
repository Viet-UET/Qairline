package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.FlightPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface FlightPriceRepository extends JpaRepository<FlightPrice, Long> {

    @Query("SELECT fp.price FROM FlightPrice fp WHERE fp.flight.id = :flightId AND fp.seatClass.id = :seatClassId")
    Optional<BigDecimal> findPriceByFlightAndSeatClass(@Param("flightId") Long flightId,
            @Param("seatClassId") Long seatClassId);
}
