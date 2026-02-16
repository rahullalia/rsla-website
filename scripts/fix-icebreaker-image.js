const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
    projectId: '36wenybq',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function main() {
    // 1. Upload the correct image to Sanity
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'case-studies', 'email-ice-breaker', 'workflow-screenshot.webp');
    const imageBuffer = fs.readFileSync(imagePath);

    console.log('Uploading workflow screenshot to Sanity...');
    const asset = await client.assets.upload('image', imageBuffer, {
        filename: 'make-com-workflow-screenshot.webp',
        contentType: 'image/webp',
    });
    console.log('Uploaded asset:', asset._id);

    // 2. Fetch the current document
    const doc = await client.fetch('*[_type=="caseStudy" && slug.current=="ai-cold-email-personalization"][0]{_id, content}');
    if (!doc) {
        console.error('Case study not found!');
        process.exit(1);
    }

    // 3. Find and replace the image block
    const updatedContent = doc.content.map(block => {
        if (block._type === 'caseStudyImage' && block._key === 'wav0gylong') {
            console.log('Replacing image block with new asset...');
            return {
                ...block,
                asset: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id,
                    },
                },
            };
        }
        return block;
    });

    // 4. Patch the document
    const result = await client
        .patch(doc._id)
        .set({ content: updatedContent })
        .commit();

    console.log('Done! Updated document revision:', result._rev);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
