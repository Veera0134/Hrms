package com.employee.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:3000") // Update with your front-end origin
public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;

    @GetMapping
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    @PostMapping
    public Claim createClaim(@RequestBody Claim claim) {
        return claimRepository.save(claim);
    }
}

