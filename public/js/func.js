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
  '๐จโ๐ฉโ๐ฆ,๐ฉโโค๏ธโ๐โ๐จ,๐ฆนโโ๏ธ,๐ฆนโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐ถโโ๏ธ,๐ถโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโ๐ฆฏ,๐จโ๐ฆฏ,๐ฉโ๐ฆฏ,๐งโ๐ฆผ,๐จโ๐ฆผ,๐ฉโ๐ฆผ,๐งโ๐ฆฝ,๐จโ๐ฆฝ,๐ฉโ๐ฆฝ,๐โโ๏ธ,๐โโ๏ธ,๐ด๏ธ,๐ฏโโ๏ธ,๐ฏโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโ๐คโ๐ง,๐งโ๐,๐ฆธโโ๏ธ,๐ฆธโโ๏ธ,๐ฐโโ๏ธ,๐ฐโโ๏ธ,๐ฉโ๐ผ,๐จโ๐ผ,๐งโ๐ผ,๐ฎโโ๏ธ,๐ต๏ธโโ๏ธ,๐โโ๏ธ,๐ทโโ๏ธ,๐คตโโ๏ธ,๐คตโโ๏ธ,๐คต,๐จโ๐,๐ฉโ๐,๐งโโ๏ธ,๐จโโ๏ธ,๐ฉโโ๏ธ,๐งโ๐,๐จโ๐,๐ฉโ๐,๐งโ๐ซ,๐จโ๐ซ,๐ฉโ๐ซ,๐งโโ๏ธ,๐จโโ๏ธ,๐ฉโโ๏ธ,๐งโ๐พ,๐จโ๐พ,๐ฉโ๐พ,๐งโ๐ณ,๐จโ๐ณ,๐ฉโ๐ณ,๐งโ๐ง,๐จโ๐ง,๐ฉโ๐ง,๐งโ๐ญ,๐จโ๐ญ,๐ฉโ๐ญ,๐งโ๐ผ,๐จโ๐ผ,๐ฉโ๐ผ,๐งโ๐ฌ,๐จโ๐ฌ,๐ฉโ๐ฌ,๐งโ๐ป,๐จโ๐ป,๐ฉโ๐ป,๐งโ๐ค,๐จโ๐ค,๐ฉโ๐ค,๐งโ๐จ,๐จโ๐จ,๐ฉโ๐จ,๐งโโ๏ธ,๐จโโ๏ธ,๐ฉโโ๏ธ,๐งโ๐,๐จโ๐,๐ฉโ๐,๐งโ๐,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐จโ๐ฆฐ,๐จโ๐ฆฑ,๐จโ๐ฆณ,๐จโ๐ฆฒ,๐ฉโ๐ฆฐ,๐งโ๐ฆฐ,๐ฉโ๐ฆฑ,๐งโ๐ฆฑ,๐ฉโ๐ฆณ,๐งโ๐ฆณ,๐ฉโ๐ฆฒ,๐งโ๐ฆฒ,๐ฑโโ๏ธ,๐ฑโโ๏ธ,๐ง,๐ณโโ๏ธ,๐คทโโ๏ธ,๐คฆโโ๏ธ,๐คฆโโ๏ธ,๐คทโโ๏ธ,๐ฉโโค๏ธโ๐จ,๐ฉโโค๏ธโ๐โ๐ฉ,๐ฉโ๐ฉโ๐งโ๐ง,๐ฉโ๐ฉโ๐งโ๐ฆ,๐ฉโ๐ฉโ๐ฆโ๐ฆ,๐จโโค๏ธโ๐โ๐จ,๐จโ๐ฉโ๐งโ๐ง,๐จโ๐ฉโ๐งโ๐ฆ,๐จโ๐ฉโ๐ฆโ๐ฆ,๐จโ๐จโ๐งโ๐ง,๐จโ๐จโ๐งโ๐ฆ,๐จโ๐จโ๐ฆโ๐ฆ,๐ฉโโค๏ธโ๐ฉ,๐ฉโ๐ฉโ๐ง,๐ฉโ๐ฉโ๐ฆ,๐ฉโ๐งโ๐ง,๐ฉโ๐งโ๐ฆ,๐ฉโ๐ฆโ๐ฆ,๐จโโค๏ธโ๐จ,๐จโ๐ฉโ๐ง,๐จโ๐จโ๐ง,๐จโ๐จโ๐ฆ,๐จโ๐งโ๐ง,๐จโ๐งโ๐ฆ,๐จโ๐ฆโ๐ฆ,๐ฉโ๐ง,๐ฉโ๐ฆ,๐จโ๐ง,๐จโ๐ฆ,๐,โค๏ธ,โฅ๏ธ,๐,๐ญ,๐,๐,๐,๐,โบ๏ธ,๐ฉ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐,๐,โป๏ธ,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐ถ,๐ณ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐ข,๐,โ๐ฟ,โ๐พ,โ๐ฝ,โ๐ผ,โ๐ป,โ๏ธ,๐,๐,โจ,๐ด,๐,๐,๐,๐ฏ,๐,๐,๐,๐,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐,๐,๐,๐ช,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐,๐,โฌ๏ธ,๐,โ๐ฟ,โ๐พ,โ๐ฝ,โ๐ผ,โ๐ป,โ,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ธ,๐ฑ,๐,๐ฅ,๐ก,๐,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ซ,๐ท,๐น,๐,๐ช๐ฟ,๐ช๐พ,๐ช๐ฝ,๐ช๐ผ,๐ช๐ป,๐ช,๐,โ๏ธ,๐,๐ค,๐,๐,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,โ๏ธ,๐ป,๐,๐ท,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ฃ,๐,โถ๏ธ,๐,๐,๐,๐ฅ,๐,๐ง,โ,๐,โก๏ธ,๐?,๐ฌ,๐,๐ซ,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,1๏ธโฃ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ต,๐ถ,2๏ธโฃ,๐ซ,โ๐ฟ,โ๐พ,โ๐ฝ,โ๐ผ,โ๐ป,โ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ด,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ฅ,โช๏ธ,โฉ๏ธ,ยฉ๏ธ,๐ญ,๐,๐ฉ,๐ฐ,๐,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐น,๐,๐,๐ฆ,๐ง,๐ค,๐ถ๐ฟโโ๏ธ,๐ถ๐พโโ๏ธ,๐ถ๐ฝโโ๏ธ,๐ถ๐ผโโ๏ธ,๐ถ๐ปโโ๏ธ,๐ถ๐ฟ,๐ถ๐พ,๐ถ๐ฝ,๐ถ๐ผ,๐ถ๐ป,๐ถ,โ๏ธ,๐,โญ๏ธ,๐,โ๏ธ,๐,๐,๐จ,๐,๐บ,๐ค,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ป,โ๏ธ,๐ด,โผ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,โ,๐ฝ,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,โ๏ธ,โฝ๏ธ,๐ผ๐ฟ,๐ผ๐พ,๐ผ๐ฝ,๐ผ๐ผ,๐ผ๐ป,๐ผ,๐ฏ,โ๏ธ,โ๏ธ,โ๐ฟ,โ๐พ,โ๐ฝ,โ๐ผ,โ๐ป,โ๏ธ,๐,๐,๐,๐,๐,๐,๐ป,๐ง,๐,๐ฅ,โ๏ธ,โก๏ธ,โฃ๏ธ,โ๏ธ,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ป,๐,๐,๐ถ,๐ฐ,๐ฟ,๐ซ,๐,๐ท,๐,๐ฑ,โ๏ธ,๐ต,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ฎ,๐ฏ,๐,๐,๐,๐,๐ฒ,๐ญ,๐ธ,๐,๐ฟ,๐,๐จ,๐ต,โจ๏ธ,โ๏ธ,๐,๐ธ๐ฟ,๐ธ๐พ,๐ธ๐ฝ,๐ธ๐ผ,๐ธ๐ป,๐ธ,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐บ๐ธ,๐,๐ผ,๐ช,๐,๐,๐ฉ,๐ฆ,๐,๐ฃ,๐,๐,๐,โ๏ธ,๐,๐ญ,๐ฌ,๐ท,๐ฟ,๐,๐ฝ,๐ข,๐ผ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐,๐ธ,โฆ๏ธ,๐ผ,๐ฌ,๐,๐ผ,๐,๐,โ๏ธ,๐ธ,โ?๏ธ,๐,๐,๐ฎ,๐ด,๐ฒ,๐ฑ,โ๏ธ,โ?๏ธ,๐,๐ธ,๐ถ๐ฟ,๐ถ๐พ,๐ถ๐ฝ,๐ถ๐ผ,๐ถ๐ป,๐ถ,๐พ,๐ฃ,๐บ,๐ท,โญ๏ธ,๐น,๐ฐ,๐น,๐ฌ,๐พ,๐,๐,๐ข,๐,๐,๐ธ,๐,๐จ,๐ฃ,๐,๐ฌ,๐,๐ป,๐ฏ,๐,โฉ,๐ฆ,๐,๐พ,๐,๐ฎ,๐ซ,โช๏ธ,๐บ,๐,๐,๐,๐,๐บ,๐ฟ,๐ธ,๐ฐ,๐ฎ,โข๏ธ,โฌ๏ธ,๐ซ,๐,๐ณ,๐,ยฎ๏ธ,๐ช,๐ฌ,๐,๐จ๐ฟ,๐จ๐พ,๐จ๐ฝ,๐จ๐ผ,๐จ๐ป,๐จ,๐ฅ,๐,3๏ธโฃ,๐,๐น,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ข,โ๏ธ,๐ง๐ฟ,๐ง๐พ,๐ง๐ฝ,๐ง๐ผ,๐ง๐ป,๐ง,๐,๐ซ๐ท,โพ๏ธ,๐ฆ,๐ฉ๐ฟ,๐ฉ๐พ,๐ฉ๐ฝ,๐ฉ๐ผ,๐ฉ๐ป,๐ฉ,๐,๐?,๐,๐,๐พ,๐,๐?,๐ฏ,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,๐,๐ช,โ๏ธ,๐,๐ง,๐ฑ,๐,๐,๐,๐ต,๐ก,๐,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ป,๐ก,โ,๐,๐ฆ๐ฟ,๐ฆ๐พ,๐ฆ๐ฝ,๐ฆ๐ผ,๐ฆ๐ป,๐ฆ,๐,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐,โ๏ธ,๐,๐,๐ต,๐,๐ง,๐ฎ๐น,๐ฆ,4๏ธโฃ,๐ฌ๐ง,๐,๐,๐,๐,๐ต๐ฟ,๐ต๐พ,๐ต๐ฝ,๐ต๐ผ,๐ต๐ป,๐ต,โซ๏ธ,๐,๐ฌ,โช๏ธ,๐,๐?,๐?,๐,๐,๐,๐,๐,๐,๐ผ,๐จ,โ๏ธ,๐,โ๏ธ,5๏ธโฃ,๐,๐ฅ,โ๏ธ,๐ฒ,๐,โฌ๏ธ,๐ญ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ฝ,๐,๐ณ๐ฟโโ๏ธ,๐ณ๐พโโ๏ธ,๐ณ๐ฝโโ๏ธ,๐ณ๐ผโโ๏ธ,๐ณ๐ปโโ๏ธ,๐ณโโ๏ธ,๐ณ๐ฟ,๐ณ๐พ,๐ณ๐ฝ,๐ณ๐ผ,๐ณ๐ป,๐ณ,๐จ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,โณ๏ธ,๐น,๐ฟ,โ๏ธ,๐,๐,๐ฉ,๐ฐ๐ฟ,๐ฐ๐พ,๐ฐ๐ฝ,๐ฐ๐ผ,๐ฐ๐ป,๐ฐ,โฝ๏ธ,๐,๐ด,โ๏ธ,๐ต,๐ผ,๐,๐,๐,๐ฝ,๐พ,โฐ,๐,โ,๐บ,๐ฟ,๐ฎ,๐ฃ,๐ด๐ฟ,๐ด๐พ,๐ด๐ฝ,๐ด๐ผ,๐ด๐ป,๐ด,๐,๐,๐,๐ณ,๐,โ๏ธ,๐ณ,๐ฑ,๐,๐,๐,๐,๐น,โณ๏ธ,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,๐โโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,๐ญ,๐,๐,๐ฐ๏ธ,โ๏ธ,๐น,๐,๐,โ๏ธ,๐ฑ,๐,๐ฎ๐ฟโโ๏ธ,๐ฎ๐พโโ๏ธ,๐ฎ๐ฝโโ๏ธ,๐ฎ๐ผโโ๏ธ,๐ฎ๐ปโโ๏ธ,๐ฎโโ๏ธ,๐ฎ๐ฟ,๐ฎ๐พ,๐ฎ๐ฝ,๐ฎ๐ผ,๐ฎ๐ป,๐ฎ,๐ต,๐ฃ,๐,๐ฒ,๐ค,๐,๐ป,๐ค,โคต๏ธ,๐,โ๏ธ,๐ช๐ธ,๐,๐,0๏ธโฃ,๐,๐ฑ๐ฟโโ๏ธ,๐ฑ๐พโโ๏ธ,๐ฑ๐ฝโโ๏ธ,๐ฑ๐ผโโ๏ธ,๐ฑ๐ปโโ๏ธ,๐ฑ๐ฟ,๐ฑ๐พ,๐ฑ๐ฝ,๐ฑ๐ผ,๐ฑ๐ป,๐ฑ,๐,๐,๐,๐บ,โฐ,๐ฉ,๐,๐,๐ค,๐,๐,๐,๐ฅ,๐,๐ฃ,ใฐ๏ธ,๐จ,โช,๐,๐,โด๏ธ,๐บ,๐,โ,๐ฒ๐ฟ,๐ฒ๐พ,๐ฒ๐ฝ,๐ฒ๐ผ,๐ฒ๐ป,๐ฒ,๐ช,๐ฅ,๐,๐ป,๐ฉ๐ช,โคด๏ธ,๐,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐,โ๏ธ,๐,๐ฐ,๐,๐,๐จ,๐,๐,โ๏ธ,โต๏ธ,6๏ธโฃ,๐ฑ๏ธ,โ๏ธ,๐ฉ,โ๏ธ,๐ฒ,๐,๐ฏ,๐น,๐,โ๏ธ,๐ฝ,๐ฒ,๐,๐ฎ,๐,๐?,โ๏ธ,๐บ,๐,โ๏ธ,๐,โณ,๐พ๏ธ,๐ฒ,7๏ธโฃ,๐,๐,๐,๐ฒ,โ,๐,โ๏ธ,๐ฑ,๐,๐ฎ,๐,ใฝ๏ธ,๐ซ,๐,๐,๐ฅ,๐ฏ๐ต,๐ท,๐,๐,โ๏ธ,โ๏ธ,๐,๐ถ,โ๏ธ,๐,๐ช,๐,๐,๐ฉ,๐,๐ท,โช๏ธ,๐ด๐ฟโโ๏ธ,๐ด๐พโโ๏ธ,๐ด๐ฝโโ๏ธ,๐ด๐ผโโ๏ธ,๐ด๐ปโโ๏ธ,๐ดโโ๏ธ,๐ด๐ฟ,๐ด๐พ,๐ด๐ฝ,๐ด๐ผ,๐ด๐ป,๐ด,โ๏ธ,๐ก,โ๏ธ,๐ข,๐ฃ๐ฟโโ๏ธ,๐ฃ๐พโโ๏ธ,๐ฃ๐ฝโโ๏ธ,๐ฃ๐ผโโ๏ธ,๐ฃ๐ปโโ๏ธ,๐ฃโโ๏ธ,๐ฃ๐ฟ,๐ฃ๐พ,๐ฃ๐ฝ,๐ฃ๐ผ,๐ฃ๐ป,๐ฃ,๐,๐,๐ฉ,๐ป,๐ช,๐,โ๏ธ,โ,๐บ,๐ซ,๐,๐,๐ท๐ฟโโ๏ธ,๐ท๐พโโ๏ธ,๐ท๐ฝโโ๏ธ,๐ท๐ผโโ๏ธ,๐ท๐ปโโ๏ธ,๐ทโโ๏ธ,๐ท๐ฟ,๐ท๐พ,๐ท๐ฝ,๐ท๐ผ,๐ท๐ป,๐ท,๐ฝ,๐,โ,๐ฐ,๐ป,๐,๐ณ,๐,ใ๏ธ,๐ก,๐ณ,โ๏ธ,โ๏ธ,๐,๐,๐ข,๐,๐,๐,๐,๐ผ,๐ฒ,๐ด,๐ผ,ใ๏ธ,๐,๐ท๐บ,๐ข,๐,๐,๐,๐ฆ,๐,๐,๐,๐ฆ,๐,๐,๐,๐,8๏ธโฃ,๐ข,๐,9๏ธโฃ,๐ณ,๐,๐,โฟ,๐ท,โน,๐,๐,๐,๐,๐ฟ๏ธ,๐ก,โบ๏ธ,๐บ,๐,โพ๏ธ,๐ผ,๐ฐ,๐ช,๐ฏ,๐น,๐ฐ,๐ฆ,๐,โซ,๐,๐ซ,๐,๐ฝ,๐,๐,โซ๏ธ,๐ค,๐,๐,๐,๐ข,๐,๐?,๐ก,๐,๐?,๐ฟ,๐,๐ถ,๐ง,#๏ธโฃ,โผ๏ธ,๐ก,๐ถ,๐,๐,๐,๐,๐,๐ฌ,๐,๐ถ,๐,๐ค,๐ฐ๐ท,๐ผ,๐,โฌ,๐,๐ฝ,๐ด,๐,๐ฝ,โฌ๏ธ,โฟ๏ธ,๐,๐,๐ง,๐ฆ,๐ญ,๐,๐,โป๏ธ,๐ฎ,๐ง,๐,๐,๐,๐ฉ,๐,๐จ,๐พ,๐ฎ,๐,๐ฌ,๐,๐,๐,โฒ๏ธ,๐,๐,๐ต,๐,๐ญ,โฌ๏ธ,๐ฐ,๐,๐,๐,๐,๐,๐ฆ,๐ง,๐ฏ๏ธ,๐,๐,โ,๐,๐ท,๐จ๐ณ,๐ณ,๐,๐,๐,๐,๐,๐,๐ณ,๐ฅ,๐ต๐ฟโโ๏ธ,๐ต๐พโโ๏ธ,๐ต๐ฝโโ๏ธ,๐ต๐ผโโ๏ธ,๐ต๐ปโโ๏ธ,๐ตโโ๏ธ,๐ต๐ฟ,๐ต๐พ,๐ต๐ฝ,๐ต๐ผ,๐ต๐ป,๐ต,๐ฌ,๐ฏ,๐,๐,๐,๐,๐,๐ด,๐,๐?,๐,โฝ๏ธ,๐ฑ,๐,๐น,๐,๐พ,๐ฃ,๐,๐พ,๐บ,๐๏ธ,๐จ,๐,๐ป,๐๏ธ,๐ถ,๐,๐,๐ธ,๐,๐ท๏ธ,๐ข,๐,๐ฒ,๐ต,๐ฏ,๐ญ,๐ธ,๐,๐,๐,๐,๐ด,๐,๐,๐๏ธ,๐ค,๐,๐ซ,๐,๐ค,๐,๐,๐,๐ฐ,๐,๐,๐,๐ง,๐ฅ,๐ค,๐ช,๐,๐,๐ฏ,๐,โ,๐ข,๐?,๐?,๐ญ,๐ฃ,๐ก,๐ฃ,๐ก,๐ก,๐?,๐,๐,๐ฑ,๐,๐,๐ณ,๐ณ๏ธโ๐,๐ต๐ฟโโ๏ธ,๐ต๐พโโ๏ธ,๐ต๐ฝโโ๏ธ,๐ต๐ผโโ๏ธ,๐ต๐ปโโ๏ธ,๐ต๏ธโโ๏ธ,๐ต๐ฟ,๐ต๐พ,๐ต๐ฝ,๐ต๐ผ,๐ต๐ป,โน๏ธ,โ?๏ธ,๐ค,๐ค,๐ค,๐ค,๐ค,๐ค,๐ค,๐ค,๐,๐,๐,๐,๐ต,๐ค๐ฟ,๐ค๐พ,๐ค๐ฝ,๐ค๐ผ,๐ค๐ป,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,โ๐ฟ,โ๐พ,โ๐ฝ,โ๐ผ,โ๐ป,๐ค,โ๏ธ,๐,๐,๐,๐ถ,๐โ๐จ,๐,๐๐ฟโโ๏ธ,๐๐พโโ๏ธ,๐๐ฝโโ๏ธ,๐๐ผโโ๏ธ,๐๐ปโโ๏ธ,โน๐ฟโโ๏ธ,โน๐พโโ๏ธ,โน๐ฝโโ๏ธ,โน๐ผโโ๏ธ,โน๐ปโโ๏ธ,๐๏ธโโ๏ธ,๐๏ธโโ๏ธ,โน๏ธโโ๏ธ,๐๐ฟ,๐๐พ,๐๐ฝ,๐๐ผ,๐๐ป,โน๐ฟ,โน๐พ,โน๐ฝ,โน๐ผ,โน๐ป,๐ด,๐,๐,*๏ธโฃ,โฃ๏ธ,โก๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,โธ๏ธ,โฏ๏ธ,โฎ๏ธ,โช๏ธ,โฆ๏ธ,โฃ๏ธ,โข๏ธ,๐,๐ฏ,๐,๐,โฑ๏ธ,โฐ๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,โจ๏ธ,๐ข,๐ก,๐?,๐,๐,๐,๐,๐,๐ณ,๐ก,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐ผ,๐ฒ,๐ฑ,๐จ,๐ฅ,๐,๐,๐,๐,๐,๐น,๐ณ,๐ฐ,๐ฏ,๐ฟ,๐ฝ,๐ธ,๐บ,๐ท,๐ด,๐ณ,๐,๐,๐,๐,๐ก,๐ณ,๐ฐ,๐ฌ,๐ซ,๐ฉ,๐ฅ,๐ค,๐ฃ,๐บ,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐น,๐ธ,๐ต,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐ง,๐ฟ,๐พ,๐ฝ,๐ถ,๐ฏ,๐ฎ,๐ญ,โ๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ธ,๐ท,๐,๐ฟ,๐ฌ,๐ซ,๐ช,๐ฉ,๐จ,๐ง,๐ฆ,๐ฅ,๐ค,๐ฃ,โบ,โน,โธ,โฏ,โฎ,โญ,โฑ,โ,โ,โ,โฒ,โฑ,โด,โฐ,โฉ,โน,โธ,โท,โ,โ,๐ฟ๐ผ,๐ฟ๐ฒ,๐ฟ๐ฆ,๐พ๐น,๐พ๐ช,๐ฝ๐ฐ,๐ผ๐ธ,๐ผ๐ซ,๐ป๐บ,๐ป๐ณ,๐ป๐ฎ,๐ป๐ฌ,๐ป๐ช,๐ป๐จ,๐ป๐ฆ,๐บ๐ฟ,๐บ๐พ,๐บ๐ฌ,๐บ๐ฆ,๐น๐ฟ,๐น๐ผ,๐น๐ป,๐น๐น,๐น๐ท,๐น๐ด,๐น๐ณ,๐น๐ฒ,๐น๐ฑ,๐น๐ฐ,๐น๐ฏ,๐น๐ญ,๐น๐ฌ,๐น๐ซ,๐น๐ฉ,๐น๐จ,๐ธ๐ฟ,๐ธ๐พ,๐ธ๐ฝ,๐ธ๐ป,๐ธ๐น,๐ธ๐ธ,๐ธ๐ท,๐ธ๐ด,๐ธ๐ณ,๐ธ๐ฒ,๐ธ๐ฑ,๐ธ๐ฐ,๐ธ๐ฎ,๐ธ๐ญ,๐ธ๐ฌ,๐ธ๐ช,๐ธ๐ฉ,๐ธ๐จ,๐ธ๐ง,๐ธ๐ฆ,๐ท๐ผ,๐ท๐ธ,๐ท๐ด,๐ท๐ช,๐ถ๐ฆ,๐ต๐พ,๐ต๐ผ,๐ต๐น,๐ต๐ธ,๐ต๐ท,๐ต๐ณ,๐ต๐ฒ,๐ต๐ฑ,๐ต๐ฐ,๐ต๐ญ,๐ต๐ฌ,๐ต๐ซ,๐ต๐ช,๐ต๐ฆ,๐ด๐ฒ,๐ณ๐ฟ,๐ณ๐บ,๐ณ๐ท,๐ณ๐ต,๐ณ๐ด,๐ณ๐ฑ,๐ณ๐ฎ,๐ณ๐ฌ,๐ณ๐ซ,๐ณ๐ช,๐ณ๐จ,๐ณ๐ฆ,๐ฒ๐ฟ,๐ฒ๐พ,๐ฒ๐ฝ,๐ฒ๐ผ,๐ฒ๐ป,๐ฒ๐บ,๐ฒ๐น,๐ฒ๐ธ,๐ฒ๐ท,๐ฒ๐ถ,๐ฒ๐ต,๐ฒ๐ด,๐ฒ๐ณ,๐ฒ๐ฒ,๐ฒ๐ฑ,๐ฒ๐ฐ,๐ฒ๐ญ,๐ฒ๐ฌ,๐ฒ๐ช,๐ฒ๐ฉ,๐ฒ๐จ,๐ฒ๐ฆ,๐ฑ๐พ,๐ฑ๐ป,๐ฑ๐บ,๐ฑ๐น,๐ฑ๐ธ,๐ฑ๐ท,๐ฑ๐ฐ,๐ฑ๐ฎ,๐ฑ๐จ,๐ฑ๐ง,๐ฑ๐ฆ,๐ฐ๐ฟ,๐ฐ๐พ,๐ฐ๐ผ,๐ฐ๐ต,๐ฐ๐ณ,๐ฐ๐ฒ,๐ฐ๐ฎ,๐ฐ๐ญ,๐ฐ๐ฌ,๐ฐ๐ช,๐ฏ๐ด,๐ฏ๐ฒ,๐ฏ๐ช,๐ฎ๐ธ,๐ฎ๐ท,๐ฎ๐ถ,๐ฎ๐ด,๐ฎ๐ณ,๐ฎ๐ฒ,๐ฎ๐ฑ,๐ฎ๐ช,๐ฎ๐ฉ,๐ฎ๐จ,๐ญ๐บ,๐ญ๐น,๐ญ๐ท,๐ญ๐ณ,๐ญ๐ฐ,๐ฌ๐พ,๐ฌ๐ผ,๐ฌ๐บ,๐ฌ๐น,๐ฌ๐ธ,๐ฌ๐ท,๐ฌ๐ถ,๐ฌ๐ต,๐ฌ๐ณ,๐ฌ๐ฒ,๐ฌ๐ฑ,๐ฌ๐ฎ,๐ฌ๐ญ,๐ฌ๐ฌ,๐ฌ๐ซ,๐ฌ๐ช,๐ฌ๐ฉ,๐ฌ๐ฆ,๐ซ๐ด,๐ซ๐ฒ,๐ซ๐ฐ,๐ซ๐ฏ,๐ซ๐ฎ,๐ช๐บ,๐ช๐น,๐ช๐ท,๐ช๐ญ,๐ช๐ฌ,๐ช๐ช,๐ช๐จ,๐ฉ๐ฟ,๐ฉ๐ด,๐ฉ๐ฒ,๐ฉ๐ฐ,๐ฉ๐ฏ,๐จ๐ฟ,๐จ๐พ,๐จ๐ฝ,๐จ๐ผ,๐จ๐ป,๐จ๐บ,๐จ๐ท,๐จ๐ด,๐จ๐ฒ,๐จ๐ฑ,๐จ๐ฐ,๐จ๐ฎ,๐จ๐ญ,๐จ๐ฌ,๐จ๐ซ,๐จ๐ฉ,๐จ๐จ,๐จ๐ฆ,๐ง๐ฟ,๐ง๐พ,๐ง๐ผ,๐ง๐น,๐ง๐ธ,๐ง๐ท,๐ง๐ถ,๐ง๐ด,๐ง๐ณ,๐ง๐ฒ,๐ง๐ฑ,๐ง๐ฏ,๐ง๐ฎ,๐ง๐ญ,๐ง๐ฌ,๐ง๐ซ,๐ง๐ช,๐ง๐ฉ,๐ง๐ง,๐ง๐ฆ,๐ฆ๐ฟ,๐ฆ๐ฝ,๐ฆ๐ผ,๐ฆ๐บ,๐ฆ๐น,๐ฆ๐ธ,๐ฆ๐ท,๐ฆ๐ถ,๐ฆ๐ด,๐ฆ๐ฒ,๐ฆ๐ฑ,๐ฆ๐ฎ,๐ฆ๐ฌ,๐ฆ๐ซ,๐ฆ๐ช,๐ฆ๐ฉ,๐ฆ,๐คฆ,๐ฅฐ,๐คฃ,๐คฉ,๐ฅบ,โบ,๐ฅต,๐ฅถ,๐ฅด,๐ฅณ,๐ฅฑ,โ?,๐งก,๐ค,๐ค,๐ค,โฃ,โค,๐ค,๐ค,โ,๐ค,๐ค,๐ค,๐ค,๐ค,โ,โ,๐คฒ,๐ฅ,๐ง,๐งธ,๐ฆ,๐ค,๐ง,๐ง,๐ฆป,๐ฆถ,๐ฆต,๐ฆฟ,๐ฆพ,๐คณ,๐ง?,๐ฆท,๐ฆด,๐ง,๐ง,โโ๏ธ,โ,โโ๏ธ,๐ฅ,๐งถ,๐งต,โ?,โฅ,โฆ,โฃ,๐ฅ,โพ,โฝ,๐ฅ,๐ฅ,๐ฅ,๐งจ,๐งง,๐บ,๐ง,๐คน,๐คพ,๐คฝ,๐คผ,๐คธ,๐คบ,๐ง,๐ง,๐ง,๐ง,๐คฐ,๐คฑ,๐ฆน,๐ฆธ,๐คถ,๐ง,๐คท,๐คฌ,๐ฅ,๐คค,๐คฏ,๐คข,๐ฅฅ,๐ฆง,๐ฆฎ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆจ,๐ฆ,๐ฆ,๐ฆฆ,๐ฆฅ,๐ฆ,๐ฆก,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆข,๐ฆ,๐ฆฉ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆ?,๐ฅ,๐ฅญ,๐ฅ,๐ฅ,๐ฅ,๐ฅ,๐ฅ,๐ง,๐คด,๐ฅฝ,๐ฅผ,๐ฆบ,๐ฅป,๐ฉฑ,๐งฆ,๐งฅ,๐งค,๐งฃ,๐ฉฒ,๐ฉณ,๐ฅพ,๐ฅฟ,๐ฉฐ,๐งฎ,๐ช,๐งพ,๐ช,๐งฒ,๐งช,๐งฐ,๐ฉธ,๐งซ,๐งฌ,๐ฆฏ,๐งท,๐ช,๐งฏ,๐ช,๐งบ,๐งป,๐งผ,๐งน,๐งด,๐ต,๐ฆฝ,๐ฆผ,๐บ,๐ด,๐น,๐,๐ถ,๐ช,๐งณ,๐ธ,๐ช,๐,๐งญ,๐งฉ,๐งฑ,๐ฅ,๐คฟ,๐ช,๐งฟ,๐ฅ,๐ฅ,๐คง,๐คฎ,๐คก,๐ง,๐คจ,๐ง,๐ง,๐ค?,๐คฅ,๐คช,๐ง,โน,๐ง,๐ง,๐คซ,๐คญ,๐,๐ฅฒ,๐ฅธ,๐ค,โ๐ฆฒ,โ๐ฆณ,โ๐ฆฑ,๐ซ,๐ซ,๐ซ,๐ฆฐ,๐ฅท,๐งข,๐ช,๐ฉด'.split(
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
//                             <div>ะ?ะฐะทะผะตั: ${bytesToSize(
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
                            <div>ะ?ะฐะทะผะตั: ${bytesToSize(
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
        $html = '<b>ะะฐััะธะฝะบะฐ</b>'
        break
      case 'link':
        $html = '<b>ะกััะปะบะฐ</b>'
        break
      case 'file-link':
        $html = '<b>ะคะฐะนะป</b>'
        break
      case 'sticker':
        $html = '<b>ะกัะธะบะตั</b>'
        break
      default:
        $html = '<b>ะะปะพะถะตะฝะธะต</b>'
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
  const sizes = ['ะฑะฐะนั', 'ะะ', 'ะะ', 'ะะ', 'ะขะ']
  if (bytes == 0) return '0 ะฑะฐะนั'
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
    'ัะฝะฒะฐัั',
    'ัะตะฒัะฐะปั',
    'ะผะฐััะฐ',
    'ะฐะฟัะตะปั',
    'ะผะฐั',
    'ะธัะฝั',
    'ะธัะปั',
    'ะฐะฒะณัััะฐ',
    'ัะตะฝััะฑัั',
    'ะพะบััะฑัั',
    'ะฝะพัะฑัั',
    'ะดะตะบะฐะฑัั',
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
    if (t.getTime() == d.getTime()) return `ัะตะณะพะดะฝั ะฒ ${formatedTime}`
    else if (t.getTime() == y.getTime()) return `ะฒัะตัะฐ ะฒ ${formatedTime}`
    else if (t.getTime() == dby.getTime()) return `ะฟะพะทะฐะฒัะตัะฐ ะฒ ${formatedTime}`
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
    )}${month} ะฒ ${formatedTime}`
  } else {
    var array = []
    if (t.getTime() == d.getTime()) array.push('')
    else if (t.getTime() == y.getTime()) array.push('ะฒัะตัะฐ')
    else if (t.getTime() == dby.getTime()) array.push('ะฟะพะทะฐะฒัะตัะฐ')
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
      error = 'ะัะธะฑะบะฐ ะฟะพะดะบะปััะตะฝะธั'
      break
    case 1011:
      error = 'ะัะธะฑะบะฐ ัะตัะฒะตัะฐ'
      break
    case 401:
      error = 'ะัะธะฑะบะฐ ะฐะฒัะพัะธะทะฐัะธะธ'
      break
    case 403:
      error = 'ะะตะฒะตัะฝัะน ะปะพะณะธะฝ ะธะปะธ ะฟะฐัะพะปั'
      break
  }
  const settings = {
    type: 'error',
    title: 'ะัะธะฑะบะฐ!',
    body: error,
    ok: 'ะะบ',
  }
  this.modalToggle(settings)
}
