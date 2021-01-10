package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "tempDetails")
public class TempDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer appointmentId;

    @Column(nullable = false)
    private Integer appointToken;

    @Column(nullable = false)
    private String faculty;

    @Column(nullable = false)
    private String acedemicYear;

    @Column(nullable = false)
    private String studentId;

    public TempDetails() {
    }

    public TempDetails( Integer appointmentId, Integer appointToken, String faculty, String acedemicYear, String studentId) {
        this.appointmentId = appointmentId;
        this.appointToken = appointToken;
        this.faculty = faculty;
        this.acedemicYear = acedemicYear;
        this.studentId = studentId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Integer appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Integer getAppointToken() {
        return appointToken;
    }

    public void setAppointToken(Integer appointToken) {
        this.appointToken = appointToken;
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
