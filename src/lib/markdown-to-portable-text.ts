/**
 * Converts Markdown to Sanity Portable Text format
 *
 * Supports:
 * - Headings (H2, H3)
 * - Bold (**text**)
 * - Italic (*text*)
 * - Inline code (`code`)
 * - Links ([text](url))
 * - Bullet lists (-)
 * - Numbered lists (1. 2. 3.)
 *
 * Does NOT support (by design):
 * - Code blocks (too complex)
 * - Tables (converted to text)
 */

interface PortableTextBlock {
  _key: string;
  _type: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children: PortableTextSpan[];
  markDefs: any[];
}

interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks: string[];
}

let blockIndex = 0;

function generateKey(): string {
  return `block-${Date.now()}-${blockIndex++}`;
}

function parseInlineFormatting(text: string, markDefs: any[]): PortableTextSpan[] {
  const children: PortableTextSpan[] = [];
  let remaining = text;
  let iterations = 0;
  const MAX_ITERATIONS = 50000; // Prevent infinite loops

  while (remaining.length > 0) {
    // Safety check
    if (iterations++ > MAX_ITERATIONS) {
      console.error('Max iterations reached in parseInlineFormatting');
      break;
    }

    // Try patterns in order of precedence (longest first)

    // 1. Links ([text](url))
    const linkMatch = remaining.match(/^\[([^\]]+?)\]\(([^)]+?)\)/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      const linkKey = generateKey();

      // Add link annotation to markDefs
      markDefs.push({
        _key: linkKey,
        _type: 'link',
        href: linkUrl,
      });

      // Create span with link mark
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: linkText,
        marks: [linkKey],
      });
      remaining = remaining.substring(linkMatch[0].length);
      continue;
    }

    // 2. Bold + Italic (***text***)
    const boldItalicMatch = remaining.match(/^\*\*\*([^*]+?)\*\*\*/);
    if (boldItalicMatch) {
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: boldItalicMatch[1],
        marks: ['strong', 'em'],
      });
      remaining = remaining.substring(boldItalicMatch[0].length);
      continue;
    }

    // 3. Bold (**text**)
    const boldMatch = remaining.match(/^\*\*([^*]+?)\*\*/);
    if (boldMatch) {
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: boldMatch[1],
        marks: ['strong'],
      });
      remaining = remaining.substring(boldMatch[0].length);
      continue;
    }

    // 4. Inline code (`text`)
    const codeMatch = remaining.match(/^`([^`]+?)`/);
    if (codeMatch) {
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: codeMatch[1],
        marks: ['code'],
      });
      remaining = remaining.substring(codeMatch[0].length);
      continue;
    }

    // 5. Italic (*text*)
    const italicMatch = remaining.match(/^\*([^*]+?)\*/);
    if (italicMatch) {
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: italicMatch[1],
        marks: ['em'],
      });
      remaining = remaining.substring(italicMatch[0].length);
      continue;
    }

    // No match found - consume one character as plain text
    const char = remaining[0];
    if (children.length > 0 && children[children.length - 1].marks.length === 0) {
      // Append to previous plain text span
      children[children.length - 1].text += char;
    } else {
      // Create new plain text span
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: char,
        marks: [],
      });
    }
    remaining = remaining.substring(1);
  }

  // If no formatting found at all, return single plain span
  if (children.length === 0) {
    children.push({
      _key: generateKey(),
      _type: 'span',
      text: text,
      marks: [],
    });
  }

  return children;
}

export function convertMarkdownToPortableText(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const lines = markdown.split('\n');

  let currentParagraph: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line - flush current paragraph
    if (!trimmed) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        const markDefs: any[] = [];
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineFormatting(paragraphText, markDefs),
          markDefs,
        });
        currentParagraph = [];
      }
      continue;
    }

    // H2 heading (## text)
    if (trimmed.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        const markDefs: any[] = [];
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineFormatting(paragraphText, markDefs),
          markDefs,
        });
        currentParagraph = [];
      }
      const headingText = trimmed.replace('## ', '');
      const markDefs: any[] = [];
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: parseInlineFormatting(headingText, markDefs),
        markDefs,
      });
      continue;
    }

    // H3 heading (### text)
    if (trimmed.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        const markDefs: any[] = [];
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineFormatting(paragraphText, markDefs),
          markDefs,
        });
        currentParagraph = [];
      }
      const headingText = trimmed.replace('### ', '');
      const markDefs: any[] = [];
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: parseInlineFormatting(headingText, markDefs),
        markDefs,
      });
      continue;
    }

    // Bullet list (- text or * text)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        const markDefs: any[] = [];
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineFormatting(paragraphText, markDefs),
          markDefs,
        });
        currentParagraph = [];
      }
      const listItemText = trimmed.replace(/^[-*] /, '');
      const markDefs: any[] = [];
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: parseInlineFormatting(listItemText, markDefs),
        markDefs,
      });
      continue;
    }

    // Numbered list (1. text)
    if (/^\d+\.\s/.test(trimmed)) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        const markDefs: any[] = [];
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineFormatting(paragraphText, markDefs),
          markDefs,
        });
        currentParagraph = [];
      }
      const listItemText = trimmed.replace(/^\d+\.\s/, '');
      const markDefs: any[] = [];
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: parseInlineFormatting(listItemText, markDefs),
        markDefs,
      });
      continue;
    }

    // Skip table separator lines (|---|---|)
    if (trimmed.match(/^\|[-:\s|]+\|$/)) {
      continue;
    }

    // Table rows (convert to plain text for now)
    if (trimmed.startsWith('|')) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        const markDefs: any[] = [];
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineFormatting(paragraphText, markDefs),
          markDefs,
        });
        currentParagraph = [];
      }

      // Parse table row into plain text
      const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim());
      const rowText = cells.join(' | ');
      const markDefs: any[] = [];

      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: parseInlineFormatting(rowText, markDefs),
        markDefs,
      });
      continue;
    }

    // Regular paragraph - accumulate lines
    currentParagraph.push(trimmed);
  }

  // Add final paragraph if exists
  if (currentParagraph.length > 0) {
    const paragraphText = currentParagraph.join(' ');
    const markDefs: any[] = [];
    blocks.push({
      _key: generateKey(),
      _type: 'block',
      style: 'normal',
      children: parseInlineFormatting(paragraphText, markDefs),
      markDefs,
    });
  }

  return blocks;
}
