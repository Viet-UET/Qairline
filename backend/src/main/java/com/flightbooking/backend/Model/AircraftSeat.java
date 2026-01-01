package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "aircraft_seats")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AircraftSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "aircraft_id", nullable = false)
    private Aircraft aircraft;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seat_class_id", nullable = false)
    private SeatClass seatClass;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
