/**
 * Migrate existing case study images to enhanced SEO format
 * Converts basic image blocks to caseStudyImage blocks with alt, caption, credit
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/migrate-images-seo.js
 */

const { createClient } = require('@sanity/client');

const config = {
    projectId: '36wenybq',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
};

if (!config.token) {
    console.error('Error: SANITY_API_TOKEN environment variable is required.');
    process.exit(1);
}

const client = createClient(config);

// Image context mapping based on case study content
const imageContextMap = {
    'ai-cold-email-personalization': {
        pattern: /workflow/i,
        alt: 'Email personalization workflow automation in Make.com',
        caption: 'Make.com automation workflow for AI-powered email personalization',
        credit: '© RSL/A'
    },
    'ai-lead-response-autoresponder': {
        pattern: /workflow/i,
        alt: 'Lead autoresponder workflow with SMS and email automation',
        caption: 'Automated lead response workflow in GHL',
        credit: '© RSL/A'
    },
    'salon-marketing-automation-roi': {
        pattern: /workflow|ghl/i,
        alt: 'Salon CRM automation workflow in GoHighLevel',
        caption: 'GHL workflow showing salon marketing automation sequence',
        credit: '© RSL/A'
    },
    'local-seo-reputation-management': {
        pattern: /before|after|review/i,
        alt: 'Before and after comparison of Google Business Profile reviews',
        caption: 'Review growth comparison showing reputation management results',
        credit: '© RSL/A'
    },
    'seo-content-marketing-automation': {
        pattern: /typeform|form/i,
        alt: 'Content intake form for automated blog generation',
        caption: 'Typeform content intake workflow',
        credit: '© RSL/A'
    },
    // Default for any other case study
    'default': {
        alt: 'Case study workflow automation screenshot',
        caption: 'Automation workflow diagram',
        credit: '© RSL/A'
    }
};

async function fetchAllCaseStudies() {
    const query = `*[_type == "caseStudy"] {
        _id,
        title,
        "slug": slug.current,
        content
    }`;
    return await client.fetch(query);
}

function migrateImageBlocks(content, slug) {
    if (!content || !Array.isArray(content)) return { content, changes: 0 };

    let changes = 0;
    const contextInfo = imageContextMap[slug] || imageContextMap['default'];

    const newContent = content.map((block, index) => {
        // Only migrate basic image blocks (not already caseStudyImage)
        if (block._type === 'image' && block.asset) {
            changes++;

            // Generate contextual alt text
            const existingAlt = block.alt || '';
            let alt = existingAlt;

            // If no alt or generic alt, use context map
            if (!alt || alt === 'Blog image' || alt.length < 10) {
                alt = contextInfo.alt;
            }

            return {
                _type: 'caseStudyImage',
                _key: block._key || `img-${index}-${Date.now()}`,
                asset: {
                    _type: 'image',
                    asset: block.asset
                },
                alt: alt,
                caption: contextInfo.caption,
                credit: contextInfo.credit,
            };
        }
        return block;
    });

    return { content: newContent, changes };
}

async function migrateCaseStudyImages() {
    console.log('Fetching all case studies...\n');
    const caseStudies = await fetchAllCaseStudies();

    console.log(`Found ${caseStudies.length} case studies\n`);

    let totalMigrated = 0;
    let totalImages = 0;

    for (const cs of caseStudies) {
        const { content, changes } = migrateImageBlocks(cs.content, cs.slug);

        if (changes > 0) {
            console.log(`📷 ${cs.slug}: Migrating ${changes} image(s)...`);

            try {
                await client.patch(cs._id)
                    .set({ content: content })
                    .commit();

                console.log(`   ✅ Updated successfully`);
                totalMigrated++;
                totalImages += changes;
            } catch (error) {
                console.error(`   ❌ Error: ${error.message}`);
            }
        } else {
            console.log(`⏭️  ${cs.slug}: No basic images to migrate`);
        }
    }

    console.log('\n=== Migration Complete ===');
    console.log(`📊 Case studies updated: ${totalMigrated}`);
    console.log(`🖼️  Images migrated: ${totalImages}`);
}

// Run migration
migrateCaseStudyImages().catch(console.error);
