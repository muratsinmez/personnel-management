package com.example.personnel.management.service;

import com.example.personnel.management.model.Admin;
import com.example.personnel.management.model.Employee;
import com.example.personnel.management.repository.AdminRepository;
import com.example.personnel.management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class adminService {

    private final EmployeeRepository employeeRepository;
    private AdminRepository adminRepository;

    @Autowired
    public adminService(AdminRepository adminRepository, EmployeeRepository employeeRepository) {
        this.adminRepository = adminRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> findAllEmployee() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> findEmployeeById(long id) {
        return employeeRepository.findById(id);
    }

    public void deleteEmployee(long id) {
        employeeRepository.deleteById(id);
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(int id, Employee updatedEmployee) {
        Employee existing = employeeRepository.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Personel bulunamadı: " + id));

        existing.setName(updatedEmployee.getName());
        existing.setSurname(updatedEmployee.getSurname());
        existing.setPhone(updatedEmployee.getPhone());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setAdress(updatedEmployee.getAdress());
        existing.setUsername(updatedEmployee.getUsername());
        existing.setPassword(updatedEmployee.getPassword());
        existing.setEmploymentDate(updatedEmployee.getEmploymentDate());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setEmployee_point(updatedEmployee.getEmployee_point());

        return employeeRepository.save(existing);
    }

}
