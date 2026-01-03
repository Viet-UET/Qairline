package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.AircraftSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftSeatRepository extends JpaRepository<AircraftSeat, Long> {

    /**
     * Find all seats for a specific aircraft
     * 
     * @param aircraftId the aircraft ID
     * @return list of aircraft seats
     */
    List<AircraftSeat> findByAircraftId(Long aircraftId);

    /**
     * Delete all seats for a specific aircraft
     * 
     * @param aircraftId the aircraft ID
     */
    void deleteByAircraftId(Long aircraftId);
}
