package com.flightbooking.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "booking_code", nullable = false, length = 255)
    private String bookingCode;

    @Column(name = "customer_name", nullable = false, length = 255)
    private String customerName;

    @Column(name = "contact_phone", nullable = false, length = 255)
    private String contactPhone;

    @Column(name = "total_amount", nullable = false, precision = 8, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "status", nullable = false, length = 255)
    private String status;

    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
    private List<BookingDetail> bookingDetails = new ArrayList<>();
}
