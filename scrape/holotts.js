// ./scrape/holotts.js

const axios = require('axios');
const crypto = require('crypto');

const hololiveModels = {
  "tokinosora": {
    "name": "Tokino Sora",
    "model": "weights/hololive-jp/Sora/Sora_RigidSpinner.pth",
    "index": "weights/hololive-jp/Sora/added_IVF4947_Flat_nprobe_1_SoraTokino_v2_mbkm.index"
  },
  "roboco": {
    "name": "Roboco",
    "model": "weights/hololive-jp/Roboco/Roboco_Itaxhix.pth",
    "index": "weights/hololive-jp/Roboco/added_IVF1568_Flat_nprobe_1_Roboco_v2_mbkm.index"
  },
  "sakuramiko": {
    "name": "Sakura Miko",
    "model": "weights/hololive-jp/Miko/Miko_IshimaIshimsky.pth",
    "index": "weights/hololive-jp/Miko/added_IVF256_Flat_nprobe_1_sakura-miko-rmvpe-fix_v2.index"
  },
  "hoshimachisuisei": {
    "name": "Hoshimachi Suisei",
    "model": "weights/hololive-jp/Suisei/Suisei_Dacoolkid_MakiLigon.pth",
    "index": "weights/hololive-jp/Suisei/added_IVF3248_Flat_nprobe_1_mbkm.index"
  },
  "azki": {
    "name": "AZKi",
    "model": "weights/hololive-jp/AZKi/AZKi_KitLemonfoot.pth",
    "index": "weights/hololive-jp/AZKi/added_IVF3086_Flat_nprobe_1_AZKi_Hybrid_v2_mbkm.index"
  },
  "yozoramel": {
    "name": "Yozora Mel",
    "model": "weights/hololive-jp/Mel/Mel_Sui.pth",
    "index": "weights/hololive-jp/Mel/added_IVF2214_Flat_nprobe_1_Mel_v2_mbkm.index"
  },
  "shirakamifubuki": {
    "name": "Shirakami Fubuki",
    "model": "weights/hololive-jp/Fubuki/Fubuki_Acato.pth",
    "index": "weights/hololive-jp/Fubuki/added_IVF1895_Flat_nprobe_1_Shirakami_Fubuki_v2_mbkm.index"
  },
  "haachama": {
    "name": "Haachama",
    "model": "weights/hololive-jp/Haachama/Haachama_Dacoolkid.pth",
    "index": "weights/hololive-jp/Haachama/added_IVF4350_Flat_nprobe_1_mbkm.index"
  },
  "akirosenthal": {
    "name": "Aki Rosenthal",
    "model": "weights/hololive-jp/Aki/Aki_Yeey5.pth",
    "index": "weights/hololive-jp/Aki/added_IVF646_Flat_nprobe_1_AkiRosenthal_v2.index"
  }
};

function generateSessionHash() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 11; i++) {
    const byte = crypto.randomBytes(1)[0];
    result += chars[byte % chars.length];
  }
  return result;
}

async function ttsHololive(text, characterKey) {
  const character = hololiveModels[characterKey.toLowerCase()];
  if (!character) throw new Error('Karakter tidak ditemukan');

  const session_hash = generateSessionHash();

  const payload = {
    data: [
      character.name,
      character.model,
      character.index,
      "",
      null,
      text,
      "English-Ana (Female)",
      0,
      "pm",
      0.4,
      1,
      0,
      1,
      0.23
    ],
    event_data: null,
    fn_index: 52,
    trigger_id: 711,
    session_hash
  };

  await axios.post("https://kit-lemonfoot-vtuber-rvc-models.hf.space/queue/join?__theme=system", payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  const response = await axios.get(`https://kit-lemonfoot-vtuber-rvc-models.hf.space/queue/data?session_hash=${session_hash}`, {
    responseType: 'stream',
    headers: { 'Accept': 'text/event-stream' }
  });

  return new Promise((resolve, reject) => {
    let audioUrl = null;

    response.data.on('data', chunk => {
      const lines = chunk.toString().split('\n');
      for (let line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(line.replace('data: ', ''));
            if (parsed.msg === 'process_completed') {
              audioUrl = parsed.output.data[1].url;
              resolve(audioUrl);
              response.data.destroy();
              return;
            }
          } catch { }
        }
      }
    });

    response.data.on('error', err => reject(err));
    response.data.on('end', () => {
      if (!audioUrl) reject(new Error('Audio tidak ditemukan'));
    });
  });
}

module.exports = {
  ttsHololive,
  hololiveModels
};