package com.vladcranga.currencyconverter.controller;

import com.vladcranga.currencyconverter.model.Expense;
import com.vladcranga.currencyconverter.repository.ExpenseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

/**
 * REST controller for managing expenses.
 */

@RestController
@RequestMapping("/api/v1/expenses")
@CrossOrigin(
    origins = "http://localhost:3000",
    methods = {
        org.springframework.web.bind.annotation.RequestMethod.GET,
        org.springframework.web.bind.annotation.RequestMethod.POST,
        org.springframework.web.bind.annotation.RequestMethod.PUT,
        org.springframework.web.bind.annotation.RequestMethod.DELETE,
        org.springframework.web.bind.annotation.RequestMethod.OPTIONS
    },
    allowedHeaders = "*"
)
public class ExpenseController {
    private final ExpenseRepository expenseRepository;

    public ExpenseController(@NonNull ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @PostMapping
    public ResponseEntity<?> addExpense(@RequestBody @NonNull Expense expense) {
        try {
            if (expense.getDate() == null) {
                expense.setDate(LocalDate.now());
            }
            
            expense.setConvertedAmount(expense.getAmount());
            Expense savedExpense = expenseRepository.save(expense);
            return ResponseEntity.ok(savedExpense);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error processing request: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUser(@PathVariable @NonNull Long userId) {
        List<Expense> expenses = expenseRepository.findByUserId(userId);
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable @NonNull Long id) {
        try {
            expenseRepository.deleteById(id);
            return ResponseEntity.ok("Expense removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error removing expense: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(
            @PathVariable @NonNull Long id, 
            @RequestBody @NonNull Expense updatedExpense) {
        try {
            Expense expense = expenseRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Expense not found"));
            
            expense.setDescription(updatedExpense.getDescription());
            expense.setCategory(updatedExpense.getCategory());
            expense.setAmount(updatedExpense.getAmount());
            expense.setDate(updatedExpense.getDate());
            // Update converted amount
            expense.setConvertedAmount(updatedExpense.getAmount());
            
            expenseRepository.save(expense);
            return ResponseEntity.ok("Expense updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating expense: " + e.getMessage());
        }
    }
}
