package com.example.demo.repository;

import com.example.demo.models.AvailableTimeSlots;
import com.example.demo.models.Student;
import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvailableTimeSlotsRepository extends JpaRepository<AvailableTimeSlots,Integer> {

    Optional<AvailableTimeSlots> findByTimeAllocated(String timeAllocated);
}

