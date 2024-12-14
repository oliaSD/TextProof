package ru.semernik.olga.paperservice.io.output.google.dto;

import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class SearchResponse {

  private String kind;
  private Url url;
  private Queries queries;
  private List<Promotion> promotions;
  private Map<String, Object> context;
  private SearchInformation searchInformation;
  private Spelling spelling;
  private List<Result> items;

  // Getters and Setters
  @Data
  public static class Url {

    private String type;
    private String template;

    // Getters and Setters
  }

  @Data
  public static class Queries {

    private List<Query> previousPage;
    private List<Query> request;
    private List<Query> nextPage;

    // Getters and Setters
  }

  @Data
  public static class Query {

    private String title;
    private String totalResults;
    private String searchTerms;
    private int count;
    private int startIndex;
    private int startPage;
    private String language;
    private String inputEncoding;
    private String outputEncoding;
    private String safe;
    private String cx;
    private String sort;
    private String filter;
    private String gl;
    private String cr;
    private String googleHost;
    private String disableCnTwTranslation;
    private String hq;
    private String hl;
    private String siteSearch;
    private String siteSearchFilter;
    private String exactTerms;
    private String excludeTerms;
    private String linkSite;
    private String orTerms;
    private String relatedSite;
    private String dateRestrict;
    private String lowRange;
    private String highRange;
    private String fileType;
    private String rights;
    private String searchType;
    private String imgSize;
    private String imgType;
    private String imgColorType;
    private String imgDominantColor;

    // Getters and Setters
  }

  @Data
  public static class Promotion {
    // Promotion fields and methods
  }

  @Data
  public static class SearchInformation {

    private double searchTime;
    private String formattedSearchTime;
    private String totalResults;
    private String formattedTotalResults;

    // Getters and Setters
  }

  @Data
  public static class Spelling {

    private String correctedQuery;
    private String htmlCorrectedQuery;

    // Getters and Setters
  }

  @Data
  public static class Result {

    private String kind;
    private String title;
    private String htmlTitle;
    private String link;
    private String displayLink;
    private String snippet;
    private String htmlSnippet;
    private String cacheId;
    private String formattedUrl;
    private String htmlFormattedUrl;
    private Map<String, Object> pagemap;
    private String mime;
    private String fileFormat;
    private Image image;
    private List<Label> labels;

    // Getters and Setters

    @Data
    public static class Image {

      private String contextLink;
      private int height;
      private int width;
      private int byteSize;
      private String thumbnailLink;
      private int thumbnailHeight;
      private int thumbnailWidth;

      // Getters and Setters
    }

    @Data
    public static class Label {

      private String name;
      private String displayName;
      private String label_with_op;

      // Getters and Setters
    }
  }
}

