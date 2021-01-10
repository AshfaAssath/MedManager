package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import javax.persistence.*;
//import java.time.LocalDateTime;
import java.sql.Date;

@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(nullable = true)
    private Date date;

    @Column(nullable = false)
    private String symptoms;

    @Column(nullable = true)
    private String comment;

    @Column(nullable = true)
    private String timeAllocated;

    @Column(nullable = true)
    private Boolean currentStatus=false;

    @Column(nullable = true)
    private Integer appointToken;

    @Column(nullable = true)
    private String availability;

    @Column(nullable = true)
    private Boolean isEntered=false;

    @Column(nullable = true)
    private String faculty;

    @Column(nullable = true)
    private String acedemicYear;

    @ManyToOne
    @JsonIgnoreProperties("appointments")
    private Student student;

    public Appointment(Date date, String symptoms, String comment, String timeAllocated, Boolean currentStatus, Integer appointToken, String availability, Student student,Boolean isEntered,String faculty,String acedemicYear) {
        this.date = date;
        this.symptoms = symptoms;
        this.comment = comment;
        this.timeAllocated = timeAllocated;
        this.currentStatus = currentStatus;
        this.appointToken = appointToken;
        this.availability = availability;
        this.student = student;
        this.isEntered=isEntered;
        this.acedemicYear=acedemicYear;
        this.faculty=faculty;
    }

    public Appointment() {
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTimeAllocated() {
        return timeAllocated;
    }

    public void setTimeAllocated(String timeAllocated) {
        this.timeAllocated = timeAllocated;
    }

    public Boolean getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(Boolean currentStatus) {
        this.currentStatus = currentStatus;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getAppointToken() {
        return appointToken;
    }

    public void setAppointToken(Integer appointToken) {
        this.appointToken = appointToken;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Boolean getEntered() {
        return isEntered;
    }

    public void setEntered(Boolean entered) {
        isEntered = entered;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getAcedemicYear() {
        return acedemicYear;
    }

    public void setAcedemicYear(String acedemicYear) {
        this.acedemicYear = acedemicYear;
    }
}
