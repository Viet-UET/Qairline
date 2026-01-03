package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.Aircraft;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Long> {

    /**
     * Find aircrafts by airline ID with pagination
     * 
     * @param airlineId the airline ID to filter by
     * @param pageable  pagination information
     * @return paginated list of aircrafts
     */
    Page<Aircraft> findByAirlineId(Long airlineId, Pageable pageable);
}
