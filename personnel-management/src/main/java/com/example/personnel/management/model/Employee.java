package com.example.personnel.management.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    @NotBlank(message = "Name cannot be left blank")
    private String name;
    @Column(nullable = false)
    @NotBlank(message = "Surname cannot be left blank")
    private String surname;
    @Column(nullable = false , unique = true)
    @Size(min = 10, max = 11, message = "The phone number is not correct")
    private String phone;
    @Column(nullable = false , unique = true)
    @Email(message = "E-mail cannot be left blank")
    private String email;
    @Column(nullable = false)
    private String adress;
    @Column(nullable = false , unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    @NotNull(message = "The salary is cannot be null")
    private int salary;
    @Column(nullable = false)
    @PositiveOrZero(message = "This value cannot be negative")
    private int employee_point;
    @Column(nullable = false)
    private String department;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate employment_Date;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getEmploymentDate() {
        return employment_Date;
    }

    public void setEmploymentDate(LocalDate employmentDate) {
        this.employment_Date = employmentDate;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getEmployee_point() {
        return employee_point;
    }

    public void setEmployee_point(int employee_point) {
        this.employee_point = employee_point;
    }
}
