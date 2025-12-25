const axios = require('axios');
const https = require('https');

const SaveNow = {
    _api: 'https://p.savenow.to',
    _key: 'dfcb6d76f2f6a9894gjkege8a4ab232222',
    _agent: new https.Agent({ rejectUnauthorized: false }),

    poll: async (url, limit = 40) => {
        for (let i = 0; i < limit; i++) {
            try {
                const { data } = await axios.get(url, { httpsAgent: SaveNow._agent });
                if (data.success === 1 && data.download_url) return data;
                if (data.success === -1) break;
            } catch (e) {}
            await new Promise(resolve => setTimeout(resolve, 2500));
        }
        return null;
    }
};

async function ytdlv1(url, type) {
    try {
        const endpoint = type === 'audio' 
            ? `https://ytdlpyton.nvlgroup.my.id/download/audio?url=${encodeURIComponent(url)}&mode=url`
            : `https://ytdlpyton.nvlgroup.my.id/download/?url=${encodeURIComponent(url)}&resolution=${type}&mode=url`;
        const { data } = await axios.get(endpoint);
        return {
            title: data.title || 'YouTube Media',
            download_url: data.download_url,
            status: true
        };
    } catch (e) {
        return { status: false };
    }
}

async function ytdlv2(url, type) {
    try {
        const format = type === 'audio' ? 'mp3' : 'mp4';
        const { data } = await axios.get(`https://api.nekolabs.my.id/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=${format}`);
        if (data.success && data.result) {
            return {
                title: data.result.title || 'YouTube Media',
                download_url: data.result.downloadUrl,
                status: true
            };
        }
        return { status: false };
    } catch (e) {
        return { status: false };
    }
}

async function ytdlv3(url, resolution) {
    try {
        const { data } = await axios.get(`https://anabot.my.id/api/download/ytmp4?url=${url}&quality=${resolution}&apikey=freeApikey`);
        if (data.success && data.data && data.data.result) {
            return {
                title: data.data.result.metadata.title || 'YouTube Video',
                download_url: data.data.result.urls,
                status: true
            };
        }
        return { status: false };
    } catch (e) {
        return { status: false };
    }
}

async function ytdlv4(url, res) {
    try {
        const format = res === 'audio' ? 'mp3' : res;
        const { data: init } = await axios.get(`${SaveNow._api}/ajax/download.php`, {
            params: { copyright: 0, format: format, url: url, api: SaveNow._key },
            httpsAgent: SaveNow._agent
        });
        if (!init.success) return { status: false };
        const result = await SaveNow.poll(init.progress_url);
        if (result && result.download_url) {
            return {
                status: true,
                title: init.info?.title || "YouTube Media",
                download_url: result.download_url
            };
        }
        return { status: false };
    } catch (e) {
        return { status: false };
    }
}

module.exports = { ytdlv1, ytdlv2, ytdlv3, ytdlv4 };