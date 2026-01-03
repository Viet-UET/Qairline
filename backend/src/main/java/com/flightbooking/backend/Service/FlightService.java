package com.flightbooking.backend.Service;

import com.flightbooking.backend.DTO.AirlineDto;
import com.flightbooking.backend.DTO.AirportDto;
import com.flightbooking.backend.DTO.SeatClassDto;
import com.flightbooking.backend.Model.Airline;
import com.flightbooking.backend.Model.Airport;
import com.flightbooking.backend.Model.SeatClass;
import com.flightbooking.backend.Repository.AirlineRepository;
import com.flightbooking.backend.Repository.AirportRepository;
import com.flightbooking.backend.Repository.SeatClassRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FlightService {
    private final AirlineRepository airlineRepository;
    private final AirportRepository airportRepository;
    private final SeatClassRepository seatClassRepository;

    public List<AirportDto> getAllAirport() {
        List<Airport> airports = airportRepository.findAll();
        List<AirportDto> airportDtos = new ArrayList<>();
        for (Airport airport : airports) {
            AirportDto airportDto = new AirportDto(airport.getId() , airport.getCode(), airport.getName(), airport.getCity());
            airportDtos.add(airportDto);
        }
        return airportDtos;
    }

    public List<SeatClassDto> getAllSeatClass() {
        List<SeatClass> seatClasses = seatClassRepository.findAll();
        List<SeatClassDto> seatClassDtos = new ArrayList<>();
        for (SeatClass seatClass : seatClasses) {
            SeatClassDto seatClassDto = new SeatClassDto(seatClass.getId(), seatClass.getName());
            seatClassDtos.add(seatClassDto);
        }
        return seatClassDtos;
    }

    public List<AirlineDto> getAllAirline() {
        List<Airline> airlines = airlineRepository.findAll();
        List<AirlineDto> airlineDtos = new ArrayList<>();
        for (Airline airline : airlines) {
            AirlineDto airlineDto = new AirlineDto(airline.getId(),airline.getCode(), airline.getName());
            airlineDtos.add(airlineDto);
        }
        return airlineDtos;
    }

}
