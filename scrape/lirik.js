const fetch = require('node-fetch');

/**
 * Mencari lirik lagu dengan perbaikan untuk URL yang mengandung HTML entities.
 * @param {string} query Judul lagu yang dicari.
 * @returns {Promise<object>} Mengembalikan objek berisi detail lagu dan lirik, atau objek error jika gagal.
 */
async function lirik(query) {
    let trackInfo = { track_name: query };

    try {
        // Tahap 1: Mencari lagu
        const searchUrl = `https://api.siputzx.my.id/api/s/musixmatch?query=${encodeURIComponent(query)}`;
        const searchResponse = await fetch(searchUrl);
        const searchResult = await searchResponse.json();

        if (!searchResult?.status || !searchResult?.data?.length) {
            return { error: `❌ Lirik untuk *"${query}"* tidak ditemukan.` };
        }

        const track = searchResult.data[0]?.track;
        if (!track) {
            return { error: `❌ Lirik untuk *"${query}"* tidak ditemukan (struktur data tidak valid).` };
        }

        trackInfo = track;
        let trackShareUrl = track.track_share_url;

        if (!trackShareUrl) {
            return { error: `❌ Tidak dapat menemukan URL lirik untuk *"${trackInfo.track_name}"*.` };
        }

        // --- PERBAIKAN UTAMA ---
        // Mengganti HTML entity '&amp;' kembali menjadi '&' sebelum encoding.
        const cleanedUrl = trackShareUrl.replace(/&amp;/g, "&");
        // -----------------------

        // Tahap 2: Mengambil lirik dari URL yang sudah dibersihkan
        const lyricsUrl = `https://api.siputzx.my.id/api/get/musixmatch?url=${encodeURIComponent(cleanedUrl)}`;
        
        console.log("--- URL LIRIK YANG DIAKSES OLEH BOT ---");
        console.log(lyricsUrl);

        const lyricsResponse = await fetch(lyricsUrl);
        const lyricsResult = await lyricsResponse.json();
        
        if (!lyricsResult?.status || !lyricsResult?.data?.lyrics) {
            const apiMessage = lyricsResult?.message || "API tidak memberikan data lirik.";
            return { error: `❌ Gagal mengambil lirik untuk *"${trackInfo.track_name}"*.

Alasan: ${apiMessage}` };
        }

        // Jika semua berhasil
        return {
            trackName: trackInfo.track_name,
            artistName: trackInfo.artist_name || 'Artis Tidak Ditemukan',
            albumName: trackInfo.album_name || 'Album Tidak Ditemukan',
            duration: trackInfo.track_length || 0,
            lyrics: lyricsResult.data.lyrics
        };

    } catch (error) {
        console.error("Error di scrape/lirik.js:", error);
        return { error: `❌ Kesalahan tak terduga saat memproses *"${trackInfo.track_name}"*: ${error.message}` };
    }
}

module.exports = { lirik };