"use client";

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type ExportAnalysisPdfButtonProps = {
  username: string;
};

export function ExportAnalysisPdfButton({
  username,
}: ExportAnalysisPdfButtonProps) {
  const handleExport = async () => {
    const element = document.getElementById("dashboard-export");

    if (!element) {
      console.error("Dashboard export element not found");
      return;
    }

    let wrapper: HTMLDivElement | null = null;

    try {
      const clone = element.cloneNode(true) as HTMLElement;

      wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-11111px";
      wrapper.style.top = "0";
      wrapper.style.width = "1800px";
      wrapper.style.background = "#000000";
      wrapper.style.padding = "0";
      wrapper.style.margin = "0";
      wrapper.style.zIndex = "-1";

      clone.style.width = "1800px";
      clone.style.maxWidth = "1800px";
      clone.style.margin = "0";
      clone.style.transform = "none";

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(clone, {
        backgroundColor: "#000000",
        scale: 2,
        useCORS: true,
        width: clone.scrollWidth,
        height: clone.scrollHeight,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 6;

      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      let renderWidth = maxWidth;
      let renderHeight = (canvas.height * renderWidth) / canvas.width;

      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);

      pdf.save(`${username}-dashboard.pdf`);
    } catch (error) {
      console.error("Failed to export dashboard PDF:", error);
    } finally {
      if (wrapper) {
        document.body.removeChild(wrapper);
      }
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="rounded-xl bg-cyan-400 text-black hover:bg-cyan-300"
    >
      <Download className="mr-2 h-4 w-4" />
      Export PDF analysis
    </Button>
  );
}
