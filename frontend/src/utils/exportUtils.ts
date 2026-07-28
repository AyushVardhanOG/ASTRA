import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";

export function exportPDF(title: string, content: string) {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 15, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(content, 180);

  let y = 35;

  for (const line of lines) {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(line, 15, y);
    y += 6;
  }

  doc.save(`${title}.pdf`);
}

export function exportMarkdown(title: string, content: string) {
  const blob = new Blob([content], {
    type: "text/markdown;charset=utf-8",
  });

  saveAs(blob, `${title}.md`);
}

export function exportText(title: string, content: string) {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, `${title}.txt`);
}