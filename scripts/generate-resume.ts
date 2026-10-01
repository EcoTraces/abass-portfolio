/**
 * Generates ATS-friendly resume outputs from verified content in src/data.
 * Output: public/resume/resume.pdf and public/resume/resume.docx
 */
import { PDFDocument, StandardFonts, rgb, PDFFont } from "pdf-lib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";

import { profile } from "../src/data/profile";
import { experience } from "../src/data/experience";
import { education } from "../src/data/education";
import { skillGroups } from "../src/data/skills";
import { certifications } from "../src/data/certifications";
import { projects } from "../src/data/projects";
import { siteUrl } from "../src/lib/site";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/resume");
const resumeLocation = "Freetown, Sierra Leone";
const portfolioUrl = siteUrl;
const researchInterests = `Research interests: ${profile.researchInterests}`;

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 54;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const INK = rgb(0.08, 0.1, 0.12);
const MUTED = rgb(0.36, 0.4, 0.45);
const ACCENT = rgb(0.42, 0.52, 0.67);

function formatDate(date: string): string {
  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  if (/^\d{4}$/.test(date)) return date;
  return date;
}

function formatRange(start: string, end: string): string {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function addSectionHeading(doc: PDFDocument, page: any, y: number, label: string, regular: PDFFont, bold: PDFFont) {
  const headingY = y - 10;
  page.drawText(label.toUpperCase(), { x: MARGIN, y: headingY, size: 10.5, font: bold, color: ACCENT });
  page.drawLine({
    start: { x: MARGIN, y: headingY - 6 },
    end: { x: PAGE_WIDTH - MARGIN, y: headingY - 6 },
    thickness: 0.8,
    color: rgb(0.8, 0.82, 0.85),
  });
  return headingY - 14;
}

async function generatePdf() {
  const doc = await PDFDocument.create();
  doc.setTitle(`${profile.name} — Resume`);
  doc.setAuthor(profile.name);
  doc.setSubject("Computer Science resume");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const writeParagraph = (text: string, size = 10.5, font = regular, color = INK, left = MARGIN, indent = 0) => {
    const lines = wrapText(text, font, size, CONTENT_WIDTH - indent);
    for (const line of lines) {
      if (y - size < MARGIN) {
        const nextPage = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        page.drawText("", { x: 0, y: 0, size: 1, font: regular });
        y = PAGE_HEIGHT - MARGIN;
      }
      page.drawText(line, { x: left + indent, y: y - size, size, font, color });
      y -= size * 1.45;
    }
  };

  const writeBullet = (text: string, size = 10.5) => {
    const lines = wrapText(text, regular, size, CONTENT_WIDTH - 14);
    for (const [index, line] of lines.entries()) {
      if (y - size < MARGIN) {
        const nextPage = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        y = PAGE_HEIGHT - MARGIN;
      }
      if (index === 0) {
        page.drawText("•", { x: MARGIN, y: y - size, size, font: regular, color: MUTED });
      }
      page.drawText(line, { x: MARGIN + 14, y: y - size, size, font: regular, color: INK });
      y -= size * 1.45;
    }
  };

  page.drawText(profile.name, { x: MARGIN, y: y - 18, size: 20, font: bold, color: INK });
  y -= 28;
  const contactText = `${resumeLocation} | ${profile.email} | ${profile.phone} | ${profile.linkedin} | ${profile.github} | ${portfolioUrl}`;
  writeParagraph(contactText, 9.5, regular, MUTED);
  y -= 8;
  writeParagraph(researchInterests, 9.5, regular, MUTED);
  y -= 12;

  page.drawLine({ start: { x: MARGIN, y: y }, end: { x: PAGE_WIDTH - MARGIN, y: y }, thickness: 1, color: ACCENT });
  y -= 18;

  y = addSectionHeading(doc, page, y, "Summary", regular, bold) - 2;
  writeParagraph(profile.about[0]);
  writeParagraph(profile.about[1]);
  writeParagraph(profile.about[2]);
  y -= 10;

  y = addSectionHeading(doc, page, y, "Education", regular, bold) - 2;
  for (const item of education) {
    page.drawText(item.credential, { x: MARGIN, y: y - 12, size: 10.5, font: bold, color: INK });
    const dateText = formatRange(item.startDate, item.endDate);
    const rightX = PAGE_WIDTH - MARGIN - regular.widthOfTextAtSize(dateText, 9.5);
    page.drawText(dateText, { x: rightX, y: y - 12, size: 9.5, font: regular, color: MUTED });
    y -= 18;
    page.drawText(item.institution, { x: MARGIN, y: y - 10, size: 10, font: regular, color: MUTED });
    y -= 14;
    page.drawText("GPA: [TODO: X.XX / scale]", { x: MARGIN, y: y - 10, size: 9.5, font: regular, color: MUTED });
    y -= 14;
    if (item.notes) {
      writeParagraph(item.notes, 9.5, regular, MUTED);
    }
    y -= 4;
  }

  y = addSectionHeading(doc, page, y, "Experience", regular, bold) - 2;
  for (const entry of experience) {
    const dateText = formatRange(entry.startDate, entry.endDate);
    page.drawText(`${entry.role} — ${entry.organization}`, { x: MARGIN, y: y - 12, size: 10.5, font: bold, color: INK });
    const rightX = PAGE_WIDTH - MARGIN - regular.widthOfTextAtSize(dateText, 9.5);
    page.drawText(dateText, { x: rightX, y: y - 12, size: 9.5, font: regular, color: MUTED });
    y -= 18;
    if (entry.context) {
      page.drawText(entry.context, { x: MARGIN, y: y - 10, size: 9.5, font: regular, color: MUTED });
      y -= 14;
    }
    writeParagraph(entry.summary, 10.5, regular, INK);
    for (const responsibility of entry.responsibilities ?? []) {
      writeBullet(responsibility);
    }
    y -= 8;
  }

  y = addSectionHeading(doc, page, y, "Projects", regular, bold) - 2;
  const resumeProjects = projects.filter((project) => ["ecotrace", "biometric-attendance-system", "library-management-system", "scholarsphere"].includes(project.slug));
  for (const project of resumeProjects) {
    page.drawText(`${project.name}: ${project.shortDescription}`, { x: MARGIN, y: y - 12, size: 10.5, font: regular, color: INK });
    y -= 18;
  }

  y = addSectionHeading(doc, page, y, "Skills", regular, bold) - 2;
  const skillLines = skillGroups.map((group) => `${group.category}: ${group.items.join(", ")}`);
  writeParagraph(skillLines.join("; "), 9.5, regular, MUTED);
  y -= 10;

  y = addSectionHeading(doc, page, y, "Certifications", regular, bold) - 2;
  for (const cert of certifications) {
    writeParagraph(`${cert.title} — ${cert.issuer} (${cert.date})`, 9.5, regular, MUTED);
  }

  const pdfBytes = await doc.save();
  const pdfPath = resolve(outDir, "resume.pdf");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(pdfPath, pdfBytes);
  console.log(`PDF written: ${pdfPath}`);
}

function buildDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: [
          new Paragraph({
            children: [new TextRun({ text: profile.name, bold: true, size: 28 })],
            alignment: AlignmentType.left,
          }),
          new Paragraph({ children: [new TextRun({ text: resumeLocation, size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: `${profile.email} | ${profile.phone}`, size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: `LinkedIn: ${profile.linkedin} | GitHub: ${profile.github} | Portfolio: ${portfolioUrl}`, size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: researchInterests, size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: "Summary", bold: true, size: 24 })] }),
          ...profile.about.map((p) => new Paragraph({ children: [new TextRun({ text: p, size: 20 })] })),
          new Paragraph({ children: [new TextRun({ text: "Education", bold: true, size: 24 })] }),
          ...education.map((item) => new Paragraph({ children: [new TextRun({ text: `${item.credential} — ${formatRange(item.startDate, item.endDate)}`, bold: true, size: 22 })] })),
          ...education.map((item) => new Paragraph({ children: [new TextRun({ text: `${item.institution} | GPA: [TODO: X.XX / scale]`, size: 20 })] })),
          ...(education.flatMap((item) => (item.notes ? [new Paragraph({ children: [new TextRun({ text: item.notes, size: 20 })] })] : []))),
          new Paragraph({ children: [new TextRun({ text: "Experience", bold: true, size: 24 })] }),
          ...experience.flatMap((entry) => [
            new Paragraph({ children: [new TextRun({ text: `${entry.role} — ${entry.organization} | ${formatRange(entry.startDate, entry.endDate)}`, bold: true, size: 22 })] }),
            ...(entry.context ? [new Paragraph({ children: [new TextRun({ text: entry.context, size: 20 })] })] : []),
            new Paragraph({ children: [new TextRun({ text: entry.summary, size: 20 })] }),
            ...entry.responsibilities!.map((item) => new Paragraph({ children: [new TextRun({ text: `• ${item}`, size: 20 })] })),
          ]),
          new Paragraph({ children: [new TextRun({ text: "Projects", bold: true, size: 24 })] }),
          ...projects.filter((project) => ["ecotrace", "biometric-attendance-system", "library-management-system", "scholarsphere"].includes(project.slug)).map((project) =>
            new Paragraph({ children: [new TextRun({ text: `${project.name}: ${project.shortDescription}`, size: 20 })] })
          ),
          new Paragraph({ children: [new TextRun({ text: "Skills", bold: true, size: 24 })] }),
          new Paragraph({ children: [new TextRun({ text: skillGroups.map((group) => `${group.category}: ${group.items.join(", ")}`).join("; "), size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: "Certifications", bold: true, size: 24 })] }),
          ...certifications.map((cert) => new Paragraph({ children: [new TextRun({ text: `${cert.title} — ${cert.issuer} (${cert.date})`, size: 20 })] })),
        ],
      },
    ],
  });

  const docxPath = resolve(outDir, "resume.docx");
  mkdirSync(outDir, { recursive: true });
  Packer.toBuffer(doc).then((buffer) => {
    writeFileSync(docxPath, buffer);
    console.log(`DOCX written: ${docxPath}`);
  });
}

async function main() {
  await generatePdf();
  buildDocx();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
