ALTER TABLE reports
    ADD percent DECIMAL;

ALTER TABLE reports_params
    ADD CONSTRAINT uc_reports_params_report UNIQUE (report_id);

ALTER TABLE reports_params
    ADD CONSTRAINT FK_REPORTS_PARAMS_ON_REPORT FOREIGN KEY (report_id) REFERENCES reports (id);

ALTER TABLE reports_sources
    ADD CONSTRAINT FK_REPORTS_SOURCES_ON_REPORT FOREIGN KEY (report_id) REFERENCES reports (id);