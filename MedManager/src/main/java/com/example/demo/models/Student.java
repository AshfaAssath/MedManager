package com.example.demo.models;

import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student")
public class Student {

    @Id
    private String id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private Integer age;

    @Column(nullable = false)
    private String faculty;

    @Column(nullable = false)
    private String acedemicYear;

    @Column(nullable = true)
    private String gender;

    @Column(nullable = true)
    private String  email;

    @Column(nullable = true)
    private String address;

    @Column(nullable = true)
    private String contactNumber;

    @Column(nullable = true)
    private String stayingPlace;

    @Column(nullable = true)
    private Integer height;

    @Column(nullable = true)
    private Integer weight;

    @Column(nullable = true)
    private String chronicDisease;

    @Column(nullable = true)
    private String bloodGroup;

    @Column(nullable = true)
    private String foodAllergies="No";

    @Column(nullable = true)
    private String medicineAllergies="No";

    @Column(nullable = true)
    private Boolean activeStatus=false;

    @Lob
    @Column(nullable = true)
    private byte[] profilePicUrl;

//    @OneToMany(mappedBy = "student")
//    private List<Prescription> prescription;
//
//    @OneToMany(mappedBy ="student" )
//    private List<Appointment> appointments;

    public Student() {
    }


    public Student(String id, String firstName, String lastName, String password, String faculty, String acedemicYear, String gender, String email, String contactNumber,Boolean activeStatus) {
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.password=password;
    this.faculty=faculty;
    this.acedemicYear=acedemicYear;
    this.gender=gender;
    this.email=email;
    this.contactNumber=contactNumber;
    this.activeStatus=activeStatus;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }



    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getStayingPlace() {
        return stayingPlace;
    }

    public void setStayingPlace(String stayingPlace) {
        this.stayingPlace = stayingPlace;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getChronicDisease() {
        return chronicDisease;
    }

    public void setChronicDisease(String chronicDisease) {
        this.chronicDisease = chronicDisease;
    }

    public String getFoodAllergies() {
        return foodAllergies;
    }

    public void setFoodAllergies(String foodAllergies) {
        this.foodAllergies = foodAllergies;
    }

    public String getMedicineAllergies() {
        return medicineAllergies;
    }

    public String getAcedemicYear() {
        return acedemicYear;
    }

    public void setAcedemicYear(String acedemicYear) {
        this.acedemicYear = acedemicYear;
    }

    public void setMedicineAllergies(String medicineAllergies) {
        this.medicineAllergies = medicineAllergies;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public byte[] getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(byte[] profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    public Boolean getActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(Boolean activeStatus) {
        this.activeStatus = activeStatus;
    }
}
