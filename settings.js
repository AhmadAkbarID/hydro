const chalk = require("chalk")
const fs = require("fs")

// ======================== Setting Menu & Media ===================== \\
/*
global.prefix = ['','!','.','#','&']
global.thumbnail = 'https://raw.githubusercontent.com/AhmadAkbarID/media/refs/heads/main/menu.jpg' 
global.music = 'https://raw.githubusercontent.com/AhmadAkbarID/media/main/menu.mp3'
global.defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'

 COMING SOON

global.thum = global.thumbnail
global.log0 = global.thumbnail
global.err4r = global.thumbnail
global.thumb = global.thumbnail
*/
// ======================== Info Owner ===================== \\
global.ownername = 'FocaBars'
global.owner = ['6285187063723', '6288276554694']
global.ownernomer = '6285187063723'
global.ownernumber = '6285187063723'
global.ownerNumber = ["6285187063723@s.whatsapp.net"]
global.creator = "6285187063723@s.whatsapp.net"
global.ig = '@focabar'
global.tele = 'miminhydro'
global.ttowner = '@focabar'
global.socialm = 'GitHub: -'
global.location = 'Indonesia' 
global.ownerweb = ""

// ======================== Info Bot ===================== \\
global.botname = "Asisten Hydro 🌊"
global.botnumber = '6283867608750'
global.websitex = ""
global.wagc = "https://chat.whatsapp.com/FvSBEz1UezQ4G7Xwfrr9sF"
global.saluran = "https://whatsapp.com/channel/0029VbAYRBf4o7qSa74h2m0t"
global.themeemoji = '🏞️'
global.wm = "Asisten Hydro ||| WhatsApps Bots"
global.botscript = 'Dah gede nyari sc 🗿🖕'
global.packname = "HYDRO"
global.author = "\n\n\n\n\nDibuat Oleh Asisten Hydro\nNo hape/wa : 6283867608750"
global.sessionName = 'furina'
global.hituet = 0

// ======================== API Keys ===================== \\
// Jika mau nambah api sendiri ke https://asitha.top/login?ref=ahmadakb6455
global.nz = [
    'nz-e98e71fd41',
    'nz-f0ccb09fe1',
    'nz-d7f75016a2',
    'nz-97bf45bd87',
    'nz-4ce5fb3be3'
]
global.frch = [
    "29015f61cbaa2b36f26bcd61c0b087c0421e4f8f16c67809d4b67091863bf483",
    "3b00b2f1d5201dee96ed46eca909ef4be8abdbad1bc876fe6384bc42256ed24f"
] 
// ======================== Respon Bot ===================== \\
global.mess = {
   wait: "*_Tunggu Sebentar.. Bot lagi berenang... 🏊_*",
   success: "Yay! Bot berhasil 🎉",
   on: "Yay! Nyala nih! 😝",
   off: "Ahh! Mati deh.. 😴",
   query: {
       text: "Teksnya mana? Aku kan gabisa baca pikiran kaka 😉",
       link: "Linknya dongg.. Aku gabisa tanpa link 😖",
       image: "Gambarnya mana nih? jahat banget engga ngasi:<",
   },
   error: {
       fitur: "Whoops! Eror nih.. laporkan ke owner agar diperbaiki 6285187063723 🙏",
   },
   only: {
       group: "Eh, Kak! Fitur ini bisanya buat grup nihh 🫂",
       private: "Eh, Kak! Fitur ini cuman bisa dipake chat pribadi! 🌚",
       owner: "Hanya untuk sang *Raja* 👑",
       admin: "Fitur ini cuman bisa dipake admin grup yah! 🥳",
       badmin: "Waduh! Aku butuh jadi admin agar bisa menggunakan fitur ini 🤯",
       premium: "Kak, ini fitur premium loh! Biar bisa jadi premium beli di 6285187063723 agar bisa menggunakan fitur ini 🤫",
   }
}

// ======================== Auto Reload File ===================== \\
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update '${__filename}'`))
	delete require.cache[file]
	require(file)
})
