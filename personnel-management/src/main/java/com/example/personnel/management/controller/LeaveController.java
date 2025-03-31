package com.example.personnel.management.controller;

import com.example.personnel.management.model.LeaveRequest;
import com.example.personnel.management.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    @Autowired
    private LeaveRequestRepository leaveRepo;

    @PostMapping("/create")
    public LeaveRequest createLeave(@RequestBody LeaveRequest leave) {
        leave.setStatus("pending");
        return leaveRepo.save(leave);
    }

    @GetMapping("/{username}")
    public List<LeaveRequest> getUserLeaves(@PathVariable String username) {
        return leaveRepo.findByUsername(username);
    }

    @GetMapping("/all")
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepo.findAll();
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveLeave(@PathVariable Long id) {
        LeaveRequest leave = leaveRepo.findById(id).orElseThrow();
        leave.setStatus("approved");
        return ResponseEntity.ok(leaveRepo.save(leave));
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectLeave(@PathVariable Long id) {
        LeaveRequest leave = leaveRepo.findById(id).orElseThrow();
        leave.setStatus("rejected");
        return ResponseEntity.ok(leaveRepo.save(leave));
    }
}
