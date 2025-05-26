package ru.semernik.olga.paperservice.service.common;

public record BorrowingText(
    String url,
    Boolean isBorrowingText,
    String borrowingText
) {

}