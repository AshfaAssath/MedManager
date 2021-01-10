package com.example.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "availableTimeSlots")
public class AvailableTimeSlots {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private Boolean isBooked=false;

    @Column(nullable = true)
    private String timeAllocated;

    public AvailableTimeSlots() {
    }

    public AvailableTimeSlots(Integer id, String code, Boolean isBooked, String timeAllocated) {
        this.id = id;
        this.code = code;
        this.isBooked = isBooked;
        this.timeAllocated = timeAllocated;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean getBooked() {
        return isBooked;
    }

    public void setBooked(Boolean booked) {
        isBooked = booked;
    }

    public String getTimeAllocated() {
        return timeAllocated;
    }

    public void setTimeAllocated(String timeAllocated) {
        this.timeAllocated = timeAllocated;
    }
}
