package com.example.personnel.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.util.*;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private long id;

    @Column(nullable = false)
    @NotBlank(message = "Name cannot be left blank")
    private String name;
    @Column(nullable = false)
    @NotBlank(message = "Surname cannot be left blank")
    private String surname;
    @Column(nullable = false)
    @Past(message = "The birthday is must b in the past")
    private Date birthday;
    @Column(nullable = false , unique = true)
    private Long id_no;
    @Column(nullable = false , unique = true)
    @Email(message = "E-mail cannot be left blank")
    private String email;
    @Column(nullable = false , unique = true)
    @Size(min = 10, max = 11, message = "The phone number is not correct")
    private String phone;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false , unique = true)
    private String username;
    @Column(nullable = false)
    private String password;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
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
    public Date getBirthday() {
        return birthday;
    }
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
    public Long getId_no() {
        return id_no;
    }
    public void setId_no(Long id_no) {
        this.id_no = id_no;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
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
}
