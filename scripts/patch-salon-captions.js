const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '36wenybq',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function patchCaptions() {
    const doc = await client.fetch(
        '*[_type == "caseStudy" && slug.current == "salon-marketing-automation-roi"][0]{ _id, content }'
    );

    if (!doc) {
        console.error('Case study not found');
        process.exit(1);
    }

    const updatedContent = doc.content.map(block => {
        // Ad video - add caption
        if (block._key === '725c5eef651f') {
            return {
                ...block,
                caption: 'The actual Meta Ad that generated 30 leads at $7/day',
            };
        }
        // Dashboard screenshot - fix alt typo + add caption
        if (block._key === '72ce21619720') {
            return {
                ...block,
                alt: 'Meta Ads Manager dashboard showing 29 leads at $16.46 cost per lead',
                caption: 'Campaign 01 - [RSL] CS Leads. 29 leads, $477 spent, $16.46 CPL.',
            };
        }
        return block;
    });

    await client.patch(doc._id).set({ content: updatedContent }).commit();
    console.log('✅ Patched:');
    console.log('   - Ad video: added caption');
    console.log('   - Dashboard screenshot: fixed alt typo + added caption');
}

patchCaptions().catch(console.error);
