package com.vladcranga.currencyconverter.model;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class ExpenseTest {

    @Test
    public void testExpenseCreation() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");

        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(new BigDecimal("100.00"));
        expense.setCurrency("USD");
        expense.setCategory("Food");
        expense.setDescription("Grocery shopping");
        expense.setDate(LocalDate.now());
        expense.setUserId(1L);;

        assertEquals(1L, expense.getId());
        assertEquals(0, new BigDecimal("100.00").compareTo(expense.getAmount()));
        assertEquals("USD", expense.getCurrency());
        assertEquals("Food", expense.getCategory());
        assertEquals("Grocery shopping", expense.getDescription());
        assertNotNull(expense.getDate());
        assertEquals(1L, expense.getUserId());}

    @Test
    public void testExpenseEquality() {
        Expense expense1 = new Expense();
        expense1.setId(1L);
        expense1.setAmount(new BigDecimal("100.00"));
        
        Expense expense2 = new Expense();
        expense2.setId(1L);
        expense2.setAmount(new BigDecimal("100.00"));

        assertEquals(expense1, expense2);
        assertEquals(expense1.hashCode(), expense2.hashCode());
    }
}
