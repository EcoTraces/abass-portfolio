/**
 * Generates public/resume/resume.pdf from the verified content in src/data.
 * Run with: npm run generate:resume
 *
 * This does not invent any content — it only lays out what already exists
 * in profile.ts / experience.ts / education.ts / skills.ts / certifications.ts.
 */
import { PDFDocument, StandardFonts, rgb, PDFFont } from "pdf-lib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { profile, socialLinks } from "../src/data/profile";
import { experience } from "../src/data/experience";
import { education } from "../src/data/education";
import { skillGroups } from "../src/data/skills";
import { certifications } from "../src/data/certifications";
import { isPlaceholder } from "../src/lib/utils";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const INK = rgb(0.09, 0.11, 0.14);
const MUTED = rgb(0.35, 0.38, 0.44);
const ACCENT = rgb(0.61, 0.35, 0.11); // matches the site's light-mode accent

async function main() {
  const doc = await PDFDocument.create();
  doc.setTitle(`${profile.name} — Resume`);
  doc.setAuthor(profile.name);
  doc.setSubject(profile.headline);

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const cursor = { page: doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]), y: PAGE_HEIGHT - MARGIN };

  function ensureSpace(height: number) {
    if (cursor.y - height < MARGIN) {
      cursor.page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursor.y = PAGE_HEIGHT - MARGIN;
    }
  }

  function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const words = text.split(/\s+/);
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
    return lines;
  }

  function drawParagraph(text: string, opts: { size?: number; font?: PDFFont; color?: typeof INK; gap?: number; maxWidth?: number } = {}) {
    const size = opts.size ?? 10;
    const font = opts.font ?? regular;
    const color = opts.color ?? INK;
    const lineGap = opts.gap ?? size * 1.45;
    const lines = wrap(text, font, size, opts.maxWidth ?? CONTENT_WIDTH);
    for (const line of lines) {
      ensureSpace(lineGap);
      cursor.page.drawText(line, { x: MARGIN, y: cursor.y - size, size, font, color });
      cursor.y -= lineGap;
    }
  }

  function drawBullet(text: string, size = 10) {
    const indent = 14;
    const lines = wrap(text, regular, size, CONTENT_WIDTH - indent);
    lines.forEach((line, i) => {
      ensureSpace(size * 1.45);
      if (i === 0) {
        cursor.page.drawText("•", { x: MARGIN, y: cursor.y - size, size, font: regular, color: MUTED });
      }
      cursor.page.drawText(line, { x: MARGIN + indent, y: cursor.y - size, size, font: regular, color: INK });
      cursor.y -= size * 1.45;
    });
  }

  function spacer(amount: number) {
    cursor.y -= amount;
  }

  function drawSectionHeading(label: string) {
    ensureSpace(30);
    cursor.page.drawText(label.toUpperCase(), {
      x: MARGIN,
      y: cursor.y - 11,
      size: 11,
      font: bold,
      color: ACCENT,
    });
    cursor.y -= 16;
    cursor.page.drawLine({
      start: { x: MARGIN, y: cursor.y },
      end: { x: PAGE_WIDTH - MARGIN, y: cursor.y },
      thickness: 0.75,
      color: rgb(0.82, 0.82, 0.8),
    });
    cursor.y -= 14;
  }

  // ---- Header -------------------------------------------------------
  cursor.page.drawText(profile.name, { x: MARGIN, y: cursor.y - 24, size: 22, font: bold, color: INK });
  cursor.y -= 30;
  cursor.page.drawText(profile.headline, { x: MARGIN, y: cursor.y - 13, size: 12, font: regular, color: MUTED });
  cursor.y -= 22;

  const contactBits = [profile.location, profile.email, profile.phone]
    .filter((v) => Boolean(v) && !isPlaceholder(v));

  const linkBits = socialLinks
    .filter((link) => link.icon !== "mail" && !isPlaceholder(link.href))
    .map((link) => link.href.replace(/^https?:\/\//, ""));

  const contactLine = [...contactBits, ...linkBits].join("   |   ");
  drawParagraph(contactLine, { size: 9.5, color: MUTED, gap: 14 });
  spacer(10);

  cursor.page.drawLine({
    start: { x: MARGIN, y: cursor.y },
    end: { x: PAGE_WIDTH - MARGIN, y: cursor.y },
    thickness: 1,
    color: ACCENT,
  });
  spacer(20);

  // ---- Summary --------------------------------------------------------
  if (profile.about.length > 0) {
    drawSectionHeading("Summary");
    profile.about.forEach((paragraph, i) => {
      drawParagraph(paragraph);
      if (i < profile.about.length - 1) spacer(6);
    });
    spacer(16);
  }

  // ---- Experience -------------------------------------------------------
  if (experience.length > 0) {
    drawSectionHeading("Experience");
    experience.forEach((entry, i) => {
      ensureSpace(28);
      cursor.page.drawText(`${entry.role} — ${entry.organization}`, {
        x: MARGIN,
        y: cursor.y - 11,
        size: 11,
        font: bold,
        color: INK,
      });
      const dateLabel = `${entry.startDate} – ${entry.endDate}`;
      const dateWidth = regular.widthOfTextAtSize(dateLabel, 9.5);
      cursor.page.drawText(dateLabel, {
        x: PAGE_WIDTH - MARGIN - dateWidth,
        y: cursor.y - 10,
        size: 9.5,
        font: regular,
        color: MUTED,
      });
      cursor.y -= 15;
      if (entry.context) {
        drawParagraph(entry.context, { size: 9.5, color: MUTED, gap: 13 });
      }
      spacer(4);
      drawParagraph(entry.summary, { size: 10, gap: 14.5 });
      spacer(4);
      entry.responsibilities?.forEach((item) => drawBullet(item));
      if (i < experience.length - 1) spacer(14);
    });
    spacer(16);
  }

  // ---- Education -------------------------------------------------------
  if (education.length > 0) {
    drawSectionHeading("Education");
    education.forEach((item, i) => {
      ensureSpace(28);
      cursor.page.drawText(item.credential, { x: MARGIN, y: cursor.y - 11, size: 11, font: bold, color: INK });
      const dateLabel = `${item.startDate} – ${item.endDate}`;
      const dateWidth = regular.widthOfTextAtSize(dateLabel, 9.5);
      cursor.page.drawText(dateLabel, {
        x: PAGE_WIDTH - MARGIN - dateWidth,
        y: cursor.y - 10,
        size: 9.5,
        font: regular,
        color: MUTED,
      });
      cursor.y -= 15;
      drawParagraph(`${item.institution} — ${item.location}`, { size: 10, color: MUTED, gap: 14 });
      if (item.notes) {
        spacer(4);
        drawParagraph(item.notes, { size: 9.5, gap: 13.5 });
      }
      if (i < education.length - 1) spacer(14);
    });
    spacer(16);
  }

  // ---- Skills -------------------------------------------------------
  if (skillGroups.length > 0) {
    drawSectionHeading("Skills");
    skillGroups.forEach((group) => {
      ensureSpace(18);
      const label = `${group.category}: `;
      cursor.page.drawText(label, { x: MARGIN, y: cursor.y - 10, size: 9.5, font: bold, color: INK });
      const labelWidth = bold.widthOfTextAtSize(label, 9.5);
      const lines = wrap(group.items.join(", "), regular, 9.5, CONTENT_WIDTH - labelWidth);
      lines.forEach((line, i) => {
        cursor.page.drawText(line, {
          x: MARGIN + (i === 0 ? labelWidth : 0),
          y: cursor.y - 10,
          size: 9.5,
          font: regular,
          color: MUTED,
        });
        cursor.y -= 13.5;
        if (i < lines.length - 1) ensureSpace(13.5);
      });
    });
    spacer(16);
  }

  // ---- Certifications -------------------------------------------------------
  if (certifications.length > 0) {
    drawSectionHeading("Certifications & Training");
    certifications.forEach((cert) => {
      ensureSpace(15);
      const text = `${cert.title} — ${cert.issuer} (${cert.date})`;
      drawParagraph(text, { size: 9.5, gap: 14 });
    });
  }

  const bytes = await doc.save();
  const outPath = resolve(__dirname, "../public/resume/resume.pdf");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, bytes);
  console.log(`Wrote ${outPath} (${(bytes.length / 1024).toFixed(1)} KB, ${doc.getPageCount()} page(s))`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
