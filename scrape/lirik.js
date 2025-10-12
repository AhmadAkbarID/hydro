const axios = require('axios');

async function lirik(title) {
    try {
        if (!title) throw new Error('Judul lagu diperlukan');

        const { data } = await axios.get(`https://lrclib.net/api/search?q=${encodeURIComponent(title)}`, { // Thanks To Nekolabs
            headers: {
                referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
            }
        });
        
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { lirik };