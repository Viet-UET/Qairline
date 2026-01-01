package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "aircrafts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;

    @Column(name = "model", nullable = false)
    private Long model;

    @Column(name = "registration_code", nullable = false, length = 255)
    private String registrationCode;

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "aircraft", fetch = FetchType.LAZY)
    private List<AircraftSeat> aircraftSeats = new ArrayList<>();

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "aircraft", fetch = FetchType.LAZY)
    private List<FlightInstance> flightInstances = new ArrayList<>();
}
