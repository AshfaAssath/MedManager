package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import javax.swing.*;
//import java.util.Date;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "prescription")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date issuedDate;

    @Column(nullable = false)
    private String diagnosis;

    @Column(nullable = false)
    private String treatment;

    @Column(nullable = true)
    private Boolean presStatus;

    //    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name="student_id")
    @ManyToOne(fetch=FetchType.EAGER,optional = false)
    private Student student;

    public Prescription() {
    }

    public Prescription(Date issuedDate, String diagnosis, String treatment,Boolean presStatus) {
        this.issuedDate = issuedDate;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.presStatus=presStatus;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(Date issuedDate) {
        this.issuedDate = issuedDate;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment ;
    }

//    public List<DrugIssuing> getDrugIssuingId() {
//        return drugIssuing;
//    }
//
//    public void setDrugIssuingId(List<DrugIssuing> drugIssuing) {
//        this.drugIssuing = drugIssuing;
//    }

//    public User getDoctor() {
//        return doctor;
//    }
//
//    public void setDoctor(User doctor) {
//        this.doctor = doctor;
//    }


    public Boolean getPresStatus() {
        return presStatus;
    }

    public void setPresStatus(Boolean presStatus) {
        this.presStatus = presStatus;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }


}
