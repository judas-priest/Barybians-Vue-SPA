export function online($lastVisit) {
  $lastVisit = new Date($lastVisit * 1000)
  var d = new Date()
  var dif = d - $lastVisit
  dif = Math.round(dif / 1000 / 60)
  if (dif >= 3) return false
  else return true
}
export function preloaderStop() {
  function none() {
    document.getElementById('preloader').style.display = 'none'
    document.getElementById('preloader').classList.remove('hidden')
  }
  document.getElementById('preloader').classList.add('hidden')
  document.getElementById('preloader').classList.remove('visible'),
    setTimeout(none, 1e3)

  document.getElementById('preloader').style.zIndex = '-1'
  document.documentElement.style.overflowY = 'scroll'
  //console.log('preloader');
}

export function preloaderStart() {
  document.getElementById('preloader').style.zIndex = '9999'
  document.getElementById('preloader').classList.remove('hidden')
  document.getElementById('preloader').style.display = ''
  document.getElementById('preloader').classList.add('visible')
  //console.log('preloaderReset');
}

const emojis =
  '👨‍👩‍👦,👩‍❤️‍💋‍👨,🦹‍♂️,🦹‍♀️,🧙‍♂️,🧙‍♀️,🧚‍♂️,🧚‍♀️,🧛‍♂️,🧛‍♀️,🧜‍♂️,🧜‍♀️,🧝‍♂️,🧝‍♀️,🧞‍♂️,🧞‍♀️,🧟‍♂️,🧟‍♀️,💆‍♂️,💆‍♀️,💇‍♂️,💇‍♀️,🚶‍♂️,🚶‍♀️,🧍‍♂️,🧍‍♀️,🧎‍♂️,🧎‍♀️,🧑‍🦯,👨‍🦯,👩‍🦯,🧑‍🦼,👨‍🦼,👩‍🦼,🧑‍🦽,👨‍🦽,👩‍🦽,🏃‍♂️,🏃‍♀️,🕴️,👯‍♂️,👯‍♀️,🧖‍♂️,🧖‍♀️,🧑‍🤝‍🧑,🧑‍🎄,🦸‍♂️,🦸‍♀️,👰‍♂️,👰‍♀️,👩‍🍼,👨‍🍼,🧑‍🍼,👮‍♂️,🕵️‍♂️,💂‍♂️,👷‍♂️,🤵‍♂️,🤵‍♀️,🤵,👨‍🚒,👩‍🚒,🧑‍⚕️,👨‍⚕️,👩‍⚕️,🧑‍🎓,👨‍🎓,👩‍🎓,🧑‍🏫,👨‍🏫,👩‍🏫,🧑‍⚖️,👨‍⚖️,👩‍⚖️,🧑‍🌾,👨‍🌾,👩‍🌾,🧑‍🍳,👨‍🍳,👩‍🍳,🧑‍🔧,👨‍🔧,👩‍🔧,🧑‍🏭,👨‍🏭,👩‍🏭,🧑‍💼,👨‍💼,👩‍💼,🧑‍🔬,👨‍🔬,👩‍🔬,🧑‍💻,👨‍💻,👩‍💻,🧑‍🎤,👨‍🎤,👩‍🎤,🧑‍🎨,👨‍🎨,👩‍🎨,🧑‍✈️,👨‍✈️,👩‍✈️,🧑‍🚀,👨‍🚀,👩‍🚀,🧑‍🚒,🙇‍♂️,💁‍♀️,🙅‍♀️,🙆‍♀️,🙋‍♀️,🧏‍♂️,🧏‍♀️,🙍‍♀️,🙎‍♀️,👨‍🦰,👨‍🦱,👨‍🦳,👨‍🦲,👩‍🦰,🧑‍🦰,👩‍🦱,🧑‍🦱,👩‍🦳,🧑‍🦳,👩‍🦲,🧑‍🦲,👱‍♀️,👱‍♂️,🧜,👳‍♂️,🤷‍♀️,🤦‍♀️,🤦‍♂️,🤷‍♂️,👩‍❤️‍👨,👩‍❤️‍💋‍👩,👩‍👩‍👧‍👧,👩‍👩‍👧‍👦,👩‍👩‍👦‍👦,👨‍❤️‍💋‍👨,👨‍👩‍👧‍👧,👨‍👩‍👧‍👦,👨‍👩‍👦‍👦,👨‍👨‍👧‍👧,👨‍👨‍👧‍👦,👨‍👨‍👦‍👦,👩‍❤️‍👩,👩‍👩‍👧,👩‍👩‍👦,👩‍👧‍👧,👩‍👧‍👦,👩‍👦‍👦,👨‍❤️‍👨,👨‍👩‍👧,👨‍👨‍👧,👨‍👨‍👦,👨‍👧‍👧,👨‍👧‍👦,👨‍👦‍👦,👩‍👧,👩‍👦,👨‍👧,👨‍👦,😂,❤️,♥️,😍,😭,😊,😒,😘,💕,☺️,😩,👌🏿,👌🏾,👌🏽,👌🏼,👌🏻,👌,😔,😏,😁,♻️,😉,👍🏿,👍🏾,👍🏽,👍🏼,👍🏻,👍,🙏🏿,🙏🏾,🙏🏽,🙏🏼,🙏🏻,🙏,😌,🎶,😳,🙌🏿,🙌🏾,🙌🏽,🙌🏼,🙌🏻,🙌,🙈,😢,😎,✌🏿,✌🏾,✌🏽,✌🏼,✌🏻,✌️,👀,😅,✨,😴,😄,💜,💔,💯,😑,💖,💙,😕,💁🏿‍♂️,💁🏾‍♂️,💁🏽‍♂️,💁🏼‍♂️,💁🏻‍♂️,💁‍♂️,💁🏿,💁🏾,💁🏽,💁🏼,💁🏻,💁,😜,😞,😋,😐,😪,👏🏿,👏🏾,👏🏽,👏🏼,👏🏻,👏,💘,💗,💞,⬅️,🙊,✋🏿,✋🏾,✋🏽,✋🏼,✋🏻,✋,💋,👉🏿,👉🏾,👉🏽,👉🏼,👉🏻,👉,🌸,😱,😈,🔥,😡,😃,🎉,👊🏿,👊🏾,👊🏽,👊🏼,👊🏻,👊,😫,📷,🌹,😝,💪🏿,💪🏾,💪🏽,💪🏼,💪🏻,💪,💀,☀️,💛,😤,🌚,😆,😓,👈🏿,👈🏾,👈🏽,👈🏼,👈🏻,👈,✔️,😻,😀,😷,💚,👋🏿,👋🏾,👋🏽,👋🏼,👋🏻,👋,😣,💓,▶️,👑,😚,😛,😥,😇,🎧,✅,😖,➡️,😠,😬,🌟,🔫,🙋🏿‍♂️,🙋🏾‍♂️,🙋🏽‍♂️,🙋🏼‍♂️,🙋🏻‍♂️,🙋‍♂️,🙋🏿,🙋🏾,🙋🏽,🙋🏼,🙋🏻,🙋,👎🏿,👎🏾,👎🏽,👎🏼,👎🏻,👎,1️⃣,💃🏿,💃🏾,💃🏽,💃🏼,💃🏻,💃,🎵,😶,2️⃣,💫,✊🏿,✊🏾,✊🏽,✊🏼,✊🏻,✊,👇🏿,👇🏾,👇🏽,👇🏼,👇🏻,👇,🔴,🙅🏿‍♂️,🙅🏾‍♂️,🙅🏽‍♂️,🙅🏼‍♂️,🙅🏻‍♂️,🙅‍♂️,🙅🏿,🙅🏾,🙅🏽,🙅🏼,🙅🏻,🙅,💥,↪️,↩️,©️,💭,👅,💩,😰,💎,🙆🏿‍♂️,🙆🏾‍♂️,🙆🏽‍♂️,🙆🏼‍♂️,🙆🏻‍♂️,🙆‍♂️,🙆🏿,🙆🏾,🙆🏽,🙆🏼,🙆🏻,🙆,🍕,😹,🌞,🍃,💦,🐧,💤,🚶🏿‍♀️,🚶🏾‍♀️,🚶🏽‍♀️,🚶🏼‍♀️,🚶🏻‍♀️,🚶🏿,🚶🏾,🚶🏽,🚶🏼,🚶🏻,🚶,✈️,🎈,⭐️,🎀,☑️,😟,🔞,😨,🍀,🌺,🎤,👐🏿,👐🏾,👐🏽,👐🏼,👐🏻,👐,👻,◀️,🌴,‼️,💅🏿,💅🏾,💅🏽,💅🏼,💅🏻,💅,❌,👽,🙇🏿‍♀️,🙇🏾‍♀️,🙇🏽‍♀️,🙇🏼‍♀️,🙇🏻‍♀️,🙇‍♀️,🙇🏿,🙇🏾,🙇🏽,🙇🏼,🙇🏻,🙇,☁️,⚽️,👼🏿,👼🏾,👼🏽,👼🏼,👼🏻,👼,👯,❗️,❄️,☝🏿,☝🏾,☝🏽,☝🏼,☝🏻,☝️,😙,🌈,🌙,💟,💝,🎁,🍻,😧,🌍,🎥,⚓️,⚡️,♣️,✖️,🏃🏿‍♀️,🏃🏾‍♀️,🏃🏽‍♀️,🏃🏼‍♀️,🏃🏻‍♀️,🏃🏿,🏃🏾,🏃🏽,🏃🏼,🏃🏻,🏃,🌻,🌎,💐,🐶,💰,🌿,👫,🍂,🌷,🎂,🐱,☕️,😵,👆🏿,👆🏾,👆🏽,👆🏼,👆🏻,👆,😮,😯,🏀,🎄,💍,🌝,😲,👭,💸,💏,😿,🙉,💨,🌵,♨️,☎️,🍁,👸🏿,👸🏾,👸🏽,👸🏼,👸🏻,👸,💆🏿‍♂️,💆🏾‍♂️,💆🏽‍♂️,💆🏼‍♂️,💆🏻‍♂️,💆🏿,💆🏾,💆🏽,💆🏼,💆🏻,💆,💌,🏆,🙍🏿‍♂️,🙍🏾‍♂️,🙍🏽‍♂️,🙍🏼‍♂️,🙍🏻‍♂️,🙍‍♂️,🙍🏿,🙍🏾,🙍🏽,🙍🏼,🙍🏻,🙍,🇺🇸,🎊,🌼,🔪,👄,🍟,🍩,😦,🌊,💣,🆗,🌀,🚀,☔️,💑,🍭,🎬,🐷,👿,🐝,😽,💢,🎼,🎅🏿,🎅🏾,🎅🏽,🎅🏼,🎅🏻,🎅,🌏,🏈,🎸,♦️,🐼,💬,🍓,😼,🍌,🍉,⛄️,😸,♠️,🔝,🍆,🔮,🍴,📲,📱,⛅️,⚠️,🙀,🔸,👶🏿,👶🏾,👶🏽,👶🏼,👶🏻,👶,🐾,👣,🍺,🍷,⭕️,📹,🐰,🍹,🚬,👾,🍑,🐍,🐢,🍒,😗,🐸,🌌,🚨,🐣,📕,🍬,🍔,🐻,🐯,🚗,⏩,🍦,🍍,🌾,💉,🚮,🍫,▪️,📺,💊,🐙,🎃,🍇,😺,💿,🍸,🍰,🎮,™️,⬇️,🚫,💄,🐳,📝,®️,🍪,🐬,🔊,👨🏿,👨🏾,👨🏽,👨🏼,👨🏻,👨,🐥,🐒,3️⃣,📚,👹,💂🏿‍♀️,💂🏾‍♀️,💂🏽‍♀️,💂🏼‍♀️,💂🏻‍♀️,💂‍♀️,💂🏿,💂🏾,💂🏽,💂🏼,💂🏻,💂,📢,✂️,👧🏿,👧🏾,👧🏽,👧🏼,👧🏻,👧,🎓,🇫🇷,⚾️,🚦,👩🏿,👩🏾,👩🏽,👩🏼,👩🏻,👩,🎆,🌠,🆘,🍄,😾,🛅,👠,🎯,🏊🏿‍♀️,🏊🏾‍♀️,🏊🏽‍♀️,🏊🏼‍♀️,🏊🏻‍♀️,🏊‍♀️,🏊🏿,🏊🏾,🏊🏽,🏊🏼,🏊🏻,🏊,🔑,👙,👪,✏️,🐘,💧,🌱,🍎,🆒,📞,💵,🏡,📖,💇🏿‍♂️,💇🏾‍♂️,💇🏽‍♂️,💇🏼‍♂️,💇🏻‍♂️,💇🏿,💇🏾,💇🏽,💇🏼,💇🏻,💇,💻,💡,❓,🔙,👦🏿,👦🏾,👦🏽,👦🏼,👦🏻,👦,🔐,🙎🏿‍♂️,🙎🏾‍♂️,🙎🏽‍♂️,🙎🏼‍♂️,🙎🏻‍♂️,🙎‍♂️,🙎🏿,🙎🏾,🙎🏽,🙎🏼,🙎🏻,🙎,🍊,↔️,🌅,🍗,🔵,🚘,🍧,🇮🇹,🐦,4️⃣,🇬🇧,🌛,👓,🐐,🌃,👵🏿,👵🏾,👵🏽,👵🏼,👵🏻,👵,⚫️,🌑,👬,⚪️,🛃,🐠,🏠,🔃,🌜,📍,🌕,👟,🍋,🍼,🎨,✉️,🍝,↘️,5️⃣,🎐,🍥,↗️,🌲,🆙,⬆️,🎭,👃🏿,👃🏾,👃🏽,👃🏼,👃🏻,👃,🐽,🐟,👳🏿‍♀️,👳🏾‍♀️,👳🏽‍♀️,👳🏼‍♀️,👳🏻‍♀️,👳‍♀️,👳🏿,👳🏾,👳🏽,👳🏼,👳🏻,👳,🐨,👂🏿,👂🏾,👂🏽,👂🏼,👂🏻,👂,✳️,🔹,🚿,↙️,🐛,🍜,🎩,👰🏿,👰🏾,👰🏽,👰🏼,👰🏻,👰,⛽️,🏁,🐴,⌚️,🐵,🚼,🆕,🆓,🎇,🌽,🎾,⏰,🔋,❕,🐺,🗿,🐮,📣,👴🏿,👴🏾,👴🏽,👴🏼,👴🏻,👴,👗,🔗,🐔,🍳,🐋,↖️,🌳,🍱,📌,🔜,🔁,🐉,🐹,⛳️,🏄🏿‍♀️,🏄🏾‍♀️,🏄🏽‍♀️,🏄🏼‍♀️,🏄🏻‍♀️,🏄‍♀️,🏄🏿,🏄🏾,🏄🏽,🏄🏼,🏄🏻,🏄,🐭,🌒,🚙,🅰️,⁉️,🈹,🔌,🌓,♋️,🔱,🍞,👮🏿‍♀️,👮🏾‍♀️,👮🏽‍♀️,👮🏼‍♀️,👮🏻‍♀️,👮‍♀️,👮🏿,👮🏾,👮🏽,👮🏼,👮🏻,👮,🍵,🎣,🌔,🚲,👤,🍚,📻,🐤,⤵️,🌘,↕️,🇪🇸,🌗,🔘,0️⃣,🐑,👱🏿‍♀️,👱🏾‍♀️,👱🏽‍♀️,👱🏼‍♀️,👱🏻‍♀️,👱🏿,👱🏾,👱🏽,👱🏼,👱🏻,👱,🌖,🔒,🍏,👺,➰,🚩,🔄,🐎,🍤,🌄,🌋,🐓,📥,💒,🍣,〰️,🍨,⏪,🍅,🐇,✴️,🔺,🔆,➕,👲🏿,👲🏾,👲🏽,👲🏼,👲🏻,👲,🏪,👥,🐞,🔻,🇩🇪,⤴️,📛,🛀🏿,🛀🏾,🛀🏽,🛀🏼,🛀🏻,🛀,⛔️,🐊,🌰,🐕,🐈,🔨,🍖,🐚,❇️,⛵️,6️⃣,🅱️,Ⓜ️,🐩,♒️,🍲,👖,🍯,🎹,🔓,✒️,🗽,💲,🏂,💮,👔,💠,♈️,🚺,🐜,♏️,🌇,⏳,🅾️,🐲,7️⃣,🐌,📀,👕,🎲,➖,🎎,♐️,🎱,🚌,🍮,🎌,〽️,🐫,🍛,🚂,🏥,🇯🇵,🔷,🎋,🔔,♌️,♊️,🍐,🔶,♉️,🌐,🚪,🕕,🚔,📩,🌂,🎷,⛪️,🚴🏿‍♀️,🚴🏾‍♀️,🚴🏽‍♀️,🚴🏼‍♀️,🚴🏻‍♀️,🚴‍♀️,🚴🏿,🚴🏾,🚴🏽,🚴🏼,🚴🏻,🚴,♓️,🍡,♑️,🏢,🚣🏿‍♀️,🚣🏾‍♀️,🚣🏽‍♀️,🚣🏼‍♀️,🚣🏻‍♀️,🚣‍♀️,🚣🏿,🚣🏾,🚣🏽,🚣🏼,🚣🏻,🚣,👒,👞,🏩,🗻,🐪,👜,⌛️,❎,🎺,🏫,🐄,🌆,👷🏿‍♀️,👷🏾‍♀️,👷🏽‍♀️,👷🏼‍♀️,👷🏻‍♀️,👷‍♀️,👷🏿,👷🏾,👷🏽,👷🏼,👷🏻,👷,🚽,🐖,❔,🔰,🎻,🔛,💳,🆔,㊙️,🎡,🎳,♎️,♍️,💈,👛,🎢,🐀,📅,🏉,🐏,🔼,🔲,📴,🗼,㊗️,👘,🇷🇺,🚢,🔎,🔍,🚒,🕦,🚓,🃏,🌉,📦,🚖,📆,🏇,🐅,8️⃣,👢,🚑,9️⃣,🔳,🐗,🎒,➿,💷,ℹ,🐂,🍙,🆚,🔚,🅿️,👡,⛺️,💺,🚕,◾️,💼,📰,🎪,🔯,🚹,🏰,🔦,🌁,⏫,🎍,🎫,🚁,💽,🚍,🍈,▫️,🏤,🔟,📓,🔕,🍢,🎏,🎠,🐡,📈,🍠,🎿,🕛,📶,🚧,#️⃣,◼️,📡,💶,👚,📒,🐆,🔅,🕒,🏬,🚚,🍶,🚃,🚤,🇰🇷,📼,🕐,⏬,🐃,🔽,💴,🔇,🎽,⬜️,♿️,🕑,📎,🏧,🎦,🔭,🎑,📘,◻️,📮,📧,🐁,🚄,🉐,🔩,🆖,🏨,🚾,🏮,🔂,📬,📉,📗,🚜,⛲️,🚇,📋,📵,🕓,🚭,⬛️,🎰,🕔,🛁,📜,🚉,🍘,🏦,🔧,🈯️,🚛,📄,⛎,📊,🚷,🇨🇳,📳,🕙,🕘,🚅,🚐,🚊,🕗,🈳,🚥,🚵🏿‍♀️,🚵🏾‍♀️,🚵🏽‍♀️,🚵🏼‍♀️,🚵🏻‍♀️,🚵‍♀️,🚵🏿,🚵🏾,🚵🏽,🚵🏼,🚵🏻,🚵,🔬,🏯,🔖,📑,👝,🆎,📃,🎴,🕚,📠,🕖,◽️,💱,🔉,💹,🆑,💾,🏣,🔈,🗾,🈺,🀄️,📨,📙,🚻,🈚️,🈶,📐,🚋,🈸,🚎,🈷️,🔢,📔,🈲,🈵,📯,🏭,🚸,🚆,📏,📟,🉑,🈴,🔏,🕜,🈂️,📤,🔀,📫,🚈,🕤,🚏,📂,📁,🚰,📇,🕝,🚝,🕧,🕥,🔤,📪,🕟,🚞,🚯,🕞,➗,🕢,🕠,🔠,📭,🔣,🚡,🕣,🕡,🔡,🚠,🈁,🛂,🚱,🚟,🛄,🚳,🏳️‍🌈,🕵🏿‍♀️,🕵🏾‍♀️,🕵🏽‍♀️,🕵🏼‍♀️,🕵🏻‍♀️,🕵️‍♀️,🕵🏿,🕵🏾,🕵🏽,🕵🏼,🕵🏻,☹️,☠️,🤗,🤖,🤕,🤔,🤓,🤒,🤑,🤐,🙄,🙃,🙂,🙁,🕵,🤘🏿,🤘🏾,🤘🏽,🤘🏼,🤘🏻,🖖🏿,🖖🏾,🖖🏽,🖖🏼,🖖🏻,🖕🏿,🖕🏾,🖕🏽,🖕🏼,🖕🏻,🖐🏿,🖐🏾,🖐🏽,🖐🏼,🖐🏻,✍🏿,✍🏾,✍🏽,✍🏼,✍🏻,🤘,✍️,🖖,🖕,🖐,🕶,👁‍🗨,👁,🏋🏿‍♀️,🏋🏾‍♀️,🏋🏽‍♀️,🏋🏼‍♀️,🏋🏻‍♀️,⛹🏿‍♀️,⛹🏾‍♀️,⛹🏽‍♀️,⛹🏼‍♀️,⛹🏻‍♀️,🏌️‍♀️,🏋️‍♀️,⛹️‍♀️,🏋🏿,🏋🏾,🏋🏽,🏋🏼,🏋🏻,⛹🏿,⛹🏾,⛹🏽,⛹🏼,⛹🏻,🕴,🏌,🏋,*️⃣,❣️,✡️,✝️,⚜️,⚛️,☸️,☯️,☮️,☪️,☦️,☣️,☢️,🛐,🗯,🕎,🕉,⚱️,⚰️,⚙️,⚗️,⚖️,⚔️,⌨️,🛢,🛡,🛠,🛏,🛎,🛍,🛌,🛋,🗳,🗡,🗞,🗝,🗜,🗓,🗒,🗑,🗄,🗃,🗂,🖼,🖲,🖱,🖨,🖥,🖍,🖌,🖋,🖊,🖇,🕹,🕳,🕰,🕯,📿,📽,📸,🏺,🏷,🏴,🏳,🎞,🎛,🎚,🎙,🌡,🛳,🛰,🛬,🛫,🛩,🛥,🛤,🛣,🗺,🕍,🕌,🕋,🏟,🏞,🏝,🏜,🏛,🏚,🏙,🏘,🏗,🏖,🏕,🏔,🏎,🏍,🏹,🏸,🏵,🏓,🏒,🏑,🏐,🏏,🏅,🎟,🎗,🎖,🧀,🍿,🍾,🍽,🌶,🌯,🌮,🌭,☘️,☄️,☃️,☂️,🦄,🦃,🦂,🦁,🦀,🕸,🕷,🕊,🐿,🌬,🌫,🌪,🌩,🌨,🌧,🌦,🌥,🌤,🗣,⏺,⏹,⏸,⏯,⏮,⏭,⛱,⛓,⛏,⚒,⏲,⏱,⛴,⛰,⛩,⛹,⛸,⛷,⛈,⛑,🇿🇼,🇿🇲,🇿🇦,🇾🇹,🇾🇪,🇽🇰,🇼🇸,🇼🇫,🇻🇺,🇻🇳,🇻🇮,🇻🇬,🇻🇪,🇻🇨,🇻🇦,🇺🇿,🇺🇾,🇺🇬,🇺🇦,🇹🇿,🇹🇼,🇹🇻,🇹🇹,🇹🇷,🇹🇴,🇹🇳,🇹🇲,🇹🇱,🇹🇰,🇹🇯,🇹🇭,🇹🇬,🇹🇫,🇹🇩,🇹🇨,🇸🇿,🇸🇾,🇸🇽,🇸🇻,🇸🇹,🇸🇸,🇸🇷,🇸🇴,🇸🇳,🇸🇲,🇸🇱,🇸🇰,🇸🇮,🇸🇭,🇸🇬,🇸🇪,🇸🇩,🇸🇨,🇸🇧,🇸🇦,🇷🇼,🇷🇸,🇷🇴,🇷🇪,🇶🇦,🇵🇾,🇵🇼,🇵🇹,🇵🇸,🇵🇷,🇵🇳,🇵🇲,🇵🇱,🇵🇰,🇵🇭,🇵🇬,🇵🇫,🇵🇪,🇵🇦,🇴🇲,🇳🇿,🇳🇺,🇳🇷,🇳🇵,🇳🇴,🇳🇱,🇳🇮,🇳🇬,🇳🇫,🇳🇪,🇳🇨,🇳🇦,🇲🇿,🇲🇾,🇲🇽,🇲🇼,🇲🇻,🇲🇺,🇲🇹,🇲🇸,🇲🇷,🇲🇶,🇲🇵,🇲🇴,🇲🇳,🇲🇲,🇲🇱,🇲🇰,🇲🇭,🇲🇬,🇲🇪,🇲🇩,🇲🇨,🇲🇦,🇱🇾,🇱🇻,🇱🇺,🇱🇹,🇱🇸,🇱🇷,🇱🇰,🇱🇮,🇱🇨,🇱🇧,🇱🇦,🇰🇿,🇰🇾,🇰🇼,🇰🇵,🇰🇳,🇰🇲,🇰🇮,🇰🇭,🇰🇬,🇰🇪,🇯🇴,🇯🇲,🇯🇪,🇮🇸,🇮🇷,🇮🇶,🇮🇴,🇮🇳,🇮🇲,🇮🇱,🇮🇪,🇮🇩,🇮🇨,🇭🇺,🇭🇹,🇭🇷,🇭🇳,🇭🇰,🇬🇾,🇬🇼,🇬🇺,🇬🇹,🇬🇸,🇬🇷,🇬🇶,🇬🇵,🇬🇳,🇬🇲,🇬🇱,🇬🇮,🇬🇭,🇬🇬,🇬🇫,🇬🇪,🇬🇩,🇬🇦,🇫🇴,🇫🇲,🇫🇰,🇫🇯,🇫🇮,🇪🇺,🇪🇹,🇪🇷,🇪🇭,🇪🇬,🇪🇪,🇪🇨,🇩🇿,🇩🇴,🇩🇲,🇩🇰,🇩🇯,🇨🇿,🇨🇾,🇨🇽,🇨🇼,🇨🇻,🇨🇺,🇨🇷,🇨🇴,🇨🇲,🇨🇱,🇨🇰,🇨🇮,🇨🇭,🇨🇬,🇨🇫,🇨🇩,🇨🇨,🇨🇦,🇧🇿,🇧🇾,🇧🇼,🇧🇹,🇧🇸,🇧🇷,🇧🇶,🇧🇴,🇧🇳,🇧🇲,🇧🇱,🇧🇯,🇧🇮,🇧🇭,🇧🇬,🇧🇫,🇧🇪,🇧🇩,🇧🇧,🇧🇦,🇦🇿,🇦🇽,🇦🇼,🇦🇺,🇦🇹,🇦🇸,🇦🇷,🇦🇶,🇦🇴,🇦🇲,🇦🇱,🇦🇮,🇦🇬,🇦🇫,🇦🇪,🇦🇩,🦇,🤦,🥰,🤣,🤩,🥺,☺,🥵,🥶,🥴,🥳,🥱,☠,🧡,🤍,🖤,🤎,❣,❤,🤚,🤏,✌,🤞,🤟,🤙,🤜,🤛,☝,✍,🤲,🥟,🧐,🧸,🦊,🤝,🧓,🧒,🦻,🦶,🦵,🦿,🦾,🤳,🧠,🦷,🦴,🧔,🧑,‍♂️,♂,‍♀️,🥊,🧶,🧵,♠,♥,♦,♣,🥎,⚾,⚽,🥉,🥈,🥇,🧨,🧧,🕺,🧘,🤹,🤾,🤽,🤼,🤸,🤺,🧗,🧖,🧍,🧎,🤰,🤱,🦹,🦸,🤶,🧏,🤷,🤬,🥂,🤤,🤯,🤢,🥥,🦧,🦮,🦝,🦓,🦌,🦙,🦒,🦛,🦏,🦨,🦔,🦘,🦦,🦥,🦍,🦡,🦚,🦜,🦕,🦖,🦅,🦆,🦢,🦉,🦩,🦎,🦋,🦈,🦟,🦠,🥀,🥭,🥝,🥒,🥕,🥔,🥑,🧕,🤴,🥽,🥼,🦺,🥻,🩱,🧦,🧥,🧤,🧣,🩲,🩳,🥾,🥿,🩰,🧮,🪔,🧾,🪓,🧲,🧪,🧰,🩸,🧫,🧬,🦯,🧷,🪒,🧯,🪑,🧺,🧻,🧼,🧹,🧴,🛵,🦽,🦼,🛺,🛴,🛹,🛑,🛶,🪂,🧳,🛸,🪐,🛕,🧭,🧩,🧱,🥍,🤿,🪁,🧿,🥅,🥋,🤧,🤮,🤡,🧙,🤨,🧚,🧛,🤠,🤥,🤪,🧝,☹,🧞,🧟,🤫,🤭,🛒,🥲,🥸,🤌,‍🦲,‍🦳,‍🦱,🫁,🫀,🫂,🦰,🥷,🧢,🪖,🩴'.split(
    ','
  )

var regx_arr = []
function noExtra(s) {
  return s.replace(/\ufe0f|\u200d/gm, '')
}
function toSurrogatePairs(r) {
  for (var t = '', n = 0; n < r.length; n++)
    t += '\\u' + ('000' + r[n].charCodeAt(0).toString(16)).substr(-4)
  return t
}
function toCodePoint(t) {
  for (var n = [], r = 0, o = 0, h = 0; h < t.length; )
    (r = t.charCodeAt(h++)),
      o
        ? (n.push((65536 + ((o - 55296) << 10) + (r - 56320)).toString(16)),
          (o = 0))
        : r >= 55296 && 56319 >= r
        ? (o = r)
        : n.push(r.toString(16))
  return n.join('-')
}
for (var i = 0; i < emojis.length; i++) {
  regx_arr.push(toSurrogatePairs(emojis[i]))
}
const re = new RegExp(`(${regx_arr.join('|')})`, 'g')
regx_arr = null
//emojis = null;

export function Emoji(txt, big = 0) {
  //console.log('EMOJI')
  const path = `${this.content}/img/emojitwo/`
  const eclass = 'emoji'
  //const alt = true
  const ext = 'png'

  return txt.toString().replace(re, function (a, b) {
    var r = `<img draggable="false" alt="${b}"`
    if (
      big == 1 &&
      (txt.length <= 2 ||
        (toCodePoint(noExtra(b)).match(/.*-.*/) && txt.length <= 5))
    )
      r += eclass ? ' class="emoji-big"' : ''
    else r += eclass ? ` class="${eclass}"` : ''

    //r += alt ? ' alt="' + b + '"' : ''
    r += ` src="${path}${toCodePoint(noExtra(b))}.${ext}">`
    return r
  })
}

export function ParseURL(str) {
  var formData = new FormData()
  formData.append('url', str)
  return this.axios({
    method: 'post',
    url: '/url',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => {
      //console.log(res.data['title']);
      return `<a href="${res.data['url']}">${res.data['title']}</a>`
    })
    .catch(() => {
      return str
    })
}

// export async function ParseURL2(str) {
//   var exp =
//     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
//   var regex = ''
//   var arr = str.split(' ')
//   //var govno = [];

//   var p = new Promise(
//     function (resolve) {
//       (async function () {
//         for await (let i of arr) {
//           regex = new RegExp(exp)
//           if (i.match(regex)) {
//             await this.axios.get('/url/' + i).then((res) => {
//               i = `<a href="${res.data['url']}">${res.data['title']}</a>`
//             })
//           }
//         }
//       }.bind(this))
//       resolve()
//     }.bind(this)
//   )
//   p.then((arr) => console.log(arr))

//   /*
//         regex = new RegExp(exp);
//         return str.replace(regex, function (a,b) {
//             this.axios.get("/url/" + a).then((res) => {
//                 b = '<a href="' + res.data['url'] + '">' + res.data['title'] + '</a>';
//                 return b
//             })
//             return b;
//         }.bind(this));
//     */
//   /*
//     for (let i = 0; i < arr.length; i += 1) {
//         regex = new RegExp(exp);
//         if (arr[i].match(regex)) {
//             try {
//                 //var url = new URL(arr[i]);
//                 this.axios.get("/url/" + arr[i]).then((res) => {
//                     arr[i] = '<a href="'+res.data['url']+'">'+res.data['title']+'</a>';
//                     console.log(arr)
//                   });

//             } catch (err) {
//                 console.log(err)
//             }
//         }

//       }
// */
//   /*
//     arr.forEach(function(d) {
//         console.log(d)
//         regex = new RegExp(exp);
//         if (d.match(regex)) {
//             try {
//                 //var url = new URL(arr[i]);
//                 this.axios.get("/url/" + d).then((res) => {
//                     d = '<a href="'+res.data['url']+'">'+res.data['title']+'</a>';

//                   });

//             } catch (err) {
//                 console.log(err)
//             }
//         }
//       }.bind(this))
//       */
// }

export function cssLoad(style) {
  const head = document.body.parentElement.firstElementChild
  const link = document.createElement('link')
  const theme = head.getElementsByClassName('theme')

  if (style !== 'white') {
    link.setAttribute('class', 'theme')
    link.setAttribute('href', `/css/__${style}.css`)
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('id', style)
    head.appendChild(link)
  }

  setTimeout(() => {
    for (var i = 0; i < theme.length; i++) {
      if (theme[i].id !== style) head.removeChild(theme[i])
    }
    //console.log('THEMED')
  }, 500)
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
function substr_replace(str, replace, start, length) {
  // eslint-disable-line camelcase
  //console.log(str, replace, start, length)
  //  discuss at: https://locutus.io/php/substr_replace/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0)
  //   returns 1: 'bob'
  //   example 2: var $var = 'ABCDEFGH:/MNRPQR/'
  //   example 2: substr_replace($var, 'bob', 0, $var.length)
  //   returns 2: 'bob'
  //   example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0)
  //   returns 3: 'bobABCDEFGH:/MNRPQR/'
  //   example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1)
  //   returns 4: 'ABCDEFGH:/bob/'
  //   example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1)
  //   returns 5: 'ABCDEFGH:/bob/'
  //   example 6: substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
  //   returns 6: 'ABCDEFGH://'
  if (start < 0) start = start + str.length // start position in str

  length = length !== undefined ? length : str.length

  if (length < 0) length = length + str.length - start

  return [
    str.slice(0, start),
    replace.substr(0, length),
    replace.slice(length),
    str.slice(start + length),
  ].join('')
}
// export function parser($text, attachments, edit = false) {
//   var $count = 0
//   var $offs = 0
//   var $replace

//   for (var $preview of attachments) {
//     if ($preview) {
//       if ($preview['offset'] !== null && $preview['length'] !== null) {
//         var index = $preview['offset'] + $offs
//         $replace = $text.substr(index, $preview['length'])
//       } else {
//         $count = $count + 1
//         continue
//       }
//       var $html = ''
//       if ($preview['type'] === 'styled') {
//         switch ($preview['style']) {
//           case 'bold':
//             $html = `<b>${$replace}</b>`
//             break
//           case 'underline':
//             $html = `<u>${$replace}</u>`
//             break
//           case 'italic':
//             $html = `<i>${$replace}</i>`
//             break
//           case 'strike':
//             $html = `<s>${$replace}</s>`
//             break
//           default:
//             break
//         }
//       } else if ($preview['type'] === 'image') {
//         if (edit) $html = `<img src="${$preview['url']}"/>`
//         else {
//           $html = `<span class="attachment" data-type="image">
//                       <a target="_blank" class="img-link" href="${$preview['url']}">
//                         <img alt="image" src="${$preview['url']}" onerror="this.onerror=null;this.src='${this.host}/img/404.jpg';"/>
//                       </a>
//                    </span>`
//         }
//       } else if ($preview['type'] === 'sticker') {
//         if (edit)
//           $html = `<sticker>${$preview['pack']} ${$preview['sticker']}</sticker>`
//         else {
//           $html = `<span class="attachment" data-type="sticker">
//                             <img alt="sticker" src="${$preview['url']}" onerror="this.onerror=null;this.src='${this.host}/img/404.jpg';"/>
//                          </span>`
//         }
//       } else if ($preview['type'] === 'link') {
//         if (edit) $html = `<a href="${$preview['url']}">${$preview['url']}</a>`
//         else {
//           $html = `<span class="attachment" data-type="link">
//                     <a target="_blank" class="link" href="${$preview['url']}">
//                         <div class="img-url-wrapper">
//                             <img src="${
//                               $preview['image'] ??
//                               this.content +
//                                 '/includes/siteicon.php?url=' +
//                                 $preview['url']
//                             }" onerror="this.onerror=null;this.src='${
//             this.host
//           }/img/404.jpg';"/>
//                         </div>
//                         <div>
//                             <div>${$preview['url']}</div>
//                             <div>${$preview['title'] ?? $preview['url']}</div>
//                             <div>${$preview['description'] ?? ''}</div>
//                         </div>
//                     </a>
//                 </span>`
//         }
//       } else if ($preview['type'] === 'file-link') {
//         if (edit) $html = `<a href="${$preview['url']}">${$preview['url']}</a>`
//         else {
//           $html = `<span class="attachment" data-type="link">
//                     <a target="_blank" class="link" href="${$preview['url']}">
//                         <div class="img-url-wrapper">
//                             <img alt="file-type" src="${
//                               this.content
//                             }/filetypeicon.php?ext=${$preview['extension']}"
//                             onerror="this.onerror=null;this.src='${
//                               this.host
//                             }/img/404.jpg';"/>
//                         </div>
//                         <div>
//                             <div>${$preview['url']}</div>
//                             <div>${$preview['title']}</div>
//                             <div>Размер: ${bytesToSize(
//                               $preview['fileSize']
//                             )}</div>
//                         </div>
//                     </a>
//                 </span>`
//         }
//       }

//       const $offset = $preview['offset'] + $offs
//       $text = substr_replace($text, $html, $offset, $preview['length'])

//       $offs = $offs - ($preview['length'] - $html.length)

//       $count++
//     }
//   }
//   //console.log('parsed')
//   return $text
// }
export function parser($text, attachments, edit = false) {
  var $count = 0
  var $offs = 0
  var $prevOffs = 'a'
  var $replace
  var parsedAttachments = ''
  for (var $preview of attachments) {
    if ($preview) {
      if ($preview['offset'] !== null && $preview['length'] !== null) {
        if ($preview['offset'] === $prevOffs) {
          console.log($offs)
          $offs = $offs - 4
          console.log($offs)
        }
        var index = $preview['offset'] + $offs
        $replace = $text.substr(index, $preview['length'])
      } else {
        $count = $count + 1
        continue
      }
      var $html = ''
      if ($preview['type'] === 'styled') {
        switch ($preview['style']) {
          case 'bold':
            $html = `<b>${$replace}</b>`
            break
          case 'underline':
            $html = `<u>${$replace}</u>`
            break
          case 'italic':
            $html = `<i>${$replace}</i>`
            break
          case 'strike':
            $html = `<s>${$replace}</s>`
            break
          default:
            break
        }
      } else if ($preview['type'] === 'image') {
        if (edit)
          parsedAttachments =
            parsedAttachments + `<img src="${$preview['url']}"/>`
        else {
          parsedAttachments =
            parsedAttachments +
            `<span class="attachment" data-type="image">
                      <a target="_blank" class="img-link" href="${$preview['url']}">
                        <img alt="image" src="${$preview['url']}" onerror="this.onerror=null;this.src='${this.host}/img/404.jpg';"/>
                      </a>
                   </span>`
        }
      } else if ($preview['type'] === 'sticker') {
        if (edit)
          $html = `<sticker>${$preview['pack']} ${$preview['sticker']}</sticker>`
        else {
          parsedAttachments =
            parsedAttachments +
            `<span class="attachment" data-type="sticker">
                    <img alt="sticker" src="${$preview['url']}" onerror="this.onerror=null;this.src='${this.host}/img/404.jpg';"/>
                   </span>`
        }
      } else if ($preview['type'] === 'link') {
        if (edit) $html = `<a href="${$preview['url']}">${$preview['url']}</a>`
        else {
          $html = `<a href="${$preview['url']}" target="_blank" class="link">${$preview['url']}</a>`
          parsedAttachments =
            parsedAttachments +
            `<span class="attachment" data-type="link">
                    <a target="_blank" class="link" href="${$preview['url']}">
                        <div class="img-url-wrapper">
                            <img src="${
                              $preview['image'] ??
                              this.content +
                                '/includes/siteicon.php?url=' +
                                $preview['url']
                            }" onerror="this.onerror=null;this.src='${
              this.host
            }/img/404.jpg';"/>
                        </div>
                        <div>
                            <div>${$preview['url']}</div>
                            <div>${$preview['title'] ?? $preview['url']}</div>
                            <div>${$preview['description'] ?? ''}</div>
                        </div>
                    </a>
                </span>`
        }
      } else if ($preview['type'] === 'file-link') {
        if (edit) $html = `<a href="${$preview['url']}">${$preview['url']}</a>`
        else {
          parsedAttachments =
            parsedAttachments +
            `<span class="attachment" data-type="link">
                    <a target="_blank" class="link" href="${$preview['url']}">
                        <div class="img-url-wrapper">
                            <img alt="file-type" src="${
                              this.content
                            }/filetypeicon.php?ext=${$preview['extension']}"
                            onerror="this.onerror=null;this.src='${
                              this.host
                            }/img/404.jpg';"/>
                        </div>
                        <div>
                            <div>${$preview['url']}</div>
                            <div>${$preview['title']}</div>
                            <div>Размер: ${bytesToSize(
                              $preview['fileSize']
                            )}</div>
                        </div>
                    </a>
                </span>`
        }
      }

      var $offset = $preview['offset'] + $offs
      //console.log($text)
      $text = substr_replace($text, $html, $offset, $preview['length'])
      // console.log($preview['style'])
      // console.log($prevOffs)

      $offs = $offs - ($preview['length'] - $html.length)

      $prevOffs = $preview['offset']
      $count++
      //console.log($preview['length'] - $html.length)
    }
  }
  console.log('parsed_______________')
  return { text: $text, attachments: parsedAttachments }
}
export function parserDialog($text, attachments) {
  var $count = 0
  var $offs = 0

  for (var $preview of attachments) {
    if ($preview['offset'] === null || $preview['length'] === null) {
      $count = $count + 1
      continue
    }
    var $html = ''

    switch ($preview['type']) {
      case 'styled':
        $html = $text
        break
      case 'image':
        $html = '<b>Картинка</b>'
        break
      case 'link':
        $html = '<b>Ссылка</b>'
        break
      case 'file-link':
        $html = '<b>Файл</b>'
        break
      case 'sticker':
        $html = '<b>Стикер</b>'
        break
      default:
        $html = '<b>Вложение</b>'
        break
    }

    const $offset = $preview['offset'] + $offs
    $text = substr_replace($text, $html, $offset, $preview['length'])

    $offs = $offs - ($preview['length'] - $html.length)

    $count++
  }
  //console.log('parsed')
  return $text
}

function bytesToSize(bytes) {
  const sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ']
  if (bytes == 0) return '0 байт'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ` ${sizes[i]}`
}
export function strip_tags(str, allowed_tags) {
  var key = '',
    allowed = false
  var matches = []
  var allowed_array = []
  var allowed_tag = ''
  var i = 0
  var k = ''
  var html = ''
  var replacer = (search, replace, str) => {
    return str.split(search).join(replace)
  }
  // Build allowes tags associative array
  if (allowed_tags) allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi)
  str += ''
  // Match tags
  matches = str.match(/(<\/?[\S][^>]*>)/gi)
  // Go through all HTML tags
  for (key in matches) {
    if (isNaN(key)) continue
    // Save HTML tag
    html = matches[key].toString()
    // Is tag not in allowed list? Remove from str!
    allowed = false
    // Go through all allowed tags
    for (k in allowed_array) {
      // Init
      allowed_tag = allowed_array[k]
      i = -1
      //console.log(html,'__________________')
      if (allowed_tag !== 'span') {
        if (i != 0) i = html.toLowerCase().indexOf(`<${allowed_tag}>`)
        if (i != 0) i = html.toLowerCase().indexOf(`<${allowed_tag} `)
        if (i != 0) i = html.toLowerCase().indexOf(`</${allowed_tag}>`)
      } else {
        if (i != 0) i = html.toLowerCase().indexOf('<span class="attachment"')
        if (i != 0) i = html.toLowerCase().indexOf('</span>')
      }
      // Determine
      if (i == 0) {
        allowed = true
        break
      }
    }
    if (!allowed) str = replacer(html, '', str) // Custom replace. No regexing
  }
  return str
}

export function cleanTags(text) {
  attachment = text.replace(/data-type="(\w*)"/, '$1') /* eslint-disable-line */
  //console.log(text)
  return text
}
function monthes(month) {
  const monthes = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]
  return ` ${monthes[month]}`
}
export function timeName(time, date = true) {
  //console.log(time);
  time = new Date(time * 1000)
  const t = new Date(time)
  t.setHours(0, 0, 0, 0)
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const y = new Date(d)
  y.setDate(d.getDate() - 1)
  const dby = new Date(d)
  dby.setDate(d.getDate() - 2)
  const formatedTime =
    time.getHours() +
    ':' +
    (time.getMinutes() < 10 ? '0' : '') +
    time.getMinutes()
  //console.log(y)
  if (date) {
    if (t.getTime() == d.getTime()) return `сегодня в ${formatedTime}`
    else if (t.getTime() == y.getTime()) return `вчера в ${formatedTime}`
    else if (t.getTime() == dby.getTime()) return `позавчера в ${formatedTime}`
    else {
      var month = ''
      var $date = {
        day: '2-digit',
      }
    }
    if (t.getYear() === d.getYear()) {
      month = monthes(t.getMonth())
    } else {
      $date = Object.assign($date, { month: '2-digit' })
      $date = Object.assign($date, { year: 'numeric' })
    }

    return `${time.toLocaleDateString(
      'ru-RU',
      $date
    )}${month} в ${formatedTime}`
  } else {
    var array = []
    if (t.getTime() == d.getTime()) array.push('')
    else if (t.getTime() == y.getTime()) array.push('вчера')
    else if (t.getTime() == dby.getTime()) array.push('позавчера')
    else
      array.push(
        time.toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      )
  }
  array.push(formatedTime)
  return array
}

export function rot13(str = null) {
  //if(str === null) return
  var answer = []
  for (let i in str) {
    if (str.charCodeAt(i) < 65 || str.charCodeAt(i) > 91) {
      answer.push(str[i])
      continue
    } else {
      if (str.charCodeAt(i) < 78) {
        answer.push(String.fromCharCode(str.charCodeAt(i) + 13))
        continue
      } else {
        answer.push(String.fromCharCode(str.charCodeAt(i) - 13))
        continue
      }
    }
  }
  return answer.join('')
}
export function errorHandler(code = null) {
  //console.log(code)
  this.emitter.on('modal-ok-error', () => {
    this.$store.state.modal.toggle = false
    this.emitter.off('modal-ok-error')
  })
  var error
  switch (code) {
    case 1006:
    case 300:
    case 304:
      error = 'Ошибка подключения'
      break
    case 1011:
      error = 'Ошибка сервера'
      break
    case 401:
      error = 'Ошибка авторизации'
      break
    case 403:
      error = 'Неверный логин или пароль'
      break
  }
  const settings = {
    type: 'error',
    title: 'Ошибка!',
    body: error,
    ok: 'Ок',
  }
  this.modalToggle(settings)
}
