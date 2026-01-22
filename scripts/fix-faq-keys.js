/**
 * Fix missing _key properties in faqSchema arrays
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/fix-faq-keys.js
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

function generateKey() {
    return Math.random().toString(36).substring(2, 15);
}

async function fixFaqKeys() {
    console.log('Fetching case studies with FAQ schema...\n');

    const query = `*[_type == "caseStudy" && defined(faqSchema)] {
        _id,
        "slug": slug.current,
        faqSchema
    }`;

    const caseStudies = await client.fetch(query);
    console.log(`Found ${caseStudies.length} case studies with FAQ schema\n`);

    let fixedCount = 0;

    for (const cs of caseStudies) {
        const needsFix = cs.faqSchema.some(faq => !faq._key);

        if (!needsFix) {
            console.log(`✓ ${cs.slug}: Keys already present`);
            continue;
        }

        console.log(`🔧 ${cs.slug}: Adding missing keys...`);

        const fixedFaqs = cs.faqSchema.map(faq => ({
            ...faq,
            _key: faq._key || generateKey(),
        }));

        try {
            await client.patch(cs._id)
                .set({ faqSchema: fixedFaqs })
                .commit();
            console.log(`   ✅ Fixed ${fixedFaqs.length} FAQ items`);
            fixedCount++;
        } catch (error) {
            console.error(`   ❌ Error: ${error.message}`);
        }
    }

    console.log(`\n=== Done ===`);
    console.log(`Fixed: ${fixedCount} case studies`);
}

fixFaqKeys().catch(console.error);
