package com.example.demo.repository;

import com.example.demo.models.ConfirmationToken;
import org.springframework.data.repository.CrudRepository;

public interface ConfirmationRepository extends CrudRepository<ConfirmationToken,String> {

    ConfirmationToken findByConfirmationToken(String confirmationToken);
}
