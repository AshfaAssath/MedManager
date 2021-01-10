package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "OrderRecord")
public class OrderRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @Column(nullable = false)
//    private Date date;

    @Column(nullable = false)
    private String drugCode;

    @Column(nullable = false)
    private String drugName;

    @Column(nullable =false)
    private Integer orderQuantity;

    @JoinColumn(name = "DrugReport_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private DrugReport drugReport;


    public OrderRecord() {
    }

    public OrderRecord(String drugCode, String drugName, Integer orderQuantity, DrugReport drugReport) {
        this.drugCode = drugCode;
        this.drugName = drugName;
        this.orderQuantity = orderQuantity;
        this.drugReport = drugReport;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDrugCode() {
        return drugCode;
    }

    public void setDrugCode(String drugCode) {
        this.drugCode = drugCode;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public Integer getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(Integer orderQuantity) {
        this.orderQuantity = orderQuantity;
    }

    public DrugReport getDrugReport() {
        return drugReport;
    }

    public void setDrugReport(DrugReport drugReport) {
        this.drugReport = drugReport;
    }
}
