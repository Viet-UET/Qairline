package com.flightbooking.backend.Controller;

import com.flightbooking.backend.Model.Airline;
import com.flightbooking.backend.Model.Airport;
import com.flightbooking.backend.Model.SeatClass;
import com.flightbooking.backend.Service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    @GetMapping("/airlines")
    public ResponseEntity<List<?>> getAllAirlines() {
        return ResponseEntity.ok().body(flightService.getAllAirline());
    }

    @GetMapping("/airports")
    public ResponseEntity<List<?>> getAllAirports() {
        return ResponseEntity.ok().body(flightService.getAllAirport());
    }

    @GetMapping("/seat-classes")
    public ResponseEntity<List<?>> getAllSeatClasses() {
        return ResponseEntity.ok().body(flightService.getAllSeatClass());
    }
}
