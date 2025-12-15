import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

/**
 * Model Selection Strategy:
 * - Gemini 2.5 Pro: Outline generation (best reasoning & structure)
 * - Gemini 2.5 Flash: Everything else (sections, formatting, SEO)
 *
 * Cost per 1500-word article:
 * - Outline (Pro, ~1500 tokens): $0.02
 * - Sections (Flash, ~12000 tokens): $0.12
 * - Formatting (Flash, ~2500 tokens): $0.008
 * - SEO (Flash, ~1000 tokens): $0.003
 * Total: ~$0.15/article
 */

/**
 * Generate outline using Gemini 2.5 Pro
 * Temperature: 0.7 for balanced creativity + structure
 */
export async function generateOutline(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-pro',
      generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 2048 },
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini Pro generation error:', error);
    throw new Error(`Gemini Pro failed: ${error.message}`);
  }
}

/**
 * Generate section content using Gemini 2.5 Flash
 * Temperature: 0.75 for creative writing
 */
export async function generateSection(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.75, topP: 0.95, maxOutputTokens: 2048 },
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini Flash generation error:', error);
    throw new Error(`Gemini Flash failed: ${error.message}`);
  }
}

/**
 * Format section using Gemini 2.5 Flash
 * Temperature: 0.4 for consistent structural changes
 */
export async function formatSection(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.4, topP: 0.9, maxOutputTokens: 2048 },
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini Flash formatting error:', error);
    throw new Error(`Gemini Flash formatting failed: ${error.message}`);
  }
}

/**
 * Generate SEO metadata using Gemini 2.5 Flash
 * Temperature: 0.3 for high consistency in structured output
 */
export async function generateSEOMetadata(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 512 },
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini Flash SEO generation error:', error);
    throw new Error(`Gemini Flash SEO failed: ${error.message}`);
  }
}

/**
 * Parse JSON from Gemini response (for SEO metadata)
 * Handles raw JSON and markdown code blocks
 */
export function parseJSONFromResponse(text: string): any {
  const cleaned = text.trim();

  // Check for empty response
  if (!cleaned) {
    console.error('[JSON Parse] Empty response from Gemini');
    throw new Error('Empty response from Gemini - cannot parse JSON');
  }

  // Try to extract JSON from markdown code blocks
  const jsonMatch = cleaned.match(/```json\n([\s\S]*?)\n```/) || cleaned.match(/```\n([\s\S]*?)\n```/);

  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error('[JSON Parse] Failed to parse markdown block:', jsonMatch[1].substring(0, 200));
      throw new Error(`Invalid JSON in markdown block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Try to parse directly
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    // If it still has backticks, try removing them
    try {
      const withoutBackticks = cleaned.replace(/```json|```/g, '').trim();
      return JSON.parse(withoutBackticks);
    } catch (finalError) {
      // Log the actual response for debugging
      console.error('[JSON Parse] Failed all parsing attempts. Response preview:', cleaned.substring(0, 300));
      console.error('[JSON Parse] Response length:', cleaned.length);
      throw new Error(`Failed to parse JSON response. Length: ${cleaned.length}, Preview: ${cleaned.substring(0, 100)}...`);
    }
  }
}
