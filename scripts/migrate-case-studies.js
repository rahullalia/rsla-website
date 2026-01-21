const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configuration
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

async function migrate() {
    try {
        // Read migration data
        const dataPath = path.join(__dirname, '../migration_data.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const caseStudies = JSON.parse(rawData);

        console.log(`Found ${caseStudies.length} case studies to migrate...`);

        for (const item of caseStudies) {
            const doc = {
                _id: `case-study-${item.slug}`, // Deterministic ID based on slug
                _type: 'caseStudy',
                title: item.title,
                slug: { _type: 'slug', current: item.slug },
                tag: item.tag,
                description: item.description,
                metrics: item.metrics,
                featured: item.featured,
                category: item.category,
                priority: item.priority,
                annualSavings: item.annualSavings,
                // Default published date to now if not meant to be backdated, 
                // or we could map it if we had it. For now, we'll use current date.
                publishedAt: new Date().toISOString(),
            };

            console.log(`Uploading: ${item.title} (${item.slug})`);
            await client.createOrReplace(doc);
        }

        console.log('Migration complete successfully!');
    } catch (error) {
        console.error('Migration failed:', error.message);
        process.exit(1);
    }
}

migrate();
