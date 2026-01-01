package com.flightbooking.backend.Model;


import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "airports")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", nullable = false, length = 255, unique = true)
    private String code;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "city", nullable = false, length = 255)
    private String city;

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "originAirport", fetch = FetchType.LAZY)
    private List<Flight> originFlights = new ArrayList<>();

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "destinationAirport", fetch = FetchType.LAZY)
    private List<Flight> destinationFlights = new ArrayList<>();
}
