package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "booking_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "flight_instance_id", nullable = false)
    private FlightInstance flightInstance;

    @ToString.Exclude @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seat_class_id", nullable = false)
    private SeatClass seatClass;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "bookingDetail", fetch = FetchType.LAZY)
    private List<Ticket> tickets = new ArrayList<>();
}
