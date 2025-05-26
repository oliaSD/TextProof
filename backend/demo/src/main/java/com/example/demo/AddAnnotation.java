//package com.example.demo;
//
//import com.itextpdf.kernel.colors.ColorConstants;
//import com.itextpdf.kernel.pdf.*;
//import com.itextpdf.kernel.pdf.annot.*;
//import com.itextpdf.kernel.geom.Rectangle;
//import com.itextpdf.kernel.pdf.canvas.parser.PdfCanvasProcessor;
//import java.io.IOException;
//
//public class AddAnnotation {
//  public static void main(String[] args) throws IOException {
//    // Открываем PDF
//    PdfDocument pdfDoc = new PdfDocument(
//        new PdfReader("/Users/viktorkabariha/Downloads/Kabariha_Neural_networks.pdf"),
//        new PdfWriter("output.pdf")
//    );
//
//    // Получаем первую страницу
//    PdfPage page = pdfDoc.getFirstPage();
//
//
//    // Создаём текстовую аннотацию (комментарий)
//    // Закрываем документ
//    pdfDoc.close();
//  }
//}