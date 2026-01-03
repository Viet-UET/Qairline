package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.FlightInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FlightInstanceRepository extends JpaRepository<FlightInstance, Long> {
        @Query("select distinct fi from FlightInstance fi " +
                        "join fetch fi.flight f " +
                        "join fetch f.originAirport " +
                        "join fetch f.destinationAirport " +
                        "join fetch f.airline " +
                        "join fetch f.flightPrices fp " +
                        "join fetch fp.seatClass " +
                        "where (:cityOrigin is null or f.originAirport.city = :cityOrigin) " +
                        "and (:cityDestination is null or f.destinationAirport.city = :cityDestination) " +
                        "and (cast(:departureTime as date) is null or cast(fi.departureTime as date) = :departureTime) "
                        +
                        "and (:airlineName is null or f.airline.name = :airlineName)")
        Page<FlightInstance> searchFlights(
                        @Param("cityOrigin") String cityOrigin,
                        @Param("cityDestination") String cityDestination,
                        @Param("departureTime") LocalDate departureDate,
                        @Param("airlineName") String airlineName,
                        Pageable pageable);

        @Query("SELECT DISTINCT fi FROM FlightInstance fi " +
                        "JOIN FETCH fi.flight f " +
                        "JOIN FETCH f.originAirport " +
                        "JOIN FETCH f.destinationAirport " +
                        "JOIN FETCH f.airline " +
                        "JOIN FETCH fi.aircraft a " +
                        "LEFT JOIN FETCH a.aircraftSeats acs " +
                        "LEFT JOIN FETCH acs.seatClass " +
                        "LEFT JOIN FETCH f.flightPrices fp " +
                        "LEFT JOIN FETCH fp.seatClass " +
                        "WHERE fi.id = :id")
        Optional<FlightInstance> findByIdWithDetails(@Param("id") Long id);

        @Query("SELECT bd.seatClass.id, SUM(bd.quantity) " +
                        "FROM BookingDetail bd " +
                        "WHERE bd.flightInstance.id = :flightInstanceId " +
                        "GROUP BY bd.seatClass.id")
        List<Object[]> countBookedSeatsByFlightInstance(@Param("flightInstanceId") Long flightInstanceId);

        /**
         * Check if an aircraft is assigned to any flight instance
         * 
         * @param aircraftId the aircraft ID
         * @return true if aircraft is assigned to any flight, false otherwise
         */
        boolean existsByAircraftId(Long aircraftId);
}
