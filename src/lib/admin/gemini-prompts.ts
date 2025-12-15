/**
 * UPDATED GEMINI PROMPTS - Production Ready
 *
 * Changes from original:
 * 1. GEO "Answer-First" principle implemented
 * 2. Strategic keyword placement (2x primary: intro + middle)
 * 3. Removed vague "50% spartan" - replaced with concrete guidelines
 * 4. Added strict formatting requirements
 * 5. Better SEO metadata constraints
 * 6. Few-shot learning examples added
 *
 * Created: 2025-11-17
 * Based on: GEO_SEO/implementation-guide.md
 */

/**
 * Content Brief Interface
 */
export interface ContentBrief {
  title: string;
  wordCount: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
  internalLinks: string[];
  externalLinks: string[];
  additionalInstructions?: string;
}

/**
 * Generate prompt for outline creation (used with Gemini 2.5 Flash)
 *
 * Model: gemini-2.5-flash (switched from Pro for cost savings)
 * Temperature: 0.7
 *
 * Key Changes:
 * - Implements GEO "Answer-First" architecture
 * - Marks keyword placement locations
 * - Concrete style guidelines (removed "50% spartan")
 * - Explicit structure requirements
 */
export function getOutlinePrompt(brief: ContentBrief): string {
  return `You are an expert content strategist specializing in SEO and Generative Engine Optimization (GEO).

TASK: Create a blog post outline optimized for AI citation (ChatGPT, Perplexity, Google AI).

CONTENT BRIEF:
Title: ${brief.title}
Target Word Count: ${brief.wordCount}
Primary Keyword: ${brief.primaryKeyword}
${brief.secondaryKeywords.length > 0 ? `Secondary Keywords: ${brief.secondaryKeywords.join(', ')}` : ''}
${brief.internalLinks.length > 0 ? `Internal Links to Include: ${brief.internalLinks.join(', ')}` : ''}
${brief.externalLinks.length > 0 ? `External Links to Include: ${brief.externalLinks.join(', ')}` : ''}
${brief.additionalInstructions ? `\nSpecial Instructions: ${brief.additionalInstructions}` : ''}

GEO OPTIMIZATION GUIDELINES:

1. ANSWER-FIRST INTRODUCTION:
   Start the Introduction by answering the main question in the first 2-3 sentences.
   - Lead with the direct answer
   - Follow with context and supporting details
   - Avoid generic industry observations as the opening

   Example of effective opening:
   "${brief.primaryKeyword} reduces [specific outcome] by [percentage/metric] through [mechanism]. These systems [key benefit] without [pain point]."

   Less effective opening:
   "The industry is evolving rapidly. Technology is changing how businesses operate. In this article, we'll explore..."

2. KEYWORD PLACEMENT:
   - Include primary keyword "${brief.primaryKeyword}" naturally:
     * In the Introduction (early in the content)
     * In one middle section (heading or opening paragraph)
   - Weave secondary keywords naturally into headings where relevant
   - Write headings naturally - avoid [brackets] or forced keyword insertion

3. OUTLINE STRUCTURE:
   - Start with "## Introduction" (title is added separately)
   - Create 4-6 main sections (## H2)
   - Add 2-3 subsections (### H3) where it improves clarity
   - End with "## Conclusion"
   - Target lengths are flexible guidelines (not strict limits)

4. SECTION GUIDELINES:
   - Make H2 headings specific and actionable
   - Question-based headings work well: "How to...", "What is...", "Why..."
   - Aim for technical depth and specific examples
   - Structure content for easy AI extraction

5. LINK INTEGRATION:
   ${brief.internalLinks.length > 0 ? `- Internal links to include: ${brief.internalLinks.join(', ')}` : ''}
   ${brief.externalLinks.length > 0 ? `- External links to cite: ${brief.externalLinks.join(', ')}` : ''}
   - Integrate naturally in relevant sections (no markers needed)

TONE & STYLE GUIDELINES:
- Conversational and direct (like explaining to a smart colleague)
- Use short, punchy sentences (15-20 words average)
- Active voice, not passive
- Address reader as "you"
- Avoid: corporate jargon, buzzwords, fluff, passive voice

FORMATTING RULES:
- Use ## for H2 headings (main sections)
- Use ### for H3 headings (subsections)
- Keep outline concise but specific
- No bullet points in outline (save for content)

TARGET WORD DISTRIBUTION:
Total: ${brief.wordCount} words
- Introduction: ~${Math.round(brief.wordCount * 0.12)} words
- Each main section: ~${Math.round(brief.wordCount * 0.15)} words
- Conclusion: ~${Math.round(brief.wordCount * 0.08)} words

OUTPUT:
Return a clean markdown outline with natural headings.
- Start with "## Introduction"
- Write natural headings (avoid [brackets] or markers)
- Use ## for main sections, ### for subsections`;
}

/**
 * Generate prompt for section writing (used with Gemini 2.5 Flash)
 *
 * Model: gemini-2.5-flash
 * Temperature: 0.75
 *
 * Key Changes:
 * - Explicit word count requirements
 * - Keyword integration rules (check if intro or middle section)
 * - Answer-first for question-based sections
 * - Strict formatting constraints
 * - Examples of good vs bad content
 */
export function getSectionPrompt(markedOutline: string, brief: ContentBrief, sectionIndex: number, totalSections: number): string {
  const isIntroduction = markedOutline.includes('## Introduction <--');
  const isMiddleSection = sectionIndex >= Math.floor(totalSections / 2) - 1 && sectionIndex <= Math.floor(totalSections / 2) + 1;

  // Calculate section word count based on total
  const baseWordsPerSection = Math.floor(brief.wordCount / (totalSections + 1)); // +1 for intro/conclusion
  const targetWords = isIntroduction ? Math.round(baseWordsPerSection * 0.8) : baseWordsPerSection;

  return `You are an expert content writer specializing in B2B technical content. Your writing is optimized for both human readers and AI citation engines.

TASK: Write the section marked with "<--" in the outline below.

SECTION REQUIREMENTS:

1. WORD COUNT: ${targetWords - 50} to ${targetWords + 50} words for this section
   - Write enough to be comprehensive
   - Break into 2-4 short paragraphs (3-5 sentences each)

2. KEYWORD INTEGRATION:
   Primary Keyword: "${brief.primaryKeyword}"
   Secondary Keywords: ${brief.secondaryKeywords.join(', ') || 'None'}

   ${isIntroduction ? `
   📍 INTRODUCTION SECTION:
   - Lead with a direct answer to the main question (first 2-3 sentences)
   - Include the primary keyword "${brief.primaryKeyword}" naturally in the opening
   - Avoid generic preambles - get to the point quickly
   - Follow the answer with context and supporting details

   Effective approach:
   "${brief.primaryKeyword} achieves [outcome] by [mechanism]. This provides [benefit] for [target audience]."

   Less effective:
   "The industry is changing. Technology evolves. Let's explore ${brief.primaryKeyword}..."
   ` : isMiddleSection ? `
   📍 MIDDLE SECTION:
   - Work in the primary keyword "${brief.primaryKeyword}" if it fits naturally
   - Prioritize readability - only include keyword if it flows well
   - Use secondary keywords where relevant
   ` : `
   - Use secondary keywords where they fit naturally
   - Prioritize clear, readable content over keyword density
   `}

3. STRUCTURE & FORMATTING:
   - If section title is a question: Start with 1-2 sentence direct answer
   - Use ### H3 subheadings for distinct subtopics
   - Use bullet points (-) for lists of 3+ items
   - Use numbered lists (1. 2. 3.) for processes/steps
   - Use **bold** for key terms (max 3-4 per section)
   - Use *italic* sparingly for emphasis

4. CONTENT DEPTH:
   - Provide specific examples (not generic advice)
   - If mentioning data: Use "studies show" or "research indicates" (unless you have specific stats)
   - Technical topics: Include implementation details
   - Comparisons: Use specific feature differences

5. LINK INTEGRATION:
   ${brief.internalLinks.length > 0 ? `- Internal links: ${brief.internalLinks.join(', ')} - integrate naturally with descriptive anchor text` : ''}
   ${brief.externalLinks.length > 0 ? `- External links: ${brief.externalLinks.join(', ')} - cite as authoritative sources` : ''}
   - Format: [descriptive text](URL)

6. AVOID:
   - H1 (#) headings - use H2 (##) and H3 (###) instead
   - Bracket markers in content or headings
   - Tables, code blocks, images (formatting limitations)
   - Emojis and special characters
   - Generic filler phrases
   - Keyword stuffing
   - Long paragraphs without breaks

TONE & STYLE:
- Conversational: Write like talking to a colleague
- Direct: Get to the point quickly
- Confident: You're the expert
- Specific: Use concrete examples
- Active voice: "AI reduces costs" not "Costs are reduced by AI"

FULL OUTLINE WITH SECTION MARKER:
---
${markedOutline}
---

OUTPUT:
Return the section content in Markdown format.
- Skip the section heading (it's in the outline)
- Use H2 (##) and H3 (###) for any sub-headings
- Write natural content without [bracket markers]`;
}

/**
 * Generate prompt for section formatting (used with Gemini 2.5 Flash-Lite)
 *
 * Model: gemini-2.5-flash-lite (switch to save cost)
 * Temperature: 0.4
 *
 * Key Changes:
 * - Stricter constraints to prevent content changes
 * - Explicit rules on when to format
 * - Word count maintenance requirement
 */
export function getFormatSectionPrompt(content: string): string {
  return `You are a content formatting specialist. Your ONLY job is to restructure content for better readability WITHOUT changing meaning or adding information.

TASK: Restructure the section below for improved scannability and AI extractability.

FORMATTING RULES - APPLY ONLY WHERE APPROPRIATE:

1. WHEN TO ADD BULLETS:
   - If you find 3+ items in a sentence → convert to bullet list (-)
   - Series like "X, Y, and Z" → use bullets
   - Keep bullets concise (1-2 sentences max)

2. WHEN TO ADD SUBHEADINGS:
   - If section discusses 2+ distinct subtopics → add ### H3 headings
   - Subheadings must be specific questions or topics
   - Use title case

3. WHEN TO USE NUMBERED LISTS:
   - Step-by-step processes → numbered list (1. 2. 3.)
   - Sequential timelines → numbered list
   - Ranked items → numbered list

4. WHEN TO ADD BOLD:
   - Key terms needing emphasis → **bold**
   - Technical terminology on first use → **bold**
   - Maximum 3-4 bold terms per section

IMPORTANT GUIDELINES:
- Keep all original facts, data, and examples
- Maintain similar word count (±20 words is acceptable)
- Preserve all keyword usage exactly as written
- Keep all links and citations
- Avoid adding new information
- Avoid changing the meaning
- Avoid using tables or code blocks
- Avoid removing important details

STRUCTURE:
- Keep 2-4 paragraphs
- Each paragraph: 3-5 sentences
- Break paragraphs longer than 6 sentences

SECTION TO REFORMAT:
---
${content}
---

OUTPUT:
Return only the reformatted content in Markdown. No preamble, no explanation.`;
}

/**
 * Generate prompt for SEO metadata (used with Gemini 2.5 Flash-Lite)
 *
 * Model: gemini-2.5-flash-lite (switch to save cost)
 * Temperature: 0.25
 *
 * Key Changes:
 * - Strict character limits with validation
 * - Clearer output format (no code blocks)
 * - Better examples
 * - Character count enforcement
 */
export function getSEOMetadataPrompt(markdown: string, brief: ContentBrief): string {
  // Truncate markdown to avoid token limits (keep first 3000 chars)
  const truncatedMarkdown = markdown.slice(0, 3000) + (markdown.length > 3000 ? '...\n[Article continues]' : '');

  return `You are an SEO metadata specialist. Generate metadata from the article below with STRICT character limits.

ARTICLE CONTENT:
${truncatedMarkdown}

PRIMARY KEYWORD: ${brief.primaryKeyword}
ORIGINAL TITLE: ${brief.title}

METADATA REQUIREMENTS:

1. META TITLE:
   - Length: 50-60 characters (Google typically cuts off at 60)
   - Include primary keyword if possible
   - Should be compelling and actionable
   - Aim for complete sentences
   - If over 60 characters, consider revising

2. META DESCRIPTION:
   - Length: 145-155 characters (Google typically shows ~155)
   - Should be compelling (not just descriptive)
   - Include benefit or outcome
   - Aim for complete sentences
   - If over 155 characters, consider revising

3. URL SLUG:
   - Lowercase only
   - Hyphens for spaces (no underscores)
   - Remove all special characters
   - Maximum 5-6 words
   - Include primary keyword if possible
   - Example: "ai-voice-dental-practices"

4. EXCERPT:
   - Length: 140-160 characters
   - 2-3 complete sentences
   - Compelling summary (makes reader want more)
   - Must be different from meta description
   - Extract from article (don't invent)

5. TAGS:
   - Number: 3-5 tags
   - Each: 1-3 words
   - Must be specific (not generic)
   - Extract from article content
   - Avoid generic terms: "marketing", "business", "guide"
   - Prefer specific: "dental automation", "PMS integration"

QUALITY GUIDELINES:
Before returning, consider:
- Title should be 50-60 characters
- Description should be 145-155 characters
- Slug should be lowercase with hyphens only
- Excerpt should be 140-160 characters
- All 5 fields should be filled
- Tags should be specific (not generic)

OUTPUT FORMAT:
Return ONLY this JSON structure. NO markdown code blocks (no \`\`\`), NO backticks, NO extra text.

{
  "title": "Your title here (50-60 chars)",
  "description": "Your description here (145-155 chars)",
  "excerpt": "Your excerpt here (140-160 chars)",
  "slug": "your-slug-here",
  "tags": ["tag1", "tag2", "tag3"]
}

Return raw JSON only. First character should be { and last character should be }. No explanation, no code blocks.`;
}

/**
 * Few-shot examples for better section generation
 * (Can be appended to getSectionPrompt for improved results)
 */
export const SECTION_EXAMPLES = `

EXAMPLE 1 - Introduction Section (Answer-First):

Less effective approach:
"The dental industry has undergone significant transformation in recent years. Technology continues to reshape how practices operate and communicate with patients. One of the most impactful innovations is AI-powered solutions. In this guide, we'll explore AI voice assistants..."

More effective approach:
"AI voice assistants reduce dental practice no-show rates by 40-60% through automated, personalized appointment reminders delivered 48 hours before scheduled visits. These systems integrate directly with practice management software like Dentrix and Eaglesoft to access patient data in real-time, enabling customized outreach without manual staff intervention.

The technology works by triggering automated voice calls based on appointment schedules in your PMS. Unlike generic text reminders, AI assistants can handle patient questions, reschedule appointments, and confirm insurance information through natural conversation. This automation is particularly valuable for practices handling 100+ appointments weekly, where manual reminder calls consume 10-15 staff hours.

Implementation typically takes 2-4 weeks and integrates with existing systems through APIs or middleware platforms like GoHighLevel."

---

EXAMPLE 2 - Middle Section (Technical Depth):

Less effective approach:
"Integration is important. You'll need to work with your software provider. The system connects to your tools. This makes everything work together. It's a straightforward process."

More effective approach:
"**Integration Architecture**

The technical integration between AI voice assistants and practice management systems follows a three-layer approach:

1. **Data Sync Layer**: Middleware (typically GoHighLevel or custom APIs) creates secure PMS database connection
2. **Trigger System**: Appointment schedules sync in real-time, automatically triggering calls 48 hours before appointments
3. **Response Handler**: Patient responses (confirmations, reschedules) write back to PMS appointment calendar

**Timeline Breakdown:**
- Week 1: API access setup and security configuration
- Week 2: Core integration build and data mapping
- Week 3: Workflow automation and call script customization
- Week 4: Staff training and go-live

The primary challenge is PMS API access. Cloud-based systems like Dentrix Ascend provide straightforward REST APIs, while on-premise installations like Eaglesoft may require a secure data connector. In our experience integrating 50+ dental practices, data normalization - ensuring consistent phone number and date formatting between systems - is the most time-intensive phase."
`;

/**
 * SEO Metadata Examples
 */
export const SEO_EXAMPLES = `

EXAMPLE - Effective SEO Metadata:

{
  "title": "AI Voice Assistants Cut Dental No-Shows by 60%",
  "description": "Learn how AI voice assistants reduce dental practice no-shows through automated reminders, PMS integration, and personalized patient outreach.",
  "excerpt": "AI voice assistants reduce dental no-show rates by 40-60% through automated appointment reminders. These systems integrate with your PMS to deliver personalized patient outreach.",
  "slug": "ai-voice-assistants-reduce-dental-no-shows",
  "tags": ["dental automation", "AI voice assistants", "appointment reminders", "PMS integration"]
}

---

EXAMPLE - Less Effective SEO Metadata:

{
  "title": "How Artificial Intelligence Voice Assistant Technology Is Revolutionizing Modern Dental Practice Patient Communication and Appointment Management Systems",
  "description": "This article talks about AI",
  "excerpt": "Read our guide",
  "slug": "Article_About_AI_Voice_Assistants_2025",
  "tags": ["AI", "technology", "dentistry", "business"]
}

Issues:
- Title is 142 characters (way over 60 limit)
- Description is 29 characters (not compelling)
- Excerpt is 14 characters (not useful)
- Slug has underscores and caps
- Tags are too generic
`;
