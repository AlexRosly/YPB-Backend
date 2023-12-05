const e = require("cors");
const { Country } = require("../../models");

const test = async (req, res) => {
  const { dbLangCode = "en", country } = req.query;
  const result = await Country.find({ dbLangCode, country }).populate({
    path: "states",
    populate: { path: "cities", populate: { path: "districts" } },
  });
  if (!result) {
    return res.json({
      status: "error",
    });
  }
  // const states = result[0].states;
  // console.log({ states });
  // for (const iterator of result) {
  //   console.log("res", result.states);
  // }
  let state = [];
  let city = [];
  let district = [];
  result.forEach((element) => {
    // console.log("res", element.states);
    state.push(...element.states);
  });
  // result.flatMap((element) => state.push(element.states));
  // console.log({ state });
  state.forEach((element) => {
    console.log("res", element.cities);

    city.push(...element.cities);
  });
  console.log({ city });

  city.forEach((element) => {
    district.push(element.districts);
  });
  // const cities = result.states.cities;
  // console.log({ cities });
  // const district = result.states.cities.districts;
  // console.log({ district });

  res.json({
    code: 200,
    mess: "ok",
    result,
    state,
    city,
    district,
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
