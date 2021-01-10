package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = true)
    private String subjectName;

    @Column(nullable = true)
    private String subjectCode;

    @ManyToOne(fetch=FetchType.EAGER,optional = false)
    @JoinColumn(name="medical_id",nullable = false)
    private Medicals medicals;

    public Subject() {
    }

    public Subject(String subjectName, String subjectCode) {
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public Medicals getMedicals() {
        return medicals;
    }

    public void setMedicals(Medicals medicals) {
        this.medicals = medicals;
    }
}
