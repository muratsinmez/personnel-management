package com.example.personnel.management.controller;

import com.example.personnel.management.model.Admin;
import com.example.personnel.management.model.Employee;
import com.example.personnel.management.service.adminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class adminController {

    private adminService adminService;

    public adminController(adminService adminService) {
        this.adminService = adminService;
    }
    @GetMapping("/getAll")
    public List<Employee> getAll() {
        return adminService.findAllEmployee();
    }
    @PostMapping("/addEmployee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return adminService.addEmployee(employee);
    }

    @PutMapping("/updateEmployee/{id}")
    public Employee updateEmployee(
            @PathVariable int id,
            @RequestBody Employee updatedEmployee
    ) {
        return adminService.updateEmployee(id, updatedEmployee);
    }

    @GetMapping("/findById/{id}")
    public Optional<Employee> findById(@PathVariable int id) {
        return adminService.findEmployeeById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable long id) {
        adminService.deleteEmployee(id);
    }
    @PostMapping("/addAdmin")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }
}
