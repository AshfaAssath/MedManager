package com.example.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "drug")
public class Drug {

    @Id
    private String drugCode;

    @Column(nullable = false)
    private String drugName;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Integer lowQuantity;

    @Column(nullable = false)
    private  Integer orderQuantity;

    public Drug() {
    }

    public Drug(String drugCode, String drugName, String category, Integer lowQuantity, Integer orderQuantity) {
        this.drugCode = drugCode;
        this.drugName = drugName;
        this.category = category;
        this.lowQuantity = lowQuantity;
        this.orderQuantity = orderQuantity;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getLowQuantity() {
        return lowQuantity;
    }

    public void setLowQuantity(Integer lowQuantity) {
        this.lowQuantity = lowQuantity;
    }

    public Integer getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(Integer orderQuantity) {
        this.orderQuantity = orderQuantity;
    }
}
