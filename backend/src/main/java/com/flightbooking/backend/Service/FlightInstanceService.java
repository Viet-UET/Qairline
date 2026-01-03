package com.flightbooking.backend.Service;

import com.flightbooking.backend.DTO.FlightInstanceDetailResponse;
import com.flightbooking.backend.DTO.FlightSearchRequest;
import com.flightbooking.backend.DTO.FlightSearchResponse;
import com.flightbooking.backend.DTO.SeatAvailabilityDTO;
import com.flightbooking.backend.DTO.SeatClassPriceDTO;
import com.flightbooking.backend.Model.AircraftSeat;
import com.flightbooking.backend.Model.FlightInstance;
import com.flightbooking.backend.Model.FlightPrice;
import com.flightbooking.backend.Repository.FlightInstanceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class FlightInstanceService {

    private final FlightInstanceRepository flightInstanceRepository;

    public Page<FlightSearchResponse> searchFilter(FlightSearchRequest flightSearchRequest, int page, int size) {
        Page<FlightInstance> instancePage = flightInstanceRepository.searchFlights(
                flightSearchRequest.getCityOrigin(),
                flightSearchRequest.getCityDestination(),
                flightSearchRequest.getDepartureDate(),
                flightSearchRequest.getAirlineName(),
                PageRequest.of(page, size));

        return instancePage.map(instance -> {
            List<SeatClassPriceDTO> seatClassPriceDTOS = new ArrayList<>();
            for (FlightPrice flightPrice : instance.getFlight().getFlightPrices()) {
                SeatClassPriceDTO seatClassPriceDTO = new SeatClassPriceDTO(
                        flightPrice.getSeatClass().getName(),
                        flightPrice.getPrice());
                seatClassPriceDTOS.add(seatClassPriceDTO);
            }

            return new FlightSearchResponse(
                    instance.getId(),
                    instance.getFlight().getFlightNumber(),
                    instance.getFlight().getAirline().getName(),
                    instance.getFlight().getOriginAirport().getCode(),
                    instance.getFlight().getOriginAirport().getCity(),
                    instance.getFlight().getDestinationAirport().getCode(),
                    instance.getFlight().getDestinationAirport().getCity(),
                    instance.getDepartureTime(),
                    seatClassPriceDTOS);
        });
    }

    public FlightInstanceDetailResponse getFlightInstanceDetail(Long id) {
        FlightInstance instance = flightInstanceRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new IllegalArgumentException("Flight instance not found with id: " + id));

        Map<Long, Integer> bookedSeatsMap = new HashMap<>();
        List<Object[]> bookedSeats = flightInstanceRepository.countBookedSeatsByFlightInstance(id);
        for (Object[] row : bookedSeats) {
            Long seatClassId = (Long) row[0];
            Integer bookedCount = ((Number) row[1]).intValue();
            bookedSeatsMap.put(seatClassId, bookedCount);
        }

        Map<Long, Integer> totalSeatsMap = new HashMap<>();
        for (AircraftSeat aircraftSeat : instance.getAircraft().getAircraftSeats()) {
            totalSeatsMap.put(aircraftSeat.getSeatClass().getId(), aircraftSeat.getQuantity());
        }

        List<SeatAvailabilityDTO> seatAvailability = instance.getFlight().getFlightPrices()
                .stream()
                .map(fp -> {
                    Long seatClassId = fp.getSeatClass().getId();
                    Integer totalSeats = totalSeatsMap.getOrDefault(seatClassId, 0);
                    Integer booked = bookedSeatsMap.getOrDefault(seatClassId, 0);
                    Integer available = totalSeats - booked;

                    return SeatAvailabilityDTO.builder()
                            .seatClassName(fp.getSeatClass().getName())
                            .price(fp.getPrice())
                            .totalSeats(totalSeats)
                            .bookedSeats(booked)
                            .availableSeats(Math.max(available, 0))
                            .build();
                })
                .collect(Collectors.toList());

        return FlightInstanceDetailResponse.builder()
                .id(instance.getId())
                .departureTime(instance.getDepartureTime())
                .arrivalTime(instance.getArrivalTime())
                .flightNumber(instance.getFlight().getFlightNumber())
                .airlineName(instance.getFlight().getAirline().getName())
                .originAirportCode(instance.getFlight().getOriginAirport().getCode())
                .originAirportName(instance.getFlight().getOriginAirport().getName())
                .originCity(instance.getFlight().getOriginAirport().getCity())
                .destinationAirportCode(instance.getFlight().getDestinationAirport().getCode())
                .destinationAirportName(instance.getFlight().getDestinationAirport().getName())
                .destinationCity(instance.getFlight().getDestinationAirport().getCity())
                .aircraftModel(instance.getAircraft().getModel())
                .aircraftRegistrationCode(instance.getAircraft().getRegistrationCode())
                .seatAvailability(seatAvailability)
                .build();
    }
}
