CREATE TABLE papers
(
    id                   BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    username             VARCHAR(255)                            NOT NULL,
    type                 VARCHAR(255)                            NOT NULL,
    papers_attributes_id BIGINT,
    CONSTRAINT pk_papers PRIMARY KEY (id)
);

CREATE TABLE papers_attributes
(
    id             BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    size           BIGINT                                  NOT NULL,
    authors        VARCHAR(255),
    hash           VARCHAR(255)                            NOT NULL,
    is_share       BOOLEAN                                 NOT NULL,
    is_source      BOOLEAN                                 NOT NULL,
    word_count     BIGINT                                  NOT NULL,
    file_name      VARCHAR(255)                            NOT NULL,
    file_extension VARCHAR(255)                            NOT NULL,
    CONSTRAINT pk_papers_attributes PRIMARY KEY (id)
);

CREATE TABLE papers_texts
(
    id          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    text        VARCHAR(65000)                          NOT NULL,
    size        BIGINT                                  NOT NULL,
    text_offset BIGINT                                  NOT NULL,
    hash        VARCHAR(255)                            NOT NULL,
    papers_id   BIGINT,
    CONSTRAINT pk_papers_texts PRIMARY KEY (id)
);