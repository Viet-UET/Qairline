package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
}
