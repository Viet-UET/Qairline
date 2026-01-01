package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.SeatClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatClassRepository extends JpaRepository<SeatClass, Long> {
}
