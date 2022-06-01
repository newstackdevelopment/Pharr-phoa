import React from "react";

import PDFExport from "components/custom/PDFExport/PDFExport";
import { PDFViewer } from "@react-pdf/renderer";

export default function PdfExport() {
  return (
    <PDFViewer style={{ width: "100vh", height: "100vh" }}>
      {" "}
      <PDFExport />
    </PDFViewer>
  );
}
