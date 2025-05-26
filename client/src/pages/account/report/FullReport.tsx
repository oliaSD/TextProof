import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Установка worker
GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [error, setError] = useState<string>("");

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError("");
  };

  const onLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setError(`Ошибка загрузки PDF: ${error.message}`);
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ height: "80vh", overflow: "auto" }}>
      <Document
        file={fileUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<div>Загрузка документа...</div>}
        error={<div style={{ color: "red" }}>Ошибка отображения PDF</div>}
        noData={<div>PDF не загружен</div>}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page 
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={800}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))
      }
      </Document>
    </div>
  );
}
export default PdfViewer;