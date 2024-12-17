ALTER TABLE papers_attributes
    ADD created TIMESTAMP WITHOUT TIME ZONE;

ALTER TABLE papers_attributes
    ALTER COLUMN created SET NOT NULL;

ALTER TABLE papers
    ADD CONSTRAINT uc_papers_papers_attributes UNIQUE (papers_attributes_id);

ALTER TABLE papers
    ADD CONSTRAINT FK_PAPERS_ON_PAPERS_ATTRIBUTES FOREIGN KEY (papers_attributes_id) REFERENCES papers_attributes (id);

ALTER TABLE papers_texts
    ADD CONSTRAINT FK_PAPERS_TEXTS_ON_PAPERS FOREIGN KEY (papers_id) REFERENCES papers (id);

CREATE INDEX papers_index ON papers_texts (papers_id);