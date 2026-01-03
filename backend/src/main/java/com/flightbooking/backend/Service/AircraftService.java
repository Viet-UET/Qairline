package com.flightbooking.backend.Service;

import com.flightbooking.backend.DTO.AircraftDTO.*;
import com.flightbooking.backend.Model.Aircraft;
import com.flightbooking.backend.Model.AircraftSeat;
import com.flightbooking.backend.Model.Airline;
import com.flightbooking.backend.Model.SeatClass;
import com.flightbooking.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AircraftService {

    private final AircraftRepository aircraftRepository;
    private final AircraftSeatRepository aircraftSeatRepository;
    private final AirlineRepository airlineRepository;
    private final SeatClassRepository seatClassRepository;
    private final FlightInstanceRepository flightInstanceRepository;

    /**
     * Get all aircrafts with pagination and optional airline filter
     */
    @Transactional(readOnly = true)
    public Page<AircraftListItemDTO> getAllAircrafts(Long airlineId, Pageable pageable) {
        Page<Aircraft> aircrafts;

        if (airlineId != null) {
            aircrafts = aircraftRepository.findByAirlineId(airlineId, pageable);
        } else {
            aircrafts = aircraftRepository.findAll(pageable);
        }

        return aircrafts.map(this::convertToListItemDTO);
    }

    /**
     * Get aircraft detail by ID with full seat configuration
     */
    @Transactional(readOnly = true)
    public AircraftResponseDTO getAircraftById(Long id) {
        Aircraft aircraft = aircraftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aircraft not found with id: " + id));

        return convertToResponseDTO(aircraft);
    }

    /**
     * Create new aircraft with seat configuration
     */
    @Transactional
    public AircraftResponseDTO createAircraft(CreateAircraftRequestDTO request) {
        // Validate airline exists
        Airline airline = airlineRepository.findById(request.getAirlineId())
                .orElseThrow(() -> new RuntimeException("Airline not found with id: " + request.getAirlineId()));

        // Validate all seat classes exist
        for (AircraftSeatConfigDTO seatConfig : request.getSeatConfigs()) {
            if (!seatClassRepository.existsById(seatConfig.getSeatClassId())) {
                throw new RuntimeException("Seat class not found with id: " + seatConfig.getSeatClassId());
            }
        }

        // Create aircraft
        Aircraft aircraft = Aircraft.builder()
                .airline(airline)
                .model(request.getModel())
                .registrationCode(request.getRegistrationCode())
                .build();

        aircraft = aircraftRepository.save(aircraft);

        // Create aircraft seats
        List<AircraftSeat> aircraftSeats = new ArrayList<>();
        for (AircraftSeatConfigDTO seatConfig : request.getSeatConfigs()) {
            SeatClass seatClass = seatClassRepository.findById(seatConfig.getSeatClassId()).get();

            AircraftSeat aircraftSeat = AircraftSeat.builder()
                    .aircraft(aircraft)
                    .seatClass(seatClass)
                    .quantity(seatConfig.getQuantity())
                    .build();

            aircraftSeats.add(aircraftSeat);
        }

        aircraftSeatRepository.saveAll(aircraftSeats);
        aircraft.setAircraftSeats(aircraftSeats);

        return convertToResponseDTO(aircraft);
    }

    /**
     * Update aircraft and its seat configuration
     */
    @Transactional
    public AircraftResponseDTO updateAircraft(Long id, UpdateAircraftRequestDTO request) {
        // Validate aircraft exists
        Aircraft aircraft = aircraftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aircraft not found with id: " + id));

        // Validate airline exists
        Airline airline = airlineRepository.findById(request.getAirlineId())
                .orElseThrow(() -> new RuntimeException("Airline not found with id: " + request.getAirlineId()));

        // Validate all seat classes exist
        for (AircraftSeatConfigDTO seatConfig : request.getSeatConfigs()) {
            if (!seatClassRepository.existsById(seatConfig.getSeatClassId())) {
                throw new RuntimeException("Seat class not found with id: " + seatConfig.getSeatClassId());
            }
        }

        // Update aircraft basic info
        aircraft.setAirline(airline);
        aircraft.setModel(request.getModel());
        aircraft.setRegistrationCode(request.getRegistrationCode());

        aircraft = aircraftRepository.save(aircraft);

        // Delete existing seats
        aircraftSeatRepository.deleteByAircraftId(id);

        // Create new seats
        List<AircraftSeat> aircraftSeats = new ArrayList<>();
        for (AircraftSeatConfigDTO seatConfig : request.getSeatConfigs()) {
            SeatClass seatClass = seatClassRepository.findById(seatConfig.getSeatClassId()).get();

            AircraftSeat aircraftSeat = AircraftSeat.builder()
                    .aircraft(aircraft)
                    .seatClass(seatClass)
                    .quantity(seatConfig.getQuantity())
                    .build();

            aircraftSeats.add(aircraftSeat);
        }

        aircraftSeatRepository.saveAll(aircraftSeats);
        aircraft.setAircraftSeats(aircraftSeats);

        return convertToResponseDTO(aircraft);
    }

    /**
     * Delete aircraft if not assigned to any flight instance
     */
    @Transactional
    public void deleteAircraft(Long id) {
        // Validate aircraft exists
        if (!aircraftRepository.existsById(id)) {
            throw new RuntimeException("Aircraft not found with id: " + id);
        }

        // Check if aircraft is assigned to any flight instance
        boolean isAssignedToFlight = flightInstanceRepository.existsByAircraftId(id);
        if (isAssignedToFlight) {
            throw new RuntimeException("Cannot delete aircraft as it is assigned to flight instances");
        }

        // Delete aircraft seats first (will be done automatically due to cascade)
        aircraftSeatRepository.deleteByAircraftId(id);

        // Delete aircraft
        aircraftRepository.deleteById(id);
    }

    /**
     * Convert Aircraft entity to AircraftListItemDTO
     */
    private AircraftListItemDTO convertToListItemDTO(Aircraft aircraft) {
        int totalSeats = aircraft.getAircraftSeats().stream()
                .mapToInt(AircraftSeat::getQuantity)
                .sum();

        return AircraftListItemDTO.builder()
                .id(aircraft.getId())
                .airlineId(aircraft.getAirline().getId())
                .airlineName(aircraft.getAirline().getName())
                .airlineCode(aircraft.getAirline().getCode())
                .model(aircraft.getModel())
                .registrationCode(aircraft.getRegistrationCode())
                .totalSeats(totalSeats)
                .build();
    }

    /**
     * Convert Aircraft entity to AircraftResponseDTO
     */
    private AircraftResponseDTO convertToResponseDTO(Aircraft aircraft) {
        List<AircraftSeatResponseDTO> seatDTOs = aircraft.getAircraftSeats().stream()
                .map(seat -> AircraftSeatResponseDTO.builder()
                        .id(seat.getId())
                        .seatClassId(seat.getSeatClass().getId())
                        .seatClassName(seat.getSeatClass().getName())
                        .quantity(seat.getQuantity())
                        .build())
                .collect(Collectors.toList());

        return AircraftResponseDTO.builder()
                .id(aircraft.getId())
                .airlineId(aircraft.getAirline().getId())
                .airlineName(aircraft.getAirline().getName())
                .airlineCode(aircraft.getAirline().getCode())
                .model(aircraft.getModel())
                .registrationCode(aircraft.getRegistrationCode())
                .seats(seatDTOs)
                .build();
    }
}
