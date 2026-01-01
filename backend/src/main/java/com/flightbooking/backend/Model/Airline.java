package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "airlines")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", nullable = false, length = 255, unique = true)
    private String code;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
    private List<Flight> flights = new ArrayList<>();

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
    private List<Aircraft> aircrafts = new ArrayList<>();
}
