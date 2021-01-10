package com.example.demo.models;



import javax.persistence.*;


@Entity
@Table(name = "drugIssuing")
public class DrugIssuing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


//    @Cascade(org.hibernate.annotations.CascadeType.ALL)

    //    @JsonIgnoreProperties("drugIssuing")
    @ManyToOne(fetch=FetchType.EAGER,optional = false)
    @JoinColumn(name="drug_id")
    private Drug drug ;


    @Column(nullable = false)
    private String dosage;

    @Column(nullable = true)
    private String description;


    @Column(nullable = false)
    private Integer quantity;

    //    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    //    @JsonIgnoreProperties("drugIssuing")
    @ManyToOne(fetch=FetchType.EAGER,optional = false)
    @JoinColumn(name="prescription_id",nullable = false)
    private Prescription prescription;



    public DrugIssuing() {
    }

    public DrugIssuing( String dosage, Integer quantity,String description) {
        this.dosage = dosage;
        this.quantity = quantity;
        this.description=description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }
}

