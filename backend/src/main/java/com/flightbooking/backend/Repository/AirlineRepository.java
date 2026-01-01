package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirlineRepository extends JpaRepository<Airline, Long> {

}
