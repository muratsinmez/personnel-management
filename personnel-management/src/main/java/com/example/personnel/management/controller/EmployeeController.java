package com.example.personnel.management.controller;


import com.example.personnel.management.model.Employee;
import com.example.personnel.management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @GetMapping("/findById{id}")
    public String findById(@PathVariable long id) {
        employeeRepository.findById(id);
        return "Infomation for employee id : " + id;
    }

    @GetMapping("/me")
    public ResponseEntity<Employee> getMyInfo(@RequestParam String username) {
        Optional<Employee> employeeOpt = employeeRepository.findByUsername(username);
        if (employeeOpt.isPresent()) {
            return ResponseEntity.ok(employeeOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
