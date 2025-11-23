package com.vladcranga.currencyconverter.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vladcranga.currencyconverter.model.Expense;
import com.vladcranga.currencyconverter.repository.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ExpenseController.class)
public class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ExpenseRepository expenseRepository;

    @Test
    @WithMockUser
    public void whenGetExpenses_thenReturnExpensesList() throws Exception {
        Expense expense = new Expense();
        expense.setId(1L);
        expense.setUserId(1L);
        expense.setAmount(new BigDecimal("100.00"));
        expense.setCurrency("USD");
        expense.setCategory("Food");
        expense.setDate(LocalDate.now());
        expense.setConvertedAmount(new BigDecimal("100.00"));

        when(expenseRepository.findByUserId(1L)).thenReturn(Arrays.asList(expense));

        mockMvc.perform(get("/api/v1/expenses/1")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].userId").value(1))
                .andExpect(jsonPath("$[0].amount").value(100.00))
                .andExpect(jsonPath("$[0].currency").value("USD"))
                .andExpect(jsonPath("$[0].category").value("Food"));
    }

    @Test
    @WithMockUser
    public void whenAddExpense_thenReturnSuccess() throws Exception {
        Expense expense = new Expense();
        expense.setUserId(1L);
        expense.setAmount(new BigDecimal("50.00"));
        expense.setCurrency("EUR");
        expense.setCategory("Transport");
        expense.setDate(LocalDate.now());

        when(expenseRepository.save(any(Expense.class))).thenReturn(expense);

        mockMvc.perform(post("/api/v1/expenses")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(expense)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.amount").value(50.00))
                .andExpect(jsonPath("$.currency").value("EUR"))
                .andExpect(jsonPath("$.category").value("Transport"));
    }

    @Test
    @WithMockUser
    public void whenDeleteExpense_thenReturnSuccess() throws Exception {
        doNothing().when(expenseRepository).deleteById(1L);

        mockMvc.perform(delete("/api/v1/expenses/1")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Expense removed successfully"));
    }

    @Test
    @WithMockUser
    public void whenUpdateExpense_thenReturnSuccess() throws Exception {
        Expense existingExpense = new Expense();
        existingExpense.setId(1L);
        existingExpense.setUserId(1L);
        existingExpense.setAmount(new BigDecimal("100.00"));
        existingExpense.setCurrency("USD");
        existingExpense.setCategory("Food");
        existingExpense.setDate(LocalDate.now());

        Expense updatedExpense = new Expense();
        updatedExpense.setAmount(new BigDecimal("150.00"));
        updatedExpense.setCategory("Groceries");
        updatedExpense.setDate(LocalDate.now());

        when(expenseRepository.findById(1L)).thenReturn(Optional.of(existingExpense));
        when(expenseRepository.save(any(Expense.class))).thenReturn(existingExpense);

        mockMvc.perform(put("/api/v1/expenses/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedExpense)))
                .andExpect(status().isOk())
                .andExpect(content().string("Expense updated successfully"));
    }

    @Test
    @WithMockUser
    public void whenUpdateNonExistentExpense_thenReturnError() throws Exception {
        Expense updatedExpense = new Expense();
        updatedExpense.setAmount(new BigDecimal("150.00"));
        updatedExpense.setCategory("Groceries");

        when(expenseRepository.findById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/v1/expenses/999")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedExpense)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error updating expense: Expense not found"));
    }
}
