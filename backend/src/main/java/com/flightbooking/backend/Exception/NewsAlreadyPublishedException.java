package com.flightbooking.backend.Exception;

public class NewsAlreadyPublishedException extends RuntimeException {
    public NewsAlreadyPublishedException(String message) {
        super(message);
    }
}
