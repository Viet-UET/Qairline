package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "flight_prices")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seat_class_id", nullable = false)
    private SeatClass seatClass;

    @Column(name = "price", nullable = false, precision = 8, scale = 2)
    private BigDecimal price;
}
