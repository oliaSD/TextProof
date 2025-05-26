//package com.example.demo;
//
//import com.itextpdf.kernel.geom.Rectangle;
//import com.itextpdf.kernel.pdf.canvas.parser.EventType;
//import com.itextpdf.kernel.pdf.canvas.parser.PdfCanvasProcessor;
//import com.itextpdf.kernel.pdf.canvas.parser.data.IEventData;
//import com.itextpdf.kernel.pdf.canvas.parser.listener.ITextExtractionStrategy;
//import com.itextpdf.kernel.pdf.canvas.parser.listener.LocationTextExtractionStrategy;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Set;
//import org.apache.pdfbox.pdmodel.PDDocument;
//
//public class TextPositionFinder implements ITextExtractionStrategy {
//  private final String targetText;
//  private final List<Rectangle> positions = new ArrayList<>();
//  private final LocationTextExtractionStrategy delegate = new LocationTextExtractionStrategy();
//
//  public TextPositionFinder(String targetText) {
//    this.targetText = targetText;
//  }
//
//  @Override
//  public void eventOccurred(IEventData data, EventType type) {
//    delegate.eventOccurred(data, type);
//  }
//
//  @Override
//  public Set<EventType> getSupportedEvents() {
//    return Set.of();
//  }
//
//  @Override
//  public String getResultantText() {
//    String text = delegate.getResultantText();
//    if (text.contains(targetText)) {
//      // Здесь можно добавить логику для точного поиска координат
//      // (упрощённый пример — возвращает всю страницу)
//      positions.add(new Rectangle(100, 100, 200, 50));
//    }
//    return text;
//  }
//
//  public List<Rectangle> getPositions() {
//    return positions;
//  }
//}