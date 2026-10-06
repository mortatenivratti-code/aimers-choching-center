import { NoteItem } from '../types';

export interface PdfExportOptions {
  includeConcepts?: boolean;
  includeFormulas?: boolean;
  includeSolvedExamples?: boolean;
  includeChecklist?: boolean;
  studentName?: string;
}

/**
 * Sanitizes unicode strings into clean PDF WinAnsi-safe ASCII characters
 * and escapes PDF literal string delimiters.
 */
function sanitizePdfText(input: string): string {
  const normalized = input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2022/g, '-')
    .replace(/\u2192/g, '->')
    .replace(/\u2190/g, '<-')
    .replace(/\u2194/g, '<->')
    .replace(/\u2264/g, '<=')
    .replace(/\u2265/g, '>=')
    .replace(/\u2260/g, '!=')
    .replace(/\u00D7/g, 'x')
    .replace(/\u00F7/g, '/')
    .replace(/\u00B1/g, '+/-')
    .replace(/\u00B0/g, ' deg')
    .replace(/\u00B2/g, '^2')
    .replace(/\u00B3/g, '^3')
    .replace(/\u221A/g, 'sqrt')
    .replace(/\u03C0/g, 'pi')
    .replace(/\u03B1/g, 'alpha')
    .replace(/\u03B2/g, 'beta')
    .replace(/\u03B3/g, 'gamma')
    .replace(/\u03B8/g, 'theta')
    .replace(/\u0394/g, 'Delta')
    .replace(/\u03A9/g, 'Ohm')
    .replace(/[^\x20-\x7E]/g, ' ');

  return normalized
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Word-wraps text to a maximum character width per line.
 */
function wrapText(text: string, maxChars: number): string[] {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return [''];
  const words = clean.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxChars) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Generates a valid, multi-page A4 PDF document for a chapter study note
 * and triggers a browser file download for offline reading.
 */
export function downloadNoteAsPdf(
  note: NoteItem,
  options: PdfExportOptions = {}
): string {
  const {
    includeConcepts = true,
    includeFormulas = true,
    includeSolvedExamples = true,
    includeChecklist = true,
    studentName = 'Student Copy',
  } = options;

  const PAGE_WIDTH = 595.28; // A4 width in pt
  const PAGE_HEIGHT = 841.89; // A4 height in pt
  const MARGIN_X = 42;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
  const BOTTOM_LIMIT = 68;

  const pages: string[][] = [];
  let currentCommands: string[] = [];
  let cursorY = PAGE_HEIGHT - 42;

  const startNewPage = (isFirstPage: boolean) => {
    if (currentCommands.length > 0) {
      pages.push(currentCommands);
    }
    currentCommands = [];

    if (isFirstPage) {
      // Top Navy/Blue Branded Banner
      currentCommands.push('0.09 0.18 0.42 rg');
      currentCommands.push(`${MARGIN_X} ${PAGE_HEIGHT - 118} ${CONTENT_WIDTH} 78 re f`);

      // Accent Gold Stripe
      currentCommands.push('0.96 0.62 0.04 rg');
      currentCommands.push(`${MARGIN_X} ${PAGE_HEIGHT - 122} ${CONTENT_WIDTH} 4 re f`);

      // Coaching Class Header Text
      currentCommands.push('1 1 1 rg');
      currentCommands.push(
        `BT /F2 14 Tf ${MARGIN_X + 16} ${PAGE_HEIGHT - 64} Td (${sanitizePdfText(
          'AIMERS COACHING CLASS - OFFLINE STUDY NOTES'
        )}) Tj ET`
      );
      currentCommands.push('0.82 0.89 1 rg');
      currentCommands.push(
        `BT /F1 9 Tf ${MARGIN_X + 16} ${PAGE_HEIGHT - 80} Td (${sanitizePdfText(
          'Address: 2W5X+P79, Palam, Maharashtra 431720  |  Contact: +91 97639 86833'
        )}) Tj ET`
      );
      currentCommands.push(
        `BT /F2 9.5 Tf ${MARGIN_X + 16} ${PAGE_HEIGHT - 98} Td (${sanitizePdfText(
          `${note.class}  |  ${note.subject}  |  Chapter ${note.chapterNumber}  |  Board: ${
            note.board || 'State Board / CBSE'
          }  |  Prepared for: ${studentName}`
        )}) Tj ET`
      );

      cursorY = PAGE_HEIGHT - 148;
    } else {
      // Running Header on Continuation Pages
      currentCommands.push('0.94 0.96 0.99 rg');
      currentCommands.push(`${MARGIN_X} ${PAGE_HEIGHT - 58} ${CONTENT_WIDTH} 24 re f`);
      currentCommands.push('0.15 0.25 0.48 rg');
      currentCommands.push(
        `BT /F2 8.5 Tf ${MARGIN_X + 10} ${PAGE_HEIGHT - 49} Td (${sanitizePdfText(
          `Aimers Coaching Class  |  ${note.class} ${note.subject} - ${note.title}`
        )}) Tj ET`
      );
      cursorY = PAGE_HEIGHT - 82;
    }
  };

  const ensureSpace = (neededPt: number) => {
    if (cursorY - neededPt < BOTTOM_LIMIT) {
      startNewPage(false);
    }
  };

  const addSectionHeader = (title: string, r = 0.11, g = 0.31, b = 0.78) => {
    ensureSpace(38);
    cursorY -= 8;
    currentCommands.push(`${r} ${g} ${b} rg`);
    currentCommands.push(`${MARGIN_X} ${cursorY - 18} ${CONTENT_WIDTH} 22 re f`);
    currentCommands.push('1 1 1 rg');
    currentCommands.push(
      `BT /F2 10.5 Tf ${MARGIN_X + 10} ${cursorY - 11} Td (${sanitizePdfText(
        title.toUpperCase()
      )}) Tj ET`
    );
    cursorY -= 32;
  };

  const addParagraph = (
    text: string,
    options: {
      font?: 'F1' | 'F2' | 'F3';
      size?: number;
      lineHeight?: number;
      indent?: number;
      maxChars?: number;
      color?: [number, number, number];
    } = {}
  ) => {
    const {
      font = 'F1',
      size = 10,
      lineHeight = 14.5,
      indent = 0,
      maxChars = 86,
      color = [0.12, 0.16, 0.23],
    } = options;

    const wrapped = wrapText(text, maxChars);
    for (const line of wrapped) {
      ensureSpace(lineHeight + 4);
      currentCommands.push(`${color[0]} ${color[1]} ${color[2]} rg`);
      currentCommands.push(
        `BT /${font} ${size} Tf ${MARGIN_X + indent} ${cursorY} Td (${sanitizePdfText(
          line
        )}) Tj ET`
      );
      cursorY -= lineHeight;
    }
  };

  // Start Page 1
  startNewPage(true);

  // Chapter Title
  addParagraph(note.title, {
    font: 'F2',
    size: 16,
    lineHeight: 22,
    maxChars: 62,
    color: [0.06, 0.09, 0.16],
  });

  cursorY -= 4;

  // Meta Line
  const badgesList = (note.keyTopics || note.badges || ['Exam Oriented', 'Quick Revision']).join(
    '  •  '
  );
  addParagraph(`Key Focus Areas: ${badgesList}`, {
    font: 'F2',
    size: 9.5,
    lineHeight: 14,
    maxChars: 88,
    color: [0.14, 0.38, 0.85],
  });

  cursorY -= 6;

  // Executive Summary Box
  const summaryText =
    note.contentPreview?.summary || note.contentSummary || note.description;
  addSectionHeader('1. Chapter Overview & Executive Summary', 0.12, 0.29, 0.68);
  addParagraph(summaryText, {
    font: 'F1',
    size: 10,
    lineHeight: 15,
    maxChars: 86,
  });

  cursorY -= 6;

  // Fundamental Concepts & Principles
  if (includeConcepts) {
    addSectionHeader('2. Fundamental Concepts & Core Principles', 0.09, 0.38, 0.74);
    const keyPoints = note.contentPreview?.keyPoints || [
      'Understand the core definitions and axiomatic principles of this chapter.',
      'Practice labelled diagrams, units, and sign conventions carefully for board exams.',
      'Review step-by-step derivations and standard textbook reasoning.',
    ];

    keyPoints.forEach((point, idx) => {
      addParagraph(`${idx + 1}. ${point}`, {
        font: 'F1',
        size: 10,
        lineHeight: 15,
        indent: 6,
        maxChars: 82,
      });
      cursorY -= 3;
    });
  }

  // Must-Remember Formulas & Key Theorems
  if (includeFormulas) {
    cursorY -= 4;
    addSectionHeader('3. Must-Remember Formulas & Key Theorems', 0.72, 0.41, 0.04);
    const formulas = note.contentPreview?.importantFormulasOrFacts || [
      'Formula 1: Refer to standard chapter summary relations and SI units.',
      'Formula 2: Apply standard theorem statement and step-by-step substitution.',
    ];

    formulas.forEach((formula, idx) => {
      ensureSpace(22);
      currentCommands.push('0.99 0.97 0.91 rg');
      currentCommands.push(`${MARGIN_X + 4} ${cursorY - 5} ${CONTENT_WIDTH - 8} 18 re f`);
      addParagraph(`[F${idx + 1}]  ${formula}`, {
        font: 'F3',
        size: 9.5,
        lineHeight: 16,
        indent: 10,
        maxChars: 76,
        color: [0.35, 0.18, 0.02],
      });
      cursorY -= 4;
    });
  }

  // Solved Exam Questions & Model Solutions
  if (includeSolvedExamples) {
    cursorY -= 4;
    addSectionHeader('4. Expected Exam Questions & Model Solutions', 0.06, 0.46, 0.34);
    const sampleQuestions = note.contentPreview?.sampleQuestions || [
      {
        q: 'State and explain the primary concept of this chapter with a suitable example.',
        a: 'Write the formal definition first, state the governing formula or law with SI units, and illustrate with a neat labelled example.',
      },
    ];

    sampleQuestions.forEach((sq, idx) => {
      ensureSpace(44);
      addParagraph(`Q${idx + 1}: ${sq.q}`, {
        font: 'F2',
        size: 10,
        lineHeight: 15,
        indent: 4,
        maxChars: 82,
        color: [0.08, 0.12, 0.22],
      });
      addParagraph(`Model Answer: ${sq.a}`, {
        font: 'F1',
        size: 9.5,
        lineHeight: 14.5,
        indent: 14,
        maxChars: 80,
        color: [0.05, 0.38, 0.26],
      });
      cursorY -= 6;
    });
  }

  // Offline Revision Checklist
  if (includeChecklist) {
    cursorY -= 4;
    addSectionHeader('5. Student Offline Revision Checklist', 0.26, 0.22, 0.66);
    const checklistItems = [
      '[ ] Read all core definitions and highlighted points twice.',
      '[ ] Write down all formulas/theorems from memory on a practice sheet.',
      '[ ] Solve all Expected Exam Questions without looking at the model solution.',
      '[ ] Attempt the Chapter Mock Test on the Aimers Coaching Class portal.',
    ];
    checklistItems.forEach((item) => {
      addParagraph(item, {
        font: 'F1',
        size: 9.5,
        lineHeight: 15,
        indent: 8,
        maxChars: 82,
      });
    });
  }

  // Push final page
  if (currentCommands.length > 0) {
    pages.push(currentCommands);
  }

  // Add footer with page numbers to all pages
  const totalPages = pages.length;
  pages.forEach((cmds, pageIdx) => {
    cmds.push('0.85 0.88 0.92 RG 0.7 w');
    cmds.push(`${MARGIN_X} 48 m ${PAGE_WIDTH - MARGIN_X} 48 l S`);
    cmds.push('0.42 0.47 0.55 rg');
    cmds.push(
      `BT /F1 8.5 Tf ${MARGIN_X} 34 Td (${sanitizePdfText(
        `Aimers Coaching Class (2W5X+P79, Palam, Maharashtra 431720)  •  Verified Offline Study PDF`
      )}) Tj ET`
    );
    cmds.push(
      `BT /F2 8.5 Tf ${PAGE_WIDTH - MARGIN_X - 65} 34 Td (${sanitizePdfText(
        `Page ${pageIdx + 1} of ${totalPages}`
      )}) Tj ET`
    );
  });

  // Assemble PDF 1.4 objects
  const objects: string[] = [];
  // 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  // 2: Pages placeholder (will be filled once page object IDs are known)
  const pageObjIds: number[] = [];
  pages.forEach((_, idx) => {
    pageObjIds.push(6 + idx * 2);
  });
  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjIds
      .map((id) => `${id} 0 R`)
      .join(' ')}] /Count ${pages.length} >>\nendobj`
  );
  // 3, 4, 5: Standard Type1 Fonts (Helvetica, Helvetica-Bold, Courier)
  objects.push(
    '3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj'
  );
  objects.push(
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj'
  );
  objects.push(
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>\nendobj'
  );

  const encoder = new TextEncoder();

  pages.forEach((cmds, idx) => {
    const pageObjId = 6 + idx * 2;
    const contentObjId = pageObjId + 1;
    const streamContent = cmds.join('\n');
    const streamByteLength = encoder.encode(streamContent).length;

    objects.push(
      `${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj`
    );
    objects.push(
      `${contentObjId} 0 obj\n<< /Length ${streamByteLength} >>\nstream\n${streamContent}\nendstream\nendobj`
    );
  });

  // Build final PDF string with exact byte offsets
  let pdfContent = '%PDF-1.4\n';
  const offsets: number[] = [0]; // index 0 is free object

  for (const obj of objects) {
    offsets.push(encoder.encode(pdfContent).length);
    pdfContent += obj + '\n';
  }

  const xrefOffset = encoder.encode(pdfContent).length;
  pdfContent += `xref\n0 ${objects.length + 1}\n`;
  pdfContent += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    const padded = String(offsets[i]).padStart(10, '0');
    pdfContent += `${padded} 00000 n \n`;
  }

  pdfContent += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  // Trigger browser download
  const pdfBytes = encoder.encode(pdfContent);
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const safeTitle = note.title
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const safeClass = note.class.replace(/\s+/g, '');
  const filename = `Aimers_${safeClass}_${note.subject}_Ch${note.chapterNumber}_${safeTitle}.pdf`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);

  return filename;
}
