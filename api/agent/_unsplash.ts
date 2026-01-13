// Unsplash API integration for high-quality curated photos
// Free tier: 50 requests/hour (plenty for daily automation)

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function searchUnsplash(query: string): Promise<string | null> {
    try {
        if (!UNSPLASH_ACCESS_KEY) {
            console.error('[Unsplash] Missing UNSPLASH_ACCESS_KEY');
            return null;
        }

        console.log('[Unsplash] Searching for:', query);

        const url = new URL('https://api.unsplash.com/search/photos');
        url.searchParams.append('query', query);
        url.searchParams.append('per_page', '5'); // Get top 5 results
        url.searchParams.append('orientation', 'squarish'); // Best for LinkedIn
        url.searchParams.append('content_filter', 'high'); // Family-friendly only

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                'Accept-Version': 'v1'
            }
        });

        if (!response.ok) {
            console.error('[Unsplash] API error:', response.status, await response.text());
            return null;
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.log('[Unsplash] No results found');
            return null;
        }

        // Return the first high-quality result
        const photo = data.results[0];
        const imageUrl = photo.urls.regular; // 1080px width (good quality)

        console.log('[Unsplash] Found image:', imageUrl);
        console.log('[Unsplash] Photo by:', photo.user.name);

        // Track download (required by Unsplash API terms)
        if (photo.links?.download_location) {
            fetch(photo.links.download_location, {
                headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` }
            }).catch(() => { }); // Fire and forget
        }

        return imageUrl;

    } catch (error: any) {
        console.error('[Unsplash] Error:', error.message);
        return null;
    }
}
