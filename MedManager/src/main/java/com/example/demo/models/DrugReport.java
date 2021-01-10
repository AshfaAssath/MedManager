package com.example.demo.models;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;


@Entity
@Table(name = "DrugReport")
public class DrugReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Date date;

    @OneToMany()
    private Set<OrderRecord> orderRecord;



    public DrugReport() {
    }

    public DrugReport(Date date, OrderRecord orderRecord) {
        this.date = date;
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

    public Set<OrderRecord> getOrderRecord() {
        return orderRecord;
    }

    public void setOrderRecord(Set<OrderRecord> orderRecord) {
        this.orderRecord = orderRecord;
    }
}
