package com.vladcranga.currencyconverter.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testUserCreation() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");
        user.setPassword("hashedPassword");
        user.setBaseCurrency("EUR");

        assertEquals(1L, user.getId());
        assertEquals("testUser", user.getUsername());
        assertEquals("hashedPassword", user.getPassword());
        assertEquals("EUR", user.getBaseCurrency());
    }

    @Test
    public void testUserEquality() {
        User user1 = new User();
        user1.setId(1L);
        user1.setUsername("testUser");
        
        User user2 = new User();
        user2.setId(1L);
        user2.setUsername("testUser");

        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());
    }
}
