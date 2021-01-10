package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;

import java.sql.Date;
import java.util.ArrayList;

import java.util.List;

@Entity
@Table(name = "medical")
public class Medicals {

    @Id
    private String id;

    @Column(nullable = false)
    private Date datOfIssue;

    @Column(nullable = false)
    private Integer noOfDays;

    @Column(nullable = true)
    private String faculty;

    @Column(nullable = false)
    private String doctorName="Dr.Gavindya Fernando";

    @Column(nullable = false)
    private Boolean medicalStatus=false;

    @Column(nullable = true)
    private Integer semester;


    @Column(nullable = true)
    private Integer level;

    @Column(nullable = true)
    private String diagnosis;

    @JoinColumn(name="student_id")
    @ManyToOne(fetch=FetchType.EAGER,optional = false)
    private Student student;


    public Medicals() {
    }

    public Medicals( String id,Date datOfIssue, Integer noOfDays, String doctorName, Boolean medicalStatus, Integer semester, Integer level,String diagnosis,String faculty) {
        this.id=id;
        this.datOfIssue = datOfIssue;
        this.noOfDays = noOfDays;
        this.doctorName = doctorName;
        this.medicalStatus = medicalStatus;
        this.semester = semester;
        this.faculty=faculty;
        this.level = level;
        this.diagnosis=diagnosis;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Date getDatOfIssue() {
        return datOfIssue;
    }

    public void setDatOfIssue(Date datOfIssue) {
        this.datOfIssue = datOfIssue;
    }

    public Integer getNoOfDays() {
        return noOfDays;
    }

    public void setNoOfDays(Integer noOfDays) {
        this.noOfDays = noOfDays;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }



    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public Boolean getMedicalStatus() {
        return medicalStatus;
    }

    public void setMedicalStatus(Boolean medicalStatus) {
        this.medicalStatus = medicalStatus;
    }
}
