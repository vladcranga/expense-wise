package com.vladcranga.currencyconverter.controller;

import com.vladcranga.currencyconverter.model.Expense;
import com.vladcranga.currencyconverter.repository.ExpenseRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @PostMapping
    public ResponseEntity<String> addExpense(@RequestBody Expense expense) {
        try {
            System.out.println("Received date: " + expense.getDate());
            if (expense.getDate() == null) {
                expense.setDate(LocalDate.now());
            }
            expense.setConvertedAmount(expense.getAmount());
            expenseRepository.save(expense);
            return ResponseEntity.ok("Expense added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(
                HttpStatus.BAD_REQUEST).body("Error processing request: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUser(@PathVariable Long userId) {
        List<Expense> expenses = expenseRepository.findByUserId(userId);
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        try {
            expenseRepository.deleteById(id);
            return ResponseEntity.ok("Expense removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(
                HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing expense: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        try {
            Expense expense = expenseRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Expense not found"));
            
            expense.setDescription(updatedExpense.getDescription());
            expense.setCategory(updatedExpense.getCategory());
            expense.setAmount(updatedExpense.getAmount());
            expense.setDate(updatedExpense.getDate());
            expense.setConvertedAmount(updatedExpense.getAmount()); // Update converted amount
            
            expenseRepository.save(expense);
            return ResponseEntity.ok("Expense updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating expense: " + e.getMessage());
        }
    }
}
