ALTER TABLE papers_attributes
    ADD is_shared BOOLEAN;

ALTER TABLE papers_attributes
    ADD name VARCHAR(255);

ALTER TABLE papers_attributes
    ADD text_size BIGINT;

ALTER TABLE papers_attributes
    ALTER COLUMN is_shared SET NOT NULL;

ALTER TABLE reports_params
    ADD last_check_time TIMESTAMP WITHOUT TIME ZONE;

ALTER TABLE papers_attributes
    ALTER COLUMN name SET NOT NULL;

ALTER TABLE papers_texts
    ADD "offset" BIGINT;

ALTER TABLE papers_texts
    ALTER COLUMN "offset" SET NOT NULL;

ALTER TABLE papers
    ADD owner_name VARCHAR(255);

ALTER TABLE papers_attributes
    ALTER COLUMN text_size SET NOT NULL;

ALTER TABLE reports_params
    DROP COLUMN end_position;

ALTER TABLE reports_params
    DROP COLUMN updated;

ALTER TABLE papers_attributes
    DROP COLUMN file_extension;

ALTER TABLE papers_attributes
    DROP COLUMN file_name;

ALTER TABLE papers_attributes
    DROP COLUMN is_share;

ALTER TABLE papers_attributes
    DROP COLUMN size;

ALTER TABLE papers
    DROP COLUMN is_public;

ALTER TABLE papers
    DROP COLUMN username;

ALTER TABLE reports
    DROP COLUMN percent;

ALTER TABLE papers_texts
    DROP COLUMN text_offset;