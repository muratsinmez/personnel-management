package com.example.personnel.management.controller;

import com.example.personnel.management.dto.LoginRequest;
import com.example.personnel.management.model.Admin;
import com.example.personnel.management.model.Employee;
import com.example.personnel.management.repository.AdminRepository;
import com.example.personnel.management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<Admin> adminOpt = adminRepository.findByUsername(request.getUsername());

        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok().body(Map.of(
                        "role", "admin",
                        "username", admin.getUsername()
                ));
            } else {
                return ResponseEntity.status(401).body("Şifre hatalı");
            }
        }


        Optional<Employee> employeeOpt = employeeRepository.findByUsername(request.getUsername());

        if (employeeOpt.isPresent()) {
            Employee emp = employeeOpt.get();
            if (emp.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok().body(Map.of(
                        "role", "employee",
                        "username", emp.getUsername(),
                        "department", emp.getDepartment()
                ));
            } else {
                return ResponseEntity.status(401).body("Şifre hatalı");
            }
        }

        return ResponseEntity.status(404).body("Kullanıcı bulunamadı");
    }
}
