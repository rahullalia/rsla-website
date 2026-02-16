/**
 * Ping IndexNow with all site URLs after deployment.
 * Runs automatically as a postbuild step.
 *
 * Can also be run manually: node scripts/ping-indexnow.js
 */

const INDEXNOW_KEY = '825c930313dd49b5909adebb4c54db52';
const HOST = 'rsla.io';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function pingIndexNow() {
  // Fetch the sitemap to get all URLs
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    console.log(`Could not fetch sitemap (${res.status}). Skipping IndexNow ping.`);
    return;
  }

  const xml = await res.text();

  // Extract URLs from sitemap XML
  const urls = [...xml.matchAll(/<loc>(.+?)<\/loc>/g)].map(m => m[1]);

  if (urls.length === 0) {
    console.log('No URLs found in sitemap. Skipping.');
    return;
  }

  console.log(`Pinging IndexNow with ${urls.length} URLs...`);

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (response.ok || response.status === 200) {
    console.log(`IndexNow: ${urls.length} URLs submitted successfully.`);
  } else {
    console.log(`IndexNow responded with ${response.status}. URLs may not have been indexed.`);
  }
}

pingIndexNow().catch(err => {
  console.log(`IndexNow ping failed: ${err.message}. Skipping.`);
});
