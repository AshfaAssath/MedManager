package com.example.demo.models;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;

import java.util.List;

@Entity
@Table(name = "stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//   @ManyToOne(fetch=FetchType.EAGER,optional = false)
//   @JoinColumn(name="drug_code",nullable = false)
//   private Drug drug;

    @Column(nullable = false)
    private String DrugCode;

//    @Column(nullable = false)
//    private String DrugCode;

    @Column(nullable = true)
    private Integer quantity;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date entryDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date   expiryDate;


    public Stock() {
    }

    public Stock(String drugCode, Integer quantity, Date entryDate, Date expiryDate) {
        DrugCode = drugCode;
        this.quantity = quantity;
        this.entryDate = entryDate;
        this.expiryDate = expiryDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDrugCode() {
        return DrugCode;
    }

    public void setDrugCode(String drugCode) {
        DrugCode = drugCode;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
