const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");
const { pageCatalog } = require("../../utils");
require("dotenv").config();

const description = {
  ru: [
    // `Сдайте жилье посуточно в  городе ${city}, ${country} с Your Price Booking и получайте оплату перед заселением. 5% комиссии, гибкие цены, регистрация объектов онлайн. Удовлетворите потребности бронирующих гостей, предлагая индивидуальные цены. Привлекайте путешественников, знающих, что наши комиссии для отельеров минимальны. Регистрируйте отели, квартиры, дома и многое другое сегодня и привлекайте клиентов!`,
    // `Сдайте комнату в квартире посуточно - ${city}, ${country}, с оплатой перед заселением. Мы взимаем всего 5% комиссии и позволяем вам гибко управлять ценами. Зарегистрируйте свое жилье онлайн и получите клиентов. Предлагайте индивидуальные цены, видимые для ищущих бронирование. Не упустите возможность предложить хорошие цены и получить клиентов с минимальной комиссией. Регистрируйтесь и начните аренду жилья прямо сейчас.`,
  ],
  uk: [
    // `Здавайте житло добово у місті ${city}, ${country} за допомогою Your Price Booking і отримуйте оплату перед заселенням. 5% комісії, гнучкі ціни, реєстрація об'єктів онлайн. Задовольняйте потреби бронюючих гостей, запропоновуючи індивідуальні ціни. Привертайте подорожуючих, які знають, що наші комісії для господарів є мінімальними. Реєструйте готелі, квартири, будинки та багато іншого вже сьогодні і приваблюйте клієнтів!`,
    // `Здайте кімнату в квартирі добово - ${city}, ${country}, з оплатою перед заселенням. Ми беремо лише 5% комісії та надаємо можливість гнучкого керування цінами. Зареєструйте своє житло онлайн та отримайте клієнтів. Пропонуйте індивідуальні ціни, видимі для тих, хто шукає бронювання. Не пропустіть можливість запропонувати хороші ціни та отримати клієнтів з мінімальною комісією. Реєструйтеся і почніть здачу житла прямо зараз.`,
  ],
  pl: [
    // `Wynajmij apartamenty na dzień - ${city}, ${country} z Your Price Booking i zarabiaj przed wprowadzeniem się. 5% prowizji, elastyczne ceny, rejestracja obiektu online. Spełniaj potrzeby rezerwacyjne swoich gości, oferując spersonalizowane ceny. Przyciągaj podróżnych, którzy wiedzą, że opłaty naszych właścicieli są minimalne. Wystaw hotele, apartamenty, domy i nie tylko już dziś i przyciągnij klientów!`,
    // `Wynajmij pokój w mieszkaniu na dobę w mieście ${city}, ${country}, z płatnością przed zameldowaniem. Pobieramy tylko 5% prowizji i zapewniamy elastyczne zarządzanie cenami. Zarejestruj swoje zakwaterowanie online i zdobywaj klientów. Oferuj niestandardowe ceny widoczne dla osób poszukujących rezerwacji. Nie przegap okazji, aby zaoferować dobre ceny i pozyskać klientów przy minimalnej prowizji. Zarejestruj się i zacznij wynajmować swój dom już teraz.`,
  ],
  en: [
    // `Rent Accommodation Daily in the city of ${city}, ${country} with Your Price Booking and get paid before check-in. 5% commission, flexible pricing, online property registration. Cater to the needs of booking guests by offering individual prices. Attract travelers who know that our commissions for hosts are minimal. Register hotels, apartments, homes, and more today and attract customers!`,
    // `Rent a room in an apartment daily in the city of ${city}, ${country}, with payment before check-in. We charge only 5% commission and provide flexible price management. Register your accommodation online and get customers. Offer custom pricing visible to those looking for a reservation. Do not miss the opportunity to offer good prices and get customers with minimal commission. Register and start renting out your home right now.`,
  ],
};

const { MAIN_DOMAIN } = process.env;

const CyrillicToTranslit = require("cyrillic-to-translit-js");
const cyrillicToTranslit = new CyrillicToTranslit();

const createNewPages = async (req, res) => {
  const { language, idLocation, district, city, state, country } = req.body;

  const title = {
    ru: [
      `Посуточная аренда жилья - ${city}, ${country} | Your Price Booking`,
      `Посуточная аренда жилья - ${city}, ${country} | Your Price Booking`,
    ],
    uk: [
      `Бронювання готелів та посуточна оренда житла - ${city}, ${country} | Your Price Booking`,
      `Добова оренда житла - ${city}, ${country} | Your Price Booking`,
    ],
    pl: [
      `Rezerwacja hoteli i wynajem na krótki okres - ${city}, ${country} | Your Price Booking`,
      `Dzierżawa na krótki okres - ${city}, ${country} | Your Price Booking`,
    ],
    en: [
      `Hotel Booking and Short-Term Rental - ${city}, ${country} | Your Price Booking`,
      `Short-Term Rental in ${city}, ${country} | Your Price Booking`,
    ],
  };

  let isPageAdded = false;

  //   const foo = async () => {
  //     for (const link of pageCatalog.ua) {
  //       //   arrayOfLinks.push(
  //       //     `${MAIN_DOMAIN}${link}-${district}-${city}-${state}-${country}`
  //       //   );

  //       const addToUaCatalog = await UaCatalogForHotelier.create({
  //         ...req.body,
  //         nameOfpage: district,
  //         url: `${MAIN_DOMAIN}${link}-${district}-${city}-${state}-${country}`,
  //       });

  //       if (addToUaCatalog) {
  //         return  isPageAdded = true);
  //       }
  //     }
  //   };

  //   const getString = `${district} ${city} ${state} ${country}`;
  const getString = !district
    ? `${city} ${state} ${country} ${language}`
    : `${district} ${city} ${state} ${country} ${language}`;

  const translit = cyrillicToTranslit.transform(getString, "-").toLowerCase();

  switch (language) {
    case "uk":
      for (const link of pageCatalog.uk) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.uk.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];

        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToUaCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToUaCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const uaPages = await UaCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          uaPages,
        },
      });
      break;

    case "ru":
      for (const link of pageCatalog.ru) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.ru.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];

        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToRuCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;

          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToRuCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const ruPages = await RuCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          ruPages,
        },
      });
      break;

    case "pl":
      for (const link of pageCatalog.pl) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.pl.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];

        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToPlCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;

          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToPlCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const plPages = await PlCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          plPages,
        },
      });

      break;

    case "en":
      for (const link of pageCatalog.en) {
        // console.log({ link });
        // console.log("index", pageCatalog.en.indexOf(link));
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.en.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];
        // console.log({ createTypeOfPage });
        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToEnCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToEnCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const enPages = await EnCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          enPages,
        },
      });
      break;

    default:
      res.status(405).json({
        status: "error",
        message: `This DB doesn't has language ${language} for create pages`,
        code: 405,
      });
      break;
  }
};

module.exports = createNewPages;
