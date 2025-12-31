# Case Study Revamp Plan

## Goal
Rewrite and refresh the 12 case studies on [rsla.io/work](https://rsla.io/work) to be more impactful, while maintaining the existing inner page structure and media assets.

## Current State Analysis
*   **Total Case Studies**: 12
*   **Architecture**:
    *   **List Page**: Hardcoded array in `src/app/work/page.tsx`.
    *   **Inner Pages**: Next.js App Router folders (e.g., `src/app/work/market-research-automation/`).
    *   **Content**: Hardcoded in a child component (e.g., `MarketResearchContent.tsx`) using a shared `<CaseStudyLayout>`.
    *   **Structure**: Header → Key Metrics → Challenge → Key Takeaway → Solution (Phased) → Key Results → Takeaway → CTA.

## Strategy for "Impactful" Content
To increase impact without changing the visual structure, we will focus on **High-Contrast Storytelling**:
1.  **Sharpen the Hero Heading**: Move from descriptive titles to outcome-based headlines.
    *   *Before*: "Automation Platform Saving $136K Annually..."
    *   *After*: "How We Recovered $136K/Year by Replacing Manual Data Entry with AI" (Active Voice).
2.  **"Bleeding Neck" Problems**: Rewrite the "Challenge" section to emphasize the *pain* and *risk* of the status quo, not just the inefficiency.
3.  **Active Engineering**: In "The Solution", use stronger verbs (e.g., "Architected," "Engineered," "Eliminated" vs "Built," "Used").
4.  **SEO & Slug Optimization**: Rename slugs to include high-intent keywords while keeping them readable.

## Strategic Direction
Based on the goal of "impactful" presentation, we are proceeding with the following strategic choices:

### 1. Target Audience: **Growth-Minded Founders & Executives**
*   **Why**: These are the decision-makers who sign checks. They care about *outcomes*, scalability, and removing bottlenecks.
*   **Approach**: Lead with the "Business Transformation" aspect. Use technical details as *proof* of competence, not the main hook.
*   **Key Phrase**: "Engineered Outcomes" (Use this framing repeatedly).

### 2. Tone: **Premium & Authoritative**
*   **Style**: Confident, concise, and professional. Avoid passive voice.
*   **Do**: "We architected a solution that eliminated X."
*   **Don't**: "The solution was built to help with X."
*   **Vibe**: High-end boutique consultancy, not a generic freelancer.

### 3. SEO & URL Strategy: **Keyword-Rich & Outcome-Driven**
*   We will **rename slugs** to capture high-intent search traffic.
*   New slugs will follow the pattern: `[core-technology]-[business-outcome]` or `[industry]-[solution]`.

## Proposed Slug Mapping (For Claude)
Claude, please use this mapping when renaming directories.

| Original Slug | Refactored Slug | Reasoning |
| :--- | :--- | :--- |
| `market-research-automation` | `market-research-data-scraping-automation` | Adds "Data Scraping" keyword |
| `casagrande-salon` | `salon-marketing-automation-roi` | Adds niche + outcome |
| `email-ice-breaker-automation` | `ai-cold-email-personalization` | "Cold Email" is a stronger keyword than "Ice Breaker" |
| `united-sikhs` | `nonprofit-crm-volunteer-automation` | Industry + Solution specific |
| `proposal-generator-automation` | `ai-proposal-generator-sales-workflow` | targeting "Sales Workflow" |
| `spice-on-a-slice` | `local-seo-reputation-management` | More descriptive of service |
| `facebook-ads-reporting-automation` | `marketing-analytics-reporting-automation` | Broader appeal than just "Facebook" |
| `email-autoresponder-automation` | `ai-lead-response-autoresponder` | Focus on "Leads" |
| `ai-media-automation-founding-engineer` | `media-content-operations-ai` | Focus on Ops/Content |
| `cleaning-company-automation` | `field-service-operations-automation` | Broader industry term "Field Service" |
| `rsl-blog-automation` | `seo-content-marketing-automation` | High value keyword |
| `smart-factory-robot-integration` | `iot-manufacturing-robot-tracking` | Specific industry terms |

## Execution Plan (For Claude)

### Phase 1: File Structure & Metadata
1.  **Rename Directories**: Execute the slug changes per the table above.
    *   `mv src/app/work/[old] src/app/work/[new]`
2.  **Update `page.tsx` Metadata**:
    *   Rewrite `title` to be outcome-focused (e.g., "From 4 Months to 2 Weeks: Market Research Automation").
    *   Update `canonical` and OpenGraph URLs to match the new slug.

### Phase 2: Content Rewriting (`[Name]Content.tsx`)
For each case study component, apply the **Premium/Authoritative** tone:
*   **Header**: Change the `title` prop to the new, punchy headline.
*   **The Challenge**: Start with a "Hook".
    *   *Example*: "Inconsistent data wasn't just an annoyance; it was costing them $136k/year."
*   **The Solution**: Use "Power Verbs".
    *   *Change*: "We used Python..." -> "We leveraged Python's multi-threading capabilities to..."
*   **The Results**: Make the stats the hero. Ensure the visual `stats` array matches the text.
*   **Key Takeaways**: Write these as "Executive Axioms"—short, shareable truths about business and automation.

### Phase 3: Global Updates
1.  **Update `src/app/work/page.tsx`**:
    *   Update the `caseStudies` array.
    *   Ensure `slug` property matches the new directory names exactly.
    *   Update `title` and `description` to match the refreshed content.
2.  **Redirects (Optional/Note to User)**:
    *   *Note*: If hosted on Vercel/Next.js, consider adding a `redirects` section in `next.config.js` if preserving old links is critical.

## Verification Checklist
*   [ ] All 12 pages load with new URLs.
*   [ ] Browser back/forward navigation works.
*   [ ] "Work" main page list links point to correct new slugs.
*   [ ] No broken images or missing styles.
*   [ ] Tone check: Does it sound like a premium consultancy?

## List of Case Studies to Refactor
1.  `market-research-automation`
2.  `casagrande-salon`
3.  `email-ice-breaker-automation`
4.  `united-sikhs`
5.  `proposal-generator-automation`
6.  `spice-on-a-slice`
7.  `facebook-ads-reporting-automation`
8.  `email-autoresponder-automation`
9.  `ai-media-automation-founding-engineer`
10. `cleaning-company-automation`
11. `rsl-blog-automation`
12. `smart-factory-robot-integration`
