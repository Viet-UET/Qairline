package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "seat_classes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "seatClass", fetch = FetchType.LAZY)
    private List<AircraftSeat> aircraftSeats = new ArrayList<>();

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "seatClass", fetch = FetchType.LAZY)
    private List<FlightPrice> flightPrices = new ArrayList<>();

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "seatClass", fetch = FetchType.LAZY)
    private List<BookingDetail> bookingDetails = new ArrayList<>();
}
