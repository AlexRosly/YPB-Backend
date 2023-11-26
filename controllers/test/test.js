// var googleTransliterate = require("google-transliterate");
// const { transliterate } = require("@sindresorhus/transliterate");
// const transliterate = require("transliterate-cyr-to-latin");
const cyrillicToTranslit = require("cyrillic-to-translit-js");
// const cyrillicToTranslit = new CyrillicToTranslit();

const test = (req, res) => {
  // transliterate();
  const translit = cyrillicToTranslit({ preset: "uk" }).transform(
    "Печерський район Київ Київська область Україна",
    "_"
  );
  console.log(translit);
  // console.log(
  //   googleTransliterate.transliterate(
  //     "Привет мир",
  //     "ja-Hira",
  //     "ja",
  //     function (err, transliteration) {
  //       transliteration = [
  //         ["おあやや", ["お文や", "おあやや", "お彩や", "お綾や", "オアヤヤ"]],
  //         ["おやに", ["親に", "おやに", "オヤに", "お屋に", "お矢に"]],
  //         [
  //           "おあやまり",
  //           ["お誤り", "お謝り", "おあやまり", "オアヤマリ", "ｵｱﾔﾏﾘ"],
  //         ],
  //       ];
  //     }
  //   )
  // );
  res.json({
    code: 200,
    mess: "ok",
    // result,
  });
};
module.exports = test;

// String.prototype.translit = (function(){
//   var L = {
// 'А':'A','а':'a','Б':'B','б':'b','В':'V','в':'v','Г':'G','г':'g',
// 'Д':'D','д':'d','Е':'E','е':'e','Ё':'Yo','ё':'yo','Ж':'Zh','ж':'zh',
// 'З':'Z','з':'z','И':'I','и':'i','Й':'Y','й':'y','К':'K','к':'k',
// 'Л':'L','л':'l','М':'M','м':'m','Н':'N','н':'n','О':'O','о':'o',
// 'П':'P','п':'p','Р':'R','р':'r','С':'S','с':'s','Т':'T','т':'t',
// 'У':'U','у':'u','Ф':'F','ф':'f','Х':'Kh','х':'kh','Ц':'Ts','ц':'ts',
// 'Ч':'Ch','ч':'ch','Ш':'Sh','ш':'sh','Щ':'Sch','щ':'sch','Ъ':'"','ъ':'"',
// 'Ы':'Y','ы':'y','Ь':"'",'ь':"'",'Э':'E','э':'e','Ю':'Yu','ю':'yu',
// 'Я':'Ya','я':'ya'
//       },
//       r = '',
//       k;
//   for (k in L) r += k;
//   r = new RegExp('[' + r + ']', 'g');
//   k = function(a){
//       return a in L ? L[a] : '';
//   };
//   return function(){
//       return this.replace(r, k);
//   };
// })();

// alert('нужна функция перевода слова из кириллицы в транслит'.translit());
