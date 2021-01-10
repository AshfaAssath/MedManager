package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name="authentication")
public class Authentication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private Student student; //student user Id

    @Column(nullable = false)
    private String password;


    public Authentication() {
    }

    public Authentication(Integer id, String password) {
        this.id = id;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Student getUserName() {
        return student;
    }

    public void setUserName(Student student) {
        this.student = student;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
