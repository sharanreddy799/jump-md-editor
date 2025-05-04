export async function exportElementToPDF(element: HTMLElement) {
  if (typeof window !== "undefined" && element) {
    const html2pdf = (await import("html2pdf.js")).default;

    // Clone the element to avoid layout issues
    const cloned = element.cloneNode(true) as HTMLElement;

    // Optional: inline basic styles to ensure formatting
    cloned.style.padding = "20px";
    cloned.style.fontFamily = "sans-serif";
    cloned.style.maxWidth = "700px";

    const opt = {
      margin: 0.5,
      filename: "markdown-export.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(cloned).save();
  }
}
